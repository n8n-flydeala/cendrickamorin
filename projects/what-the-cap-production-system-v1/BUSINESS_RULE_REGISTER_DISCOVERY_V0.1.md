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
A transaction becomes a Sale when full payment is received and confirmed. Shipping/fulfillment may occur later.

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
