# WhatTheCap Business Rule Register — Discovery Draft V0.1

**Status:** Working discovery draft  
**Freeze state:** Not frozen  
**Implementation authority:** None  
**Rule IDs:** Provisional only

This register adapts the rule-discipline used in Zack Business System V1, but the business rules below are WhatTheCap-specific and must be validated against actual operations.

## Inventory / Channel Allocation

### WTC-BR-INV-001 — One Master Inventory Truth
WhatTheCap should maintain one authoritative inventory model rather than independent Retail and Wholesale inventories that can drift apart.

### WTC-BR-INV-002 — Retail and Wholesale Physical Separation
Retail-designated stock may be physically separated from Wholesale-designated stock to reduce real-world operational confusion.

### WTC-BR-INV-003 — Channel Reallocation Is Not a Sale
Moving stock Retail ↔ Wholesale is an allocation/custody transfer. It does not create revenue, investor payable, or a customer sale by itself.

### WTC-BR-INV-004 — Website Availability Follows Retail Allocation
Website availability should reflect only stock approved for Retail. Stock moved out of Retail may reduce website quantity, show Out of Stock, or be hidden without being treated as sold.

## Ownership / Investor Stock

### WTC-BR-OWN-001 — Ownership Persists Across Channels
Actual item/batch ownership must not change merely because stock moves between Retail, Wholesale, Reseller-held, Reserved, or another state.

### WTC-BR-OWN-002 — Batch / Source Lineage Is Required
Where the same SKU can have different owners or economic terms, the system must preserve sufficient batch/source lineage. Product-level count alone is insufficient.

### WTC-BR-OWN-003 — Investor Stock May Be Split Across Channels
The same investor's stock may be allocated across Retail and Wholesale while remaining traceable to that investor.

## Retail

### WTC-BR-RET-001 — Retail Is a Dedicated Customer Journey
Retail should have a dedicated ecommerce/customer journey. WordPress/WooCommerce is the current planned retail-facing layer, subject to final design.

### WTC-BR-RET-002 — Retail Sale Consumes Retail Allocation
A recognized retail sale should consume the applicable Retail Allocation/source.

**Open:** exact retail Sale-establishment event, including paid online orders, COD/COP, cancellations, and manual exceptions.

## Wholesale

### WTC-BR-WHO-001 — Wholesale Closing Remains Messenger-Led
Wholesale closing is intentionally human-led through WhatTheCap Facebook Messenger, with Instagram potentially supporting conversations.

### WTC-BR-WHO-002 — Capture Before Messenger Handoff
Where practical, wholesale prospects should provide core contact/qualification data before or as part of the Messenger handoff so the lead is tracked in CRM.

### WTC-BR-WHO-003 — Wholesale Stock Uses Wholesale Allocation
Wholesale deals should primarily consume Wholesale Allocation. Retail stock may be intentionally transferred into Wholesale first; that transfer is not a Sale.

## Investor Economics / Remittance

### WTC-BR-INVEST-001 — Investor Payable Follows Actual Sold Investor Stock
When investor-owned stock is sold, the system must resolve the applicable owner/batch/source and determine the amount owed under the agreed basis/terms.

### WTC-BR-INVEST-002 — Channel Does Not Break Settlement Tracking
Investor settlement tracking must work regardless of whether investor-owned stock is sold through Retail, Wholesale, Reseller, or another approved channel.

### WTC-BR-INVEST-003 — Sale and Remittance Are Separate Events
The system must distinguish amount payable, amount remitted, and remaining outstanding.

### WTC-BR-INVEST-004 — Investor Obligation and WhatTheCap Margin Are Separate
Selling price, investor basis/terms, investor payable, and WhatTheCap margin/result must remain distinguishable.

**Open:** investor agreements may use fixed basis, revenue split, commission, consignment, or other terms. These must be discovered before freeze.

## Reseller

### WTC-BR-RES-001 — Reseller-Held Stock Is a Distinct Custody State
Stock released to a reseller remains part of inventory truth and must remain traceable by owner/source and reseller custody.

### WTC-BR-RES-002 — Reseller Sale and Settlement Need Separate Tracking
The future system should distinguish stock released, stock reported sold, remaining stock, amount due, remittance received, and outstanding amount.

**Open:** exact reseller sale-establishment and remittance rules.

## Service / Reblocking

### WTC-BR-SVC-001 — Reblocking Service Is Not Product Inventory Sale
Reblocking/cap-care services require a dedicated service lifecycle rather than standard inventory-sale logic.

## Reblocking Machine / Equipment

### WTC-BR-EQP-001 — Reblocking Machine May Use a Higher-Touch Sales Journey
Machine sales may use inquiry/quote/demo/closing/payment/delivery logic distinct from low-ticket cap checkout.

## CRM / Customer Communication

### WTC-BR-CRM-001 — GHL Is the Planned Customer Relationship Layer
GoHighLevel is intended for contacts, pipelines, conversations, follow-up, segmentation, and lifecycle automation where appropriate. It is not automatically the authoritative inventory/accounting source.

### WTC-BR-CRM-002 — Preserve Effective Human Closing
Automation should support rather than unnecessarily replace effective Messenger-based wholesale closing.

## System / Data Authority

### WTC-BR-SYS-001 — Business OS Is the Working Internal Operations Core
The current WhatTheCap Business OS is the internal operations foundation for Inventory, Sales, Customers, Expenses, Services, Dashboard, and Settings, subject to redesign after discovery.

### WTC-BR-SYS-002 — No Duplicate Uncontrolled Source of Truth
WooCommerce, GHL, Business OS, and n8n must not become independent masters for the same critical data without explicit authority/synchronization rules.

### WTC-BR-SYS-003 — Integrations Must Be Controlled
n8n/APIs/webhooks should move events/data only after source/target authority and failure behavior are defined.

## Current Conceptual Inventory Model

Product / SKU  
→ Batch / Stock Source  
→ Owner  
→ Allocation / Custody  
→ Sale Channel  
→ Sale / Settlement Events

Working allocation states:
- Retail
- Wholesale
- Reseller-held
- Reserved
- Damaged / Unavailable
- Other approved states to be confirmed

## Investor Tracking Requirement

The future system should be able to determine:
- stock received / sourced
- remaining stock
- allocation by channel/custody
- quantity sold
- sale/source references
- agreed investor basis/terms
- amount payable
- amount remitted
- outstanding balance
- WhatTheCap margin/result where meaningful

## Discovery Gaps Before Freeze

- exact Sale definition by channel
- cancellations / returns / refunds
- shipping / fulfillment
- wholesale minimums / tiers
- retail promos / discounts
- investor agreement types and settlement timing
- reseller pricing / custody / reporting / remittance
- supplier receiving
- stock reservation
- lost/damaged stock responsibility
- payment methods / money destinations
- expenses / abono
- duplicate customer handling
- website stock synchronization / oversell prevention
- reblocking service intake / liability / completion
- machine quote / warranty / delivery / payment
- user/staff permissions
- reporting and KPI requirements

## Change Control

This is a discovery draft only. No provisional rule ID is final. Nothing in this file authorizes implementation. Rules become authoritative only after owner validation, contradiction resolution, and explicit adoption/freeze.


## Sales / Reservation — Discovery Update

### WTC-BR-SAL-001 — Sale Establishment
For prepaid transactions, a Sale is established when full payment is actually received and verified. Website COD is an approved exception: it becomes SOLD/PAID only when courier COD remittance/payment is confirmed. Shipping/fulfillment may occur earlier for COD.

### WTC-BR-SAL-002 — Reservation State
Partial payment/downpayment creates RESERVED only. Reserved stock is unavailable to others but not counted as sold.

### WTC-BR-SAL-003 — Reservation Validity and Downpayment
Minimum downpayment is **₱500**. Standard validity is **72 hours / 3 days**. Downpayment is non-refundable by default. If full payment is not completed by expiry, stock returns to AVAILABLE.

### WTC-BR-SAL-004 — Reservation Extension
Extension beyond 72 hours requires owner approval and a new explicit expiry date/time.

## Shipping / Fulfillment — Discovery Update

### WTC-BR-SHP-001 — Shipping Status Separation
SOLD, SHIPPED, and DELIVERED are distinct states.

### WTC-BR-SHP-002 — Standard Fulfillment Lifecycle
SOLD → PREPARING → SHIPPED → DELIVERED

### WTC-BR-SHP-003 — Shipping Fee Responsibility
Customer pays shipping by default. Shipping fee is separate from product price.

### WTC-BR-SHP-004 — Re-Delivery / RTS
Additional re-delivery shipping is customer-paid by default. Eligible membership tiers may receive support subject to program rules.

### WTC-BR-SHP-005 — Customer-Caused Failed Delivery
Incorrect/incomplete customer-provided address/contact details remain customer responsibility unless owner approves an exception.

## Membership / Loyalty

### WTC-BR-MEM-001 — Tier-Based Benefits
Membership/reseller benefits should be tier-based. Exact tiers, points, thresholds, limits, redemption, expiry, and economics remain open.

## Auction / Bidding

### WTC-BR-AUC-001 — Auction Is an Allocation / Sales Channel
Auction uses an AUCTION allocation within the one master inventory truth. Moving stock into Auction is not a Sale.

### WTC-BR-AUC-002 — Simple Controlled Auction V1
Working flow:
Auction Listing → Bid → Bid Log → Highest Valid Bid → Winner Confirmation → Payment → SOLD → Fulfillment

### WTC-BR-AUC-003 — Ownership Survives Auction
Investor/source/batch lineage remains intact in Auction.

Open: starting bid, increment, reserve, close rule/time, payment deadline, unpaid winner, next bidder, bid withdrawal, shipping, investor settlement, condition disclosure.

## Cap Care

### WTC-BR-SVC-002 — Cap Care Service Line
Cap Care is a dedicated service line including Cap Cleaning, Reblocking, Cleaning + Reblocking, and future adopted services.

Working lifecycle:
Service Request → Intake → Assessment → Quote → Approval → Service In Progress → Ready → Paid → Returned/Completed

## Storefront / Catalog

### WTC-BR-CAT-001 — Product Categories
Working storefront categories include Caps, Apparel, Accessories, and Equipment.

### WTC-BR-CAT-002 — Collections Are Merchandising Groups
Collections are distinct from Category. A product may belong to multiple collections.

## Return Policy Domain

### WTC-BR-POL-001 — Channel-Specific Return Policy
Return/refund/cancellation policy must eventually distinguish Retail, Wholesale, Auction, Cap Care, and Equipment/Reblocking Machine.

## Architecture Status
Whimsical architecture phase has started.

Primary board:
WHATTHECAP PRODUCTION SYSTEM V1 — MASTER ARCHITECTURE

Next detailed board:
WHATTHECAP — INVENTORY / OWNERSHIP / ALLOCATION FLOW

This does not authorize implementation.



## W. SALES / PAYMENT / WEBSITE COD — APPROVED DISCOVERY UPDATE 2026-10-01


### WTC-BR-COD-001 — Channel-Specific COD
Approved rule:
Website Retail may use COD. Retail closed through Messenger/Instagram is Payment First. Wholesale closed through Messenger is Payment First under the current V1 direction.


### WTC-BR-COD-002 — COD Confirmation and Stock Commitment
Approved rule:
A WooCommerce COD checkout does not by itself lock stock. COD stock becomes COMMITTED and unavailable to other buyers only after automated confirmation/risk screening and any required manual review. A confirmed COD order is not yet a Sale.


### WTC-BR-COD-003 — Hybrid COD Confirmation / Risk Review
Approved rule:
Use automated confirmation first. Flagged/suspicious orders route to manual review; a risk flag is not an automatic rejection. Initial risk flags include invalid/incomplete contact details, ambiguous address, repeated customer-caused COD/RTS history, unusually high value/quantity, duplicate/repeated orders in a short period, failed automated confirmation, and owner/staff manual flag. Exact thresholds remain open.


### WTC-BR-COD-004 — COD Fulfillment / Cancellation
Approved rule:
Confirmed COD stock enters PREPARING with a target of shipment within 1–2 business days. Missing the target creates a Needs Attention exception, not automatic cancellation. Customer cancellation before SHIPPED may release committed stock back to AVAILABLE. After SHIPPED, refusal/cancellation is treated as failed delivery/RTS.


### WTC-BR-COD-005 — COD Sale Establishment / Remittance
Approved rule:
Website COD does not become financially SOLD/PAID when ordered, shipped, or merely delivered. The sequence is DELIVERED → COD PENDING REMITTANCE → COD REMITTANCE RECEIVED/CONFIRMED → SOLD/PAID. Product amount and shipping fee are collected by the courier. No extra COD handling/service fee in V1.


### WTC-BR-COD-006 — COD Failure Responsibility / Eligibility
Approved rule:
Customer-caused failed delivery/RTS makes the customer responsible for re-delivery shipping and records a customer failure event. Carrier/WhatTheCap-caused failure does not charge the customer for re-delivery and does not count against customer COD eligibility. Two customer-caused failed COD/RTS incidents disable COD for that customer; reactivation requires Owner/Admin review and approval.


### WTC-BR-PAY-001 — Current Manual Payment Methods
Confirmed current methods:
GCash, bank transfer including GoTyme, and cash for in-person transactions. Future WooCommerce online gateway/provider remains TO CONFIRM.


### WTC-BR-PAY-002 — Payment Proof Is Not Payment Confirmation
Approved rule:
A screenshot or reference number may be collected as evidence but does not establish PAID. For GCash/bank/GoTyme, actual receipt must be verified before PAID/SOLD. Employee may collect/encode proof and mark for verification; Owner/Admin currently has final manual payment-verification authority.


### WTC-BR-PAY-003 — Cash In Person
Approved rule:
Actual cash physically received by an authorized person is immediately PAYMENT VERIFIED / PAID, with receipt/transaction reference recorded.


### WTC-BR-PAY-004 — Underpayment / Overpayment
Approved rule:
Underpayment is recorded at the actual amount received with PARTIAL / BALANCE DUE and is not SOLD unless it is a valid reservation/downpayment case. If required total is fully covered by an overpayment, the order may be PAID, but the excess must be tracked separately as refund due, customer credit, or another owner-approved application and must never be treated as extra sales revenue.


### WTC-BR-PAY-005 — Payment Destination Tracking
Approved rule:
Every payment records Payment Method and Receiving Account/Destination separately, plus amount received, actual payment timestamp, verification status, verified by, and reference/receipt.


### WTC-BR-RES-005 — Verified Reservation Start / Payment Timestamp
Approved rule:
The 72-hour reservation clock starts only when the downpayment is actually verified received. If the remaining balance was actually transferred before expiry and a reliable transaction timestamp proves it, the payment counts as on time even if owner verification occurs later. A balance paid after actual expiry does not automatically revive the old reservation; Owner reviews current stock and may honor, create a new reservation, refund, or create approved customer credit.


### WTC-BR-REF-001 — Refund Authorization / Routing
Approved rule:
Only Owner/Admin may approve and finalize refunds. Employee may collect/encode request and evidence. Refund normally returns through the original payment method where practical; an alternate method requires Owner approval and recorded reason. Refund records retain original transaction link, reason, amount, approver, method, timestamp, and reference.


### WTC-BR-REF-002 — Full / Partial Refund and History
Approved rule:
System supports FULL REFUND and PARTIAL REFUND. Total refund may not exceed verified amount actually received unless a separate approved compensation/credit event exists. Full refund before fulfillment completion may result in REFUNDED/CANCELLED as applicable. Partial refund leaves the Sale intact with PARTIALLY REFUNDED financial status. Original Sale history is preserved.


### WTC-BR-DSC-001 — Discount / Promo Authority
Approved rule:
Owner/Admin controls discretionary/manual discounts. Employees may encode/apply only pre-approved or system-defined discounts. A preconfigured active website promo code may be system-approved automatically.


### WTC-BR-DSC-002 — Discount Recording
Approved rule:
Preserve base/original selling price, discount type, discount amount, reason/promo code, approver when manual, and final selling price/net sales amount.


### WTC-BR-GTW-001 — Future Online Gateway Authority
Approved architecture rule:
A trusted payment-gateway success webhook/event may auto-confirm PAID. Customer screenshots cannot override authoritative gateway status.


### REMAINING OPEN IN THIS DOMAIN
Chargebacks, tax/accounting treatment, exact WooCommerce payment gateway/provider, exact COD high-risk thresholds, and cash reconciliation cadence remain open.



## X. INVENTORY / RECEIVING — APPROVED DISCOVERY UPDATE 2026-10-01


### WTC-BR-INV-005 — Receiving Verification Before Availability
Approved rule:
Stock arrival alone does not make inventory AVAILABLE. Receiving follows EXPECTED → RECEIVED PENDING CHECK → VERIFIED RECEIVED → AVAILABLE / ALLOCATED. Verify actual quantity, condition, supplier/source, economic owner, received by, reference/proof, and batch/source before availability.


### WTC-BR-INV-006 — Expected vs Actual Receiving Variance
Approved rule:
Actual physical quantity received is the inventory truth. Expected quantity remains recorded for comparison. Any discrepancy becomes RECEIVING VARIANCE / NEEDS ATTENTION; the system must not force actual stock to equal supplier paperwork.


### WTC-BR-INV-007 — Persistent Batch / Source Identity
Approved rule:
Batch/Source ID survives allocation, custody, reservation, auction, reseller release, return, and recovery movements. Partial allocation splits retain the same batch identity unless there is a genuine change in source, basis, or economic owner.


### WTC-BR-INV-008 — Hybrid Batch Consumption
Approved rule:
For a Sale, the system proposes the oldest eligible batch/source after SKU, allocation, ownership/source, and other eligibility constraints are satisfied. Authorized users may override the proposed source when the actual physical source differs, but the override must preserve reason and audit history.


### WTC-BR-INV-009 — Controlled Inventory Movements
Approved rule:
Every material stock movement records From State/Allocation, To State/Allocation, Quantity, Batch/Source, Actor, Timestamp, and Reason/Reference. Reallocation or custody movement is not a Sale. Normal Retail↔Wholesale movements may be performed by authorized staff. Sensitive investor, reseller-custody, damaged/lost, or correction movements require Owner/Admin approval.


### WTC-BR-INV-010 — No Silent Quantity Overwrite
Approved rule:
Stock corrections and count adjustments must be recorded as traceable adjustment events. Preserve prior state/history, variance, reason, evidence, approver, and resulting balance. Employee may count/report and prepare evidence; Owner/Admin approves quantity-changing corrections in V1.


### WTC-BR-INV-011 — Damaged / Lost / Unavailable State
Approved rule:
Damaged, lost/missing, or unavailable stock is not automatically a Sale. Preserve batch/source and economic owner. Economic responsibility for the loss is resolved separately by the applicable investor, reseller, supplier, courier, employee, or business rule. Recovery/reclassification creates a new event rather than overwriting the original event.


### WTC-BR-INV-012 — Return to Sellable Inventory
Approved rule:
Refund or cancellation alone does not restore inventory to AVAILABLE. The physical item must be recovered under WTC control and condition-checked. The outcome is AVAILABLE, NEEDS INSPECTION, DAMAGED, or UNAVAILABLE as applicable.


### WTC-BR-INV-013 — Oversell / Last-Unit Conflict
Approved rule:
Only approved available allocation may be promised. When two channels compete for the final unit, the first authoritative commitment event wins. The other transaction becomes STOCK CONFLICT / NEEDS ATTENTION. The system must not intentionally create negative sellable inventory to satisfy both.


### WTC-BR-INV-014 — Physical Stock Count Variance
Approved rule:
Periodic stock count compares Expected System Quantity with Actual Physical Quantity. A variance creates an adjustment case with evidence and approval; it does not directly rewrite inventory.


### WTC-BR-INV-015 — Inventory Source of Truth
Approved rule:
Business OS remains the authoritative inventory/ownership ledger for V1. WooCommerce may mirror retail availability/order context. GHL and n8n do not own inventory truth.


## Y. LOGICAL SALES VIEW DIRECTION — TECHNICAL DESIGN NOTE


### WTC-TD-SALES-001 — One Canonical Sales Truth, Multiple Views
Proposed technical direction, not yet frozen physical schema:
Retail and Wholesale should not become independent master Sales ledgers. Use one canonical Sales truth with channel/source fields and channel-specific operational views where useful. WooCommerce is a Retail order source/storefront; Business OS remains the authoritative operational Sales/Inventory ledger under the current architecture.
