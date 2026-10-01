WHATTHECAP PRODUCTION SYSTEM V1
IMPLEMENTATION STATE REGISTRY — DEV
Created: 2026-10-01
Last reconciled: 2026-10-01 — PACKAGE 2 ACCEPTED

CURRENT GATE
Package 0: PASS
Package 1: PASS
Package 2: PASS
Next Authorized Package: NONE
Package 3 — INVENTORY CORE: NOT AUTHORIZED

AUTHORITY
Logical Model: FROZEN AS AMENDED
Physical Design: PD-V1.0-FROZEN
Build Specification: BS-V1.0-FROZEN
Latest Implementation Rollback Baseline: V1.0 — PACKAGE 2 ACCEPTED — VERIFIED
Previous Implementation Rollback Baseline: V0.9 — PACKAGE 1 ACCEPTED — VERIFIED
Pre-Implementation Frozen-Spec Baseline: V0.8 — VERIFIED

LEGACY SOURCE
Workbook: WHAT THE CAP — BUSINESS OS
Spreadsheet ID: 1Y-4Qta4242ZkIHv8lXC_pR7QQ-vQ0HKBV-2bSWYd9yE
State: PRESERVED — DO NOT MUTATE

TARGET REGISTRY
Operations Workbook ID: 1JNxH585ajPAOoWQpexKSF_cIpiutOdk8cAJ1Fwf8CBM
Operations State: REF_CONFIG_AND_MASTER_TABLES_READY

Private Workbook ID: 1J53dbBdUte1_DBeeHcS0p16zh96EJXElGZxw1s4pnDU
Private State: SHELL_CREATED_OWNER_ONLY / UNCHANGED

Migration Staging Workbook ID: PENDING authorized package
Standalone Apps Script Project ID: PENDING authorized script package
Web App Deployment ID: PENDING security test / authorized package

IMPLEMENTATION CONTROL
Current DEV Branch: what-the-cap-v1-dev
Implementation Control Folder ID: 1w8gXs1M-YMO17yuI-cSiHR_gfZXinQy0

PACKAGE 2 ACCEPTED STATE
REF_CONFIG normalized registry created.
Frozen master-table headers created for:
• T_PARTIES
• T_PARTY_ROLES
• T_PRODUCTS
• T_SKUS
• T_LOCATIONS

Controls applied:
• primary ID uniqueness validation
• Party FK validation in T_PARTY_ROLES
• Product FK validation in T_SKUS
• active REF_CONFIG validation for Party Roles
• active REF_CONFIG validation for Location Type
• boolean validation for T_LOCATIONS sellable/physical flags
• nonnegative default retail price
• REF_CONFIG ACTIVE_FLAG boolean and SORT_ORDER nonnegative
• inactive TO_CONFIRM rows for unresolved config domains
• frozen/formatted header rows

Excluded / unchanged:
• no real business-data migration
• no Apps Script posting engine
• no Woo/GHL/n8n integration
• no staff sharing
• no production cutover
• no legacy workbook mutation
• no Private economic data mutation/exposure

ROLLBACK / RECOVERY
Latest verified checkpoint: V1.0 — PACKAGE 2 ACCEPTED
Checkpoint folder ID: 1BMEn9gMmnTmOmwj9phs0tqeE_ytQCdwB
Checkpoint manifest ID: 1Vc7DJVUr5kVEZgQ3OHmDV4V1H_pf3zevQvASwW28mv4
Operations checkpoint ID: 12w_MA7c5LWa3bjKYHCBF6RSlF0krX7KP3HwevSJfFaE
Private checkpoint ID: 1iQ_Ornf0StAJjwIvjUucuftH3yuJTQ7kjYox9tKGbFQ

DOCUMENTATION RULE
Historical V0.x/V1.x snapshots are immutable and retain the state true when captured.
Live control/status documents advance with the project.

SYSTEM RULE
Unknown target IDs must remain PENDING.
Never invent IDs, ownership, business values, or implementation authority.
Unexpected state: STOP → preserve → evidence → diagnose → classify → decide → resume only after authorization.
