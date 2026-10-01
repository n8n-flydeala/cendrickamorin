# WHATTHECAP — ARCHITECTURE BACKUP MANIFEST — V0.2

Snapshot date: 2026-10-01

## STATUS
- Discovery / architecture closure phase
- 20 planned architecture boards + Board 21 closure register present
- Sales / Payment / Website COD decision pass completed and reflected in affected boards
- Cross-board QA performed for prepaid verification, COD stock commitment, COD remittance-based Sale recognition, payment proof controls, COD eligibility controls, refund/discount authority, GHL mirror boundary, and n8n event boundary
- Architecture is NOT frozen
- Implementation is NOT authorized

## KEY V0.2 CHANGESET
- Website Retail COD approved; Messenger/IG Retail and Messenger Wholesale are Payment First
- COD checkout alone does not commit stock; confirmation/risk review precedes COMMITTED state
- COD SOLD/PAID only after courier remittance/payment confirmation
- Customer-caused COD failure rules and 2-strike COD disable rule approved
- Manual digital payment verification remains Owner/Admin authority; screenshot/reference alone is not PAID
- Payment method and receiving destination are tracked separately
- Refund/discount authority and audit rules added
- Future gateway success webhook may be authoritative for PAID
- Logical data, dashboard, GHL, n8n, inventory, investor, auction, equipment, retail, wholesale, fulfillment, and closure boards reconciled

## BOARD INDEX
01. **MASTER ARCHITECTURE**  
   Whimsical: https://whimsical.com/A8RHeXyU26T4TES9yHy7Xi  
   Board ID: `A8RHeXyU26T4TES9yHy7Xi`
02. **INVENTORY / OWNERSHIP / ALLOCATION FLOW**  
   Whimsical: https://whimsical.com/LmtvWMu6Km5s4Fw334JyGg  
   Board ID: `LmtvWMu6Km5s4Fw334JyGg`
03. **RETAIL CUSTOMER JOURNEY**  
   Whimsical: https://whimsical.com/4viFaQJJRZAGuLFqSDC9K3  
   Board ID: `4viFaQJJRZAGuLFqSDC9K3`
04. **WHOLESALE LEAD-TO-CLOSE FLOW**  
   Whimsical: https://whimsical.com/51MJ8CmLhfMSKVBxzW5boC  
   Board ID: `51MJ8CmLhfMSKVBxzW5boC`
05. **INVESTOR STOCK & SETTLEMENT FLOW**  
   Whimsical: https://whimsical.com/PMN7k6orxkguYr1HRwVcFC  
   Board ID: `PMN7k6orxkguYr1HRwVcFC`
06. **RESELLER LIFECYCLE**  
   Whimsical: https://whimsical.com/2GqRbV8oEna1Jm5qWh7jWz  
   Board ID: `2GqRbV8oEna1Jm5qWh7jWz`
07. **CAP CARE SERVICE FLOW**  
   Whimsical: https://whimsical.com/DLuRN2mxCHDtjGxEdWJ1o6  
   Board ID: `DLuRN2mxCHDtjGxEdWJ1o6`
08. **REBLOCKING MACHINE / EQUIPMENT SALES FLOW**  
   Whimsical: https://whimsical.com/MS2p3B7xH8hKws7i86jv78  
   Board ID: `MS2p3B7xH8hKws7i86jv78`
09. **AUCTION / BIDDING FLOW**  
   Whimsical: https://whimsical.com/66k8dmHW3ZhDehmpL5Fsx4  
   Board ID: `66k8dmHW3ZhDehmpL5Fsx4`
10. **PAYMENTS / MONEY / SETTLEMENT MAP**  
   Whimsical: https://whimsical.com/RPtyH5sAojsapgbyHfrry2  
   Board ID: `RPtyH5sAojsapgbyHfrry2`
11. **SHIPPING / FULFILLMENT / RETURNS MAP**  
   Whimsical: https://whimsical.com/XRqCyrGSgxLKu36iJVUaCL  
   Board ID: `XRqCyrGSgxLKu36iJVUaCL`
12. **LOYALTY / MEMBERSHIP / REFERRAL MAP**  
   Whimsical: https://whimsical.com/8zawczdRYWDPFfYqPVjCxo  
   Board ID: `8zawczdRYWDPFfYqPVjCxo`
13. **WEBSITE INFORMATION ARCHITECTURE / PAGE MAP**  
   Whimsical: https://whimsical.com/5Gpb8Rvae5eQdLitS3TJnW  
   Board ID: `5Gpb8Rvae5eQdLitS3TJnW`
14. **GHL CRM / PIPELINE MAP**  
   Whimsical: https://whimsical.com/Mfd2yuVdR2KhnMxMbMvXiv  
   Board ID: `Mfd2yuVdR2KhnMxMbMvXiv`
15. **n8n INTEGRATION / EVENT MAP**  
   Whimsical: https://whimsical.com/RuNVQokriuGfVNpFb9DepE  
   Board ID: `RuNVQokriuGfVNpFb9DepE`
16. **BUSINESS OS LOGICAL DATA MAP**  
   Whimsical: https://whimsical.com/UKftdakGpVVheNiWLySr4V  
   Board ID: `UKftdakGpVVheNiWLySr4V`
17. **DASHBOARD / OWNER VIEW MAP**  
   Whimsical: https://whimsical.com/WTHz8xGJcnaYv4rGuXiHJs  
   Board ID: `WTHz8xGJcnaYv4rGuXiHJs`
18. **INFRASTRUCTURE / VPS / DOCKER / GITHUB MAP**  
   Whimsical: https://whimsical.com/SUKAPwenA4nhrszzgbSrES  
   Board ID: `SUKAPwenA4nhrszzgbSrES`
19. **RECOVERY / FAILURE / AUDIT MAP**  
   Whimsical: https://whimsical.com/5cWTrFxPvhLGb6UEYqqRBD  
   Board ID: `5cWTrFxPvhLGb6UEYqqRBD`
20. **FUTURE AI / VOICE AI EXTENSION MAP**  
   Whimsical: https://whimsical.com/Ew1SuNvLugeFMJYpMkwRSc  
   Board ID: `Ew1SuNvLugeFMJYpMkwRSc`
21. **ARCHITECTURE CLOSURE / OPEN DECISION REGISTER**  
   Whimsical: https://whimsical.com/VrcroiHWtS6z5hXiCv1cLY  
   Board ID: `VrcroiHWtS6z5hXiCv1cLY`

## AUTHORITY
Whimsical = live editable visual blueprint. Google Drive = business/document archive. GitHub = version-controlled technical/recovery archive. Business Rule Register Discovery Draft V0.2 records the approved discovery decisions. This backup is a checkpoint, not an architecture freeze.