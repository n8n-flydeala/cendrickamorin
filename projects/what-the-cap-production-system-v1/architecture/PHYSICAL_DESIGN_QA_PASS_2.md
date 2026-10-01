WHATTHECAP PRODUCTION SYSTEM V1
PHYSICAL DESIGN QA PASS 2
Date: 2026-10-01
Basis: Google Sheets Physical Design Draft 3 + Business Rule Register amendments through AP-LDM-003
Status: QA PASS — READY FOR PHYSICAL DESIGN FREEZE CANDIDATE — NO IMPLEMENTATION AUTHORITY

1. QA SCOPE
Reviewed Draft 3 for:
• full canonical-entity coverage
• source-of-truth integrity
• Operations/Private confidentiality boundary
• quote/version history
• expense scope
• inventory/receiving/commitment/source lineage
• order/payment/sale/fulfillment separation
• investor/reseller/service/equipment/auction/loyalty representation
• audit/evidence/approval/exception coverage
• migration/recovery controls
• permission architecture
• staff simplicity
• buildability in Google Sheets without silently changing business rules

2. PREVIOUS BLOCKERS — CLOSED

QA-B1 — QUOTE / QUOTE VERSION — CLOSED
T_QUOTES and T_QUOTE_VERSIONS now provide a preserved version history for Cap Care and Equipment quoted terms.
Customer approval attaches to a specific quote version.
Later versions do not overwrite previously approved versions.
Quote approval remains distinct from Payment and Sale.

QA-B2 — EXPENSE SCOPE — CLOSED
EXPENSES are confirmed within canonical V1 scope.
T_EXPENSES now provides a dedicated authoritative expense register.
Posted expense correction uses reversal/adjustment.
Tax/accounting classification and cash reconciliation cadence remain correctly deferred.

QA-B3 — OPERATIONS ↔ PRIVATE CONTRACT — CLOSED
Draft 3 explicitly defines:
• allowed cross-file identities/status indicators;
• prohibited sensitive mirrors;
• canonical-ID-only joins;
• Owner/Admin-controlled cross-file writer;
• stop/queue/Exception behavior when Private is unavailable;
• no staff-visible IMPORTRANGE exposure;
• cross-file reconciliation checks.

This closes the confidentiality-critical implementation-design gap.

3. ARCHITECTURE INTEGRITY CHECKS

QA2-01 — PARTY / IDENTITY — PASS
PARTY + PARTY_ROLES provide one identity foundation for Customer, Investor, Reseller, Supplier and other roles.
External system identities remain mappings, not competing master identities.

QA2-02 — PRODUCT / SKU / RECEIVING / BATCH — PASS
PRODUCT and SKU are separated.
STOCK_RECEIPT / LINE records expected-vs-actual receiving.
BATCH preserves source/economic-owner lineage.

QA2-03 — INVENTORY MOVEMENT / COMMITMENT — PASS
Inventory Movement and Stock Commitment remain distinct.
Allocation/custody transfer does not imply Sale.
Available-to-sell can be derived from posted movements minus active commitments and unavailable states.

QA2-04 — ORDER / SALE / PAYMENT — PASS
ORDER/ORDER LINE supports pre-Sale commercial obligation.
SALE/SALE ITEM supports recognized revenue event.
PAYMENT/PAYMENT ALLOCATION supports received money independently.
COD and prepaid rules can be implemented without conflating these states.

QA2-05 — FULFILLMENT / RETURN / REFUND — PASS
Shipping/fulfillment lifecycle has its own canonical home.
Return Case and Refund remain separate.
RTS/loss/replacement can preserve original Sale and evidence history.

QA2-06 — INVESTOR CONFIDENTIALITY / SETTLEMENT — PASS
Private-file investor structures preserve sensitive economics while Operations retains only required IDs/status indicators.
The design supports payable traceability without exposing basis/terms to ordinary staff.

QA2-07 — RESELLER — PASS
Release/custody/report/remittance structures preserve accountability.
Sensitive negotiated reseller economics can be partitioned into Private when required.

QA2-08 — SERVICE / EQUIPMENT / QUOTES — PASS
Service Job, Service Action, Equipment Unit, Warranty Case, Quote and Quote Version cover approved operational and commercial history without forcing customer-owned items into inventory.

QA2-09 — AUCTION — PASS
Auction, Auction Item, Bid and commitment structures preserve append-only bidding, allocation≠Sale, payment-pending winner state and final exact-stock sale lineage.

QA2-10 — LOYALTY / STORED VALUE — PASS
Ledger model prevents direct balance overwrite.
Exact program economics remain configurable and intentionally not invented.

QA2-11 — EXPENSES — PASS
Expense tracking remains independent from received payments and sales.
Evidence, approval and reversal references are supported.

QA2-12 — EVENT / EVIDENCE / APPROVAL / EXCEPTION — PASS
Cross-domain audit/support controls are represented without replacing dedicated domain ledgers.

QA2-13 — PERMISSIONS — PASS AT PHYSICAL-DESIGN LEVEL
Owner/Admin, Operations Staff, Read-Only/Reporting and Automation/System are frozen permission classes.
Exact per-user assignment remains deployment configuration.
Per-table/action matrix is required at Build Specification.

QA2-14 — RECOVERY / MIGRATION — PASS
Legacy workbook is preserved before migration.
Opening inventory requires physical/source review and migration event.
No calculated output is manually forced.
Canonical IDs survive recovery/migration.

QA2-15 — STAFF SIMPLICITY — PASS
Daily users can operate through HOME/TODAY/VIEW/action interfaces while backend canonical tables remain controlled implementation layers.

4. NON-BLOCKING ITEMS CORRECTLY DEFERRED
The following do not block Physical Design freeze:
• exact retention durations;
• exact tax/accounting treatment;
• exact cash reconciliation cadence;
• exact loyalty rates/thresholds;
• exact dashboard KPI set/layout;
• exact API/webhook schemas;
• exact retry counts/alert recipients;
• exact staff names;
• exact Google Sheets styling, colors, widths and frozen rows;
• exact Apps Script library/code implementation;
• exact gateway/provider and infrastructure selections where already identified as later decisions.

These must remain gated in the appropriate later phase and must not be invented during implementation.

5. QA RESULT
PHYSICAL DESIGN QA PASS 2: PASS.

No unresolved structural gap was found that requires changing the approved V1 Physical Design before freeze.

6. FREEZE CANDIDATE CONDITIONS
The Physical Design Freeze Candidate must preserve:
• Operations + Private file partition;
• Prefix+ULID canonical IDs + human refs;
• Logical Model amendments AN-LDM-001 through AN-LDM-004 and AP-LDM-001 through AP-LDM-003;
• four permission classes;
• no sensitive investor economics in staff-accessible Operations;
• append-only/reversal adjustment controls;
• controlled opening-stock migration;
• dashboard as rebuildable read-only view;
• deferred items explicitly marked deferred rather than silently implemented.

7. GATE
Physical Design is QA-cleared but is NOT frozen until Business Owner explicitly approves the Freeze Candidate.

No Google Sheets build, tab creation, migration, Apps Script, permissions mutation, or integration implementation is authorized by this QA pass.

Next:
→ issue Physical Design Freeze Candidate
→ Business Owner freeze approval
→ Build Specification
→ explicit implementation authorization
