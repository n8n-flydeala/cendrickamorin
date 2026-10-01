# WHATTHECAP — BUSINESS RULE REGISTER SNAPSHOT — V0.5

Snapshot date: 2026-10-01
Source title: WHAT THE CAP — BUSINESS RULE REGISTER — DISCOVERY DRAFT V0.2
Source Doc ID: 1Y8atETfX0_-O8SMBFcta6YAlgp1OgBlgDVGj_NHmT6Y
Source revision: ANLCKQlPiNgz1jFGmhyZjssNyjVd6O3MD7tYXcwJlWW4K76yGpHIhmLvYVRja1tcPgSvn5f65TNdQGjB5uBv882Rj9gdVtaFmN2_O6GrPuw
NOTE: This snapshot preserves the current source exactly for recovery. It does not claim that every approved chat decision has already been reconciled into the Business Rule Register.

WHAT THE CAP — BUSINESS RULE REGISTER — DISCOVERY DRAFT V0.1
STATUS
WORKING DISCOVERY DRAFT
NOT FROZEN
NO IMPLEMENTATION AUTHORITY
PROVISIONAL RULE IDS ONLY
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