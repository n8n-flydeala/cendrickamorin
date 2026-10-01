# WHATTHECAP — BUSINESS RULE REGISTER SNAPSHOT — V0.8

Snapshot date: 2026-10-01
Source Doc ID: 1Y8atETfX0_-O8SMBFcta6YAlgp1OgBlgDVGj_NHmT6Y
Source revision: ANLCKQk4_su7lfiaF90XM_4Y0McsZWj7zb7qxvoibICPLV1X72dnIReFcwSOZ27jEXpxsF3jiE0LhmVaymv81Kg63edtimfETmSDE6BQY1s
Checkpoint: BUILD SPECIFICATION BS-V1.0-FROZEN / PRE-IMPLEMENTATION
Implementation: NOT AUTHORIZED.

WHAT THE CAP — BUSINESS RULE REGISTER — ARCHITECTURE RECONCILED V0.5
STATUS
CANONICAL LOGICAL DATA MODEL — FROZEN
PHYSICAL DESIGN — NOT STARTED
IMPLEMENTATION — NOT AUTHORIZED
CURRENT AUTHORITY NOTE — 2026-10-01
This document began as a discovery draft. Earlier “Working rule,” “Potential,” “OPEN,” and “NOT FROZEN” language is preserved as historical discovery context unless explicitly superseded by later approved sections. The latest approved reconciliation sections and approved architecture controls govern where conflict exists.
PURPOSE
Capture the first confirmed/working business truths discussed for WhatTheCap so they can be validated during discovery, then translated into the Whimsical blueprint and later technical design.
SOURCE / METHOD
The discipline and rule-register structure are inspired by the Zack Business System V1 methodology, but the rules below are specific to WhatTheCap and must be validated against actual WhatTheCap operations. Zack rules are references, not inherited authority.
A. INVENTORY / CHANNEL ALLOCATION
WTC-BR-INV-001 — One Master Inventory Truth
Working rule:
WhatTheCap should maintain one authoritative inventory model rather than independent retail and wholesale inventories that can drift apart.
Implementation effect:
Retail, wholesale, reseller-held, reserved, damaged, service-related, and other stock states should be represented as allocations/locations/statuses against the same underlying stock truth.
WTC-BR-INV-002 — Retail and Wholesale Physical Separation
Working rule:
Retail-designated stock may be physically separated from wholesale-designated stock to reduce operational confusion.
Implementation effect:
The system should support explicit Retail Allocation and Wholesale Allocation while preserving total stock truth.
WTC-BR-INV-003 — Channel Reallocation Is Not a Sale
Working rule:
Moving stock from Retail Allocation to Wholesale Allocation, or vice versa, is an inventory transfer/reallocation and does not create revenue, cost recognition, investor payable, or a customer sale by itself.
Implementation effect:
Retail quantity decreases and wholesale quantity increases while total physical stock remains unchanged.
WTC-BR-INV-004 — Website Availability Follows Retail Allocation
Working rule:
The website should expose only the stock/availability approved for retail ecommerce.
Implementation effect:
If retail allocation reaches zero or an item is intentionally pulled into wholesale, the website may show Out of Stock, reduce available quantity, or hide the retail offer without treating the inventory as sold.
B. OWNERSHIP / INVESTOR STOCK
WTC-BR-OWN-001 — Stock Ownership Persists Across Channels
Working rule:
An item/batch remains owned by its actual owner even if allocated to retail, wholesale, reseller, reserved, or another permitted stock state.
Implementation effect:
Channel allocation must never overwrite ownership.
WTC-BR-OWN-002 — Batch / Source Lineage Must Be Preserved
Working rule:
Investor-owned and WhatTheCap-owned stock should preserve batch/source lineage sufficient to determine whose item was sold and what economic obligation applies.
Implementation effect:
Product-level counts alone are insufficient where multiple owners/bases exist for the same SKU.
WTC-BR-OWN-003 — Investor Stock May Be Split Across Retail and Wholesale
Working rule:
The same investor's stock may be allocated across multiple sales channels while remaining traceable to that investor.
Implementation effect:
Retail and wholesale sales must still resolve to the correct investor-owned quantity/batch/source.
C. RETAIL
WTC-BR-RET-001 — Retail Is a Dedicated Customer Journey
Working rule:
Retail sales should have a dedicated ecommerce/customer journey rather than being treated as wholesale transactions.
Implementation effect:
WordPress/WooCommerce is the planned retail-facing commerce layer, subject to final technical design.
WTC-BR-RET-002 — Retail Sale Consumes Retail Allocation
Working rule:
A completed/recognized retail sale should consume from the applicable retail allocation/source according to the final sale-establishment rule to be confirmed.
Open decision:
The exact business event that establishes a retail Sale (payment captured, paid status, manual confirmation, COD/COP handling, cancellation edge cases) is not yet frozen.
D. WHOLESALE
WTC-BR-WHO-001 — Wholesale Closing Remains Messenger-Led
Working rule:
Wholesale customer closing is intentionally human-led through the WhatTheCap Facebook Messenger workflow, with Instagram potentially supporting conversations as appropriate.
Implementation effect:
The system should assist lead capture, qualification, CRM tracking, reminders, follow-up, and handoff without forcing wholesale buyers into a pure ecommerce checkout.
WTC-BR-WHO-002 — Capture Before Messenger Handoff
Working rule:
Where practical, wholesale leads should provide core contact/qualification details before or as part of the Messenger handoff.
Implementation effect:
The lead should enter GoHighLevel/contact tracking even if the final negotiation happens in Messenger.
WTC-BR-WHO-003 — Wholesale Stock Uses Wholesale Allocation
Working rule:
Wholesale deals should primarily consume Wholesale Allocation.
Implementation effect:
Retail stock may be intentionally transferred into wholesale first when needed; that transfer itself is not a sale.
E. INVESTOR ECONOMICS / REMITTANCE
WTC-BR-INVEST-001 — Investor Payable Follows Actual Sold Investor Stock
Working rule:
When investor-owned stock is sold, the system must identify the applicable owner/batch/source and determine the amount owed to the investor under the agreed basis/terms.
Implementation effect:
Investor payable is linked to actual sold investor stock, not merely product-level revenue.
WTC-BR-INVEST-002 — Channel Does Not Break Investor Settlement Tracking
Working rule:
Investor settlement tracking must work whether the investor-owned item was sold through retail, wholesale, reseller, or another approved channel.
Implementation effect:
The system should aggregate payable/remitted/outstanding values by investor while retaining sale/source lineage.
WTC-BR-INVEST-003 — Remittance Is Separate From Sale
Working rule:
The sale event and the investor remittance event are separate business events.
Implementation effect:
The system must distinguish amount payable to investor, amount already remitted, and remaining outstanding balance.
WTC-BR-INVEST-004 — Business Margin and Investor Obligation Are Separate
Working rule:
The system should separately show investor obligation and WhatTheCap product margin/economic result.
Implementation effect:
A retail or wholesale selling price does not replace the investor basis/settlement rule.
OPEN DECISION:
Exact investor economics may vary by investor or batch (fixed basis, revenue split, commission, consignment, other). These structures must be discovered before implementation.
F. RESELLER
WTC-BR-RES-001 — Reseller-Held Stock Is a Distinct Custody/Allocation State
Working rule:
Stock released to a reseller should remain traceable by owner/source and reseller custody.
Implementation effect:
Reseller-held stock should not disappear from inventory truth merely because it leaves WhatTheCap's physical location.
WTC-BR-RES-002 — Reseller Sale and Settlement Need Separate Tracking
Working rule:
The system should distinguish stock released to reseller, stock reported sold, remaining reseller-held stock, amount due, remittance received, and outstanding amount.
Open decision:
Exact reseller sale-establishment and remittance rules must be confirmed from real operating practice.
G. SERVICE / REBLOCKING
WTC-BR-SVC-001 — Reblocking Service Is Not Inventory Product Sale
Working rule:
Cap reblocking/cap-care service work has its own lifecycle and should not be forced into the same transaction logic as product inventory sales.
Implementation effect:
Service records should capture customer, item received, service type, price, payment, service status, completion/handover, notes/evidence as required.
H. REBLOCKING MACHINE / EQUIPMENT
WTC-BR-EQP-001 — Reblocking Machine Is a Separate Product/Lead Journey
Working rule:
Reblocking-machine sales may require a higher-touch inquiry/quote/demo/closing process rather than the same low-ticket retail-cap checkout.
Implementation effect:
The final design may use an equipment lead pipeline plus inventory/order tracking.
I. CRM / CUSTOMER COMMUNICATION
WTC-BR-CRM-001 — GHL Is the Planned Customer Relationship Layer
Working rule:
GoHighLevel is intended to manage lead/contact records, wholesale pipelines, conversations, follow-up, segmentation, and customer lifecycle where appropriate.
Implementation effect:
GHL is not automatically the authoritative inventory/accounting source.
WTC-BR-CRM-002 — Human Closing Is Preserved Where It Works
Working rule:
Automation should support, not unnecessarily replace, WhatTheCap's effective Messenger-based wholesale closing behavior.
J. SYSTEM / DATA AUTHORITY
WTC-BR-SYS-001 — Business OS Is the Working Internal Operations Core
Working rule:
The existing WhatTheCap Business OS is the current internal operations foundation for inventory, sales, customers, expenses, services, dashboard, and settings, subject to redesign after discovery.
Implementation effect:
Future integrations must define what data the Business OS owns versus WooCommerce, GHL, and other platforms.
WTC-BR-SYS-002 — No Duplicate Uncontrolled Source of Truth
Working rule:
WooCommerce, GHL, Business OS, and n8n must not each become independent masters for the same critical data without an explicit authority/synchronization rule.
WTC-BR-SYS-003 — Cross-System Automation Uses Controlled Integration
Working rule:
n8n/APIs/webhooks should move events/data between systems only after source/target authority and failure behavior are defined.
K. CURRENT CONCEPTUAL INVENTORY MODEL
PRODUCT / SKU
→ BATCH / STOCK SOURCE
→ OWNER
   → WhatTheCap-owned
   → Investor-owned
→ ALLOCATION / CUSTODY
   → Retail
   → Wholesale
   → Reseller-held
   → Reserved
   → Damaged / unavailable
   → Other approved states
→ SALE CHANNEL
   → Website Retail
   → Social/Manual Retail
   → Wholesale / Messenger
   → Reseller
   → Walk-in / Other approved channel
Ownership and source lineage survive allocation changes.
L. CURRENT INVESTOR TRACKING REQUIREMENT
For each investor, the future system should be able to determine:
- stock received / sourced
- remaining stock
- allocation by channel/custody
- quantity sold
- sales/source references
- agreed investor basis/terms
- amount payable
- amount remitted
- outstanding balance
- WhatTheCap margin/result where authorized and meaningful
M. DISCOVERY GAPS — MUST BE CONFIRMED BEFORE FREEZE
1. Exact definition of a Sale for:
   - online paid retail
   - COD/COP
   - Messenger wholesale
   - walk-in
   - reseller-reported sale
2. Cancellation / return / refund rules.
3. Shipping / fulfillment rules.
4. Wholesale minimum quantities and price tiers.
5. Retail price rules / discounts / promos.
6. Investor agreement types and settlement timing.
7. Reseller pricing, custody, reporting, and remittance rules.
8. Supplier/source receiving process.
9. Stock reservation rules.
10. Damaged/lost stock responsibility.
11. Payment methods and money destinations.
12. Expense / abono rules.
13. Customer identity / duplicate handling.
14. Website stock sync behavior and oversell prevention.
15. Reblocking-service intake/liability/completion rules.
16. Reblocking-machine inventory, quote, warranty, delivery, and payment rules.
17. User/staff permissions and sensitive financial access.
18. Exact reporting/KPI requirements.
N. AUTHORITY / CHANGE CONTROL
This is a discovery draft only.
No provisional rule ID is final.
No system build should treat these statements as frozen implementation authority.
Rules become authoritative only after owner validation, contradiction resolution, and explicit adoption/freeze.
END — BUSINESS RULE REGISTER DISCOVERY DRAFT V0.1
O. SALES / RESERVATION RULES — DISCOVERY UPDATE 2026-09-30
WTC-BR-SAL-001 — Sale Establishment
Working rule:
For prepaid transactions, a Sale is established when full payment is actually received and verified. Website COD is an approved exception: it becomes SOLD/PAID only when courier COD remittance/payment is confirmed. Shipping/fulfillment may occur earlier for COD.
Implementation effect:
Confirmed order, reservation, downpayment, and partial payment do not establish a Sale.
WTC-BR-SAL-002 — Reservation State
Working rule:
Partial payment/downpayment creates a RESERVED state only. Reserved stock is unavailable to other buyers during the reservation window but is not counted as sold.
WTC-BR-SAL-003 — Reservation Validity and Downpayment
Working rule:
Minimum downpayment is ₱500. Standard reservation validity is 72 hours / 3 days from confirmed downpayment. Downpayment is non-refundable by default. If full payment is not completed before expiry, the reservation expires and the item returns to AVAILABLE stock.
Implementation effect:
For transactions below ₱500, full payment is the default unless owner approves another arrangement.
WTC-BR-SAL-004 — Reservation Extension
Working rule:
Reservation extension beyond 72 hours requires owner approval and a new explicit expiry date/time.
P. SHIPPING / FULFILLMENT RULES
WTC-BR-SHP-001 — Shipping Status Separation
Working rule:
SOLD, SHIPPED, and DELIVERED are separate states.
For prepaid transactions, SOLD = verified full payment. For Website COD, SOLD/PAID = courier COD remittance/payment confirmed.
SHIPPED = parcel handed to courier and waybill/tracking proof sent to customer.
DELIVERED = customer actually receives the parcel.
WTC-BR-SHP-002 — Standard Fulfillment Lifecycle
Working rule:
Normal order lifecycle is SOLD → PREPARING → SHIPPED → DELIVERED.
WTC-BR-SHP-003 — Shipping Fee Responsibility
Working rule:
Customer pays shipping by default. Shipping fee is separate from product price. WhatTheCap may shoulder shipping only by owner-approved exception, promo, or defined membership benefit.
WTC-BR-SHP-004 — Re-Delivery / RTS
Working rule:
Additional re-delivery shipping is customer-paid by default. Eligible membership tiers may receive support subject to defined program rules and verification.
WTC-BR-SHP-005 — Customer-Caused Failed Delivery
Working rule:
If failed delivery/RTS is caused by incorrect, incomplete, or customer-provided address/contact details, the customer pays the additional shipping cost even if a member, unless owner approves an exception.
Q. MEMBERSHIP / LOYALTY
WTC-BR-MEM-001 — Tier-Based Benefits
Working rule:
WhatTheCap membership/reseller benefits should be tier-based. Shipping/re-delivery perks may vary by tier.
Open decision:
Exact tiers, points, qualifying thresholds, benefit limits, redemption, expiry, and economics are not yet frozen.
R. AUCTION / BIDDING
WTC-BR-AUC-001 — Auction Is an Allocation / Sales Channel
Working rule:
Auction inventory remains part of the one master inventory truth and uses an AUCTION allocation/state. Moving stock into Auction is not a Sale.
WTC-BR-AUC-002 — Simple Controlled Auction V1
Working rule:
Initial auction implementation should use a controlled listing + bid log + winner confirmation + payment flow rather than a complex realtime marketplace.
Working flow:
Auction Listing → Bid → Bid Log → Highest Valid Bid → Winner Confirmation → Payment → SOLD → Fulfillment.
WTC-BR-AUC-003 — Ownership Survives Auction
Working rule:
Investor/source/batch lineage remains intact when stock is placed in Auction and when the item is sold.
Open decisions:
starting bid, increment, reserve, closing behavior, payment deadline, unpaid winner, next bidder, bid withdrawal, shipping, investor settlement, condition disclosure.
S. CAP CARE
WTC-BR-SVC-002 — Cap Care Service Line
Working rule:
Cap Care is a dedicated service line including Cap Cleaning, Reblocking, Cleaning + Reblocking, and future adopted services.
Working lifecycle:
Service Request → Intake → Assessment → Quote/Price → Customer Approval → Service In Progress → Ready → Paid → Returned/Completed.
Implementation effect:
Cap Care requires its own service records and must not be modeled as product inventory sale.
T. STOREFRONT / CATALOG
WTC-BR-CAT-001 — Product Categories
Working direction:
Storefront may include Caps, Apparel, Accessories, and Equipment.
WTC-BR-CAT-002 — Collections Are Merchandising Groups
Working rule:
Collections are distinct from product Category and may include products from multiple categories. One product may belong to multiple collections.
U. RETURN POLICY DOMAIN
WTC-BR-POL-001 — Return Policy Must Be Channel-Specific
Working rule:
Return/refund/cancellation policy must eventually distinguish Retail, Wholesale, Auction, Cap Care, and Equipment/Reblocking Machine.
Open decision:
Exact rules remain to be defined.
V. ARCHITECTURE STATUS
Whimsical 
W. SALES / PAYMENT / WEBSITE COD — APPROVED DISCOVERY UPDATE 2026-10-01
WTC-BR-COD-001 — Channel-Specific COD
Approved rule:
Website Retail may use COD. Retail closed through Messenger/Instagram is Payment First. Wholesale closed through Messenger is Payment First under the current V1 direction.
WTC-BR-COD-002 — COD Confirmation and Stock Commitment
Approved rule:
A WooCommerce COD checkout does not by itself lock stock. COD stock becomes COMMITTED and unavailable to other buyers only after automated confirmation/risk screening and any required manual review. A confirmed COD order is not yet a Sale.
WTC-BR-COD-003 — Hybrid COD Confirmation / Risk Review
Approved rule:
Use automated confirmation first. Flagged/suspicious orders route to manual review; a risk flag is not an automatic rejection. Initial risk flags include invalid/incomplete contact details, ambiguous address, repeated customer-caused COD/RTS history, unusually high value/quantity, duplicate/repeated orders in a short period, failed automated confirmation, and owner/staff manual flag. Exact thresholds remain open.
WTC-BR-COD-004 — COD Fulfillment / Cancellation
Approved rule:
Confirmed COD stock enters PREPARING with a target of shipment within 1–2 business days. Missing the target creates a Needs Attention exception, not automatic cancellation. Customer cancellation before SHIPPED may release committed stock back to AVAILABLE. After SHIPPED, refusal/cancellation is treated as failed delivery/RTS.
WTC-BR-COD-005 — COD Sale Establishment / Remittance
Approved rule:
Website COD does not become financially SOLD/PAID when ordered, shipped, or merely delivered. The sequence is DELIVERED → COD PENDING REMITTANCE → COD REMITTANCE RECEIVED/CONFIRMED → SOLD/PAID. Product amount and shipping fee are collected by the courier. No extra COD handling/service fee in V1.
WTC-BR-COD-006 — COD Failure Responsibility / Eligibility
Approved rule:
Customer-caused failed delivery/RTS makes the customer responsible for re-delivery shipping and records a customer failure event. Carrier/WhatTheCap-caused failure does not charge the customer for re-delivery and does not count against customer COD eligibility. Two customer-caused failed COD/RTS incidents disable COD for that customer; reactivation requires Owner/Admin review and approval.
WTC-BR-PAY-001 — Current Manual Payment Methods
Confirmed current methods:
GCash, bank transfer including GoTyme, and cash for in-person transactions. Future WooCommerce online gateway/provider remains TO CONFIRM.
WTC-BR-PAY-002 — Payment Proof Is Not Payment Confirmation
Approved rule:
A screenshot or reference number may be collected as evidence but does not establish PAID. For GCash/bank/GoTyme, actual receipt must be verified before PAID/SOLD. Employee may collect/encode proof and mark for verification; Owner/Admin currently has final manual payment-verification authority.
WTC-BR-PAY-003 — Cash In Person
Approved rule:
Actual cash physically received by an authorized person is immediately PAYMENT VERIFIED / PAID, with receipt/transaction reference recorded.
WTC-BR-PAY-004 — Underpayment / Overpayment
Approved rule:
Underpayment is recorded at the actual amount received with PARTIAL / BALANCE DUE and is not SOLD unless it is a valid reservation/downpayment case. If required total is fully covered by an overpayment, the order may be PAID, but the excess must be tracked separately as refund due, customer credit, or another owner-approved application and must never be treated as extra sales revenue.
WTC-BR-PAY-005 — Payment Destination Tracking
Approved rule:
Every payment records Payment Method and Receiving Account/Destination separately, plus amount received, actual payment timestamp, verification status, verified by, and reference/receipt.
WTC-BR-RES-005 — Verified Reservation Start / Payment Timestamp
Approved rule:
The 72-hour reservation clock starts only when the downpayment is actually verified received. If the remaining balance was actually transferred before expiry and a reliable transaction timestamp proves it, the payment counts as on time even if owner verification occurs later. A balance paid after actual expiry does not automatically revive the old reservation; Owner reviews current stock and may honor, create a new reservation, refund, or create approved customer credit.
WTC-BR-REF-001 — Refund Authorization / Routing
Approved rule:
Only Owner/Admin may approve and finalize refunds. Employee may collect/encode request and evidence. Refund normally returns through the original payment method where practical; an alternate method requires Owner approval and recorded reason. Refund records retain original transaction link, reason, amount, approver, method, timestamp, and reference.
WTC-BR-REF-002 — Full / Partial Refund and History
Approved rule:
System supports FULL REFUND and PARTIAL REFUND. Total refund may not exceed verified amount actually received unless a separate approved compensation/credit event exists. Full refund before fulfillment completion may result in REFUNDED/CANCELLED as applicable. Partial refund leaves the Sale intact with PARTIALLY REFUNDED financial status. Original Sale history is preserved.
WTC-BR-DSC-001 — Discount / Promo Authority
Approved rule:
Owner/Admin controls discretionary/manual discounts. Employees may encode/apply only pre-approved or system-defined discounts. A preconfigured active website promo code may be system-approved automatically.
WTC-BR-DSC-002 — Discount Recording
Approved rule:
Preserve base/original selling price, discount type, discount amount, reason/promo code, approver when manual, and final selling price/net sales amount.
WTC-BR-GTW-001 — Future Online Gateway Authority
Approved architecture rule:
A trusted payment-gateway success webhook/event may auto-confirm PAID. Customer screenshots cannot override authoritative gateway status.
REMAINING OPEN IN THIS DOMAIN
Chargebacks, tax/accounting treatment, exact WooCommerce payment gateway/provider, exact COD high-risk thresholds, and cash reconciliation cadence remain open.
architecture phase has started.
Primary board:
WHATTHECAP PRODUCTION SYSTEM V1 — MASTER ARCHITECTURE
Next detailed board:
WHATTHECAP — INVENTORY / OWNERSHIP / ALLOCATION FLOW
No implementation authority is granted by starting the Whimsical phase
X. INVENTORY / RECEIVING — APPROVED DISCOVERY UPDATE 2026-10-01
WTC-BR-INV-005 — Receiving Verification Before Availability
Approved rule:
Stock arrival alone does not make inventory AVAILABLE. Receiving follows EXPECTED → RECEIVED PENDING CHECK → VERIFIED RECEIVED → AVAILABLE / ALLOCATED. Verify actual quantity, condition, supplier/source, economic owner, received by, reference/proof, and batch/source before availability.
WTC-BR-INV-006 — Expected vs Actual Receiving Variance
Approved rule:
Actual physical quantity received is the inventory truth. Expected quantity remains recorded for comparison. Any discrepancy becomes RECEIVING VARIANCE / NEEDS ATTENTION; the system must not force actual stock to equal supplier paperwork.
WTC-BR-INV-007 — Persistent Batch / Source Identity
Approved rule:
Batch/Source ID survives allocation, custody, reservation, auction, reseller release, return, and recovery movements. Partial allocation splits retain the same batch identity unless there is a genuine change in source, basis, or economic owner.
WTC-BR-INV-008 — Hybrid Batch Consumption
Approved rule:
For a Sale, the system proposes the oldest eligible batch/source after SKU, allocation, ownership/source, and other eligibility constraints are satisfied. Authorized users may override the proposed source when the actual physical source differs, but the override must preserve reason and audit history.
WTC-BR-INV-009 — Controlled Inventory Movements
Approved rule:
Every material stock movement records From State/Allocation, To State/Allocation, Quantity, Batch/Source, Actor, Timestamp, and Reason/Reference. Reallocation or custody movement is not a Sale. Normal Retail↔Wholesale movements may be performed by authorized staff. Sensitive investor, reseller-custody, damaged/lost, or correction movements require Owner/Admin approval.
WTC-BR-INV-010 — No Silent Quantity Overwrite
Approved rule:
Stock corrections and count adjustments must be recorded as traceable adjustment events. Preserve prior state/history, variance, reason, evidence, approver, and resulting balance. Employee may count/report and prepare evidence; Owner/Admin approves quantity-changing corrections in V1.
WTC-BR-INV-011 — Damaged / Lost / Unavailable State
Approved rule:
Damaged, lost/missing, or unavailable stock is not automatically a Sale. Preserve batch/source and economic owner. Economic responsibility for the loss is resolved separately by the applicable investor, reseller, supplier, courier, employee, or business rule. Recovery/reclassification creates a new event rather than overwriting the original event.
WTC-BR-INV-012 — Return to Sellable Inventory
Approved rule:
Refund or cancellation alone does not restore inventory to AVAILABLE. The physical item must be recovered under WTC control and condition-checked. The outcome is AVAILABLE, NEEDS INSPECTION, DAMAGED, or UNAVAILABLE as applicable.
WTC-BR-INV-013 — Oversell / Last-Unit Conflict
Approved rule:
Only approved available allocation may be promised. When two channels compete for the final unit, the first authoritative commitment event wins. The other transaction becomes STOCK CONFLICT / NEEDS ATTENTION. The system must not intentionally create negative sellable inventory to satisfy both.
WTC-BR-INV-014 — Physical Stock Count Variance
Approved rule:
Periodic stock count compares Expected System Quantity with Actual Physical Quantity. A variance creates an adjustment case with evidence and approval; it does not directly rewrite inventory.
WTC-BR-INV-015 — Inventory Source of Truth
Approved rule:
Business OS remains the authoritative inventory/ownership ledger for V1. WooCommerce may mirror retail availability/order context. GHL and n8n do not own inventory truth.
Y. LOGICAL SALES VIEW DIRECTION — TECHNICAL DESIGN NOTE
WTC-TD-SALES-001 — One Canonical Sales Truth, Multiple Views
Proposed technical direction, not yet frozen physical schema:
Retail and Wholesale should not become independent master Sales ledgers. Use one canonical Sales truth with channel/source fields and channel-specific operational views where useful. WooCommerce is a Retail order source/storefront; Business OS remains the authoritative operational Sales/Inventory ledger under the current architecture.
Z. INVESTOR — APPROVED DISCOVERY UPDATE 2026-10-01
WTC-BR-INVEST-001 — Persistent Economic Ownership
Investor-owned stock remains investor-owned across allocations/custody until a valid Sale, return/pull-out, buyout, or other explicitly approved ownership-changing event.
WTC-BR-INVEST-002 — Multiple Agreement Models
V1 supports multiple approved investor agreement models per investor/batch, including Fixed Basis, Revenue/Profit Split, Commission/Consignment, and other approved models.
WTC-BR-INVEST-003 — Versioned Investor Terms
Investor terms are versioned with effective date. Old recognized transactions retain the applicable historical terms; staff may not silently overwrite basis/commission/split terms.
WTC-BR-INVEST-004 — Flexible Settlement Timing
Settlement timing is configurable per approved investor agreement rather than one global cadence.
WTC-BR-INVEST-005 — Investor Payable Recognition
Investor payable arises only from an actual recognized Sale of exact investor-owned stock. Allocation, reservation, shipment, reseller release, or Website COD delivery alone does not create investor payable.
WTC-BR-INVEST-006 — Payable and Remittance Separation
Payable, remittance, and outstanding balance are separate records/states. Partial settlement is allowed and remaining outstanding remains visible until fully resolved.
WTC-BR-INVEST-007 — Pull-out / Return Control
Unsold investor stock may be requested for pull-out/return and must be physically verified before custody changes. Reserved, committed, sold, or otherwise obligated stock cannot be simply pulled without resolving the obligation.
WTC-BR-INVEST-008 — Damage/Loss Evidence-First
Damaged/lost investor stock is not automatically a Sale or payable. Record item/batch, custody/location, evidence, and event facts first. Liability follows applicable agreement or Owner/Admin-approved resolution.
WTC-BR-INVEST-009 — Investor Dispute / Adjustment
Disputed payable is placed UNDER REVIEW. Preserve the original calculation, claim, and evidence. Any approved correction uses a linked adjustment/reversal event; no silent overwrite.
WTC-BR-INVEST-010 — Investor Confidentiality
Sensitive investor basis, commission, agreement terms, payable, settlement, and financial details are restricted to Owner/Admin or explicitly authorized roles. Future investor read-only statement/dashboard capability is approved; initial V1 direct-access implementation remains to be confirmed during permissions/security closure.
AA. RESELLER — APPROVED DISCOVERY UPDATE 2026-10-01
WTC-BR-RES-001 — Reseller Qualification and Status
Controlled reseller stock release requires approved reseller status. Lifecycle: APPLICANT → QUALIFIED/APPROVED → ACTIVE → REVIEW/SUSPENDED → INACTIVE. Staff may gather evidence; Owner/Admin approves/suspends unless later delegated.
WTC-BR-RES-002 — Commercial Models
V1 supports both Upfront Purchase and Consignment/Pay-after-sale per approved reseller agreement.
WTC-BR-RES-003 — Stock Release Is Not Sale
Consignment stock release moves inventory to RESELLER-HELD custody and preserves SKU, qty, batch/source, owner, release date, and reseller. Release alone is not a Sale.
WTC-BR-RES-004 — Consignment Sale Recognition
Consignment Sale recognition requires reseller-reported exact SKU/qty validated against reseller-held batch/source allocation. Only then is the Sale recognized and amount due created.
WTC-BR-RES-005 — Amount Due / Remittance Separation
Recognized Sale → Amount Due → Due Date → Remittance → Outstanding/Overdue. Partial remittance is supported.
WTC-BR-RES-006 — Reseller Pricing/Basis
Approved reseller-specific pricing, basis, tier, or agreement terms may vary. Resellers cannot self-authorize pricing outside approved terms; discretionary exceptions require Owner/Admin approval.
WTC-BR-RES-007 — Reporting and Remittance Cadence
Reporting cadence and remittance due rules are configurable per reseller/agreement. Missed reporting or remittance becomes NEEDS ATTENTION/OVERDUE.
WTC-BR-RES-008 — Exposure and Release Gate
Each consignment reseller may have an approved exposure limit. New stock release checks active status, exposure, reporting currency, and suspension/default flags. Failed check → RELEASE HOLD / NEEDS APPROVAL.
WTC-BR-RES-009 — Default and Suspension
Reseller default lifecycle may include CURRENT → OVERDUE → UNDER REVIEW → SUSPENDED/COLLECTION → RESOLVED. Suspension does not erase outstanding obligations or stock accountability. Owner/Admin holds final suspension authority unless later delegated.
WTC-BR-RES-010 — Damage/Loss and Reconciliation
Damage/loss while in reseller custody is evidence-first and does not automatically become Sale/payment due. Periodic reconciliation compares Released, Sold, Returned, Remaining, Damaged/Lost, and Expected. Unexplained variance becomes RESELLER STOCK VARIANCE.
WTC-BR-RES-011 — Unsold Returns
Returned reseller stock must be physically received and condition-checked before AVAILABLE. Outcomes may include AVAILABLE, NEEDS INSPECTION, DAMAGED, or UNAVAILABLE.
WTC-BR-RES-012 — Versioned Reseller Terms
Pricing, basis, exposure limit, reporting cadence, remittance terms, and commercial model changes are versioned with effective date. Historical recognized transactions retain the applicable prior terms.
WTC-BR-RES-013 — Reseller Confidentiality
A reseller may only access their own approved stock/statement/account context. They must not access other reseller data, investor terms, WTC internal margin, or unrelated business financials.
.
AB. ARCHITECTURE CLOSURE RECONCILIATION — APPROVED 2026-10-01
AB-STATUS-001 — Current Project Gate
Canonical Logical Data Model is FROZEN. Physical Design has NOT started. Implementation is NOT authorized. Current authority sequence is: reconciled business rules + reconciled Whimsical architecture → verified recovery checkpoint → Physical Design → Build Specification → explicit implementation authorization.
AB-SOT-001 — Canonical Authority Boundaries
Business OS is the canonical operational authority for Party/Customer identity, operational Reference/Configuration values, inventory/ownership, authoritative Sale/payment recognition, reservations/commitments, investor/reseller settlement, stored value, events, exceptions, and related audit history.
WooCommerce is the retail storefront/cart/checkout/order-source context and does not become master inventory or financial truth.
GoHighLevel owns CRM/contact/conversation/pipeline/follow-up context and must not override Business OS-owned fields.
n8n is an orchestration/integration layer only and is never canonical business truth.
AB-ID-001 — Stable Canonical Identity
Every core entity uses a stable canonical ID independent of row number, display label, or external-system ID. External IDs are mappings. IDs must survive backup, restore, replay, reconciliation, and future migration without identity drift.
AB-PARTY-001 — Party / Role Model
PARTY is the higher-level identity for a Person or Organization. Customer, Investor, Reseller, Supplier/Source Party and other approved business roles attach to the same Party where applicable so one real person/company is not silently duplicated across relationship types.
AB-LOC-001 — Location / Custody Node
Inventory movements and custody changes use controlled Location/Custody Node identities rather than free-text locations. A node may represent a physical location, reseller custody, auction allocation, courier/in-transit state, return inspection state, damaged/unavailable state, or another approved custody/state context.
AB-APPROVAL-001 — Approval Record
High-risk governed actions may use an APPROVAL_RECORD that captures request/action, requester, approver/rejector, decision, reason, timestamp, and linked entity/event. Approval and posting may be separate events.
AC. SHIPPING / RETURNS — APPROVED CORE V1
WTC-BR-SHIP-001 — Prepaid Fulfillment States
Verified full payment establishes SOLD for prepaid paths. SOLD, PREPARING, SHIPPED and DELIVERED are distinct operational states.
WTC-BR-SHIP-002 — SHIPPED Definition
SHIPPED means the parcel was physically handed to the courier and waybill/tracking proof was sent to the customer.
WTC-BR-SHIP-003 — DELIVERED Definition
DELIVERED means the customer actually received the order.
WTC-BR-RET-001 — Standard Retail Return Window
Standard Retail return request window is 7 calendar days from Delivered. Late exceptions require Owner/Admin approval.
WTC-BR-RET-002 — Return Request Is Not Refund
Return workflow is request → review/approval → return in transit where applicable → received → inspected → refund/replacement/store-credit/exchange decision. A Return Request does not itself create a Refund.
WTC-BR-RET-003 — WTC Error / Carrier Loss
Wrong item, confirmed WTC error, or confirmed carrier loss/damage is handled without shifting confirmed business/carrier responsibility to the customer. Courier reimbursement/claim recovery is separate from the customer remedy and is not Sales revenue.
WTC-BR-RET-004 — Change of Mind
Valid change-of-mind returns within the Retail window require unused/unworn/original condition with tags/packaging where applicable. Customer normally pays return shipping. Original outbound shipping is generally non-refundable unless WTC/business cause applies.
WTC-BR-RET-005 — Inspection Before Availability
Returned inventory is PENDING INSPECTION until physically received and checked. Only after inspection may it become AVAILABLE, NEEDS REVIEW, DAMAGED, or UNAVAILABLE.
WTC-BR-RET-006 — No Standard Retail Restocking Fee
V1 has no standard Retail restocking fee. Measurable customer-caused loss of value may support a partial refund only under Owner/Admin review.
WTC-BR-RET-007 — Refund / Exchange History
Refunds, replacements and exchanges preserve the original Sale. Exchange is return/inspection → approved exchange → new stock allocation/fulfillment → separate payment/refund/credit difference where needed.
AD. CAP CARE — APPROVED CORE V1
WTC-BR-SVC-001 — Customer-Owned Item
A Cap Care customer item remains customer-owned and must never become sellable inventory.
WTC-BR-SVC-002 — Intake / Evidence
Intake records customer, item description, brand/model/color/material, requested service, pre-existing condition, photos, date, receiver, notes and applicable approval context.
WTC-BR-SVC-003 — Quote / Approval Before Major Work
Lifecycle includes Request → Intake/Received → Assessment → Quote → Customer Approval → In Progress. Major work does not begin before approval unless explicitly preapproved.
WTC-BR-SVC-004 — Scope Change
Add-on work or materially changed service scope requires an updated quote and customer approval before proceeding.
WTC-BR-SVC-005 — Service Issue / Liability
Possible WTC-caused damage → SERVICE ISSUE → Stop Work → Document → Owner/Admin Review. Resolution is evidence-first. Customer approval does not waive proven negligence.
WTC-BR-SVC-006 — Payment / Deposit
A job may require full payment or an approved deposit depending on the service. Exact pricing and deposit configuration remain configurable Physical Design/operations data.
WTC-BR-SVC-007 — Ready / Return / Completion
READY is not Completed. Custody remains tracked until the item is returned. If shipped back, shipment alone does not complete the job until delivered or otherwise resolved.
WTC-BR-SVC-008 — Unclaimed Items
Default Ready pickup follow-up window is 14 calendar days before Unclaimed/Needs Follow-Up handling. No automatic disposal or sale is permitted; Owner/Admin review and any required legal/policy validation apply.
AE. EQUIPMENT / REBLOCKING MACHINE — APPROVED CORE V1
WTC-BR-EQP-001 — Versioned Quote
Equipment quote is versioned and includes quote ID/date, customer, model, accessories/inclusions, price, delivery/setup terms, warranty/support terms, validity, and approver.
WTC-BR-EQP-002 — Quote Validity
Default quote validity is 7 calendar days unless the quote explicitly states otherwise.
WTC-BR-EQP-003 — Reservation / Sale
Verified downpayment = RESERVED. Verified full payment = SOLD. Reservation expiry/extension/release follows explicit controlled decision.
WTC-BR-EQP-004 — Equipment Unit Identity
Where available, serial/unique unit identity is preserved through inventory, Sale, handover, warranty, support and replacement history.
WTC-BR-EQP-005 — Delivery / Setup
Dispatch is not Delivered. Delivery/handover evidence is required. Setup/training is a separate service obligation from delivery.
WTC-BR-EQP-006 — Warranty Workflow
Warranty claim intake captures unit/serial, Sale, date, issue, evidence, usage context and triage. Claim → triage → inspection → coverage decision → repair/replace/reject/paid service.
WTC-BR-EQP-007 — Warranty Replacement
Warranty replacement links back to the original Sale and unit lineage and does not create duplicate revenue.
WTC-BR-EQP-008 — Safety Issue
Safety-related issue triggers Stop Use / Do Not Operate / Safety Review.
AF. AUCTION — APPROVED CORE V1
WTC-BR-AUC-001 — Auction Allocation Is Not Sale
Moving stock into AUCTION allocation reduces availability elsewhere but does not create a Sale or change economic ownership.
WTC-BR-AUC-002 — Listing Controls
Auction listing records item/SKU/batch/source/owner, condition, starting bid, minimum increment, optional reserve, start/close, shipping terms, payment deadline and creator.
WTC-BR-AUC-003 — Bid Log
Bid log is append-only. Validity checks identity, increment, timing and allowed exception/fraud rules. Bid history is never silently rewritten.
WTC-BR-AUC-004 — Winner / Sale Recognition
Highest valid bid meeting reserve at close creates Winner Pending Payment, not immediate Sale. Verified full payment creates SOLD and fulfillment.
WTC-BR-AUC-005 — Default Payment Window
Default winner payment deadline is 24 hours from close unless the listing states otherwise.
WTC-BR-AUC-006 — Unpaid Winner
Unpaid Winner / Payment Default creates no Sale. Owner/Admin may use controlled next-highest-valid-bidder fallback with original auction reference, approved fallback price and a new payment deadline. No silent winner swap.
WTC-BR-AUC-007 — Reserve Not Met
Reserve not met means no automatic Sale. Owner/Admin may leave unsold, relist, or negotiate separately; a negotiated sale is a new commercial event.
WTC-BR-AUC-008 — Condition / Shipping
Condition and shipping terms are disclosed per listing. Investor ownership and payable lineage survive auction allocation and final recognized Sale.
AG. LOYALTY / MEMBERSHIP / REFERRAL / STORED VALUE — APPROVED CORE V1 FRAMEWORK
WTC-BR-LOY-001 — Coordinated Framework
Membership, tiers, points, referrals, reseller perks, Gift Card and Store Credit use one coordinated customer identity framework while remaining separate value/ledger concepts where required.
WTC-BR-LOY-002 — Points Ledger
Points balance is derived from ledger events such as Earn, Redeem, Expire and Adjust. No direct balance overwrite.
WTC-BR-LOY-003 — Earn Trigger
Points/rewards arise only from completed eligible transactions. COD eligibility follows recognized COD Sale after courier remittance confirmation. Cancelled/refunded transactions lose unearned value through linked reversal/adjustment events.
WTC-BR-LOY-004 — Referral Qualification
Referral reward requires a valid first eligible Sale, not merely a click, form, inquiry, or unpaid order. Self/duplicate/fake referrals are reviewable.
WTC-BR-LOY-005 — Gift Card / Store Credit
Gift Card and Store Credit are separate stored-value accounts/origins. Ledger-based issuance/redemption/restoration/adjustment applies. Partial redemption and mixed payment are supported.
WTC-BR-LOY-006 — Stacking / Overrides
Stored value functions as tender where approved. Points/promo/member/manual-discount stacking follows controlled policy. Discretionary manual value/adjustment outside automation requires Owner/Admin approval and reason.
WTC-BR-LOY-007 — Refund Restoration
Refunds restore value to the appropriate original stored-value path where applicable and reverse related loyalty effects according to the approved ledger rules.
WTC-BR-LOY-008 — Still To Configure
Program name, enrollment details, tier names/thresholds, earn/redemption rates, expiry/legal treatment, referral amounts and perk quotas remain TO CONFIRM / configurable and are not silently invented by the system.
AH. WEBSITE — APPROVED CORE V1 ARCHITECTURE
WTC-BR-WEB-001 — Website Role
Website = discovery + Retail transaction + Wholesale qualification/lead capture. It is not master inventory, investor/reseller settlement, or internal operations truth.
WTC-BR-WEB-002 — Core Navigation Direction
Approved core sections: Home, Shop, Collections, Wholesale, Reseller, Cap Care, Reblocking Machine, Auction, Rewards/Club, About, Contact. Exact presentation labels/layout remain frontend Physical Design.
WTC-BR-WEB-003 — Shop vs Collections
Shop is transactional catalog. Collections are merchandising groups and do not duplicate SKU/inventory truth.
WTC-BR-WEB-004 — Wholesale / Reseller / Service Entry
Wholesale website captures/qualifies and routes to human-assisted Messenger/IG closing. Reseller application ≠ approval. Cap Care request ≠ final assessment/quote/approval. Equipment inquiry/demo/quote may remain higher-touch.
WTC-BR-WEB-005 — Website Availability
Website availability uses approved Retail Allocation only. It must not promise stock committed/reserved/reseller-held/auction/damaged/lost or allocated elsewhere.
WTC-BR-WEB-006 — Woo Order Is Not Canonical Sale
WooCommerce Order Created does not itself establish canonical Sale. Prepaid requires verified/trusted payment authority; COD requires courier remittance-confirmed financial recognition.
WTC-BR-WEB-007 — Guest Checkout / Account
Guest Checkout is allowed. Customer account is optional and may show permitted profile/order/rewards context but does not become authoritative business truth.
WTC-BR-WEB-008 — Frontend Governance
Mobile-first UX, transparent pricing, safe error handling, consent distinction, role-based admin, staging for high-risk changes, plugin discipline and backup/recovery are required design controls.
AI. GHL CRM — APPROVED CORE V1 ARCHITECTURE
WTC-BR-GHL-001 — CRM Authority
GHL owns relationship/contact context, conversations, pipelines, follow-up, tasks and communication context. It does not own canonical inventory, economic ownership, authoritative Sale/payment recognition, investor payable or reseller settlement.
WTC-BR-GHL-002 — Canonical Contact / Dedupe
One real person/business should map to one canonical CRM contact where possible. Dedupe priority uses exact phone, exact email, trusted external/customer ID and manual review for ambiguous matches. Merge is controlled.
WTC-BR-GHL-003 — Mirrored Fields
Business-OS-owned operational/financial fields mirrored to GHL are read-only in practice. Staff must not edit mirrored fields to “fix” authoritative state.
WTC-BR-GHL-004 — Pipeline Meaning
Pipeline/stage changes may drive tasks, reminders, routing and nurture but are not authoritative postings for money, inventory or Sale recognition.
WTC-BR-GHL-005 — Consent / Access
Transactional vs marketing communication is distinct. Consent/source/time/status/opt-out must be traceable. Role-based access applies and investor-sensitive information is not broadly exposed in CRM.
WTC-BR-GHL-006 — Sync Failure / Conflict
Sync conflicts follow Business OS authority for Business-OS-owned fields. No blind last-write-wins. Ambiguous conflicts become Sync Conflict / Needs Review. Failed sync retries only under safe rules and must not pretend success.
AJ. n8n / CANONICAL INTEGRATION — APPROVED CORE V1 ARCHITECTURE
WTC-BR-INT-001 — Event / Identity Contract
Core integration uses stable canonical IDs, external ID mappings, Event IDs, versioned Event Envelope, Correlation IDs, canonical statuses/enums, machine-safe timestamps and explicit field ownership.
WTC-BR-INT-002 — No Blind Two-Way Sync
Sync direction is defined per field/system authority. External systems may mirror approved values but cannot independently create competing canonical truth.
WTC-BR-INT-003 — Idempotency
Critical events require stable idempotency keys based on canonical event/business identity, not workflow execution ID. Duplicate processing/double-posting must be prevented.
WTC-BR-INT-004 — Retry / Dead Letter
Only safe transient failures are retried under bounded policy. Business/data failures become exceptions. Failed/dead-letter events preserve original payload and identity.
WTC-BR-INT-005 — Authority-First Posting
Authoritative posting occurs only when sufficient authoritative evidence exists. Downstream mirrors must not create premature Sale/payment/inventory truth.
WTC-BR-INT-006 — Conflict / Replay / Reconciliation
Sync Conflict registry, controlled replay, periodic reconciliation, and preserved original event identity are required. Deterministic conflicts may auto-heal only when authority is unambiguous; ambiguous cases require human review.
WTC-BR-INT-007 — Safe Pause / Recovery
Integration must support safe pause/kill switch and safe degradation. If an authoritative dependency is unavailable, dependent decisions stop/queue rather than guess. Recovery order is authoritative data → IDs/mappings → integration config → dependent systems → reconciliation → resume.
AK. BUSINESS OS / CANONICAL LOGICAL DATA MODEL — FROZEN
WTC-BR-LDM-001 — Logical Classes
Canonical logical model uses MASTER, TRANSACTION, LEDGER, EVENT and VIEW classes. VIEW is never source of truth.
WTC-BR-LDM-002 — Core Inventory Lineage
Product → SKU → Batch/Stock Source → Economic Owner → Allocation/Custody → Stock Commitment → Sale Item Source Consumption → Inventory Movement must remain traceable.
WTC-BR-LDM-003 — Sale / Payment Separation
One canonical Sale entity spans channels. Sale Item is mandatory for item-level inventory/economic lineage. Payment is separate from Sale and may be zero/one/many. Payment Allocation supports one payment across one or more obligations where needed.
WTC-BR-LDM-004 — Reservation / Commitment
Reservation and COD confirmation may use a common Stock Commitment mechanism while remaining distinct business reasons. Inventory Movement and Stock Commitment are different concepts.
WTC-BR-LDM-005 — Investor / Reseller Lineage
Investor payable traces Investor → Agreement Version → Batch → Sale Item Source → Payable → Remittance. Reseller trace preserves Agreement → Release → Sale Report → Amount Due → Remittance → Reconciliation.
WTC-BR-LDM-006 — Domain Separation
Return Case is separate from Refund. Service Job/customer-owned item is separate from inventory. Equipment Unit has independent lifecycle identity. Auction/Bid remains separate until valid payment creates canonical Sale. Loyalty/Stored Value remain ledger-based.
WTC-BR-LDM-007 — Event / Ledger Distinction
Central Event Log records that material things happened but does not replace dedicated domain ledgers. Derived balances and dashboards are rebuildable from authoritative records.
WTC-BR-LDM-008 — Correction / Delete Policy
Critical financial/inventory/audit records are not silently overwritten or hard-deleted after posting. Correct through linked adjustment/reversal/void/cancel/archive policy as appropriate.
WTC-BR-LDM-009 — Exception Register
Exception/Conflict Register is a first-class entity for stock conflict, payment mismatch, sync failure, duplicate identity, unexplained variance, investor dispute, reseller reconciliation issue, Auction Review, Service Issue and other approved exception types.
WTC-BR-LDM-010 — Reference / Configuration Registry
Business OS is the active canonical operational Reference/Configuration authority for statuses, channels, payment methods, movement reasons, return reasons, service types, roles, controlled enums and safe configurable thresholds.
WTC-BR-LDM-011 — Posting Authority
Each canonical register must define who/system may create, update, approve, view, reverse and mirror. Quantity/financially sensitive postings use controlled authorization and auditability.
WTC-BR-LDM-012 — Recovery / Migration Integrity
Backup/restore and future migration preserve canonical IDs, relationships, agreement versions, event ordering, ledger entries and audit metadata. Current balances alone are insufficient recovery truth.
AL. RECOVERY / GOVERNANCE — APPROVED CORE CONTROL
WTC-BR-REC-001 — Diagnostic Chain
Reported Reality → System Result → Variance → Source Records → Event/Posting History → Expected Logic → Root Cause → Classification → Controlled Resolution.
WTC-BR-REC-002 — Preserve Before Mutation
Unexpected state requires STOP → preserve current state → capture evidence → diagnose → classify → decide → resume only after authorization. Do not fix forward by improvising outside scope.
WTC-BR-REC-003 — No Forced Calculated Results
Never manually force calculated inventory, balances, payables or other derived outputs to match expectations. Correct authoritative source events/records through controlled adjustment/reversal where justified.
WTC-BR-REC-004 — Backup Is Not Enough
Backup exists only as a recovery control when it is identifiable, readable, restorable/testable and can be reconciled after recovery. Recovery must not depend on one tool/account only.
WTC-BR-REC-005 — Verified Recovery Checkpoint V0.5
V0.5 captures reconciled Whimsical Boards 01–21, Project Bootstrap snapshot, Business Rule Register snapshot and manifest in Google Drive plus GitHub mirror. V0.1–V0.3 remain historical checkpoints. The attempted V0.4 Drive folder is empty and is NOT a valid recovery point.
AM. REMAINING OPEN / DEFERRED ITEMS — DO NOT INVENT
The following remain legitimately open or configurable and must not be converted into business truth without approval:
- chargebacks and exact tax/accounting treatment;
- exact website payment gateway/provider;
- exact cash reconciliation cadence;
- exact loyalty program name, enrollment mechanics, tier names/thresholds, earn/redemption rates, expiry/legal treatment and perk quotas;
- exact dashboard KPIs, formulas, thresholds, refresh cadence and access layout;
- exact infrastructure provider/size, database, reverse proxy, hosting, firewall, monitoring, secrets, staging/deployment and branch strategy;
- exact RPO/RTO, backup retention/frequency, incident severity matrix, rollback thresholds, escalation contacts, disaster-declaration criteria, security-incident path and maintenance windows;
- exact Physical Design choices: Google Sheets tab/table split, exact columns, canonical ID syntax, validations, protected ranges, Apps Script boundaries, staff permission matrix, sensitive investor partition implementation, portal/access mechanics and exact integration payload/endpoints;
- future AI/Voice provider, languages, allowed actions, authentication/consent, retention, costs and rollout.
END OF ARCHITECTURE RECONCILIATION ADDENDUM — 2026-10-01
AN. CONTROLLED LOGICAL MODEL AMENDMENT — APPROVED 2026-10-01
AMENDMENT STATUS
APPROVED BY BUSINESS OWNER
Applies to frozen Canonical Logical Data Model.
Purpose: add explicit canonical homes for already-approved operational events without changing underlying business rules.
AN-LDM-001 — ORDER / ORDER LINE
ORDER and ORDER LINE are first-class transaction entities representing commercial/order obligations before or independent of canonical Sale recognition.
Reason: WooCommerce Order Created ≠ canonical Sale; COD and other flows may require confirmation/commitment/fulfillment before Sale recognition.
Minimum relationship:
PARTY → ORDER → ORDER LINE → STOCK COMMITMENT / FULFILLMENT → SALE when applicable.
ORDER status, financial status, and fulfillment status remain distinct.
AN-LDM-002 — FULFILLMENT / SHIPMENT
FULFILLMENT is a first-class operational transaction entity representing preparation, dispatch, courier handoff, tracking/waybill evidence, delivery, RTS, lost-in-transit, redelivery, and related fulfillment events.
FULFILLMENT does not itself establish financial Sale recognition.
It may link to ORDER and, when applicable, SALE.
AN-LDM-003 — EVIDENCE REFERENCE
EVIDENCE_REFERENCE is a first-class audit/support entity for external evidence such as payment proof, receiving photos, waybill/tracking evidence, return inspection evidence, Cap Care before/after photos, equipment handover/warranty evidence, auction evidence, and approval/supporting documents.
Evidence stores secure references/metadata, not secrets.
Evidence may group multiple artifacts under one EVIDENCE_GROUP_ID and link to any authorized canonical entity/event.
AN-LDM-004 — STOCK RECEIPT / STOCK RECEIPT LINE
STOCK_RECEIPT and STOCK_RECEIPT_LINE are first-class inventory transactions representing expected receiving, physical receipt, count, condition/source/ownership verification, expected-vs-actual variance, and the creation/linking of verified Batch/Stock Source records.
Minimum lifecycle:
EXPECTED → RECEIVED PENDING CHECK → VERIFIED RECEIVED → AVAILABLE/ALLOCATED or exception state.
Receipt verification must not silently overwrite expected values.
AN-LDM-005 — Freeze Integrity
The above additions are controlled structural amendments to the frozen logical model, not new business-policy invention.
All prior approved rules remain in force.
Canonical Logical Data Model status after this amendment:
FROZEN — AMENDED BY AN-LDM-001 THROUGH AN-LDM-004.
AO. PHYSICAL DESIGN DECISIONS — APPROVED 2026-10-01
PD-01 APPROVED — Operations + Private partition.
Operational canonical data and daily staff workflows reside in the Operations file. Genuine owner-only/confidential investor and sensitive commercial/finance data reside in a separate Private file.
PD-02 APPROVED — Prefix + ULID canonical IDs plus separate human-readable reference numbers.
Canonical IDs are stable system identity and are never based on row numbers.
PD-03 APPROVED — Controlled Logical Model Amendment.
ORDER/ORDER LINE, FULFILLMENT, EVIDENCE_REFERENCE, and STOCK_RECEIPT/STOCK_RECEIPT_LINE are formally added as above.
PD-04 APPROVED — Reseller operational/private hybrid partition.
Operational reseller status, custody, releases, reporting and reconciliation may reside in Operations. Sensitive negotiated reseller basis/pricing/exposure/commercial terms may reside in Private where confidentiality requires.
PD-05 APPROVED — Permission architecture.
Four high-level permission classes: Owner/Admin, Operations Staff, Read-Only/Reporting, Automation/System.
Actual table/action permissions must distinguish View, Create, Edit Draft, Approve, Post, Reverse, and Admin authority.
PD-06 DEFERRED — Exact retention durations.
Posted financial, inventory, settlement and audit history must be preserved. Exact legal/accounting retention periods remain TO CONFIRM and must not be invented before production.
PD-07 APPROVED — Controlled opening-stock migration.
Legacy stock is not copied as unquestioned truth. Migration requires physical count/source-owner review, explicit Opening Migration Event/posting, variance reconciliation, and Owner acceptance before cutover.
PD-08 APPROVED PRINCIPLE — Dashboard is a rebuildable read-only VIEW.
Dashboard never writes canonical business truth. Exact KPI set/layout remains deferred to Dashboard Physical Design.
END CONTROLLED LOGICAL MODEL / PHYSICAL DESIGN DECISION AMENDMENT — 2026-10-01
AP. PHYSICAL DESIGN QA PASS 1 DECISIONS — APPROVED 2026-10-01
QA-D01 APPROVED — QUOTE + QUOTE_VERSION
QUOTE and QUOTE_VERSION are approved as first-class canonical structures for versioned commercial offers, including Cap Care and Equipment where quoted terms apply.
Purpose: preserve the exact version, validity, pricing, inclusions, warranty/support terms, and customer approval history without overwriting prior terms.
AP-LDM-001 — QUOTE
Minimum logical role:
QUOTE_ID, quote type/domain, Party, related business entity, status, current version reference, created-at/by metadata.
AP-LDM-002 — QUOTE_VERSION
Minimum logical role:
QUOTE_VERSION_ID, QUOTE_ID, VERSION_NO, VALID_UNTIL, monetary components, terms/warranty references, created metadata, customer approval timestamp, superseded-version link, status.
Historical approved quote versions must remain preserved.
QA-D02 APPROVED — EXPENSES INCLUDED IN CANONICAL V1
Expense tracking remains part of WHATTHECAP Production System V1.
Expenses are distinct from Sales, Payments received, Refunds, and investor/reseller settlement.
Authoritative expense entries must be traceable, evidence-capable, and corrected through reversal/adjustment rather than silent overwrite after posting.
AP-LDM-003 — EXPENSE
Minimum logical role:
EXPENSE_ID, EXPENSE_REF, expense date, category, description, payee Party if applicable, amount/currency, payment method/source account, related entity reference, evidence reference, approval reference, posting status/timestamps, reversal link.
Exact cash reconciliation cadence and accounting/tax classification remain separately TO CONFIRM and are not invented by this approval.
QA-D03 APPROVED — OPERATIONS ↔ PRIVATE CROSS-FILE CONTRACT
Operations may contain canonical IDs, operational statuses, and non-sensitive indicators required for workflow.
Private contains confidential investor economics and any sensitive reseller commercial economics placed there by approved policy.
Sensitive basis, commission, split, margin, payable calculation detail, or agreement economics must not be mirrored into staff-accessible Operations.
Authorized cross-file writer:
Owner/Admin-controlled Apps Script or another explicitly approved Owner/Admin system identity.
Cross-file requirements:
• canonical IDs are the join keys;
• writer authority is explicit;
• every sensitive cross-file write produces traceable Event/Exception context where applicable;
• no staff-visible IMPORTRANGE or similar formula may expose confidential Private economics;
• dependent sensitive postings stop/queue when Private is unavailable;
• unavailable/failed Private dependency creates an Exception rather than guessed data;
• reconciliation must detect orphan IDs, stale mirrors, failed writes, and duplicate postings;
• read/diagnostic verification precedes corrective write action.
Logical Model status after AP-LDM-001 through AP-LDM-003:
FROZEN — AMENDED.
Physical Design may proceed to Draft 3 and QA Pass 2.
Implementation remains NOT AUTHORIZED.
END QA PASS 1 DECISION RECORD — 2026-10-01
AQ. PHYSICAL DESIGN FREEZE APPROVAL — 2026-10-01
Business Owner approved the Physical Design Freeze Candidate.
Frozen Identifier:
PD-V1.0-FROZEN
Frozen Artifact:
WHATTHECAP — GOOGLE SHEETS PHYSICAL DESIGN — PD-V1.0-FROZEN
Drive Doc ID: 1SR3CgJd0axjhaiJEu1XoisdoCjk8cohdXySEYryhL_A
GitHub frozen mirror commit:
3dafb93394fd83562e5df895a9905522f188b4db
Freeze effect:
• Operations + Private partition is fixed.
• Prefix+ULID canonical ID architecture is fixed.
• approved logical-model amendments are fixed.
• permission classes are fixed at Physical Design level.
• Operations↔Private confidentiality contract is fixed.
• controlled opening-stock migration principle is fixed.
• dashboard remains a rebuildable read-only VIEW.
• explicitly deferred items remain deferred and must not be silently decided during implementation.
Implementation remains NOT AUTHORIZED.
Next gate: fresh verified post-freeze recovery checkpoint → Build Specification → sanity review → explicit implementation authorization.
END PHYSICAL DESIGN FREEZE RECORD — 2026-10-01
AR. BUILD SPECIFICATION FREEZE APPROVAL — 2026-10-01
Business Owner approved the Build Specification Freeze Candidate.
Frozen Identifier:
BS-V1.0-FROZEN
Frozen Artifact:
WHATTHECAP — GOOGLE SHEETS BUILD SPECIFICATION — BS-V1.0-FROZEN
Drive Doc ID: 1wOkq0yG8kWsjy9UTvLYGnj5EpPAedajxlCoHbuaCK6A
GitHub frozen mirror commit:
4d8f51796e2c01b51bb27320ee81e29c105b4957
Freeze effect:
• target workbook/file architecture is fixed;
• canonical table schemas are fixed at Build Specification level;
• permission matrix is fixed;
• Prefix+ULID and human reference issuance controls are fixed;
• standalone privileged Apps Script architecture is fixed;
• verified caller identity + protected role registry is fixed;
• Operations↔Private Outbox/Inbox idempotent saga is fixed;
• create-vs-post validation gates are fixed;
• normalized REF_CONFIG is fixed;
• migration staging, DEV backup/checkpoint policy, package sequence, and package acceptance record are fixed;
• deferred business values remain deferred and must not be invented during build.
Implementation remains NOT AUTHORIZED.
Next controlled gate:
create and verify fresh pre-implementation recovery/sanity checkpoint → explicit implementation authorization → Package 0 controlled execution.
END BUILD SPECIFICATION FREEZE RECORD — 2026-10-01