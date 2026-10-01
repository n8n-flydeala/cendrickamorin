WHATTHECAP PRODUCTION SYSTEM V1
GOOGLE SHEETS BUILD SPECIFICATION — DRAFT 1
Date: 2026-10-01
Status: BUILD SPECIFICATION IN PROGRESS — NO IMPLEMENTATION AUTHORITY
Basis: PD-V1.0-FROZEN + V0.7 VERIFIED RECOVERY CHECKPOINT

0. PURPOSE
This Build Specification translates the frozen Physical Design into an implementation-ready sequence for Google Sheets / Apps Script.
It defines what will be built, in what order, with what verification evidence, and where execution must stop if the expected state is not observed.

This document does NOT authorize implementation.

1. AUTHORITATIVE INPUTS
• Business Rule Register — architecture reconciled and amended
• Canonical Logical Data Model — FROZEN AS AMENDED
• Google Sheets Physical Design — PD-V1.0-FROZEN
• Physical Design QA Pass 2 — PASS
• Recovery checkpoint V0.7 — VERIFIED
• Reconciled Whimsical Boards 01–21
• Project Bootstrap

Conflict rule:
If an implementation detail conflicts with any frozen upstream authority, STOP and classify before changing the design.

2. IMPLEMENTATION TARGETS

2.1 Operations Workbook
Proposed title:
WHAT THE CAP — BUSINESS OS — OPERATIONS — V1

Role:
Staff-accessible canonical operations + controlled backend tables + read-only views.

2.2 Private Workbook
Proposed title:
WHAT THE CAP — BUSINESS OS — PRIVATE — V1

Role:
Owner/Admin-only investor-sensitive and confidential commercial/finance data.

2.3 Apps Script Project
Bound or standalone deployment to be chosen during controlled implementation.
Source must be versioned in GitHub.
Secrets must not be committed to GitHub or stored in visible sheet cells.

2.4 Legacy Workbook
Current WHAT THE CAP — BUSINESS OS remains preserved as legacy source until migration/cutover acceptance.
Spreadsheet ID:
1Y-4Qta4242ZkIHv8lXC_pR7QQ-vQ0HKBV-2bSWYd9yE

3. OPERATIONS WORKBOOK TAB SPEC

FRONTEND / DAILY USE
00_HOME
01_TODAY
02_SALES_VIEW
03_INVENTORY_VIEW
04_CUSTOMER_VIEW
05_EXCEPTIONS

CANONICAL / BACKEND
T_PARTIES
T_PARTY_ROLES
T_PRODUCTS
T_SKUS
T_LOCATIONS
T_STOCK_RECEIPTS
T_STOCK_RECEIPT_LINES
T_BATCHES
T_INVENTORY_MOVEMENTS
T_STOCK_COMMITMENTS
T_ORDERS
T_ORDER_LINES
T_SALES
T_SALE_ITEMS
T_STOCK_CONSUMPTION
T_PAYMENTS
T_PAYMENT_ALLOCATIONS
T_RESERVATIONS
T_FULFILLMENTS
T_RETURNS
T_RETURN_LINES
T_REFUNDS
T_QUOTES
T_QUOTE_VERSIONS
T_SERVICE_JOBS
T_SERVICE_ACTIONS
T_EQUIPMENT_UNITS
T_WARRANTY_CASES
T_AUCTIONS
T_AUCTION_ITEMS
T_BIDS
T_RESELLER_AGREEMENTS
T_RESELLER_RELEASES
T_RESELLER_RELEASE_LINES
T_RESELLER_REPORTS
T_RESELLER_REPORT_LINES
T_RESELLER_REMITTANCES
T_LOYALTY_LEDGER
T_STORED_VALUE_ACCOUNTS
T_STORED_VALUE_LEDGER
T_EXPENSES
T_EXTERNAL_IDS
T_EVIDENCE
T_EVENTS
T_EXCEPTIONS
T_APPROVALS
T_EXTERNAL_SYNC
REF_CONFIG
SYS_META
SYS_MIGRATION_LOG
SYS_RECONCILIATION

4. PRIVATE WORKBOOK TAB SPEC

P_INVESTOR_AGREEMENTS
P_INVESTOR_PAYABLES
P_INVESTOR_REMITTANCES
P_INVESTOR_REMITTANCE_ALLOCATIONS
P_PRIVATE_RESELLER_TERMS
P_PRIVATE_FINANCE_CONFIG
P_EVENTS_PRIVATE
P_EXCEPTIONS_PRIVATE
P_RECONCILIATION

No ordinary Operations staff access is permitted.

5. COMMON COLUMN STANDARD

Every canonical table should include, where applicable:
<ENTITY>_ID
STATUS
CREATED_AT
CREATED_BY
UPDATED_AT
UPDATED_BY

Posted/audited registers add:
POSTED_AT
POSTED_BY
REVERSAL_OF_ID
APPROVAL_ID
EVENT_ID / source event reference where applicable

External-integrated tables add:
SOURCE_SYSTEM
EXTERNAL_ID / mapping reference
IDEMPOTENCY_KEY where required

Rules:
• IDs are Prefix+ULID.
• timestamps use Asia/Manila display timezone.
• stored money is numeric + currency code.
• enum/status fields use REF_CONFIG.
• no row-number identifiers.
• no hidden business truth in formulas.

6. REFERENCE / CONFIGURATION BUILD

REF_CONFIG must contain controlled sections for:
CHANNELS
PAYMENT_METHODS
PAYMENT_STATUS
ORDER_STATUS
FINANCIAL_STATUS
FULFILLMENT_STATUS
MOVEMENT_TYPES
MOVEMENT_REASONS
RETURN_REASONS
RETURN_DISPOSITIONS
SERVICE_TYPES
LOCATION_TYPES
EXCEPTION_TYPES
APPROVAL_ACTIONS
PARTY_ROLES
COURIERS
SOURCE_SYSTEMS
CURRENCIES
EXPENSE_CATEGORIES
QUOTE_TYPES
STORED_VALUE_TYPES
THRESHOLDS

Deferred values must be marked TO_CONFIRM, not guessed.

7. APPS SCRIPT MODULE SPEC

00_Config.gs
Reads safe configuration and workbook IDs.

01_IdService.gs
Generate Prefix+ULID IDs and human references.

02_ValidationService.gs
Required fields, FK existence, enum validation, status preconditions.

03_EventService.gs
Append canonical Event records and correlation/idempotency references.

04_ExceptionService.gs
Create/update Exception queue records.

05_ApprovalService.gs
Approval request/decision handling.

06_InventoryService.gs
Post receiving, batches, movements, commitments, releases, exact consumption, reversals.

07_OrderService.gs
Order/order-line creation and controlled status changes.

08_SaleService.gs
Recognize canonical Sale only when business-rule conditions are satisfied.

09_PaymentService.gs
Payment verification/posting and allocation.

10_FulfillmentService.gs
Preparing/shipped/delivered/RTS/lost states and evidence linkage.

11_ReturnRefundService.gs
Return intake, inspection, disposition, refund/replacement linkage.

12_QuoteService.gs
Create quote, append quote version, customer approval reference, expiry checks.

13_ServiceJobService.gs
Cap Care lifecycle.

14_EquipmentService.gs
Equipment unit/handover/warranty lifecycle.

15_AuctionService.gs
Auction listing/bids/winner/payment-pending lifecycle.

16_ResellerService.gs
Release/report/reconciliation/remittance operations.

17_LoyaltyStoredValueService.gs
Ledger posting/reversal only.

18_ExpenseService.gs
Expense posting and reversal/adjustment.

19_PrivateBridgeService.gs
Owner/Admin-only Operations↔Private contract.
No sensitive mirror leakage.
Stop/queue/Exception on Private dependency failure.

20_ReconciliationService.gs
Cross-register and cross-file reconciliation.

21_MigrationService.gs
Controlled legacy import/opening migration.

22_ViewService.gs
Refresh/rebuild staff-facing views only.

23_BackupRecoveryService.gs
Approved snapshot/export and restore-support operations.

24_AuditGuard.gs
Protect posted rows, detect unauthorized edits if feasible, record anomalies.

8. WRITE CONTROL RULES

Direct spreadsheet editing:
Allowed only for approved draft/intake fields and controlled setup tables.

Critical posting:
Must go through Apps Script/system action.

Critical examples:
• inventory movement
• stock commitment release/consume
• Sale recognition
• payment verification/allocation
• refund posting
• expense posting
• investor payable/remittance
• stored-value/loyalty ledger changes
• reversal/adjustment
• sensitive cross-file writes

No Apps Script function may silently repair an inconsistent state.

9. USER ROLE BUILD

OWNER_ADMIN
View/Create/Edit Draft/Approve/Post/Reverse/Admin according to scope.

OPERATIONS_STAFF
Routine intake and workflow actions only.
No access to Private.
No authority for high-risk financial/ownership overrides unless specifically delegated.

READ_ONLY_REPORTING
Views/reports only.

AUTOMATION_SYSTEM
Only deterministic, scoped writes through approved functions and identities.

A detailed per-table permission matrix must be produced before permission mutation.

10. PACKAGE / GATE IMPLEMENTATION PLAN

PACKAGE 0 — PRE-BUILD CONTROLS
Goal:
Establish safe build environment without touching production truth.

Actions:
• verify V0.7 recovery;
• create build log/change log;
• establish implementation branch/repo folders;
• define exact implementation workbook IDs after creation;
• define rollback checkpoints;
• confirm Business account ownership.

Exit evidence:
• pre-build checklist PASS;
• no unauthorized mutation.

PACKAGE 1 — CREATE OPERATIONS / PRIVATE SHELLS
Actions:
• create two new spreadsheets;
• set timezone/locale;
• create only approved tabs;
• add SYS_META with version/state;
• no migration data.

Exit evidence:
• exact tab list matches spec;
• Private permissions verified owner-only;
• legacy workbook untouched.

PACKAGE 2 — REF_CONFIG + MASTER TABLES
Actions:
• build REF_CONFIG;
• T_PARTIES / PARTY_ROLES;
• T_PRODUCTS / T_SKUS;
• T_LOCATIONS;
• table header schemas and data validation.

Exit evidence:
• unique ID columns;
• enum validations;
• no invented deferred values.

PACKAGE 3 — INVENTORY CORE
Actions:
• receiving;
• receipt lines;
• batches;
• movements;
• commitments;
• reconciliation controls.

Exit evidence:
Test:
receive 10 → verify batch → allocate → commit → release → consume → adjust.
Derived stock matches event history.
Negative stock blocked.

PACKAGE 4 — ORDER / SALE / PAYMENT / FULFILLMENT
Actions:
• orders/order lines;
• payments/allocations;
• sales/sale items/consumption;
• reservations;
• fulfillment.

Exit evidence:
Prepaid path PASS.
Partial payment path PASS.
COD delivered-before-remittance path PASS.
Sale not recognized prematurely.

PACKAGE 5 — RETURNS / REFUNDS / EXPENSES / QUOTES
Actions:
• return/refund;
• expense posting;
• quote/versioning.

Exit evidence:
Return request ≠ refund.
Historical quote version preserved.
Posted expense reversal works.

PACKAGE 6 — SERVICE / EQUIPMENT / AUCTION
Actions:
• Cap Care;
• Equipment;
• Warranty;
• Auction/Bids.

Exit evidence:
Customer-owned service item never enters inventory.
Auction allocation ≠ Sale.
Equipment warranty traces unit/Sale.

PACKAGE 7 — RESELLER
Actions:
• agreements;
• releases;
• reporting;
• reconciliation;
• remittance.

Exit evidence:
Release ≠ Sale.
Over-release/report mismatch blocked or exceptioned.
Sensitive reseller terms stay Private where designated.

PACKAGE 8 — PRIVATE INVESTOR SYSTEM
Actions:
• investor agreement/version;
• payable;
• remittance/allocation;
• Private bridge;
• confidentiality verification.

Exit evidence:
Ops user cannot see investor basis/terms.
Exact investor-owned Sale consumption creates correct private payable only after recognized Sale.
Private outage safely stops dependent settlement posting.

PACKAGE 9 — LOYALTY / STORED VALUE
Actions:
• ledgers and safe controls;
• no invented program economics.

Exit evidence:
Earn/redeem/reverse ledger rebuilds balance.

PACKAGE 10 — EVENTS / EXCEPTIONS / APPROVALS / EVIDENCE
Actions:
• ensure all critical services append evidence/audit context.

Exit evidence:
Critical transaction has traceable event chain.
Failed deterministic operation creates Exception instead of silent partial success.

PACKAGE 11 — VIEWS / DASHBOARD FOUNDATION
Actions:
• 00_HOME;
• TODAY;
• Sales/Inventory/Customer/Exception views.
No final KPI design beyond approved scope.

Exit evidence:
Views rebuild from source registers and are non-authoritative.

PACKAGE 12 — LEGACY MIGRATION PREP
Actions:
• preserve legacy workbook;
• map products/SKUs/customers;
• physical count/source-owner review workflow;
• migration staging;
• no cutover yet.

Exit evidence:
Migration map signed off.
Unresolved lineage stays unresolved/exceptioned, not invented.

PACKAGE 13 — MIGRATION / RECONCILIATION
Actions:
• opening migration events;
• source mapping;
• reconcile legacy vs real-world vs new-system state.

Exit evidence:
Owner accepts variances/classifications.
No forced balance matching.

PACKAGE 14 — INTEGRATION READINESS
Actions:
• external ID mapping;
• webhook/event envelope contracts;
• n8n/Woo/GHL field ownership;
• no production integrations yet unless separately authorized.

Exit evidence:
Integration contracts documented and testable.

PACKAGE 15 — QA / UAT
Actions:
• happy path;
• edge cases;
• permission tests;
• confidentiality;
• recovery;
• double-submit/idempotency;
• reversal/adjustment.

Exit evidence:
QA matrix PASS or documented accepted exceptions.

PACKAGE 16 — DEPLOYMENT / TURNOVER
Actions only after separate approval:
• production cutover;
• training;
• final access;
• turnover docs;
• formal acceptance.

11. MUTATION DISCIPLINE

Before each package:
• verify current state;
• identify exact authorized mutations;
• create checkpoint if high risk.

During:
• mutate only listed scope.

After:
• verify expected state and evidence.

Unexpected:
STOP → preserve → evidence → diagnose → classify → decide → resume only after authorization.

12. VERIFICATION EVIDENCE STANDARD

Each implementation package must record:
• date/time;
• executor;
• before-state evidence;
• mutations made;
• workbook/script IDs affected;
• formulas/scripts/config changed;
• test cases run;
• expected vs actual;
• issues/exceptions;
• rollback/checkpoint reference;
• acceptance status.

13. QA MINIMUM TEST MATRIX

Inventory:
receiving variance
allocation transfer
commitment expiry/release
last-unit conflict
negative-stock attempt
adjustment reversal

Payments:
full prepaid
partial
underpayment
excess handling
duplicate proof
duplicate event/idempotency

COD:
confirmed order
shipped
delivered
remittance pending
remittance received
failed delivery count

Returns:
change-of-mind
WTC error
lost transit
inspection fail
refund components
exchange linkage

Investor:
WTC-owned Sale
Investor-owned Sale
mixed-source Sale Item
partial remittance
confidentiality

Reseller:
release
sale report
partial remittance
overdue
stock variance
return inspection

Service:
intake
quote approval
scope-change quote
ready/unclaimed
service issue

Equipment:
quote
DP reserve
full Sale
handover
warranty claim
replacement

Auction:
bid validity
reserve unmet
winner pending
unpaid winner fallback
paid recognized Sale

Recovery:
restore IDs
duplicate replay
Private unavailable
event reconciliation

14. DEFERRED ITEMS — MUST NOT BE INVENTED
• exact retention periods;
• exact tax/accounting treatment;
• exact cash reconciliation cadence;
• exact loyalty economic values;
• final dashboard KPI/layout;
• exact gateway/provider;
• exact hosting/infrastructure configuration;
• exact API/webhook payloads until integration spec;
• staff identities/assignments until deployment.

15. BUILD SPEC DRAFT 1 OPEN ITEMS

BS-01
Exact tab column ordering and optional columns for each table.

BS-02
Exact per-table permission matrix.

BS-03
Exact reference-number sequences and collision/retry behavior.

BS-04
Exact Apps Script deployment architecture: bound vs standalone + service identity.

BS-05
Exact migration staging workbook/sheets and reconciliation report format.

BS-06
Exact backup mechanism and frequency during DEV build.

BS-07
Exact package execution checklist and acceptance record format.

These are technical decisions within frozen design and may be resolved in Build Specification without reopening Physical Design unless they conflict with frozen architecture.

16. CURRENT PROJECT GATE
Business Rules: RECONCILED
Logical Model: FROZEN AS AMENDED
Physical Design: PD-V1.0-FROZEN
Recovery checkpoint: V0.7 VERIFIED
Build Specification: DRAFT 1
Implementation: NOT AUTHORIZED

NEXT
Resolve BS-01 through BS-07 → Build Specification QA / sanity review → freeze Build Specification → explicit implementation authorization.
