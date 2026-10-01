WHATTHECAP PRODUCTION SYSTEM V1
GOOGLE SHEETS BUILD SPECIFICATION — FREEZE CANDIDATE
Date: 2026-10-01
Status: QA CLEARED — AWAITING BUSINESS OWNER FREEZE APPROVAL — IMPLEMENTATION NOT AUTHORIZED

FREEZE BASIS
This Freeze Candidate is based on:
• Google Sheets Build Specification Draft 3
• Build Specification QA Pass 2 — PASS
• Physical Design PD-V1.0-FROZEN
• Canonical Logical Data Model — FROZEN AS AMENDED
• Recovery checkpoint V0.7 — VERIFIED

FREEZE CONTENT
Upon Business Owner approval, the following become fixed Build Specification controls:

1. TARGET FILES
• Operations workbook
• Private workbook
• Migration Staging workbook
• standalone privileged Apps Script project
• preserved legacy workbook until migration/cutover acceptance

2. OPERATIONS / PRIVATE TAB ARCHITECTURE
Exact tab inventory defined in Draft 3.

3. CANONICAL COLUMN SCHEMAS
Exact ordered headers defined in Draft 3 for Operations and Private tables.

4. ACCESS / PERMISSIONS
Owner/Admin
Operations Staff
Read-Only/Reporting
Automation/System
with table/action authority defined at Build Specification level.

5. ID / REFERENCE POLICY
Prefix+ULID primary identity.
Human references use <DOMAIN>-YYYY-######.
LockService protects sequence issuance.
Gaps allowed; numbers never reused.

6. APPS SCRIPT ARCHITECTURE
Standalone privileged project owned by WHATTHECAP Business account.
No privileged logic/secrets in staff-editable workbook.
Verified Google caller identity + protected server-side role registry.
Deny-by-default when identity cannot be verified.

7. OPERATIONS↔PRIVATE WRITE CONTRACT
Durable Outbox/Inbox saga.
Idempotency key required.
Event + correlation IDs required.
Private dependency failure surfaces Exception and remains replay/reconciliation capable.
No false claim of cross-file atomic transaction.

8. CREATE VS POST VALIDATION
Critical entities use separate draft/intake requirements and posting requirements.
No authoritative posting may occur with missing required posting fields or invalid state.

9. REF_CONFIG
Normalized registry:
REF_TYPE | CODE | LABEL | ACTIVE_FLAG | SORT_ORDER | PARAM_VALUE | SENSITIVITY | EFFECTIVE_FROM | EFFECTIVE_TO | UPDATED_AT | UPDATED_BY

10. MIGRATION
Separate staging workbook.
Source-row lineage.
Migration batch IDs.
Unresolved data becomes exception, never invented truth.
Opening stock reconciles Legacy vs Real-World vs New-System derived state.

11. DEV BACKUP / CHECKPOINTS
Checkpoint before high-risk packages.
End-of-active-build-day snapshot when mutations occurred.
Package acceptance checkpoint.
Apps Script GitHub commit at accepted package boundaries.
Checkpoint must be readable/verified.

12. CONTROLLED PACKAGE SEQUENCE
Packages 0–16 as defined in Draft 3.

13. QA / SECURITY CONSTRAINTS
• real Owner/Ops/Unauthorized authentication test before privileged actions;
• re-read authoritative state before critical posting;
• no Private secrets/IDs/economics leakage;
• no invented deferred business values;
• unexpected state triggers STOP → preserve → evidence → diagnose → classify → decide.

14. IMPLEMENTATION HOLD
Freeze approval does NOT itself authorize Sheets/App Script mutation.
After freeze, explicit implementation authorization is still required before Package 0 execution.

REFERENCE — FULL DRAFT 3
--------------------------------
WHATTHECAP PRODUCTION SYSTEM V1
GOOGLE SHEETS BUILD SPECIFICATION — DRAFT 3 — QA CLOSURES INCORPORATED
Date: 2026-10-01
Status: BUILD SPECIFICATION DRAFT 3 — QA PASS 1 BLOCKERS CLOSED — QA PASS 2 REQUIRED — NO IMPLEMENTATION AUTHORITY
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
Build Specification: DRAFT 3 — QA PASS 2 REQUIRED
Implementation: NOT AUTHORIZED
NEXT
Run Build Specification QA / sanity review → issue Freeze Candidate if PASS → Business Owner freeze approval → explicit implementation authorization.
17. BUILD SPEC TECHNICAL DECISION LOCK — 2026-10-01
BS-01 APPROVED — EXACT TABLE COLUMN ORDERING
General rule:
Column order follows:
IDENTITY → RELATIONSHIPS → BUSINESS DATA → STATUS → POSTING/AUDIT → SYSTEM METADATA.
Optional fields remain nullable; required/optional validation is defined per transaction stage.
OPERATIONS TABLE HEADERS
T_PARTIES
PARTY_ID | PARTY_TYPE | DISPLAY_NAME | LEGAL_NAME | PRIMARY_PHONE | PRIMARY_EMAIL | ADDRESS_TEXT | CITY | PROVINCE | COUNTRY | STATUS | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_PARTY_ROLES
PARTY_ROLE_ID | PARTY_ID | ROLE_TYPE | ROLE_STATUS | START_DATE | END_DATE | NOTES | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_PRODUCTS
PRODUCT_ID | PRODUCT_NAME | BRAND | CATEGORY_CODE | COLLECTION_CONTEXT | DESCRIPTION | STATUS | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_SKUS
SKU_ID | PRODUCT_ID | SKU_CODE | VARIANT_NAME | SIZE | COLOR | BARCODE | DEFAULT_RETAIL_PRICE | STATUS | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_LOCATIONS
LOCATION_ID | LOCATION_CODE | LOCATION_NAME | LOCATION_TYPE | IS_SELLABLE | IS_PHYSICAL | STATUS | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_STOCK_RECEIPTS
RECEIPT_ID | RECEIPT_REF | SOURCE_PARTY_ID | RECEIVED_DATE | RECEIVED_BY | EXPECTED_STATUS | CHECK_STATUS | REFERENCE_TEXT | EVIDENCE_GROUP_ID | STATUS | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_STOCK_RECEIPT_LINES
RECEIPT_LINE_ID | RECEIPT_ID | SKU_ID | EXPECTED_QTY | ACTUAL_QTY | CONDITION_CODE | ECONOMIC_OWNER_ID | AGREEMENT_REF_ID | VARIANCE_QTY | VARIANCE_STATUS | BATCH_ID | STATUS | CREATED_AT | CREATED_BY
T_BATCHES
BATCH_ID | SKU_ID | SOURCE_PARTY_ID | ECONOMIC_OWNER_ID | RECEIPT_LINE_ID | RECEIVED_AT | ORIGINAL_QTY | CONDITION_CODE | AGREEMENT_REF_ID | STATUS | CREATED_AT | CREATED_BY
T_INVENTORY_MOVEMENTS
MOVEMENT_ID | BATCH_ID | SKU_ID | FROM_LOCATION_ID | TO_LOCATION_ID | QTY | MOVEMENT_TYPE | BUSINESS_REASON_CODE | SOURCE_ENTITY_TYPE | SOURCE_ENTITY_ID | APPROVAL_ID | REVERSAL_OF_ID | NOTES | POSTED_AT | POSTED_BY | EVENT_ID
T_STOCK_COMMITMENTS
COMMITMENT_ID | SKU_ID | BATCH_ID | LOCATION_ID | COMMITMENT_TYPE | SOURCE_ENTITY_TYPE | SOURCE_ENTITY_ID | QTY | START_AT | EXPIRES_AT | STATUS | RELEASED_AT | RELEASE_REASON | CREATED_AT | CREATED_BY | EVENT_ID
T_ORDERS
ORDER_ID | ORDER_REF | PARTY_ID | CHANNEL_CODE | EXTERNAL_ORDER_ID | ORDER_DATE | CURRENCY | SUBTOTAL | DISCOUNT_TOTAL | SHIPPING_TOTAL | OTHER_TOTAL | ORDER_TOTAL | ORDER_STATUS | FINANCIAL_STATUS | FULFILLMENT_STATUS | SOURCE_SYSTEM | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_ORDER_LINES
ORDER_LINE_ID | ORDER_ID | SKU_ID | QTY | UNIT_PRICE | BASE_PRICE | DISCOUNT_TYPE | DISCOUNT_AMOUNT | LINE_TOTAL | PROMO_CODE | NOTES | STATUS | CREATED_AT | CREATED_BY
T_SALES
SALE_ID | SALE_REF | ORDER_ID | PARTY_ID | CHANNEL_CODE | RECOGNIZED_AT | CURRENCY | PRODUCT_TOTAL | SHIPPING_TOTAL | DISCOUNT_TOTAL | OTHER_TOTAL | SALE_TOTAL | FINANCIAL_STATUS | OPERATIONAL_STATUS | STATUS | CREATED_AT | CREATED_BY | POSTED_AT | POSTED_BY | EVENT_ID
T_SALE_ITEMS
SALE_ITEM_ID | SALE_ID | SKU_ID | QTY | BASE_UNIT_PRICE | DISCOUNT_AMOUNT | FINAL_UNIT_PRICE | LINE_TOTAL | STATUS | CREATED_AT | CREATED_BY
T_STOCK_CONSUMPTION
CONSUMPTION_ID | SALE_ITEM_ID | BATCH_ID | ECONOMIC_OWNER_ID | AGREEMENT_REF_ID | LOCATION_ID | QTY_CONSUMED | POSTED_AT | POSTED_BY | EVENT_ID
T_PAYMENTS
PAYMENT_ID | PAYMENT_REF | PARTY_ID | METHOD_CODE | RECEIVING_ACCOUNT_CODE | AMOUNT | CURRENCY | PAYMENT_TIMESTAMP | REFERENCE_NO | EVIDENCE_GROUP_ID | VERIFICATION_STATUS | VERIFIED_AT | VERIFIED_BY | STATUS | CREATED_AT | CREATED_BY | EVENT_ID
T_PAYMENT_ALLOCATIONS
PAYMENT_ALLOCATION_ID | PAYMENT_ID | OBLIGATION_TYPE | OBLIGATION_ID | AMOUNT_ALLOCATED | REVERSAL_OF_ID | POSTED_AT | POSTED_BY | EVENT_ID
T_RESERVATIONS
RESERVATION_ID | RESERVATION_REF | PARTY_ID | ORDER_ID | REQUIRED_TOTAL | VERIFIED_DP_AMOUNT | START_AT | EXPIRES_AT | STATUS | EXTENDED_AT | EXTENDED_BY | EXTENSION_REASON | CREATED_AT | CREATED_BY | EVENT_ID
T_FULFILLMENTS
FULFILLMENT_ID | FULFILLMENT_REF | ORDER_ID | SALE_ID | METHOD_CODE | COURIER_CODE | TRACKING_NO | WAYBILL_EVIDENCE_GROUP_ID | PREPARING_AT | SHIPPED_AT | DELIVERED_AT | RTS_AT | LOST_AT | FAILURE_CAUSE_CODE | SHIPPING_COST_CUSTOMER | SHIPPING_COST_BUSINESS | STATUS | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY | EVENT_ID
T_RETURNS
RETURN_ID | RETURN_REF | SALE_ID | PARTY_ID | REQUESTED_AT | REQUEST_REASON_CODE | APPROVAL_STATUS | RECEIVED_AT | INSPECTION_STATUS | DISPOSITION_CODE | RESOLUTION_TYPE | EVIDENCE_GROUP_ID | STATUS | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_RETURN_LINES
RETURN_LINE_ID | RETURN_ID | SALE_ITEM_ID | QTY_REQUESTED | QTY_RECEIVED | CONDITION_CODE | DISPOSITION_CODE | STATUS | CREATED_AT | CREATED_BY
T_REFUNDS
REFUND_ID | REFUND_REF | SALE_ID | RETURN_ID | PAYMENT_ID | PRODUCT_COMPONENT | OUTBOUND_SHIPPING_COMPONENT | RETURN_SHIPPING_COMPONENT | OTHER_COMPONENT | TOTAL_REFUND | METHOD_CODE | REFERENCE_NO | APPROVED_BY | APPROVED_AT | STATUS | POSTED_AT | POSTED_BY | EVENT_ID
T_QUOTES
QUOTE_ID | QUOTE_REF | QUOTE_TYPE | PARTY_ID | RELATED_ENTITY_TYPE | RELATED_ENTITY_ID | CURRENT_VERSION_ID | STATUS | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_QUOTE_VERSIONS
QUOTE_VERSION_ID | QUOTE_ID | VERSION_NO | EFFECTIVE_AT | VALID_UNTIL | CURRENCY | SUBTOTAL | DISCOUNT_TOTAL | SHIPPING_TOTAL | OTHER_TOTAL | TOTAL | TERMS_REF | WARRANTY_TERMS_REF | CUSTOMER_APPROVED_AT | CUSTOMER_APPROVED_EVIDENCE_GROUP_ID | SUPERSEDES_VERSION_ID | STATUS | CREATED_AT | CREATED_BY
T_SERVICE_JOBS
SERVICE_JOB_ID | SERVICE_REF | PARTY_ID | RECEIVED_AT | ITEM_DESCRIPTION | BRAND | MODEL | COLOR | MATERIAL | PRE_EXISTING_CONDITION | SERVICE_TYPE_CODE | QUOTE_ID | APPROVAL_STATUS | PAYMENT_STATUS | JOB_STATUS | READY_AT | RETURNED_AT | COMPLETED_AT | EVIDENCE_GROUP_ID | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_SERVICE_ACTIONS
SERVICE_ACTION_ID | SERVICE_JOB_ID | ACTION_TYPE | DESCRIPTION | QUOTE_VERSION_ID | PRICE_DELTA | CUSTOMER_APPROVED_AT | STARTED_AT | COMPLETED_AT | STAFF_ID | EVIDENCE_GROUP_ID | STATUS | CREATED_AT | CREATED_BY
T_EQUIPMENT_UNITS
EQUIPMENT_UNIT_ID | SKU_ID | SERIAL_NO | BATCH_ID | SALE_ID | CURRENT_PARTY_ID | UNIT_STATUS | DELIVERED_AT | WARRANTY_START_AT | WARRANTY_END_AT | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_WARRANTY_CASES
WARRANTY_CASE_ID | EQUIPMENT_UNIT_ID | SALE_ID | REPORTED_AT | ISSUE_TYPE | EVIDENCE_GROUP_ID | TRIAGE_STATUS | COVERAGE_DECISION | RESOLUTION_TYPE | STATUS | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_AUCTIONS
AUCTION_ID | AUCTION_REF | START_AT | CLOSE_AT | STARTING_BID | MIN_INCREMENT | RESERVE_AMOUNT | PAYMENT_DEADLINE_HOURS | SHIPPING_TERMS | STATUS | CREATED_AT | CREATED_BY | UPDATED_AT | UPDATED_BY
T_AUCTION_ITEMS
AUCTION_ITEM_ID | AUCTION_ID | SKU_ID | BATCH_ID | QTY | CONDITION_CODE | EVIDENCE_GROUP_ID | COMMITMENT_ID | STATUS | CREATED_AT | CREATED_BY
T_BIDS
BID_ID | AUCTION_ID | PARTY_ID | AMOUNT | BID_AT | SOURCE | VALIDITY_STATUS | INVALID_REASON | IS_HIGHEST_AT_CLOSE | CREATED_AT | CREATED_BY
T_RESELLER_AGREEMENTS
RESELLER_AGREEMENT_ID | RESELLER_PARTY_ID | VERSION_NO | MODEL_CODE | TIER_CODE | REPORTING_CADENCE | REMITTANCE_RULE | EXPOSURE_LIMIT_INDICATOR | EFFECTIVE_FROM | EFFECTIVE_TO | STATUS | CREATED_AT | CREATED_BY
T_RESELLER_RELEASES
RESELLER_RELEASE_ID | RESELLER_PARTY_ID | AGREEMENT_ID | RELEASED_AT | APPROVED_BY | STATUS | CREATED_AT | CREATED_BY | EVENT_ID
T_RESELLER_RELEASE_LINES
RELEASE_LINE_ID | RELEASE_ID | SKU_ID | BATCH_ID | QTY | FROM_LOCATION_ID | TO_LOCATION_ID | MOVEMENT_ID | STATUS | CREATED_AT | CREATED_BY
T_RESELLER_REPORTS
RESELLER_REPORT_ID | RESELLER_PARTY_ID | PERIOD_START | PERIOD_END | REPORTED_AT | VALIDATION_STATUS | STATUS | CREATED_AT | CREATED_BY
T_RESELLER_REPORT_LINES
REPORT_LINE_ID | REPORT_ID | RELEASE_LINE_ID | SKU_ID | BATCH_ID | QTY_SOLD | QTY_REMAINING | QTY_DAMAGED_LOST | VALIDATION_RESULT | RECOGNIZED_SALE_ID | STATUS | CREATED_AT | CREATED_BY
T_RESELLER_REMITTANCES
RESELLER_REMITTANCE_ID | RESELLER_PARTY_ID | AGREEMENT_ID | AMOUNT | RECEIVED_AT | METHOD_CODE | PAYMENT_ID | STATUS | CREATED_AT | CREATED_BY | EVENT_ID
T_LOYALTY_LEDGER
LOYALTY_ENTRY_ID | PARTY_ID | EVENT_TYPE | POINTS_DELTA | SOURCE_ENTITY_TYPE | SOURCE_ENTITY_ID | APPROVAL_ID | REVERSAL_OF_ID | POSTED_AT | POSTED_BY | EVENT_ID
T_STORED_VALUE_ACCOUNTS
STORED_VALUE_ACCOUNT_ID | PARTY_ID | VALUE_TYPE | CODE_HASH_OR_REF | ISSUED_AT | EXPIRY_AT | STATUS | CREATED_AT | CREATED_BY
T_STORED_VALUE_LEDGER
STORED_VALUE_ENTRY_ID | ACCOUNT_ID | EVENT_TYPE | AMOUNT_DELTA | SOURCE_ENTITY_TYPE | SOURCE_ENTITY_ID | APPROVAL_ID | REVERSAL_OF_ID | POSTED_AT | POSTED_BY | EVENT_ID
T_EXPENSES
EXPENSE_ID | EXPENSE_REF | EXPENSE_DATE | CATEGORY_CODE | DESCRIPTION | PAYEE_PARTY_ID | AMOUNT | CURRENCY | PAYMENT_METHOD_CODE | SOURCE_ACCOUNT_CODE | RELATED_ENTITY_TYPE | RELATED_ENTITY_ID | EVIDENCE_GROUP_ID | APPROVAL_ID | STATUS | REVERSAL_OF_ID | NOTES | POSTED_AT | POSTED_BY | EVENT_ID
T_EXTERNAL_IDS
EXTERNAL_ID_MAP_ID | CANONICAL_ENTITY_TYPE | CANONICAL_ENTITY_ID | EXTERNAL_SYSTEM | EXTERNAL_ENTITY_TYPE | EXTERNAL_ID | STATUS | CREATED_AT | CREATED_BY
T_EVIDENCE
EVIDENCE_ID | EVIDENCE_GROUP_ID | RELATED_ENTITY_TYPE | RELATED_ENTITY_ID | EVIDENCE_TYPE | FILE_URL_OR_SECURE_REF | CAPTURED_AT | CAPTURED_BY | HASH_OR_REFERENCE | NOTES | STATUS | CREATED_AT
T_EVENTS
EVENT_ID | EVENT_TYPE | EVENT_VERSION | SOURCE_SYSTEM | ENTITY_TYPE | ENTITY_ID | CORRELATION_ID | IDEMPOTENCY_KEY | ACTOR_TYPE | ACTOR_ID | OCCURRED_AT | RECORDED_AT | RESULT_STATUS | PAYLOAD_REF
T_EXCEPTIONS
EXCEPTION_ID | EXCEPTION_TYPE | RELATED_ENTITY_TYPE | RELATED_ENTITY_ID | SEVERITY | DETECTED_AT | DETECTED_BY | OWNER_PARTY_ID | RESOLUTION_CODE | RESOLUTION_AT | EVIDENCE_GROUP_ID | NOTES | STATUS | CREATED_AT | UPDATED_AT
T_APPROVALS
APPROVAL_ID | ACTION_TYPE | RELATED_ENTITY_TYPE | RELATED_ENTITY_ID | REQUESTED_BY | REQUESTED_AT | DECISION | DECIDED_BY | DECIDED_AT | REASON | EVIDENCE_GROUP_ID | STATUS
T_EXTERNAL_SYNC
SYNC_ID | ENTITY_TYPE | ENTITY_ID | SYSTEM | DIRECTION | LAST_EVENT_ID | LAST_SUCCESS_AT | ERROR_CODE | STATUS | UPDATED_AT
SYS_META
KEY | VALUE | VALUE_TYPE | SENSITIVITY | UPDATED_AT | UPDATED_BY
SYS_MIGRATION_LOG
MIGRATION_EVENT_ID | SOURCE_FILE | SOURCE_TAB | SOURCE_ROW_REF | ENTITY_TYPE | LEGACY_KEY | CANONICAL_ID | MIGRATION_BATCH_ID | RESULT_STATUS | VARIANCE_CODE | NOTES | MIGRATED_AT | MIGRATED_BY
SYS_RECONCILIATION
CHECK_ID | CHECK_TYPE | SCOPE | EXPECTED_VALUE | ACTUAL_VALUE | VARIANCE | RELATED_ENTITY_TYPE | RELATED_ENTITY_ID | SEVERITY | STATUS | CHECKED_AT | CHECKED_BY
PRIVATE TABLE HEADERS
P_INVESTOR_AGREEMENTS
INVESTOR_AGREEMENT_ID | INVESTOR_PARTY_ID | VERSION_NO | MODEL_CODE | BASIS_TERMS | COMMISSION_TERMS | SPLIT_TERMS | SETTLEMENT_SCHEDULE | EFFECTIVE_FROM | EFFECTIVE_TO | APPROVED_BY | STATUS | CREATED_AT | CREATED_BY
P_INVESTOR_PAYABLES
INVESTOR_PAYABLE_ID | CONSUMPTION_ID | INVESTOR_PARTY_ID | AGREEMENT_ID | CALCULATED_AMOUNT | CURRENCY | DUE_DATE | ADJUSTMENT_CONTEXT | STATUS | POSTED_AT | POSTED_BY | EVENT_ID
P_INVESTOR_REMITTANCES
INVESTOR_REMITTANCE_ID | INVESTOR_PARTY_ID | AMOUNT | CURRENCY | REMITTED_AT | REFERENCE_NO | STATUS | POSTED_AT | POSTED_BY | EVENT_ID
P_INVESTOR_REMITTANCE_ALLOCATIONS
INVESTOR_REMITTANCE_ALLOCATION_ID | REMITTANCE_ID | PAYABLE_ID | AMOUNT_ALLOCATED | POSTED_AT | POSTED_BY | EVENT_ID
P_PRIVATE_RESELLER_TERMS
PRIVATE_RESELLER_TERM_ID | RESELLER_PARTY_ID | AGREEMENT_ID | VERSION_NO | BASIS_TERMS | PRICING_TERMS | MARGIN_TERMS | EXPOSURE_TERMS | EFFECTIVE_FROM | EFFECTIVE_TO | STATUS | CREATED_AT | CREATED_BY
P_PRIVATE_FINANCE_CONFIG
KEY | VALUE | VALUE_TYPE | SENSITIVITY | STATUS | UPDATED_AT | UPDATED_BY
P_EVENTS_PRIVATE
EVENT_ID | EVENT_TYPE | ENTITY_TYPE | ENTITY_ID | CORRELATION_ID | OCCURRED_AT | RECORDED_AT | ACTOR_ID | RESULT_STATUS | PAYLOAD_REF
P_EXCEPTIONS_PRIVATE
EXCEPTION_ID | EXCEPTION_TYPE | RELATED_ENTITY_TYPE | RELATED_ENTITY_ID | SEVERITY | DETECTED_AT | OWNER_PARTY_ID | NOTES | STATUS | RESOLUTION_AT
P_RECONCILIATION
CHECK_ID | CHECK_TYPE | OPERATIONS_ENTITY_ID | PRIVATE_ENTITY_ID | EXPECTED_STATUS | ACTUAL_STATUS | VARIANCE | SEVERITY | STATUS | CHECKED_AT
BS-02 APPROVED — PER-TABLE PERMISSION MATRIX
Legend:
V View
C Create Draft/Intake
E Edit Draft
A Approve
P Post
R Reverse/Adjust
X Admin/Configuration
Owner/Admin:
All Operations tables: V/C/E/A/P/R/X as logically applicable.
Private tables: V/C/E/A/P/R/X.
Operations Staff:
Master data:
T_PARTIES V/C/E
T_PARTY_ROLES V/C/E
T_PRODUCTS V
T_SKUS V
T_LOCATIONS V
Receiving/Inventory:
T_STOCK_RECEIPTS V/C/E
T_STOCK_RECEIPT_LINES V/C/E
T_BATCHES V
T_INVENTORY_MOVEMENTS V only directly; P only through approved system actions
T_STOCK_COMMITMENTS V only directly; create/release through approved system actions
Commerce:
T_ORDERS V/C/E
T_ORDER_LINES V/C/E
T_SALES V
T_SALE_ITEMS V
T_STOCK_CONSUMPTION V
T_PAYMENTS V/C/E evidence/intake only; no verification authority unless explicitly delegated
T_PAYMENT_ALLOCATIONS V
T_RESERVATIONS V/C/E; extensions require Owner/Admin
T_FULFILLMENTS V/C/E routine workflow fields
Returns/Service:
T_RETURNS V/C/E intake
T_RETURN_LINES V/C/E intake
T_REFUNDS V/C/E intake only; A/P Owner/Admin
T_QUOTES V/C/E
T_QUOTE_VERSIONS V/C/E; customer approval evidence capture allowed, commercial override Owner/Admin
T_SERVICE_JOBS V/C/E
T_SERVICE_ACTIONS V/C/E
T_EQUIPMENT_UNITS V routine operational fields only
T_WARRANTY_CASES V/C/E intake
Auction/Reseller:
T_AUCTIONS V
T_AUCTION_ITEMS V
T_BIDS V/C intake through controlled action
T_RESELLER_AGREEMENTS V limited non-sensitive fields
T_RESELLER_RELEASES V/C/E
T_RESELLER_RELEASE_LINES V/C/E
T_RESELLER_REPORTS V/C/E
T_RESELLER_REPORT_LINES V/C/E
T_RESELLER_REMITTANCES V/C/E intake
Ledgers / Expenses / Audit:
T_LOYALTY_LEDGER V
T_STORED_VALUE_ACCOUNTS V
T_STORED_VALUE_LEDGER V
T_EXPENSES V/C/E draft; A/P/R Owner/Admin
T_EXTERNAL_IDS V
T_EVIDENCE V/C/E
T_EVENTS V
T_EXCEPTIONS V/C/E assigned resolution notes/status where authorized
T_APPROVALS V/C request; decision Owner/Admin unless specific delegation
T_EXTERNAL_SYNC V
REF_CONFIG V
SYS_* V where appropriate
Private tables:
NO ACCESS for Operations Staff.
Read-Only/Reporting:
Frontend views + explicitly approved non-sensitive canonical views only.
No Create/Edit/Approve/Post/Reverse/Admin.
No Private access.
Automation/System:
No general spreadsheet editor behavior.
Only service functions with explicit allowlist per table/action.
No interactive access to human-facing files beyond required service identity.
Private writes only through PrivateBridge service identity.
BS-03 APPROVED — REFERENCE NUMBER / COLLISION POLICY
Canonical IDs:
Prefix + ULID.
Generated server-side only.
Uniqueness check before insert.
If collision detected, regenerate; never reuse an existing canonical ID.
Human reference format:
<DOMAIN>-YYYY-######.
Examples:
ORD-2026-000123
SAL-2026-000087
PAY-2026-000451
RET-2026-000014
SVC-2026-000033
Sequence storage:
SYS_META stores per-domain, per-year LAST_SEQUENCE only for human references.
Concurrency control:
Apps Script LockService script lock around sequence read/increment/write.
Lock timeout failure = no reference issued + Exception.
Maximum retry: 3 bounded attempts for transient lock failure.
No fallback to random sequence.
Sequence rules:
• gaps are allowed;
• issued numbers are never reused;
• canonical ID is the true PK;
• sequence resets only by domain/year according to format;
• failed posting after reference issuance does not recycle the reference.
BS-04 APPROVED — APPS SCRIPT DEPLOYMENT ARCHITECTURE
Architecture:
Standalone privileged Apps Script project owned by WHATTHECAP Business account.
Reason:
The Operations workbook is staff-accessible. A container-bound privileged script would expose privileged source/configuration to spreadsheet editors and weakens the confidentiality boundary.
Privileged standalone project responsibilities:
• canonical writes;
• posting;
• approvals;
• Private bridge;
• IDs;
• reconciliation;
• migrations;
• recovery helpers;
• event/exception logging.
Staff interaction:
Use controlled Web App / approved action interface authenticated as the current user or another approved invocation mechanism.
The privileged deployment executes under the approved Business account identity only where required and checks caller/role before action.
No privileged secrets or Private workbook IDs are stored in staff-visible cells.
Optional thin bound UI:
Allowed only if it contains no secrets, no privileged Private logic, and no confidential identifiers. It may only call approved non-secret endpoints. It is not required for V1.
Source control:
GitHub is source-version authority for Apps Script code.
Production deployment must correspond to an identified Git commit/version.
BS-05 APPROVED — MIGRATION STAGING ARCHITECTURE
Create a separate temporary workbook:
WHAT THE CAP — BUSINESS OS — MIGRATION STAGING — V1
Access:
Owner/Admin + authorized migration system only.
Tabs:
MIG_SOURCE_PRODUCTS
MIG_SOURCE_CUSTOMERS
MIG_SOURCE_INVENTORY
MIG_SOURCE_SALES
MIG_SOURCE_SERVICES
MIG_SOURCE_EXPENSES
MIG_SOURCE_OTHER
MIG_ID_MAP
MIG_EXCEPTIONS
MIG_RECONCILIATION
MIG_APPROVAL
Rules:
• no direct copy from legacy into canonical tables;
• staging preserves source row reference;
• each migrated row receives MIGRATION_BATCH_ID;
• unresolved source/owner/quantity conflicts go to MIG_EXCEPTIONS;
• canonical posting happens only after approved mapping/reconciliation;
• staging workbook is not a permanent source of truth.
Reconciliation report:
DOMAIN | LEGACY_COUNT | STAGED_COUNT | MIGRATED_COUNT | EXCEPTION_COUNT | LEGACY_REPORTED_VALUE | REAL_WORLD_VERIFIED_VALUE | NEW_SYSTEM_DERIVED_VALUE | VARIANCE | CLASSIFICATION | OWNER_ACCEPTED | ACCEPTED_AT
BS-06 APPROVED — DEV BACKUP / CHECKPOINT POLICY
During active DEV build:
1. Before every implementation package: verify last known-good checkpoint.
2. Before every high-risk package/migration/private-permission change: create fresh checkpoint.
3. At end of each active build day: create DEV state snapshot if any mutation occurred.
4. After package acceptance: create package acceptance checkpoint.
5. Apps Script source committed to GitHub at each accepted package boundary.
6. No arbitrary retention duration is invented; retention remains governed by deferred policy.
Checkpoint content:
• Operations export/snapshot;
• Private export/snapshot where safe and confidential;
• Apps Script source commit;
• REF_CONFIG snapshot;
• build log;
• package acceptance record;
• reconciliation summary.
A checkpoint is not accepted merely because files exist. Readability and identity-preservation checks are required.
BS-07 APPROVED — PACKAGE EXECUTION / ACCEPTANCE RECORD
Every package uses one standard record:
PACKAGE ID:
PACKAGE NAME:
DATE/TIME START:
EXECUTOR:
AUTHORIZATION REFERENCE:
TARGET FILE/SCRIPT IDs:
BEFORE STATE
• expected current version/state
• last recovery checkpoint
• relevant row/tab/script counts
• permissions state if applicable
AUTHORIZED MUTATIONS
• exact tabs/files/code/modules/configuration to change
• explicitly excluded mutations
EXECUTION LOG
Step | Action | Target | Result | Evidence | Timestamp
TESTS
Test ID | Scenario | Expected | Actual | PASS/FAIL | Evidence
POST-STATE VERIFICATION
• tab/schema state
• formulas/validations/protections
• Apps Script version/commit
• permissions
• reconciliation
• exceptions
VARIANCE / ISSUE CLASSIFICATION
NONE / DEFECT / BUSINESS-RULE QUESTION / SECURITY ISSUE / DATA ISSUE / ARCHITECTURE CONFLICT / THIRD-PARTY ISSUE
ROLLBACK / RECOVERY REFERENCE:
PACKAGE RESULT:
PASS / PASS WITH ACCEPTED EXCEPTION / FAIL / STOPPED
ACCEPTED BY:
ACCEPTED AT:
NEXT AUTHORIZED GATE:
18. BUILD SPECIFICATION DECISION STATUS
BS-01 RESOLVED
BS-02 RESOLVED
BS-03 RESOLVED
BS-04 RESOLVED
BS-05 RESOLVED
BS-06 RESOLVED
BS-07 RESOLVED
All seven decisions are technical implementation decisions within PD-V1.0-FROZEN.
No upstream Business Rule or Physical Design reopening is required by these decisions.
19. CURRENT GATE
Build Specification Draft 3 incorporates QA Pass 1 closures and is ready for QA Pass 2.
Implementation remains NOT AUTHORIZED.
20. QA PASS 1 BLOCKER CLOSURES — APPROVED TECHNICAL DECISIONS
QA-BS-B01 CLOSED — VERIFIED CALLER AUTHENTICATION
Privileged architecture remains:
Standalone Apps Script Web App executes under the deploying WHATTHECAP Business account for privileged canonical writes.
Caller authentication:
• user signs in through Google Identity Services;
• client sends Google ID token / credential to the server endpoint;
• server validates anti-CSRF state/token where applicable;
• server validates token signature, audience, issuer, and expiration;
• server uses verified Google Account subject identifier (sub) as stable caller identity;
• verified email may be stored/displayed as contact metadata but is not the primary actor key;
• caller identity is matched server-side to a protected ROLE_REGISTRY;
• no authorization decision trusts an email/role supplied as plain client input;
• failed/unverifiable identity = DENY + security Exception / log record;
• Owner/Admin actions require server-side Owner/Admin role;
• every privileged action records CALLER_ID, EFFECTIVE_ACTOR_ID, CORRELATION_ID, EVENT_ID.
ROLE_REGISTRY physical home:
Private/privileged configuration, not staff-visible REF_CONFIG.
Minimum:
ACTOR_ID | GOOGLE_SUB | EMAIL_DISPLAY | PARTY_ID | ROLE_CODE | ACTIVE_FLAG | EFFECTIVE_FROM | EFFECTIVE_TO | UPDATED_AT | UPDATED_BY
Security note:
The implementation must be tested under the actual Google account model before Production because Apps Script web-app identity/authorization behavior depends on deployment mode. The system must not fall back to guessed identity.
QA-BS-B02 CLOSED — OPERATIONS↔PRIVATE OUTBOX / INBOX SAGA
Add Operations table:
T_PRIVATE_OUTBOX
OUTBOX_ID | EVENT_ID | CORRELATION_ID | ACTION_TYPE | OPERATIONS_ENTITY_TYPE | OPERATIONS_ENTITY_ID | PRIVATE_TARGET_TYPE | IDEMPOTENCY_KEY | PAYLOAD_REF | STATUS | ATTEMPT_COUNT | NEXT_RETRY_AT | LAST_ERROR_CODE | CREATED_AT | UPDATED_AT
Add Private table:
P_PRIVATE_INBOX
INBOX_ID | IDEMPOTENCY_KEY | EVENT_ID | CORRELATION_ID | ACTION_TYPE | SOURCE_ENTITY_TYPE | SOURCE_ENTITY_ID | RESULT_ENTITY_TYPE | RESULT_ENTITY_ID | STATUS | PROCESSED_AT | ERROR_CODE
Transaction pattern:
1. Canonical Operations transaction posts.
2. Same controlled transaction emits Event + durable T_PRIVATE_OUTBOX row.
3. PrivateBridge selects PENDING outbox item.
4. Private checks IDEMPOTENCY_KEY.
5. If already processed, return existing RESULT_ENTITY_ID.
6. If new, validate required Private dependencies.
7. Write Private canonical result.
8. Write P_PRIVATE_INBOX success record.
9. Mark Operations outbox SUCCESS.
10. On failure, leave retryable state, increment attempt, record error, and create/update Exception.
11. After configured maximum attempts, status TERMINAL_ERROR and require Owner/Admin resolution.
12. Reconciliation detects any Operations Event/outbox without matching Private Inbox result.
Principle:
This is explicit eventual consistency. The design does not pretend two Google Sheets files can provide one database transaction.
Default retry control for DEV:
MAX_ATTEMPTS = 3.
Exact production retry interval remains configuration and may be tuned later without changing architecture.
QA-BS-B03 CLOSED — REQUIRED-AT-CREATE / REQUIRED-AT-POST MATRIX
Legend:
CREATE = minimum fields required to save a draft/intake record.
POST = additional fields/conditions required before authoritative posting/status transition.
STOCK_RECEIPT
CREATE: RECEIPT_ID, SOURCE_PARTY_ID or approved source classification, RECEIVED_DATE, RECEIVED_BY, STATUS.
POST/VERIFY: at least one Receipt Line; actual quantities; condition; source/economic owner as required; variance classified; check status VERIFIED.
BATCH
CREATE: BATCH_ID, SKU_ID, SOURCE_PARTY_ID or approved source classification, ECONOMIC_OWNER_ID, RECEIPT_LINE_ID, RECEIVED_AT, ORIGINAL_QTY, CONDITION_CODE.
POST/AVAILABLE: verified receipt lineage; eligible location; status eligible; no unresolved blocking receipt variance.
INVENTORY_MOVEMENT
CREATE: not directly user-created except controlled draft request.
POST: MOVEMENT_ID, BATCH_ID, SKU_ID, QTY > 0, movement type, reason, source entity, valid from/to locations as applicable, actor, POSTED_AT; FK existence; sufficient source quantity; no forbidden negative ATS.
ORDER
CREATE: ORDER_ID, PARTY_ID or approved guest identity mapping, CHANNEL_CODE, ORDER_DATE, currency, at least one Order Line.
POST/CONFIRM: totals computed, line quantities valid, required delivery/payment choice, order status transition valid; commitment created where business rule requires.
SALE
CREATE: system-only pending recognition context.
POST/RECOGNIZE: SALE_ID, PARTY_ID, channel, recognized timestamp, currency/totals, at least one Sale Item, exact recognition condition satisfied, exact stock consumption possible where inventory item, no duplicate idempotency key.
PAYMENT
CREATE: PAYMENT_ID, PARTY_ID or obligation-linked Party, METHOD_CODE, AMOUNT, CURRENCY, PAYMENT_TIMESTAMP.
POST/VERIFY: VERIFICATION_STATUS=VERIFIED, VERIFIED_AT, VERIFIED_BY, required actual-receipt/reference evidence according to approved method; allocation does not exceed received amount unless explicit excess handling.
RESERVATION
CREATE: RESERVATION_ID, PARTY_ID, required total, start time, expiry time.
POST/ACTIVE: verified qualifying DP/payment allocation, associated active stock commitment, expiry rule valid.
EXTEND: Owner/Admin approval + reason.
FULFILLMENT
CREATE: FULFILLMENT_ID, ORDER_ID, method, status.
POST/SHIPPED: required package/order readiness; courier/tracking/waybill evidence where applicable; active commitment/stock state valid.
POST/DELIVERED: shipped state exists or approved exception; delivered timestamp.
COD delivery does not recognize Sale until COD remittance rule is met.
RETURN
CREATE: RETURN_ID, SALE_ID, PARTY_ID, requested timestamp, request reason.
POST/RECEIVED: physical received timestamp + evidence where required.
POST/INSPECTED: inspection status + condition/disposition.
Return Request alone never posts Refund.
REFUND
CREATE: REFUND_ID, SALE_ID, component amounts, proposed method.
POST: approval, valid return/exception basis, total <= permissible refundable amount under rules, POSTED_AT/BY, payment/reference linkage where applicable.
QUOTE_VERSION
CREATE: QUOTE_VERSION_ID, QUOTE_ID, VERSION_NO, currency, monetary components, created metadata.
POST/ISSUE: calculated TOTAL, EFFECTIVE_AT, VALID_UNTIL when applicable, status ISSUED.
POST/APPROVED: CUSTOMER_APPROVED_AT + evidence/reference to exact version.
Historical version immutable except controlled status metadata.
SERVICE_JOB
CREATE: SERVICE_JOB_ID, PARTY_ID, received time, item description, pre-existing condition, service type.
POST/IN_PROGRESS: approved current quote/scope where required.
POST/READY: work completion/evidence requirements satisfied.
POST/COMPLETED: payment/return conditions satisfied under approved rules.
EXPENSE
CREATE: EXPENSE_ID, EXPENSE_DATE, CATEGORY_CODE, DESCRIPTION, AMOUNT, CURRENCY, PAYMENT_METHOD_CODE.
POST: approval where required, evidence/reference according to policy, source account if required, POSTED_AT/BY.
Correction after posting = reversal/adjustment.
RESELLER_RELEASE
CREATE: RELEASE_ID, RESELLER_PARTY_ID, AGREEMENT_ID.
POST: approved release, lines exist, exact batches/qty valid, movement(s) posted, no over-release/exposure violation.
RESELLER_REPORT
CREATE: REPORT_ID, RESELLER_PARTY_ID, period dates.
POST/VALIDATE: report lines reconcile against accountable release quantities; variances classified; recognized Sale links only for validated sold quantities.
INVESTOR_PAYABLE
CREATE: system/private only from qualifying Stock Consumption event.
POST: investor Party, exact consumption, exact agreement version, calculated amount, due date/rule, idempotency key, Private Inbox lineage, POSTED_AT/BY.
No payable from unsold investor stock.
21. REF_CONFIG NORMALIZATION — APPROVED
REF_CONFIG physical columns:
REF_TYPE | CODE | LABEL | ACTIVE_FLAG | SORT_ORDER | PARAM_VALUE | SENSITIVITY | EFFECTIVE_FROM | EFFECTIVE_TO | UPDATED_AT | UPDATED_BY
Rules:
• one row = one reference/config value;
• CODE unique within REF_TYPE;
• validations filter ACTIVE_FLAG=TRUE;
• historical codes are deactivated, not renamed if already used in posted history;
• SENSITIVITY prevents confidential config from being stored here; confidential finance values remain Private;
• PARAM_VALUE may hold non-sensitive configurable values only.
22. SECURITY / GOOGLE PLATFORM IMPLEMENTATION CHECKPOINT
Before any staff action interface is accepted:
• confirm actual Web App deployment mode;
• confirm verified Google identity flow under the Business account;
• test one Owner/Admin account;
• test one Operations Staff account;
• test one unauthorized Google account;
• verify unauthorized user cannot invoke privileged server actions;
• verify Ops user cannot access Private workbook;
• verify client-supplied actor/email parameters cannot spoof authorization.
If any identity assumption fails:
STOP → do not weaken security → redesign invocation mechanism within frozen confidentiality requirements.
23. BUILD SPEC QA STATUS
QA Pass 1 blockers B01–B03: CLOSED.
Non-blocking REF_CONFIG improvement: INCORPORATED.
Implementation remains NOT AUTHORIZED.
