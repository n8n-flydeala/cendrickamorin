WHATTHECAP PRODUCTION SYSTEM V1
GOOGLE SHEETS PHYSICAL DESIGN — DRAFT 3 — QA DECISIONS INCORPORATED
Date: 2026-10-01
Status: PHYSICAL DESIGN DRAFT 3 — QA PASS 1 DECISIONS INCORPORATED — QA PASS 2 REQUIRED — NOT FROZEN — NO IMPLEMENTATION AUTHORITY
0. PURPOSE / GATE
This document translates the frozen Canonical Logical Data Model into a practical Google Sheets V1 physical design.
This is a design artifact only. It does NOT authorize mutation of the current WHAT THE CAP — BUSINESS OS spreadsheet, Apps Script, n8n, WooCommerce, GHL, or production systems.
Current verified spreadsheet:
Title: WHAT THE CAP — BUSINESS OS
Spreadsheet ID: 1Y-4Qta4242ZkIHv8lXC_pR7QQ-vQ0HKBV-2bSWYd9yE
Timezone: Asia/Manila
Current tabs: DASHBOARD, SALES, INVENTORY, CUSTOMERS, EXPENSES, SERVICES, SETTINGS
1. CURRENT STATE VERIFICATION
Current SALES tab is a simple single-row transaction schema:
Date, Order ID, Customer ID, Customer Name, Customer Type, Contact Number, Location, Product, SKU, Qty, Unit Price, Sales Amount, Payment Method, Payment Status, Shipping Method, Shipping Fee, Order Status, Notes.
Current INVENTORY tab stores summary/balance fields:
SKU, Product, Category, Beginning Stock, Stock In, Units Sold, Current Stock, Unit Cost, Selling Price, wholesale prices, Stock Value, Notes.
Current CUSTOMERS, EXPENSES, SERVICES, SETTINGS are single-table/simple-register structures.
Current DASHBOARD is formula/reporting oriented.
Design conclusion:
The current workbook is useful as a legacy operational prototype but is not sufficient for the approved V1 architecture because it mixes derived balances with source records and lacks exact batch/source/owner/commitment/payment/settlement/event lineage.
RULE:
Do not force the legacy workbook to become the new model by adding random columns. Preserve legacy state, then migrate through a controlled implementation gate.
2. PHYSICAL DESIGN PRINCIPLES
A. Complex backend → simple frontend.
B. Staff-facing views stay limited; canonical backend tables may be hidden/protected.
C. Stable canonical IDs are independent of row number or display label.
D. Human-friendly reference numbers are separate from canonical IDs.
E. Derived balances are rebuildable; no editable balance is canonical truth.
F. Financial/inventory postings use append-only or controlled reversal/adjustment patterns.
G. Normal transactions stay quiet; exceptions surface.
H. No direct cross-system last-write-wins.
I. Sensitive investor economics require a confidentiality boundary stronger than hidden/protected tabs.
3. PROPOSED FILE PARTITION — TO CONFIRM
TECHNICAL IMPLEMENTATION DECISION — RECOMMENDED
A. WHAT THE CAP — BUSINESS OS — OPERATIONS
Staff-operational canonical data, inventory/custody, customer/order/sale/payment/fulfillment/service/auction/exception data as permitted.
B. WHAT THE CAP — BUSINESS OS — PRIVATE
Owner/Admin only.
Investor agreement terms, basis/commission/split formulas, investor payable/remittance, sensitive reseller commercial basis where required, confidential financial controls.
Reason:
Google Sheets protected ranges prevent edits but do not create true confidentiality for users who can view the file. If operational staff must not see investor basis/terms, physical file separation is the safer V1 design.
Operations may store only non-sensitive references such as INVESTOR_ID / ECONOMIC_OWNER_ID / AGREEMENT_ID. Private file resolves confidential economics.
4. CANONICAL ID STANDARD — PROPOSED
Canonical ID:
<PREFIX>-<ULID>
Example: PTY-01K6M...
Generated only by Apps Script / controlled system writer.
Human-facing reference:
<DOMAIN>-YYYY-###### 
Example: ORD-2026-000123, SAL-2026-000087, RET-2026-000014.
Canonical IDs never change.
Human-facing numbers may be sequential for usability but are not primary keys.
Core prefixes:
PTY Party
PRD Product
SKU SKU
BAT Batch
LOC Location/Custody Node
RCV Receipt
RCVL Receipt Line
MOV Inventory Movement
COM Stock Commitment
ORD Order
ORL Order Line
SAL Sale
SLI Sale Item
CON Stock Consumption
PAY Payment
PAL Payment Allocation
RSV Reservation
FUL Fulfillment/Shipment
RET Return Case
RFD Refund
AGR Agreement
IPY Investor Payable
IRM Investor Remittance
RAG Reseller Agreement
RRL Reseller Release
RRP Reseller Report
RRM Reseller Remittance
SVC Service Job
SVA Service Action
EQP Equipment Unit
WAR Warranty Case
AUC Auction
BID Bid
LOY Loyalty Ledger Entry
SVA Stored Value Account
SVL Stored Value Ledger Entry
EXT External ID Mapping
EVT Event
EXC Exception
APR Approval
EVD Evidence Reference
5. PHYSICAL TABLE MAP — OPERATIONS FILE
Visible daily-operation tabs should be few. Backend canonical tabs may be hidden from normal staff navigation but are not relied on for confidentiality.
FRONTEND / VIEW TABS
00_HOME
Purpose: navigation, role-aware links, current alerts.
Writer: system only except approved controls.
01_TODAY
Purpose: actionable work queue — orders, payments, fulfillment, reservations, service jobs, exceptions.
Source: views only.
02_SALES_VIEW
Purpose: human-friendly Sale / Order / Payment status view.
Source: canonical backend tables.
03_INVENTORY_VIEW
Purpose: ATS by SKU/allocation, low-stock, committed/reserved/unavailable, batch drill-down.
Source: movements + commitments + batches.
04_CUSTOMER_VIEW
Purpose: customer relationship summary, recent orders/services/loyalty.
Source: Party/Customer + transaction views.
05_EXCEPTIONS
Purpose: Needs Attention queue.
Authoritative table: T_EXCEPTIONS.
CANONICAL BACKEND TABS
T_PARTIES
PK PARTY_ID
Fields: PARTY_ID, PARTY_TYPE(Person/Organization), DISPLAY_NAME, LEGAL_NAME, PRIMARY_PHONE, PRIMARY_EMAIL, ADDRESS_TEXT, CITY, PROVINCE, COUNTRY, STATUS, CREATED_AT, CREATED_BY, UPDATED_AT, UPDATED_BY.
T_PARTY_ROLES
PK PARTY_ROLE_ID
FK PARTY_ID
Fields: ROLE_TYPE(Customer/Investor/Reseller/Supplier/Staff/Other), ROLE_STATUS, START_DATE, END_DATE, NOTES.
T_PRODUCTS
PK PRODUCT_ID
Fields: PRODUCT_NAME, BRAND, CATEGORY_CODE, COLLECTION_CONTEXT, STATUS, DESCRIPTION.
T_SKUS
PK SKU_ID
FK PRODUCT_ID
Fields: SKU_CODE, VARIANT_NAME, SIZE, COLOR, BARCODE, DEFAULT_RETAIL_PRICE, ACTIVE_FLAG.
T_LOCATIONS
PK LOCATION_ID
Fields: LOCATION_CODE, LOCATION_NAME, LOCATION_TYPE, IS_SELLABLE, IS_PHYSICAL, STATUS.
Examples: WTC_MAIN, RETAIL, WHOLESALE, AUCTION, RESELLER_HELD, COURIER_TRANSIT, RETURN_INSPECTION, DAMAGED, LOST.
T_STOCK_RECEIPTS
PK RECEIPT_ID
Fields: RECEIPT_REF, SOURCE_PARTY_ID, RECEIVED_DATE, RECEIVED_BY, EXPECTED_STATUS, CHECK_STATUS, REFERENCE_TEXT, EVIDENCE_GROUP_ID, STATUS, CREATED_AT.
T_STOCK_RECEIPT_LINES
PK RECEIPT_LINE_ID
FK RECEIPT_ID, SKU_ID
Fields: EXPECTED_QTY, ACTUAL_QTY, CONDITION_CODE, UNIT_COST_OR_BASIS_VISIBLE_IF_ALLOWED, ECONOMIC_OWNER_ID, AGREEMENT_REF_ID, VARIANCE_QTY, VARIANCE_STATUS, BATCH_ID.
T_BATCHES
PK BATCH_ID
FK SKU_ID
Fields: SOURCE_PARTY_ID, ECONOMIC_OWNER_ID, RECEIPT_LINE_ID, RECEIVED_AT, ORIGINAL_QTY, CONDITION_CODE, AGREEMENT_REF_ID, STATUS.
T_INVENTORY_MOVEMENTS
PK MOVEMENT_ID
FK BATCH_ID, SKU_ID, FROM_LOCATION_ID, TO_LOCATION_ID
Fields: QTY, MOVEMENT_TYPE, BUSINESS_REASON_CODE, SOURCE_ENTITY_TYPE, SOURCE_ENTITY_ID, POSTED_AT, POSTED_BY, APPROVAL_ID, REVERSAL_OF_ID, NOTES.
Rule: append-only posting; corrections use reversal/adjustment.
T_STOCK_COMMITMENTS
PK COMMITMENT_ID
FK SKU_ID, BATCH_ID(optional until exact allocation), LOCATION_ID
Fields: COMMITMENT_TYPE(Reservation/COD/Auction/Reseller/Other), SOURCE_ENTITY_TYPE, SOURCE_ENTITY_ID, QTY, START_AT, EXPIRES_AT, STATUS, RELEASED_AT, RELEASE_REASON.
T_ORDERS
PK ORDER_ID
Fields: ORDER_REF, PARTY_ID, CHANNEL_CODE, EXTERNAL_ORDER_ID, ORDER_DATE, ORDER_STATUS, FINANCIAL_STATUS, FULFILLMENT_STATUS, CURRENCY, SUBTOTAL, DISCOUNT_TOTAL, SHIPPING_TOTAL, OTHER_TOTAL, ORDER_TOTAL, SOURCE_SYSTEM, CREATED_AT.
Purpose: pre-Sale commercial/order obligation. Woo order ≠ canonical Sale.
T_ORDER_LINES
PK ORDER_LINE_ID
FK ORDER_ID, SKU_ID
Fields: QTY, UNIT_PRICE, BASE_PRICE, DISCOUNT_TYPE, DISCOUNT_AMOUNT, LINE_TOTAL, PROMO_CODE, NOTES.
T_SALES
PK SALE_ID
Fields: SALE_REF, ORDER_ID(optional), PARTY_ID, CHANNEL_CODE, RECOGNIZED_AT, CURRENCY, PRODUCT_TOTAL, SHIPPING_TOTAL, DISCOUNT_TOTAL, OTHER_TOTAL, SALE_TOTAL, FINANCIAL_STATUS, OPERATIONAL_STATUS, STATUS.
Rule: recognized only by approved domain rule.
T_SALE_ITEMS
PK SALE_ITEM_ID
FK SALE_ID, SKU_ID
Fields: QTY, BASE_UNIT_PRICE, DISCOUNT_AMOUNT, FINAL_UNIT_PRICE, LINE_TOTAL.
T_STOCK_CONSUMPTION
PK CONSUMPTION_ID
FK SALE_ITEM_ID, BATCH_ID
Fields: QTY_CONSUMED, ECONOMIC_OWNER_ID, AGREEMENT_REF_ID, LOCATION_ID, POSTED_AT.
Purpose: exact source/owner lineage for every sold unit.
T_PAYMENTS
PK PAYMENT_ID
Fields: PAYMENT_REF, PARTY_ID, METHOD_CODE, RECEIVING_ACCOUNT_CODE, AMOUNT, CURRENCY, PAYMENT_TIMESTAMP, REFERENCE_NO, EVIDENCE_GROUP_ID, VERIFICATION_STATUS, VERIFIED_AT, VERIFIED_BY, STATUS.
T_PAYMENT_ALLOCATIONS
PK PAYMENT_ALLOCATION_ID
FK PAYMENT_ID
Fields: OBLIGATION_TYPE, OBLIGATION_ID, AMOUNT_ALLOCATED, POSTED_AT, REVERSAL_OF_ID.
T_RESERVATIONS
PK RESERVATION_ID
Fields: RESERVATION_REF, PARTY_ID, ORDER_ID(optional), REQUIRED_TOTAL, VERIFIED_DP_AMOUNT, START_AT, EXPIRES_AT, STATUS, EXTENDED_AT, EXTENDED_BY, EXTENSION_REASON.
Stock is held via T_STOCK_COMMITMENTS.
T_FULFILLMENTS
PK FULFILLMENT_ID
Fields: FULFILLMENT_REF, ORDER_ID, SALE_ID(optional), METHOD_CODE, COURIER_CODE, TRACKING_NO, WAYBILL_EVIDENCE_GROUP_ID, PREPARING_AT, SHIPPED_AT, DELIVERED_AT, RTS_AT, LOST_AT, STATUS, FAILURE_CAUSE_CODE, SHIPPING_COST_CUSTOMER, SHIPPING_COST_BUSINESS.
Purpose: shipping/waybill/RTS/lost/replacement operational truth.
T_RETURNS
PK RETURN_ID
Fields: RETURN_REF, SALE_ID, PARTY_ID, REQUESTED_AT, REQUEST_REASON_CODE, APPROVAL_STATUS, RECEIVED_AT, INSPECTION_STATUS, DISPOSITION_CODE, RESOLUTION_TYPE, STATUS, EVIDENCE_GROUP_ID.
T_RETURN_LINES
PK RETURN_LINE_ID
Fields: RETURN_ID, SALE_ITEM_ID, QTY_REQUESTED, QTY_RECEIVED, CONDITION_CODE, DISPOSITION_CODE.
T_REFUNDS
PK REFUND_ID
Fields: REFUND_REF, SALE_ID, RETURN_ID(optional), PAYMENT_ID(optional), APPROVED_BY, APPROVED_AT, PRODUCT_COMPONENT, OUTBOUND_SHIPPING_COMPONENT, RETURN_SHIPPING_COMPONENT, OTHER_COMPONENT, TOTAL_REFUND, METHOD_CODE, STATUS, REFERENCE_NO.
T_SERVICE_JOBS
PK SERVICE_JOB_ID
Fields: SERVICE_REF, PARTY_ID, RECEIVED_AT, ITEM_DESCRIPTION, BRAND, MODEL, COLOR, MATERIAL, PRE_EXISTING_CONDITION, SERVICE_TYPE_CODE, QUOTE_TOTAL, APPROVAL_STATUS, PAYMENT_STATUS, JOB_STATUS, READY_AT, RETURNED_AT, COMPLETED_AT, EVIDENCE_GROUP_ID.
T_SERVICE_ACTIONS
PK SERVICE_ACTION_ID
Fields: SERVICE_JOB_ID, ACTION_TYPE, DESCRIPTION, QUOTE_VERSION, PRICE_DELTA, APPROVED_BY_CUSTOMER_AT, STARTED_AT, COMPLETED_AT, STAFF_ID, EVIDENCE_GROUP_ID.
T_EQUIPMENT_UNITS
PK EQUIPMENT_UNIT_ID
Fields: SKU_ID, SERIAL_NO, BATCH_ID, UNIT_STATUS, SALE_ID(optional), DELIVERED_AT, WARRANTY_START_AT, WARRANTY_END_AT, CURRENT_PARTY_ID.
T_WARRANTY_CASES
PK WARRANTY_CASE_ID
Fields: EQUIPMENT_UNIT_ID, SALE_ID, REPORTED_AT, ISSUE_TYPE, EVIDENCE_GROUP_ID, TRIAGE_STATUS, COVERAGE_DECISION, RESOLUTION_TYPE, STATUS.
T_AUCTIONS
PK AUCTION_ID
Fields: AUCTION_REF, START_AT, CLOSE_AT, STATUS, STARTING_BID, MIN_INCREMENT, RESERVE_AMOUNT(optional), PAYMENT_DEADLINE_HOURS(default 24), SHIPPING_TERMS, CREATED_BY.
T_AUCTION_ITEMS
PK AUCTION_ITEM_ID
Fields: AUCTION_ID, SKU_ID, BATCH_ID, QTY, CONDITION_CODE, EVIDENCE_GROUP_ID, COMMITMENT_ID.
T_BIDS
PK BID_ID
Fields: AUCTION_ID, PARTY_ID, AMOUNT, BID_AT, SOURCE, VALIDITY_STATUS, INVALID_REASON, IS_HIGHEST_AT_CLOSE.
Append-only.
T_RESELLER_AGREEMENTS
PK RESELLER_AGREEMENT_ID
Fields: RESELLER_PARTY_ID, VERSION_NO, MODEL_CODE, TIER_CODE, REPORTING_CADENCE, REMITTANCE_RULE, EXPOSURE_LIMIT, EFFECTIVE_FROM, EFFECTIVE_TO, STATUS.
T_RESELLER_RELEASES
PK RESELLER_RELEASE_ID
Fields: RESELLER_PARTY_ID, AGREEMENT_ID, RELEASED_AT, STATUS, APPROVED_BY.
T_RESELLER_RELEASE_LINES
PK RELEASE_LINE_ID
Fields: RELEASE_ID, SKU_ID, BATCH_ID, QTY, FROM_LOCATION_ID, TO_LOCATION_ID, MOVEMENT_ID.
T_RESELLER_REPORTS
PK RESELLER_REPORT_ID
Fields: RESELLER_PARTY_ID, PERIOD_START, PERIOD_END, REPORTED_AT, VALIDATION_STATUS, STATUS.
T_RESELLER_REPORT_LINES
PK REPORT_LINE_ID
Fields: REPORT_ID, RELEASE_LINE_ID, SKU_ID, BATCH_ID, QTY_SOLD, QTY_REMAINING, QTY_DAMAGED_LOST, VALIDATION_RESULT, RECOGNIZED_SALE_ID(optional).
T_RESELLER_REMITTANCES
PK RESELLER_REMITTANCE_ID
Fields: RESELLER_PARTY_ID, AGREEMENT_ID, AMOUNT, RECEIVED_AT, METHOD_CODE, PAYMENT_ID(optional), STATUS.
T_LOYALTY_LEDGER
PK LOYALTY_ENTRY_ID
Fields: PARTY_ID, EVENT_TYPE(Earn/Redeem/Expire/Adjust/Reverse), POINTS_DELTA, SOURCE_ENTITY_TYPE, SOURCE_ENTITY_ID, POSTED_AT, APPROVAL_ID, REVERSAL_OF_ID.
T_STORED_VALUE_ACCOUNTS
PK STORED_VALUE_ACCOUNT_ID
Fields: PARTY_ID(optional), VALUE_TYPE(GiftCard/StoreCredit), CODE_HASH_OR_REF, ISSUED_AT, STATUS, EXPIRY_AT(optional).
T_STORED_VALUE_LEDGER
PK STORED_VALUE_ENTRY_ID
Fields: ACCOUNT_ID, EVENT_TYPE(Issue/Redeem/Restore/Expire/Adjust/Reverse), AMOUNT_DELTA, SOURCE_ENTITY_TYPE, SOURCE_ENTITY_ID, POSTED_AT, APPROVAL_ID.
T_EXTERNAL_IDS
PK EXTERNAL_ID_MAP_ID
Fields: CANONICAL_ENTITY_TYPE, CANONICAL_ENTITY_ID, EXTERNAL_SYSTEM, EXTERNAL_ENTITY_TYPE, EXTERNAL_ID, STATUS, CREATED_AT.
T_EVIDENCE
PK EVIDENCE_ID
Fields: EVIDENCE_GROUP_ID, RELATED_ENTITY_TYPE, RELATED_ENTITY_ID, EVIDENCE_TYPE, FILE_URL_OR_SECURE_REF, CAPTURED_AT, CAPTURED_BY, HASH_OR_REFERENCE(optional), NOTES.
Rule: do not store secrets in evidence links/notes.
T_EVENTS
PK EVENT_ID
Fields: EVENT_TYPE, EVENT_VERSION, SOURCE_SYSTEM, ENTITY_TYPE, ENTITY_ID, CORRELATION_ID, OCCURRED_AT, RECORDED_AT, ACTOR_TYPE, ACTOR_ID, IDEMPOTENCY_KEY, RESULT_STATUS, PAYLOAD_REF(optional).
T_EXCEPTIONS
PK EXCEPTION_ID
Fields: EXCEPTION_TYPE, RELATED_ENTITY_TYPE, RELATED_ENTITY_ID, SEVERITY, DETECTED_AT, DETECTED_BY, STATUS, OWNER_PARTY_ID, RESOLUTION_CODE, RESOLUTION_AT, EVIDENCE_GROUP_ID, NOTES.
T_APPROVALS
PK APPROVAL_ID
Fields: ACTION_TYPE, RELATED_ENTITY_TYPE, RELATED_ENTITY_ID, REQUESTED_BY, REQUESTED_AT, DECISION, DECIDED_BY, DECIDED_AT, REASON, EVIDENCE_GROUP_ID.
T_EXTERNAL_SYNC
Optional V1 implementation table for integration status.
Fields: SYNC_ID, ENTITY_TYPE, ENTITY_ID, SYSTEM, DIRECTION, LAST_EVENT_ID, LAST_SUCCESS_AT, STATUS, ERROR_CODE.
REF_CONFIG
Canonical operational reference/config registry.
Sections/named tables:
REF_CHANNELS
REF_PAYMENT_METHODS
REF_PAYMENT_STATUS
REF_ORDER_STATUS
REF_FINANCIAL_STATUS
REF_FULFILLMENT_STATUS
REF_MOVEMENT_TYPES
REF_MOVEMENT_REASONS
REF_RETURN_REASONS
REF_DISPOSITIONS
REF_SERVICE_TYPES
REF_LOCATION_TYPES
REF_EXCEPTION_TYPES
REF_APPROVAL_ACTIONS
REF_ROLES
REF_COURIERS
REF_SOURCE_SYSTEMS
REF_CURRENCIES
REF_THRESHOLDS
Rule: only approved Owner/Admin changes to controlled reference values.
6. PRIVATE FILE TABLE MAP — TO CONFIRM
P_INVESTOR_AGREEMENTS
PK INVESTOR_AGREEMENT_ID
Fields: INVESTOR_PARTY_ID, VERSION_NO, MODEL_CODE, BASIS/COMMISSION/SPLIT_TERMS, EFFECTIVE_FROM, EFFECTIVE_TO, SETTLEMENT_SCHEDULE, STATUS, APPROVED_BY.
P_INVESTOR_PAYABLES
PK INVESTOR_PAYABLE_ID
Fields: SALE_ITEM_SOURCE/CONSUMPTION_ID, INVESTOR_PARTY_ID, AGREEMENT_ID, CALCULATED_AMOUNT, DUE_DATE, STATUS, ADJUSTMENT_CONTEXT.
P_INVESTOR_REMITTANCES
PK INVESTOR_REMITTANCE_ID
Fields: INVESTOR_PARTY_ID, AMOUNT, REMITTED_AT, REFERENCE_NO, STATUS.
P_INVESTOR_REMITTANCE_ALLOCATIONS
Fields: REMITTANCE_ID, PAYABLE_ID, AMOUNT_ALLOCATED.
P_PRIVATE_RESELLER_TERMS (only if reseller basis/terms are considered sensitive enough to segregate)
P_PRIVATE_FINANCE_CONFIG
Owner/Admin only.
7. FORMULA RESPONSIBILITIES
Allowed formulas:
• display-only totals
• read-only derived views
• non-posting dashboard calculations
• reconciliation checks
• ATS calculation from authoritative movements/commitments
• outstanding = posted obligation − posted allocations/remittances
• age / SLA / due-date flags
Not allowed as authoritative source:
• manually typed Current Stock
• manually typed Investor Payable balance
• manually typed Loyalty balance
• manually typed Store Credit balance
• formula whose result is later overwritten to “make it match”
8. APPS SCRIPT RESPONSIBILITIES — PROPOSED
Apps Script should own controlled operations where formulas/user edits are unsafe:
• generate canonical IDs / reference numbers
• validate required references / status transitions
• post inventory movements
• create/release stock commitments
• allocate exact batch/source at Sale recognition
• verify no negative stock / last-unit conflict
• post payment allocations
• create adjustment/reversal records
• append Event Log
• create Exception records on invalid state
• enforce controlled status transitions
• lock posted records from casual edits
• create approval requests
• perform private-file investor calculation/write under Owner/Admin execution
• export/version recovery snapshots where approved
Apps Script must NOT:
• invent business rules
• auto-resolve ambiguous financial/inventory conflicts
• silently delete posted history
• write secrets to sheet cells
• mark payment verified from screenshots without approved authority
9. WRITE AUTHORITY MODEL — DRAFT
OWNER/ADMIN
Can approve sensitive corrections, refunds, investor/reseller terms, discretionary discounts, stored-value adjustments, high-risk overrides.
STAFF/OPS
Can perform receiving intake/counts, customer/order/service intake, evidence capture, routine fulfillment/status steps, approved allocation movements, reseller reporting intake according to permission.
AUTOMATION
May write only deterministic, validated, explicitly authorized states. Every critical automation write requires Event ID/idempotency and post-write verification.
CUSTOMER/RESELLER/INVESTOR
No direct edit to canonical backend. Only controlled form/portal/API views/actions where later approved.
10. VALIDATION / INTEGRITY RULES
• Primary ID required and unique.
• Foreign key must exist before posting.
• Posted records cannot be hard-deleted.
• Date/time stored as real timestamp; timezone Asia/Manila.
• Money stored as numeric amount + currency code.
• Quantities numeric; no intentional negative ATS.
• Status values must come from REF_CONFIG.
• Sale Item cannot consume more quantity than available eligible source.
• Refund cannot exceed verified received amount except separate goodwill event.
• Investor payable only from exact recognized investor-owned stock consumption.
• Reseller sale report cannot exceed released/remaining accountable quantity.
• Auction winner payment does not become Sale until verified full payment.
• Customer-owned Service Job items cannot enter sellable inventory.
• Return restock requires physical receipt + inspection.
• COD Delivered does not equal financially SOLD; courier remittance confirmation governs COD Sale recognition.
11. MIGRATION / LEGACY PLAN — DRAFT
Before any implementation:
1. Create read-only recovery snapshot/export of current workbook.
2. Preserve current tabs as LEGACY source; do not overwrite them.
3. Map legacy customers/products/SKUs/starting inventory to canonical IDs.
4. Starting inventory must be converted into opening-balance/verified receiving or controlled opening-stock events with explicit migration reference.
5. Do not treat legacy Current Stock as unquestioned truth without count/source review.
6. Migrate only confirmed data.
7. Record migration batch/event IDs.
8. Reconcile old reported balances vs new derived balances and classify variances.
9. Owner accepts migration reconciliation before cutover.
12. RECOVERY DESIGN
Minimum V1:
• daily/controlled snapshot/export of canonical Sheets where practical
• Apps Script source in GitHub
• versioned configuration/reference exports
• no secrets in GitHub
• restore procedure preserves IDs
• restoration test before Production acceptance
• reconciliation report after restore
• ability to pause automations during restore
• known-good checkpoint before high-risk deployment
13. FRONTEND / STAFF SIMPLICITY
Normal staff should primarily use:
00_HOME
01_TODAY
03_INVENTORY_VIEW
approved intake/action forms or controlled buttons
Backend T_* tabs are implementation/storage layers, not normal staff workflow.
14. CONTROLLED LOGICAL MODEL AMENDMENT — APPROVED
The Business Owner approved a controlled logical-model amendment adding four explicit canonical structures already implied by approved business rules:
A. ORDER / ORDER LINE — needed because Woo Order Created ≠ Sale and COD confirmation/commitment exists before financial Sale.
B. FULFILLMENT / SHIPMENT — needed for Preparing/Shipped/Delivered/RTS/Lost/tracking/waybill/replacement lineage.
C. EVIDENCE REFERENCE — needed across payment verification, receiving, shipping, returns, Cap Care, warranty, auction disputes and approvals.
D. STOCK RECEIPT / RECEIPT LINE — needed to represent EXPECTED → PENDING CHECK → VERIFIED RECEIVED and expected-vs-actual receiving without overloading Batch.
Classification:
APPROVED CONTROLLED AMENDMENT. These do not invent new business rules. They are explicit canonical representations of already-approved processes. The Logical Model remains FROZEN as amended by AN-LDM-001 through AN-LDM-004.
15. PHYSICAL DESIGN DECISION LOCK — APPROVED 2026-10-01
PD-01 APPROVED — Operations + Private partition.
PD-02 APPROVED — Prefix + ULID canonical IDs + separate human-readable refs.
PD-03 APPROVED — ORDER/ORDER LINE, FULFILLMENT, EVIDENCE_REFERENCE, STOCK_RECEIPT/STOCK_RECEIPT_LINE controlled amendment.
PD-04 APPROVED — Reseller operational/private hybrid partition.
PD-05 APPROVED — Owner/Admin + Operations Staff + Read-Only/Reporting + Automation/System permission architecture.
PD-06 DEFERRED — Exact retention durations. Preserve posted financial/inventory/settlement/audit history; legal/accounting periods TO CONFIRM.
PD-07 APPROVED — Controlled opening-stock migration with count/source-owner review, opening event, reconciliation, Owner acceptance.
PD-08 APPROVED PRINCIPLE — Dashboard is a rebuildable read-only VIEW; exact KPI set/layout deferred.
16. CURRENT GATE STATUS
Business Rules: RECONCILED
Whimsical: RECONCILED
Bootstrap: RECONCILED
Canonical Logical Data Model: FROZEN
Recovery checkpoint V0.6: VERIFIED
Physical Design: DRAFT 3 — QA PASS 1 DECISIONS INCORPORATED — QA PASS 2 REQUIRED — NOT FROZEN
Google Sheets implementation: NOT STARTED
Implementation authorization: NOT GRANTED
NEXT:
Run Physical Design QA Pass 2 against Draft 3. If no build-blocking gaps remain → issue Physical Design Freeze Candidate → owner freeze approval → Build Specification → explicit implementation authorization.
17. DECISION INCORPORATION NOTES
PD-01: The recommended two-file partition is now an approved Physical Design decision. Sensitive investor economics must not be stored in the staff-accessible Operations file.
PD-02: All canonical tables must use generated stable Prefix+ULID IDs. Human reference numbers are secondary identifiers only.
PD-03: T_ORDERS/T_ORDER_LINES, T_FULFILLMENTS, T_EVIDENCE, T_STOCK_RECEIPTS/T_STOCK_RECEIPT_LINES are no longer provisional candidates; they are approved model structures.
PD-04: Reseller operations remain visible only to the extent needed for workflow; sensitive negotiated economics may be resolved from Private.
PD-05: Physical implementation must create a permission matrix per table/action, not rely only on spreadsheet Editor/Viewer.
PD-06: Exact retention remains intentionally unresolved; no arbitrary duration may be coded.
PD-07: Legacy balances require migration evidence and reconciliation, not direct copying.
PD-08: Dashboard is downstream/read-only and may be rebuilt from canonical records.
18. IMPLEMENTATION HOLD
No Google Sheets schema creation, tab creation, migration, Apps Script coding, integration, permission mutation, or Production change is authorized by Draft 2.

19. QA PASS 1 DECISIONS INCORPORATED

19.1 T_QUOTES
PK QUOTE_ID
Fields:
QUOTE_ID, QUOTE_REF, QUOTE_TYPE, PARTY_ID, RELATED_ENTITY_TYPE, RELATED_ENTITY_ID, STATUS, CURRENT_VERSION_ID, CREATED_AT, CREATED_BY, UPDATED_AT, UPDATED_BY.
Purpose:
Stable commercial quote identity across Cap Care, Equipment, and future approved quoted transactions.

19.2 T_QUOTE_VERSIONS
PK QUOTE_VERSION_ID
FK QUOTE_ID
Fields:
QUOTE_VERSION_ID, QUOTE_ID, VERSION_NO, EFFECTIVE_AT, VALID_UNTIL, SUBTOTAL, DISCOUNT_TOTAL, SHIPPING_TOTAL, OTHER_TOTAL, TOTAL, CURRENCY, TERMS_REF, WARRANTY_TERMS_REF, CREATED_AT, CREATED_BY, CUSTOMER_APPROVED_AT, CUSTOMER_APPROVED_EVIDENCE_GROUP_ID, SUPERSEDES_VERSION_ID, STATUS.
Rules:
• Quote versions are append-only historical versions.
• Approved historical version is not overwritten by a later version.
• Cap Care scope change may create a new version.
• Equipment quote default validity remains 7 calendar days unless explicitly stated otherwise.
• Quote approval does not itself equal payment or Sale.

19.3 T_EXPENSES
PK EXPENSE_ID
Fields:
EXPENSE_ID, EXPENSE_REF, EXPENSE_DATE, CATEGORY_CODE, DESCRIPTION, PAYEE_PARTY_ID(optional), AMOUNT, CURRENCY, PAYMENT_METHOD_CODE, SOURCE_ACCOUNT_CODE(optional), RELATED_ENTITY_TYPE(optional), RELATED_ENTITY_ID(optional), EVIDENCE_GROUP_ID(optional), APPROVAL_ID(optional), STATUS, POSTED_AT, POSTED_BY, REVERSAL_OF_ID(optional), NOTES.
Rules:
• Expense is distinct from money received.
• Posted expenses are corrected by reversal/adjustment, not silent overwrite.
• Expense category must come from REF_CONFIG.
• Exact tax/accounting treatment remains TO CONFIRM.
• Exact cash reconciliation cadence remains TO CONFIRM.

19.4 OPERATIONS ↔ PRIVATE CROSS-FILE CONTRACT
Operations file may contain:
• canonical entity IDs;
• Party/Investor/Reseller IDs;
• Agreement ID references;
• non-sensitive workflow statuses;
• non-sensitive hold/review flags;
• non-sensitive settlement completion indicators where operationally necessary;
• Exception IDs and Event IDs.

Private file contains:
• investor agreement versions and confidential economics;
• basis/commission/split logic;
• investor payable calculations;
• investor remittance allocation detail;
• sensitive reseller negotiated pricing/basis/exposure terms where designated confidential;
• owner-only finance configuration.

PROHIBITED MIRRORS INTO OPERATIONS:
• investor cost/basis;
• investor commission/split percentages or formulas;
• investor payable amounts/details unless Owner explicitly approves a specific safe management view unavailable to ordinary staff;
• confidential reseller negotiated basis/margin;
• owner-only finance configuration;
• secrets, API keys, tokens, credentials.

JOIN CONTRACT:
Canonical IDs only. No row-number joins.

AUTHORIZED WRITER:
Owner/Admin-controlled Apps Script or separately approved Owner/Admin system identity.

FAILURE MODE:
If Private is unavailable or a sensitive dependency cannot be resolved:
1. do not guess;
2. do not post incomplete financial settlement;
3. create Exception / Queue item;
4. preserve source event/correlation ID;
5. alert Owner/Admin;
6. retry only under safe bounded policy;
7. reconcile before marking success.

CONFIDENTIALITY RULE:
No staff-visible IMPORTRANGE or formula may pull confidential economics from Private into Operations.

RECONCILIATION:
Cross-file reconciliation checks:
• missing canonical IDs;
• orphan private rows;
• duplicate payable/remittance postings;
• stale operational indicator;
• failed Event IDs;
• mismatched agreement version;
• incomplete reversal/adjustment chain.

19.5 LOGICAL MODEL STATUS
Frozen as amended by:
• AN-LDM-001 ORDER / ORDER LINE
• AN-LDM-002 FULFILLMENT / SHIPMENT
• AN-LDM-003 EVIDENCE_REFERENCE
• AN-LDM-004 STOCK_RECEIPT / STOCK_RECEIPT_LINE
• AP-LDM-001 QUOTE
• AP-LDM-002 QUOTE_VERSION
• AP-LDM-003 EXPENSE

20. QA PASS 2 ENTRY CRITERIA
Draft 3 is ready for QA Pass 2 only if:
• PD-01 through PD-08 are incorporated;
• QA-D01 through QA-D03 are incorporated;
• confidentiality contract is explicit;
• quote history cannot be overwritten;
• expense scope is explicit;
• no implementation mutation has occurred.

21. IMPLEMENTATION HOLD
This Draft 3 is still a design document.
No tab creation, schema migration, Apps Script coding, permissions mutation, Woo/GHL/n8n integration, or production change is authorized.
