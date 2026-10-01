# Package 3 Deployment Resume Checklist

Do not deploy until a legitimate WHATTHECAP Business-owned Google Apps Script execution path is available.

Required before Package 3 acceptance:
- [ ] Create/verify standalone privileged Apps Script project.
- [ ] Record Script Project ID in controlled implementation registry (not staff-visible secret cells).
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

Current source is WIP and intentionally has no privileged external entrypoint enabled.
