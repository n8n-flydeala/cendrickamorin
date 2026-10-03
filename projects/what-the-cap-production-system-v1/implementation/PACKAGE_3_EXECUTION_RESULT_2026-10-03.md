# PACKAGE 3 EXECUTION RESULT: PARTIAL

Recorded 2026-10-03, Asia/Manila. Builder evidence, not Owner/security/QA acceptance.
Latest accepted baseline remains V1.0 / Package 2. Package 4 is NOT AUTHORIZED.

## 1. Code/files changed

Within `apps-script/package-3-wip` only: modified 08_SheetsAdapter,
09_PostingService, 10_InventoryActions and tests/package3.test.cjs. Added
13_GoogleIdentity, 14_RequestIntegrity, 15_ReferenceAdapter,
16_ProtectedOwnerRegistry, 17_FrozenInventoryPolicy, 18_DevRuntime,
19_SequenceAdapter, 21_InventoryProjection, 27_DevController,
28_DevPreflight, 29_DevConsole, tests/security-integration.test.cjs and
tools/serve-source.cjs. Documentation updated to distinguish implemented source
from active/verified live configuration.

## 2. Apps Script state

Business-owned DEV project: `1jAl9sLlPQZsCzAHsn3xI9-NIWrRNtUx8VtFBxwuHtNl7zcn0JqsW765v`.
Numbered source uploaded as Code.gs and save confirmed. Uploaded source was
reread; the prior upload comparison matched normalized source. Resume reread
confirmed 70,473 characters and presence of DevRuntime/DevPreflight.
No web-app deployment created by this execution. `doGet` requires explicit DEV
enablement and both active/effective Business sessions. No production deployment.

## 3. GIS Web client result

Earlier Business Cloud inspection found two Desktop clients, neither eligible as
the required Web application client. A separate Web-client creation form was
prepared, but creation was not submitted: action-time browser confirmation remains
pending. The current live preflight reports `gisClientConfigured:false`.
No client secret or ID token was copied to Git, Sheets, documentation or logs.

The implemented DEV verifier calls Google's fixed tokeninfo endpoint using a POST
body, then validates audience, authorized party, issuer, expiry, subject and signed
nonce. Actual POST compatibility and nonce response must still be demonstrated
using real GIS sign-in; mocked responses do not prove them. Production is denied.
Google documents tokeninfo for development/debugging; this is not a production
signature-verification implementation.

## 4. Security implementation

Implemented source: deny-default subject/role/action checks; confirmed Owner email
binding only after verified GIS claims and both Business sessions; protected role
registry; one-use nonce bound to action/input/idempotency key/audience; bounded
ScriptLock acquisition; DEV workbook identity checks; idempotency; sanitized audit
failure evidence and durable freeze. Public handlers do not accept trusted role or
CSRF flags. No Operations identity assigned. Live registry/configuration is absent,
so these controls are not claimed as an accepted live security path.

## 5. Inventory functions

Runtime adapters prepared for frozen tables, SYS_META receipt sequence, validated
references/enums/eligibility, and protected approval evidence. Receiving,
receipt/line/batch/movement, commitment, release, uncommitted consumption,
exact-full-commitment consumption, transfer, adjustment and controlled ADJUST
reversal are implemented as plans behind the protected posting service.
Event/Exception persistence, atomic request/reread checks, derived history rebuild
and reconciliation are implemented. No silent stock repair.

Nonzero receiving variance, partial commitment consumption, other reversal types
and Private agreement dependencies remain explicitly blocked rather than invented.
Protected approval digests and an 8,000-character protected derived snapshot are
technical WIP mechanisms, not newly approved business policy or a final scalable
read-model design. Verify them against frozen architecture before enabling posting.

## 6–7. Tests actually executed and results

2026-10-03 local command: Node --test on package3.test.cjs and
security-integration.test.cjs: **34 PASS, 0 FAIL, 0 SKIPPED**.
Synthetic fixtures cover receive10/hold4/release/consume3/transfer2/adjust/reverse/
rebuild/audit, exact hold consumption, identity denials, nonce replay/expiry,
negative on-hand/ATS, serialized last-unit conflict, write mismatch, freeze and
reconciliation variance. These are local tests, not live Google identity or
concurrent Apps Script execution evidence.

Live `package3DevPreflight` executed with confirmed Business sessions:
execution started 10:07:36 PM, result logged 10:07:40 PM, completed 10:07:42 PM
(times exactly as displayed by the browser execution log; browser timezone was
not independently established). Result:

```json
{"environment":"DEV","canonicalCounts":{"T_STOCK_RECEIPTS":0,"T_STOCK_RECEIPT_LINES":0,"T_BATCHES":0,"T_INVENTORY_MOVEMENTS":0,"T_STOCK_COMMITMENTS":0,"SYS_RECONCILIATION":0,"T_EVENTS":0,"T_EXCEPTIONS":0},"masterCounts":{"T_SKUS":0,"T_LOCATIONS":0,"T_PARTIES":0},"gisClientConfigured":false,"roleRegistryConfigured":false,"policyConfigured":false,"postingEnabled":false,"frozen":false,"accepted":false}
```

This verified DEV identity/schema and read-only counts; it made no inventory writes.

Live `package3PureSmokeTest` also completed successfully: displayed start
10:08:53 PM, PASS message 10:08:52 PM, completion 10:08:54 PM. The displayed
message precedes start by one second; retained as observed rather than silently
corrected. It explicitly reports no live posting and is not acceptance evidence.

## 8. Events/Exceptions evidence

Both frozen schemas verified by preflight; live row counts are zero.
Earlier header setup evidence remains PACKAGE_3_DEV_AUDIT_SETUP_2026-10-02.md,
commit `99d3dfbf76792f6b98ef89b5809cb6c679193c8f`.
Persistence/failure behavior passed synthetic tests only. No new live audit event
or exception is claimed.

## 9–10. Negative stock, concurrency and post-write evidence

Local negative on-hand and ATS denials, serialized last-unit attempts, atomic
adapter reread, immutable-value checks and failure freeze passed. Real concurrent
Apps Script/Sheets tests and live post-write reread are NOT EXECUTED; posting
preconditions are absent. No partial live success reported.

## 11. Git evidence

Started from `99d3dfbf76792f6b98ef89b5809cb6c679193c8f`, branch
`what-the-cap-v1-dev`, correct cendrickamorin origin. This execution record is
committed with the implementation; obtain its exact SHA from Git history. Push
result is reported separately after remote verification. No main merge.

## 12. Workbook evidence

Target Operations DEV: `1JNxH585ajPAOoWQpexKSF_cIpiutOdk8cAJ1Fwf8CBM`.
Preflight verified ENVIRONMENT=DEV, frozen build spec and exact workbook ID.
All eight canonical tables empty, all three reference master tables empty.
Earlier read-only inspection also found inactive TO_CONFIRM movement reasons and
location types, blank T_APPROVALS headers, and no initialized RCV sequence among
observed SYS_META rows. These are additional prerequisites, not Operations-account
blockers. No direct connector posting, Private or legacy mutation performed.

## 13. Operations-only blocked tests

Separate real Operations sign-in, authorized Operations action path and forbidden
Owner/Admin action denial: **BLOCKED — OPERATIONS TEST IDENTITY TO CONFIRM**.
No fabricated account. This missing account does not block local implementation
or Owner-session read-only diagnostics.

## 14. Other blockers

GIS Web client creation/configuration and real signed subject binding; exact GIS
origin verification; approved protected policy/master/enum/approval/sequence
prerequisites; confirmation of isolated DEV test fixtures; live Google verifier
transport; external-request/Sheets API runtime permissions and API availability;
real Event/Exception, negative-stock, concurrency, postwrite and rebuild tests.
Any proposed mechanism conflicting with frozen design must stop only that portion.

## 15–16. Acceptance and next safe step

**NOT ready for Owner acceptance.** Finish the pending Web-client action-time
confirmation and approved DEV origin setup; demonstrate real Business GIS
verification and bind the confirmed Owner subject. Resolve approved reference/
policy prerequisites without inventing business truth. Keep posting disabled until
all user-listed safety gates are verified. Then execute the isolated DEV posting
sequence and capture independent rereads. Operations-specific tests alone may
remain blocked until its test identity is supplied.
