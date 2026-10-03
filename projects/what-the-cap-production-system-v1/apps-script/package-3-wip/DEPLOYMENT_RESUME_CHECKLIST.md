# Package 3 Deployment Resume Checklist

Do not deploy until a legitimate WHATTHECAP Business-owned Google Apps Script execution path is available.

Required before Package 3 acceptance (live verification status, reconciled 2026-10-03):
- [x] Create/verify standalone privileged Business-owned Apps Script DEV project.
- [x] Record Script Project ID in controlled implementation registry (not staff-visible secret cells).
- [x] Verify frozen audit headers and all eight Package 3 schemas through Owner-session read-only preflight.
- [x] Upload and reread guarded DEV integration source; run local tests (34 PASS) and Apps Script pure smoke.
- [x] Verify a separate GIS Web application client and protected public ID configuration; Desktop clients are not substitutes.
- [ ] Verify exact DEV iframe origin before allowing it; no guessed/wildcard origins.
- [ ] Implement verified Google caller identity.
- [ ] Implement protected server-side role registry.
- [ ] Deny by default when identity cannot be verified.
- [ ] Wire sheet read/write adapters for frozen Package 3 tables.
- [ ] Re-read authoritative state immediately before each critical posting.
- [ ] Append Event evidence for critical writes.
- [ ] Create Exception instead of partial/silent repair on invalid state.
- [ ] Post-write reread verification.
- [ ] Run receive 10 -> batch -> allocate -> commit -> release -> consume -> adjust.
- [ ] Verify derived stock equals movement history.
- [ ] Verify negative stock / last-unit conflict is blocked.
- [ ] Verify no direct sheet posting bypass.
- [ ] Create accepted Package 3 checkpoint only after all exit evidence passes.

Current source is WIP. Guarded caller handlers and a disabled DEV-only identity
console exist; there is no deployed public inventory endpoint. Posting is disabled.
An implemented source module is not proof of its live security or persistence path.

Read-only preflight: zero inventory/audit records; zero SKU/location/party masters;
GIS Web client now verified/configured; role registry and approved policy absent.
Private Owner-only DEV web-app version 1 created to inspect hosting. Google rejected
its actual googleusercontent.com origin as forbidden; no origin or redirect saved.
Identity screen disabled again; inventory posting remains disabled. See
`../../implementation/PACKAGE_3_GIS_ORIGIN_BLOCKER_2026-10-03.md` for exact evidence
and the required approved sign-in-host/transport resolution.

Before enabling posting, resolve approved master/status/enum values, receipt
sequence initialization, approval dependencies and protected policy; prove DEV
fixture isolation, real GIS transport/nonce/Owner subject, audit writes and rereads.
Never activate TO_CONFIRM enum values as guessed business truth.

No Operations account is assigned. Only separate Operations identity/role tests
are blocked by that missing account; other blockers above are independent.
Detailed evidence: `../../implementation/PACKAGE_3_EXECUTION_RESULT_2026-10-03.md`.
