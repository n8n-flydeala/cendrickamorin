# Package 3 Apps Script Source — WIP

Status: DEPLOYMENT BLOCKED / NOT ACCEPTED
Branch: what-the-cap-v1-dev

Purpose:
Prepare the privileged inventory-core source required by BS-V1.0-FROZEN without bypassing the standalone Apps Script security boundary.

Rules:
- This source is not deployed.
- Package 3 is not accepted.
- Critical inventory posting must not be replaced by direct spreadsheet writes.
- V1.0 remains the latest accepted rollback baseline.
- Deployment must occur under the WHATTHECAP Business-owned privileged Apps Script project.
- Caller identity / protected role registry must be implemented and verified before authoritative posting entrypoints are enabled.

Local logic QA completed:
receive 10 -> commit 4 -> release -> consume 3 -> transfer 2 -> negative-stock attempt blocked.
This proves the pure calculation guard logic only; it is not an end-to-end Apps Script/Sheets acceptance test.
