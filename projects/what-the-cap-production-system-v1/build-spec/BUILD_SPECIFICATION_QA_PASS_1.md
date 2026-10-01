WHATTHECAP PRODUCTION SYSTEM V1
BUILD SPECIFICATION QA / SANITY REVIEW — PASS 1
Date: 2026-10-01
Basis: Google Sheets Build Specification Draft 2 + PD-V1.0-FROZEN
Status: CONDITIONAL PASS — BUILD SPEC NOT READY TO FREEZE — IMPLEMENTATION NOT AUTHORIZED

1. REVIEW SCOPE
Reviewed Draft 2 for:
• fidelity to frozen Physical Design;
• security/confidentiality;
• implementation determinism;
• Google Sheets / Apps Script feasibility;
• cross-file consistency;
• concurrency/idempotency;
• migration/recovery;
• staff simplicity;
• acceptance evidence;
• absence of invented business policy.

2. STRONG PASS FINDINGS

QA-BS-P01 — FROZEN ARCHITECTURE FIDELITY — PASS
Draft 2 does not reopen or contradict PD-V1.0-FROZEN.

QA-BS-P02 — COLUMN SCHEMAS — PASS
Canonical tables have implementation-ready ordered headers and stable PK/FK placement.

QA-BS-P03 — PERMISSION INTENT — PASS
Four permission classes and table/action authority are materially defined.
Private tables remain inaccessible to Operations Staff.

QA-BS-P04 — ID / HUMAN REFERENCE CONTROL — PASS
Prefix+ULID PK plus secondary yearly human references, LockService sequence protection, non-reuse and gap tolerance are safe and migration-friendly.

QA-BS-P05 — MIGRATION STAGING — PASS
Separate staging, row-level source traceability, migration batch IDs, exception handling and reconciliation are appropriate.

QA-BS-P06 — DEV CHECKPOINTS / PACKAGE RECORDS — PASS
Checkpoint and package evidence rules support controlled implementation and rollback.

3. BUILD-BLOCKING TECHNICAL GAPS

QA-BS-B01 — STAFF ACTION AUTHENTICATION FOR STANDALONE APPS SCRIPT — BLOCKING

Draft 2 correctly chooses a standalone privileged Apps Script project to avoid exposing privileged code/configuration to Operations spreadsheet editors.

However, the invocation/authentication contract is not yet deterministic.

Risk:
A web app deployed to “execute as owner” can write with Owner authority. The system must reliably know which human initiated the action before granting Staff-vs-Owner permissions. It must not assume Session.getActiveUser().getEmail() will always provide a reliable identity in every Google account/deployment scenario.

Required closure:
Define one explicit authentication pattern before freeze.

Recommended V1 pattern:
• privileged standalone Apps Script Web App;
• Google Identity Services / verified Google ID token or another Google-authenticated identity mechanism that returns a verified email/user identifier;
• server-side allowlist/role lookup from a protected role registry;
• every action records CALLER_ID + EFFECTIVE_ACTOR_ID;
• Owner-only actions require Owner/Admin role server-side;
• no role decision based on client-supplied email text;
• no secret shared token embedded in the Operations workbook;
• if identity cannot be verified, deny the action and create/log a security Exception.

If reliable token-based identity cannot be implemented in Apps Script under the chosen account model, V1 must use another controlled invocation path rather than weakening authentication.

QA-BS-B02 — OPERATIONS↔PRIVATE CROSS-FILE ATOMICITY / IDEMPOTENCY — BLOCKING

PD-V1.0-FROZEN requires safe stop/queue/Exception behavior when Private is unavailable.
Draft 2 defines this principle but does not yet define the exact transaction pattern.

Risk:
Sale posting could succeed in Operations while investor payable write fails in Private. A retry could then create duplicate payables unless the bridge has durable idempotent state.

Required closure:
Adopt an Outbox/Inbox saga pattern.

Recommended tables:
T_PRIVATE_OUTBOX
OUTBOX_ID | EVENT_ID | CORRELATION_ID | ACTION_TYPE | OPERATIONS_ENTITY_TYPE | OPERATIONS_ENTITY_ID | PRIVATE_TARGET_TYPE | IDEMPOTENCY_KEY | PAYLOAD_REF | STATUS | ATTEMPT_COUNT | NEXT_RETRY_AT | LAST_ERROR_CODE | CREATED_AT | UPDATED_AT

P_PRIVATE_INBOX
INBOX_ID | IDEMPOTENCY_KEY | EVENT_ID | CORRELATION_ID | ACTION_TYPE | SOURCE_ENTITY_ID | RESULT_ENTITY_ID | STATUS | PROCESSED_AT | ERROR_CODE

Required behavior:
1. Operations canonical transaction commits first with Event ID.
2. Durable outbox record is created in the same controlled operation.
3. Private bridge reads pending outbox.
4. Private checks IDEMPOTENCY_KEY before write.
5. If already processed, return existing result, never duplicate.
6. If successful, Private inbox records result.
7. Operations outbox marks success.
8. If failure, outbox remains retryable and Exception surfaces.
9. Retry is bounded/scheduled; no blind infinite retry.
10. Reconciliation detects Operations event without corresponding Private inbox result.

This is eventual consistency, not fake atomicity.

QA-BS-B03 — REQUIRED-AT-CREATE VS REQUIRED-AT-POST MATRIX — BLOCKING

Draft 2 says required/optional validation is defined per transaction stage, but does not actually freeze that stage contract.

Risk:
Builder may guess which fields may be blank during intake and which are mandatory before posting, producing inconsistent forms and validation logic.

Required closure:
Define minimum stage requirements for critical entities.

Minimum matrix required for:
STOCK_RECEIPT
BATCH
INVENTORY_MOVEMENT
ORDER
SALE
PAYMENT
RESERVATION
FULFILLMENT
RETURN
REFUND
QUOTE_VERSION
SERVICE_JOB
EXPENSE
RESELLER_RELEASE
RESELLER_REPORT
INVESTOR_PAYABLE

Example:
PAYMENT Create/Intake requires PARTY_ID, METHOD_CODE, AMOUNT, CURRENCY, PAYMENT_TIMESTAMP.
PAYMENT Verify/Post additionally requires VERIFICATION_STATUS=VERIFIED, VERIFIED_AT, VERIFIED_BY and required receipt/reference evidence according to method/rule.

4. NON-BLOCKING IMPROVEMENTS

QA-BS-N01 — REF_CONFIG physical schema
Prefer one normalized table:
REF_TYPE | CODE | LABEL | ACTIVE_FLAG | SORT_ORDER | PARAM_VALUE | SENSITIVITY | EFFECTIVE_FROM | EFFECTIVE_TO | UPDATED_AT | UPDATED_BY
instead of unrelated free-form blocks. Named/filter views can drive validation lists.

QA-BS-N02 — Apps Script source layout
Module names are good. Exact function names may wait until coding package.

QA-BS-N03 — Spreadsheet formatting
Column widths, colors, frozen rows and visual conventions may be resolved in implementation style guide and do not block freeze.

QA-BS-N04 — retry timing
Exact retry intervals may remain configuration values, but maximum attempts and terminal failure behavior must be explicit before production integration.

5. QA RESULT
CONDITIONAL PASS.

Build Specification is coherent but cannot be frozen until QA-BS-B01 through QA-BS-B03 are closed.

6. PROPOSED TECHNICAL CLOSURE
These are technical implementation decisions within PD-V1.0-FROZEN and do not require new business rules.

Recommended:
A. approve verified Google identity + server-side role registry for privileged standalone Apps Script actions;
B. approve durable Outbox/Inbox idempotent saga for Operations↔Private writes;
C. add required-at-create / required-at-post matrix for critical entities;
D. normalize REF_CONFIG as QA-BS-N01.

7. GATE
No Sheets or Apps Script implementation is authorized.
After closure:
→ Build Specification Draft 3
→ QA Pass 2
→ if PASS, Build Specification Freeze Candidate
→ Business Owner freeze approval
→ explicit implementation authorization
