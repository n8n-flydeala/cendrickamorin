# Package 3 Apps Script Source — WIP

Status: BUSINESS-OWNED DEV PROJECT CREATED / SOURCE UPLOADED / LIVE POSTING BLOCKED / NOT ACCEPTED
Branch: what-the-cap-v1-dev

Purpose:
Prepare the privileged inventory-core source required by BS-V1.0-FROZEN without bypassing the standalone Apps Script security boundary.

Rules:
- This source is uploaded to the standalone DEV editor; no web-app deployment exists.
- Package 3 is not accepted.
- Critical inventory posting must not be replaced by direct spreadsheet writes.
- V1.0 remains the latest accepted rollback baseline.
- Deployment must occur under the WHATTHECAP Business-owned privileged Apps Script project.
- Caller identity / protected role registry must be implemented and verified before authoritative posting entrypoints are enabled.

Local logic QA completed:
receive 10 -> commit 4 -> release -> consume 3 -> transfer 2 -> negative-stock attempt blocked.
This proves the pure calculation guard logic only; it is not an end-to-end Apps Script/Sheets acceptance test.

## 2026-10-01 authorized resume

Business-owned standalone project: `1jAl9sLlPQZsCzAHsn3xI9-NIWrRNtUx8VtFBxwuHtNl7zcn0JqsW765v`.
Name: WHATTHECAP — Package 3 Inventory Core — DEV.
The editor contains a concatenation of the numbered `.gs` files. No `doGet`, `doPost`,
or caller-facing inventory action is enabled. Do not deploy this WIP as a web app.

Run local tests with `node --test tests/package3.test.cjs` from this directory.
24 tests PASS. Fixtures are synthetic; no test credential, subject, role code,
allowlist or permissive test policy is a real DEV authorization configuration.

The existing Apps Script runtime pure smoke test passed on 2026-10-01 at approximately
23:45 Asia/Manila. This verifies execution capability, not authenticated live posting.

New modules provide frozen schema checks, protected configuration validation,
caller-claim/role/action guards, a single-workbook atomic Sheets request adapter,
locked/idempotent orchestration, receiving/commit/release/consume/transfer/adjustment
plans, controlled ADJUST reversal, reconciliation variance recording, sequence
guards and an owner-guarded audit-header setup utility.

**Integration still required before posting:** real signature-verifying GIS transport
and server-verified CSRF/nonce flow; approved role registry and action mapping;
approved FK/eligibility/enum/approval adapters; SYS_META sequence adapter;
runtime freeze/audit-unavailable persistence; actual read-model reconciliation.
These dependencies are deliberately not replaced by the permissive local fixtures.

Only matched verified receipts are implemented. Classified receiving variance and
other movement reversal types remain blocked. This is not complete Package 3.

See `../../implementation/PACKAGE_3_RESUME_2026-10-01.md` for actual execution evidence
and prerequisites. Latest accepted rollback baseline remains V1.0.
