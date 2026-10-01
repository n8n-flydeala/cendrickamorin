WHATTHECAP PRODUCTION SYSTEM V1
BUILD SPECIFICATION QA PASS 2
Date: 2026-10-01
Basis: Build Specification Draft 3 + PD-V1.0-FROZEN + QA Pass 1 closures
Status: PASS — READY FOR BUILD SPECIFICATION FREEZE CANDIDATE — IMPLEMENTATION NOT AUTHORIZED

1. QA SCOPE
Reviewed:
• table schemas and relationships;
• role/permission intent;
• reference-number concurrency;
• standalone Apps Script security model;
• caller identity verification;
• Operations↔Private bridge idempotency;
• create-vs-post validation gates;
• migration/recovery;
• package sequencing and evidence;
• alignment with frozen Physical Design.

2. PREVIOUS BLOCKERS

QA-BS-B01 — CALLER AUTHENTICATION — CLOSED
Draft 3 no longer relies on a plain client-supplied email or an assumed Session identity.
It requires verified Google identity, server-side role resolution, and deny-by-default behavior.
Security acceptance requires real account-model testing before Production.

QA-BS-B02 — CROSS-FILE ATOMICITY / IDEMPOTENCY — CLOSED
Outbox/Inbox saga is explicit.
Private writes are idempotent and replay-safe by IDEMPOTENCY_KEY.
Operations/Private mismatch remains visible as retryable/terminal Exception rather than silent partial success.

QA-BS-B03 — CREATE VS POST FIELD REQUIREMENTS — CLOSED
Critical entities have minimum create requirements and stricter posting/transition requirements.
This is sufficient to prevent builders from inventing stage rules during coding.

3. ARCHITECTURE / BUILDABILITY CHECK

QA2-BS-01 — OPERATIONS / PRIVATE SECURITY — PASS
No design requires staff access to Private.
Privileged code remains outside staff-editable workbook.
Private role registry and confidential economics remain privileged.

QA2-BS-02 — GOOGLE SHEETS CANONICAL MODEL — PASS
Canonical tables are normalized enough for V1 while preserving usable staff views.
Derived balances are rebuildable.
Posted ledgers remain correction-by-reversal/adjustment.

QA2-BS-03 — APPS SCRIPT MODULE BOUNDARIES — PASS
Services are separated by system responsibility:
validation, posting, event, exception, approvals, inventory, commerce, private bridge, migration, reconciliation, recovery.

QA2-BS-04 — CONCURRENCY — PASS
Human reference sequence uses LockService.
Inventory and posting concurrency still require transaction-level revalidation immediately before final write; this is already implied by Validation/Audit services and must be enforced in code/tests.

QA2-BS-05 — PRIVATE BRIDGE — PASS
Event/correlation/idempotency/outbox/inbox/reconciliation provide sufficient implementation contract.

QA2-BS-06 — REF_CONFIG — PASS
Normalized reference registry is suitable for validation and preserves historical codes.

QA2-BS-07 — MIGRATION — PASS
Staging, source-row lineage, migration batch ID, exception register, reconciliation and Owner acceptance are explicit.

QA2-BS-08 — QA / PACKAGE CONTROL — PASS
Package 0–16 sequencing separates creation, inventory core, commerce, special domains, private investor system, views, migration, integrations, QA and deployment.

4. IMPORTANT IMPLEMENTATION CONSTRAINTS — NON-BLOCKING BUT MANDATORY

IC-01
Do not assume Google identity behavior. Package 0/1 must run the real Owner/Ops/Unauthorized authentication tests before privileged actions are enabled.

IC-02
Before every stock/payment/ledger posting, re-read authoritative current state immediately before commit. Never rely only on stale UI values.

IC-03
Operations and Private writes are eventual-consistency workflow. No code should claim or simulate true cross-file atomic database transactions.

IC-04
No confidential Private workbook ID, secret, API key, token, investor economics or privileged role registry may be written to staff-visible cells or committed to GitHub.

IC-05
Exact deferred business values remain TO_CONFIRM. Build must stop rather than invent values.

5. QA RESULT
BUILD SPECIFICATION QA PASS 2: PASS.

No unresolved build-spec structural blocker remains.

6. FREEZE CANDIDATE REQUIREMENTS
The freeze candidate must preserve:
• exact Operations/Private tab targets;
• column schemas from Draft 3;
• permission matrix;
• Prefix+ULID and human reference policy;
• standalone privileged Apps Script architecture;
• verified caller identity and server-side role registry;
• Outbox/Inbox saga;
• create/post requirement matrix;
• normalized REF_CONFIG;
• migration staging;
• DEV backup/checkpoint rules;
• package execution/acceptance record;
• implementation constraints IC-01 through IC-05.

7. GATE
Build Specification is QA-cleared but NOT frozen until Business Owner explicitly approves the Freeze Candidate.

Implementation remains NOT AUTHORIZED.

Next:
→ issue Build Specification Freeze Candidate
→ Business Owner freeze approval
→ fresh pre-implementation recovery/sanity checkpoint if required
→ explicit implementation authorization
→ Package 0 controlled execution
