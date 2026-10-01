WHATTHECAP PRODUCTION SYSTEM V1
PHYSICAL DESIGN QA PASS 1
Date: 2026-10-01
Basis: Google Sheets Physical Design Draft 2 + approved Business Rule Register + Logical Model Amendment AN-LDM-001 through AN-LDM-004
Status: QA PASS WITH BLOCKING DESIGN GAPS — DO NOT FREEZE YET — NO IMPLEMENTATION AUTHORITY

1. QA SCOPE
Reviewed Draft 2 for:
• source-of-truth consistency
• frozen/amended logical-model coverage
• confidentiality
• exact inventory/source lineage
• order/payment/sale separation
• fulfillment/returns
• investor/reseller settlement
• service/equipment/auction/loyalty coverage
• permissions/posting authority
• recovery/migration
• staff simplicity
• buildability in Google Sheets

2. PASS FINDINGS

QA-P1-01 — SOURCE-OF-TRUTH MODEL — PASS
Draft 2 correctly keeps Business OS as canonical operational authority and treats dashboard/views as rebuildable outputs.

QA-P1-02 — OPERATIONS / PRIVATE CONFIDENTIALITY PARTITION — PASS
Approved two-file design satisfies the requirement that investor-sensitive commercial information must be genuinely inaccessible to ordinary operational staff, provided implementation does not mirror sensitive fields back into Operations.

QA-P1-03 — INVENTORY LINEAGE — PASS
SKU → Receipt/Receipt Line → Batch → Location/Custody → Commitment → Movement → Sale Item Consumption is structurally represented.
Negative stock and silent corrections are prohibited.

QA-P1-04 — ORDER / SALE / PAYMENT SEPARATION — PASS
ORDER/ORDER LINE, PAYMENT/PAYMENT ALLOCATION, SALE/SALE ITEM and Stock Consumption are separated correctly.
This supports Woo Order ≠ Sale and COD remittance-based Sale recognition.

QA-P1-05 — FULFILLMENT / RETURN / REFUND SEPARATION — PASS
FULFILLMENT, RETURN and REFUND have distinct canonical homes and preserve operational vs financial state.

QA-P1-06 — INVESTOR / RESELLER TRACEABILITY — PASS
Private investor ledgers and Operations reseller custody/reporting structures preserve lineage without requiring staff visibility into sensitive investor economics.

QA-P1-07 — AUDIT / EXCEPTION / APPROVAL / EVIDENCE — PASS
T_EVENTS, T_EXCEPTIONS, T_APPROVALS and T_EVIDENCE provide required auditability and recovery evidence.

QA-P1-08 — RECOVERY / MIGRATION — PASS
Controlled opening-stock migration and append-only adjustment/reversal principles align with approved recovery discipline.

QA-P1-09 — STAFF SIMPLICITY — PASS
Front-end views are separated from backend T_* registers. Daily operations can remain simple while canonical complexity stays backend.

3. BUILD-BLOCKING QA GAPS

QA-B1 — VERSIONED QUOTE HOME — BLOCKING STRUCTURAL GAP
Approved Cap Care and Equipment rules require versioned quotes, quote validity, updated quote approval, and historical quote terms.
Draft 2 has SERVICE_ACTIONS.QUOTE_VERSION but no authoritative quote/version entity and Equipment has no quote register at all.

Risk:
A quote could be overwritten, losing the terms the customer actually approved.

RECOMMENDATION:
Add a generic canonical QUOTE + QUOTE_VERSION structure usable by Service Jobs, Equipment, and future quoted transactions.

Proposed minimum:
T_QUOTES
QUOTE_ID, QUOTE_REF, QUOTE_TYPE, PARTY_ID, RELATED_ENTITY_TYPE, RELATED_ENTITY_ID, STATUS, CURRENT_VERSION_NO, CREATED_AT, CREATED_BY.

T_QUOTE_VERSIONS
QUOTE_VERSION_ID, QUOTE_ID, VERSION_NO, EFFECTIVE_AT, VALID_UNTIL, SUBTOTAL, DISCOUNT_TOTAL, SHIPPING_TOTAL, OTHER_TOTAL, TOTAL, TERMS_REF, WARRANTY_TERMS_REF, CREATED_BY, APPROVED_BY_CUSTOMER_AT, SUPERSEDES_VERSION_ID, STATUS.

Classification:
STRUCTURAL REPRESENTATION OF APPROVED BUSINESS RULES.
Because Logical Model is frozen, owner approval is required before treating QUOTE/QUOTE_VERSION as a new first-class canonical entity.

QA-B2 — EXPENSE / CASH OUT canonical scope — BLOCKING SCOPE GAP
The current Business OS contains an EXPENSES register and approved/open rules refer to expense categories, cash reconciliation, courier recovery and business costs.
Draft 2 does not define an authoritative expense/cash-out register.

Risk:
V1 could lose an existing operational function or force business expenses into unrelated payment/sale tables.

TO CONFIRM:
Is expense tracking part of WHATTHECAP Production System V1 canonical scope?

If YES, recommended structure:
T_EXPENSES
EXPENSE_ID, EXPENSE_REF, EXPENSE_DATE, CATEGORY_CODE, DESCRIPTION, PAYEE_PARTY_ID(optional), AMOUNT, CURRENCY, PAYMENT_METHOD_CODE, SOURCE_ACCOUNT_CODE, RELATED_ENTITY_TYPE, RELATED_ENTITY_ID, EVIDENCE_GROUP_ID, APPROVAL_ID, STATUS, POSTED_AT, REVERSAL_OF_ID.

T_EXPENSE_ALLOCATIONS may be added later only if one expense must be allocated across multiple orders/jobs/cost centers.

If NO, explicitly mark legacy EXPENSES as out-of-scope/external accounting context.

Classification:
TO CONFIRM — BUSINESS SCOPE. Do not silently decide.

QA-B3 — PRIVATE ↔ OPERATIONS CROSS-FILE CONTRACT — BLOCKING TECHNICAL GAP
Partition is approved, but Draft 2 does not yet define the physical contract between Operations and Private.

Must define before freeze:
• which canonical IDs may cross files
• which fields may mirror from Private to Operations
• which sensitive fields may never cross
• authoritative writer for each cross-file value
• failure behavior when Private is unavailable
• Apps Script execution account/permission boundary
• reconciliation key/event ID
• no formulas such as IMPORTRANGE that expose confidential investor economics to staff-visible files
• owner-only investor settlement calculation/write path

Classification:
TECHNICAL IMPLEMENTATION DECISION, but required before Physical Design freeze because confidentiality depends on it.

4. NON-BLOCKING / BUILD-SPEC ITEMS

QA-N1 — Exact column ordering / sheet colors / frozen rows — defer to Build Specification.
QA-N2 — Exact ULID generation library/implementation — defer to Build Specification.
QA-N3 — Exact dashboard KPIs — correctly deferred under PD-08.
QA-N4 — Exact retention duration — correctly deferred under PD-06; production policy must be confirmed before retention automation.
QA-N5 — Exact API/webhook payload schemas — Build Specification/integration design.
QA-N6 — Exact staff names/user accounts — deployment/access setup, but permission classes must remain frozen in Physical Design.

5. QA RESULT
Overall result: CONDITIONAL PASS — NOT READY TO FREEZE.

Physical Design is coherent and substantially buildable, but three items must be closed before freeze:
1. QA-B1 Quote / Quote Version canonical representation.
2. QA-B2 Confirm whether Expenses are canonical V1 scope.
3. QA-B3 Define Operations ↔ Private cross-file confidentiality/write contract.

6. REQUIRED OWNER DECISIONS
QA-D01 — Approve QUOTE + QUOTE_VERSION as controlled logical-model amendment and physical tables.
QA-D02 — Confirm EXPENSE tracking: INCLUDE in canonical V1 / EXCLUDE from V1.
QA-D03 — Approve the proposed Private↔Operations contract principle:
Operations stores only IDs, operational statuses, and non-sensitive derived indicators required for workflow.
Private stores confidential investor/reseller economics and calculations.
No sensitive economics are mirrored into staff-accessible Operations.
Owner/Admin-controlled Apps Script is the authorized cross-file writer.
If Private is unavailable, sensitive dependent postings stop/queue and surface an Exception; the system does not guess.

7. GATE
No Google Sheets mutation is authorized.
After QA-D01 through QA-D03 are resolved:
→ incorporate QA decisions into Physical Design Draft 3
→ QA Pass 2
→ if PASS, issue Physical Design Freeze Candidate
→ owner freeze approval
→ Build Specification.
