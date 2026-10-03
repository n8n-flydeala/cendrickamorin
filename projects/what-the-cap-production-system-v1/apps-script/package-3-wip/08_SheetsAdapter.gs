var WTC = WTC || {};
WTC.SheetsAdapter = (function () {
  function create(book, sheetsApi, now) {
    function table(name) {
      var headers = WTC.Schema[name];
      if (!headers) throw new Error('TABLE_OUTSIDE_PACKAGE_3');
      var sheet = book.getSheetByName(name);
      if (!sheet) throw new Error('TABLE_MISSING:' + name);
      var actual = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
      if (JSON.stringify(actual) !== JSON.stringify(headers)) throw new Error('SCHEMA_MISMATCH:' + name);
      return sheet;
    }
    function rows(name) {
      var sheet = table(name), headers = WTC.Schema[name], last = sheet.getLastRow();
      if (last < 2) return [];
      var seen = {};
      return sheet.getRange(2, 1, last - 1, headers.length).getValues().reduce(function (out, values, i) {
        // Formula-only prefilled receipt lines are not records.
        if (!values[0]) {
          if (values.some(function (value, col) { return value !== '' && !(name === 'T_STOCK_RECEIPT_LINES' && (col === 8 || col === 9)); })) throw new Error('ORPHAN_ROW:' + name);
          return out;
        }
        if (seen[values[0]]) throw new Error('DUPLICATE_ID:' + name);
        seen[values[0]] = true;
        var row = { _row: i + 2 };
        headers.forEach(function (key, col) { row[key] = values[col]; });
        out.push(row);
        return out;
      }, []);
    }
    function cell(value) {
      if (value === undefined || value === null || value === '') return {};
      if (value instanceof Date) value = value.toISOString();
      if (typeof value === 'number') {
        if (!Number.isFinite(value)) throw new Error('NONFINITE_CELL');
        return { userEnteredValue: { numberValue: value } };
      }
      if (typeof value === 'boolean') return { userEnteredValue: { boolValue: value } };
      // stringValue keeps untrusted text from becoming a Sheets formula.
      return { userEnteredValue: { stringValue: String(value) } };
    }
    function commit(plan) {
      if (!plan.length) throw new Error('EMPTY_WRITE_PLAN');
      var requests = [], expected = [], next = {};
      plan.forEach(function (change) {
        var sheet = table(change.table), headers = WTC.Schema[change.table], records = rows(change.table);
        var key = change.row[headers[0]];
        if (!key) throw new Error('PRIMARY_ID_REQUIRED');
        if (expected.some(function (e) { return e.table === change.table && e.id === key; })) throw new Error('DUPLICATE_PLAN_ID');
        var prior = records.filter(function (r) { return r[headers[0]] === key; });
        var rowIndex;
        if (change.kind === 'insert') {
          if (prior.length || expected.some(function (e) { return e.table === change.table && e.id === key; })) throw new Error('DUPLICATE_ID:' + change.table);
          // Fill the first empty ID slot; never append beneath all prefilled variance formulas.
          if (!next[change.table]) next[change.table] = records.length ? Math.max.apply(null, records.map(function (r) { return r._row; })) + 1 : 2;
          rowIndex = next[change.table]++;
        } else if (change.kind === 'release' && change.table === 'T_STOCK_COMMITMENTS') {
          if (prior.length !== 1 || prior[0].STATUS !== 'ACTIVE' || change.row.STATUS !== 'RELEASED') throw new Error('INVALID_RELEASE');
          function comparable(v){return v instanceof Date?v.toISOString():String(v);}
          headers.filter(function (h) { return ['STATUS','RELEASED_AT','RELEASE_REASON'].indexOf(h) < 0; }).forEach(function (h) {
            if (comparable(prior[0][h]) !== comparable(change.row[h])) throw new Error('IMMUTABLE_COMMITMENT_FIELD:' + h);
          });
          rowIndex = prior[0]._row;
        } else throw new Error('POSTED_HISTORY_IMMUTABLE');
        if (rowIndex > sheet.getMaxRows()) throw new Error('TABLE_CAPACITY_EXCEEDED');
        var values = headers.map(function (h) { return change.row[h] === undefined ? '' : change.row[h]; });
        requests.push({ updateCells: { range: { sheetId: sheet.getSheetId(), startRowIndex: rowIndex - 1, endRowIndex: rowIndex, startColumnIndex: 0, endColumnIndex: headers.length }, rows: [{ values: values.map(cell) }], fields: 'userEnteredValue' } });
        expected.push({ table: change.table, id: key, rowIndex: rowIndex, values: values });
      });
      // Atomic within ONE workbook. A thrown transport result is ambiguous; never blindly retry.
      try { sheetsApi.Spreadsheets.batchUpdate({ requests: requests }, book.getId()); }
      catch (err) { throw new Error('WRITE_OUTCOME_UNKNOWN'); }
      expected.forEach(function (e) {
        var actual = table(e.table).getRange(e.rowIndex, 1, 1, e.values.length).getValues()[0];
        var wanted = e.values.map(function (v) { return v instanceof Date ? v.toISOString() : v; });
        if (JSON.stringify(actual) !== JSON.stringify(wanted)) throw new Error('POST_WRITE_VERIFICATION_FAILED');
      });
      return expected.map(function (e) { return e.id; });
    }
    return { rows: rows, commit: commit, verifySchema: table };
  }
  return { create: create };
}());
