# WHATTHECAP — PROJECT BOOTSTRAP SNAPSHOT — V0.8

Snapshot date: 2026-10-01
Source Doc ID: 1bYJDO-GHgSMygbrZ9HFSFKTJ--dIstA38XMw0gLu5Dw
Source revision: ANLCKQnidvCzfEaP3h67IohN1V61Qew9ZLZ9X_KvDYMUSy8TUdrv_gL0fhkZ4-mK4RsCAsnmKsBtyl51uOSNDl60Wds7DnrUOQtHaZb0YeY
Checkpoint: BUILD SPECIFICATION BS-V1.0-FROZEN / PRE-IMPLEMENTATION
Implementation: NOT AUTHORIZED.

WHAT THE CAP — PRODUCTION BUSINESS SYSTEM V1
PROJECT BOOTSTRAP
STATUS
BUILD SPECIFICATION — BS-V1.0-FROZEN / PRE-IMPLEMENTATION RECOVERY
CANONICAL LOGICAL DATA MODEL — FROZEN AS AMENDED
PHYSICAL DESIGN — PD-V1.0-FROZEN
IMPLEMENTATION — NOT AUTHORIZED
CURRENT AUTHORITY NOTE — 2026-10-01
This Bootstrap began as a discovery baseline. The project has since completed major business-rule closure, canonical logical-model design, cross-domain QA, and freeze-readiness review. Sections below that describe domains as “potential,” “working direction,” or “to validate” are preserved as historical discovery context. When those historical lines conflict with later approved business rules, the approved Business Rule Register, reconciled Whimsical architecture, and current frozen logical-model decisions control.
CURRENT CANONICAL SYSTEM DIRECTION
Business OS = canonical operational authority for Party/Customer identity, active operational Reference/Configuration values, inventory/ownership, authoritative Sale/payment recognition, reservations/commitments, investor/reseller settlement, stored value, events, exceptions, and related audit history.
WooCommerce = customer-facing retail storefront/order-source context; it is not master inventory or financial truth.
GoHighLevel = CRM/contact/conversation/pipeline/follow-up context; mirrored operational truth must not override Business OS authority.
n8n = orchestration/integration layer only; never canonical business truth.
Canonical IDs must map backend-to-frontend through explicit external-ID mappings and preserve identity across backup, restore, replay, reconciliation, and future migration.
LOGICAL MODEL STATUS
Approved and freeze-ready model includes PARTY + roles; Product/SKU; Batch/Stock Source; Location/Custody Node; Inventory Movement; Stock Commitment; Sale/Sale Item; Sale-Item Source Consumption; Payment/Payment Allocation; Reservation; Return/Refund; Investor/Reseller agreements and settlement ledgers; Service Job; Equipment Unit; Auction/Bid; Loyalty/Stored Value ledgers; External ID Mapping; Event Log; Exception Register; Approval Record; canonical Reference/Configuration Registry; append-only adjustment/reversal history; rebuildable derived views.
RECOVERY / CONTROL STATUS
V0.1, V0.2, and V0.3 architecture recovery packages are verified present. The attempted V0.4 Drive backup folder is empty and is NOT a valid recovery point. A pre-reconciliation state-capture record was created before this documentation gate. Recovery discipline remains: STOP → preserve state/evidence → diagnose → classify → authorize → controlled resolution/restore → verify → reconcile → close. Backups are not considered sufficient merely because files exist; restore/readability must be verified before production reliance.
NEXT CONTROLLED GATE
Physical Design PD-V1.0-FROZEN and Build Specification BS-V1.0-FROZEN are approved. Recovery checkpoint V0.7 is verified. Next: create and verify a fresh pre-implementation recovery/sanity checkpoint. No Google Sheets, Apps Script, permissions, migration, n8n, GHL, WooCommerce, infrastructure, or production mutation is authorized until explicit implementation authorization.
1. PROJECT NORTH STAR
Build a production-grade WhatTheCap business system that connects customer acquisition, ecommerce, wholesale lead generation, CRM, automation, internal operations, content distribution, infrastructure, analytics, QA, documentation, and later AI/Voice AI capabilities.
This project is not merely a website build or a GoHighLevel build. It is an end-to-end business systems implementation for a real operating business.
2. CURRENT BUSINESS DIRECTION TO VALIDATE IN DISCOVERY
Retail:
Customer-facing ecommerce journey with online product browsing, cart, checkout, payment, order handling, fulfillment, and retention.
Wholesale:
Lead-generation and qualification journey that captures customer/contact details before routing the prospect into Facebook Messenger and/or Instagram for human-assisted closing.
Services:
Potential cap-care/reblocking service journey with booking/inquiry, service tracking, and customer follow-up.
Reseller:
Potential reseller acquisition, onboarding, repeat-order, and relationship-management journey.
Equipment:
Potential reblocking-machine product/inquiry flow.
IMPORTANT:
These are working directions only. The real operating model, exceptions, pricing logic, inventory behavior, payment behavior, fulfillment rules, reseller rules, customer lifecycle, and ownership of each data element must be discovered before architecture is frozen.
3. MASTER SYSTEM LAYERS
LAYER 1 — CUSTOMER ACQUISITION
Facebook
Instagram
TikTok
YouTube
Google / SEO
Organic content
Future paid media
LAYER 2 — PUBLIC WEBSITE / DIGITAL FRONT DOOR
WordPress
Primary brand website
Retail navigation
Wholesale entry point
Reseller entry point
Services
Equipment
Content / SEO
LAYER 3 — RETAIL COMMERCE
WooCommerce
Product catalog
Cart
Checkout
Payments
Orders
Customer account
Promotions / bundles / upsells
Future abandoned-cart and retention flows
LAYER 4 — WHOLESALE LEAD GENERATION
Wholesale landing page
Qualification form
Contact capture
GoHighLevel CRM
Wholesale pipeline
Messenger / Instagram handoff
Human closing
Order confirmation
Repeat buyer / reseller nurture
LAYER 5 — CRM & CUSTOMER LIFECYCLE
GoHighLevel
Contacts
Segmentation
Pipelines
Forms
Workflows
Conversations
Email / SMS where appropriate
Messenger / Instagram integrations
Social Planner
Customer follow-up and nurture
LAYER 6 — AUTOMATION / INTEGRATION
n8n
Cross-platform workflow orchestration
APIs
Webhooks
WooCommerce integrations
GoHighLevel integrations
Google Workspace integrations
Notifications
Data synchronization
Error handling / retries
LAYER 7 — INTERNAL BUSINESS OPERATIONS
WHAT THE CAP — BUSINESS OS
Google Sheets
Google Apps Script where appropriate
Current known modules to validate:
Dashboard
Sales
Inventory
Customers
Expenses
Services
Settings
The Business OS is expected to remain the internal operations layer unless discovery determines a better authority model.
LAYER 8 — CONTENT & SOCIAL DISTRIBUTION
Canva
CapCut
GoHighLevel Social Planner
Facebook
Instagram
TikTok
YouTube
Potential future automation:
Content queue
Caption generation support
Approval flow
Publishing schedule
Performance logging
LAYER 9 — INFRASTRUCTURE
Managed WordPress hosting initially
VPS for automation/backend services
Docker
n8n
Database where required
Reverse proxy
SSL
Backups
Monitoring
LAYER 10 — ENGINEERING / VERSION CONTROL
GitHub
Source control
Deployment/configuration history
Technical documentation
n8n workflow exports
Apps Script source
Custom WordPress code/snippets
Infrastructure configuration
Testing notes
NO production secrets, passwords, tokens, API keys, customer data, or private credentials may be committed to GitHub.
LAYER 11 — ANALYTICS & REPORTING
Traffic
Leads
Conversations
Orders
Revenue
Inventory
Fulfillment
Wholesale pipeline
Repeat customers
Service activity
Operational exceptions
Metrics must be defined from actual business rules and trustworthy source data. No vanity metrics or invented performance claims.
LAYER 12 — QA / GOVERNANCE
Every meaningful workflow should eventually define:
Trigger
Inputs
Expected result
Failure conditions
Owner
Test case
Evidence
Recovery / rollback
Change history
LAYER 13 — DOCUMENTATION
Whimsical — master architecture and flow diagrams
Google Drive — business documentation / SOPs / planning
GitHub — technical implementation documentation / source control
Loom or equivalent — walkthroughs when useful
LAYER 14 — FUTURE AI / VOICE AI
NOT PART OF CORE V1 UNTIL THE BACKEND IS STABLE.
Potential later capabilities:
AI customer FAQ
Wholesale qualification assistant
Reseller onboarding assistant
Order/service status assistant
Internal business assistant
Voice AI for inbound qualification, booking, routing, and handoff
AI must sit on top of a stable business/data architecture rather than compensate for an unclear backend.
4. WORKING TOOL STACK
Planning / Architecture
Whimsical
Website / Commerce
WordPress
WooCommerce
CRM / Marketing
GoHighLevel
Automation
n8n
Webhooks
APIs
Google Apps Script where appropriate
Operations / Data
Google Sheets — WhatTheCap Business OS
Infrastructure
VPS
Docker
Database as required
Reverse proxy / SSL / backup / monitoring as required
Engineering
GitHub
Creative / Content
Canva
CapCut
AI-Assisted Work
ChatGPT
Claude
Codex
Gemini where useful
Social / Customer Channels
Facebook
Instagram
TikTok
YouTube
Messenger
5. CORE ARCHITECTURE PRINCIPLES
A. Business first, tools second.
The operating model and customer journeys determine the architecture.
B. One clear authority per important data domain.
Avoid uncontrolled duplicate sources of truth.
C. Automate repeatable work; preserve human judgment where it adds value.
Wholesale Messenger closing may remain human-led while qualification, tracking, follow-up, and handoffs are automated.
D. Simple daily operation, controlled backend complexity.
The system should make the business easier to run, not create tool overhead.
E. Build in phases.
Do not connect every platform at once.
F. QA before scale.
A workflow is not production-ready merely because it ran once.
G. Version and document changes.
Technical work should be reproducible, reviewable, and recoverable.
H. Secrets stay outside GitHub.
Use environment variables / secure credential stores.
I. AI comes after system clarity.
Agents and Voice AI will be positioned after business rules, data authority, and core workflows are stable.
6. HIGH-LEVEL CUSTOMER ROUTES — WORKING DRAFT
RETAIL
Traffic
→ WhatTheCap Website
→ Shop / Product
→ Cart
→ Checkout
→ Payment
→ Order
→ Fulfillment
→ CRM / Customer lifecycle
→ Repeat purchase
WHOLESALE
Traffic
→ Wholesale Page
→ Qualification / Contact Capture
→ GoHighLevel
→ Wholesale Pipeline
→ Messenger / Instagram
→ Human Closing
→ Payment / Order Confirmation
→ Fulfillment
→ Repeat Buyer / Reseller Nurture
SERVICES
Traffic / Existing Customer
→ Service Page / Inquiry
→ Capture / Booking
→ Service Workflow
→ Completion
→ Follow-up
These routes are placeholders until discovery is complete.
7. PHASE PLAN
PHASE 0 — BOOTSTRAP
Create project authority file.
Create Drive project folder.
Create GitHub copy.
Define discovery-first rule.
PHASE 1 — REAL BUSINESS DISCOVERY
Document how WhatTheCap actually works today.
Products
Inventory
Retail
Wholesale
Resellers
Payments
Shipping
Returns / exceptions
Services
Suppliers
Content
Customer communication
Current tools
Manual steps
Pain points
Decision rules
PHASE 2 — BUSINESS RULES & DATA AUTHORITY
Define source of truth per domain.
Define lifecycle states.
Define transaction rules.
Define inventory behavior.
Define customer/contact rules.
Define handoff boundaries.
PHASE 3 — WHIMSICAL BLUEPRINT
Create the master visual system architecture.
Create customer journeys.
Create data flows.
Create automation maps.
Create platform boundaries.
Create failure / exception paths.
PHASE 4 — TECHNICAL DESIGN
Choose exact WordPress hosting and theme/builder.
Define WooCommerce setup.
Define GoHighLevel account/pipelines/workflows.
Define n8n architecture.
Define VPS/Docker services.
Define GitHub structure.
Define integration contracts.
Define security / secrets / backups.
PHASE 5 — BUILD
Implement in controlled modules.
PHASE 6 — INTEGRATION
Connect systems one flow at a time.
PHASE 7 — QA / UAT
Test happy paths, edge cases, failures, recovery, data integrity, and user operations.
PHASE 8 — PRODUCTION DEPLOYMENT
Controlled go-live.
PHASE 9 — OBSERVABILITY / OPTIMIZATION
Measure real behavior and improve based on evidence.
PHASE 10 — AI / VOICE AI EXPANSION
Only after the core system is stable.
8. WHIMSICAL BLUEPRINT SET
Planned diagrams:
01 — Master System Architecture
02 — Retail Customer Journey
03 — Wholesale Lead-to-Close Journey
04 — Reseller Lifecycle
05 — Services / Reblocking Journey
06 — Data Authority Map
07 — CRM / Pipeline Map
08 — Automation / n8n Integration Map
09 — Website Information Architecture
10 — Infrastructure / VPS / Docker / GitHub Map
11 — Content & Social Distribution Map
12 — Analytics / Reporting Map
13 — Error / Exception / Recovery Map
14 — Future AI & Voice AI Extension Map
9. NEXT DISCOVERY INPUT
The next step is NOT implementation.
Owner will explain the real WhatTheCap operating system, including how the business currently handles inventory, sales, wholesale, retail, resellers, payments, fulfillment, customer records, services, content, and exceptions.
That real-world operating model will be treated as the discovery basis.
The Whimsical blueprint will then be designed from the discovered operating model and used as the build blueprint.
10. CHANGE CONTROL
This document is currently a working bootstrap.
Do not treat assumptions in this file as final business rules.
Architecture becomes authoritative only after:
1. discovery is completed,
2. contradictions are resolved,
3. the Whimsical design is reviewed,
4. the owner explicitly approves/finalizes the relevant design.
END OF BOOTSTRAP
11. DISCOVERY UPDATE — INVENTORY / CHANNEL / INVESTOR MODEL — 2026-09-30
STATUS
WORKING DISCOVERY INPUT
NOT FROZEN
LATEST CONFIRMED DIRECTION
1. Wholesale closing remains intentionally Messenger-led.
The goal is not to replace the human closing behavior that already fits the business. The system should capture, qualify, track, follow up, and organize wholesale leads while allowing the final negotiation/closing to happen in Messenger.
2. Retail and wholesale stock will be operationally separated.
The owner intends to physically separate stock allocated for Retail from stock allocated for Wholesale to reduce real-world confusion.
3. The system should still keep one master inventory truth.
Retail and Wholesale are allocations/custody/channel states, not independent inventories that can drift apart.
4. Moving stock Retail → Wholesale or Wholesale → Retail is a transfer/reallocation, not a Sale.
The total physical stock does not change merely because the selling channel allocation changes.
5. Website retail availability should reflect Retail Allocation.
If stock is intentionally removed from Retail Allocation for a wholesale need, the website may reduce available quantity, show Out of Stock, or hide the offer without recording a sale.
6. Investor ownership survives channel movement.
Investor-owned inventory may exist in Retail Allocation, Wholesale Allocation, reseller-held stock, or other approved states while remaining traceable to the same investor/batch/source.
7. Investor settlement must work across channels.
The system must be able to determine investor stock sold, amount payable, amount remitted, outstanding balance, and WhatTheCap margin/result regardless of whether the sale happened through Retail, Wholesale, Reseller, or another approved channel.
8. Sale and Investor Remittance are separate events.
A sale may create an investor obligation; remittance later settles some or all of that obligation.
9. Batch/source lineage is required where ownership/economics differ.
Product-level counts alone are not enough when the same SKU can include WhatTheCap-owned and investor-owned stock or different investor terms.
10. Reseller-held stock remains part of inventory truth.
Release to reseller should represent custody/allocation movement. The final reseller sale/remittance rules still require discovery.
11. Reblocking Service is a separate service lifecycle.
It should not be forced into product inventory-sale logic.
12. Reblocking Machine may require a separate higher-touch product/lead journey.
Exact quote/demo/payment/warranty/delivery rules remain open.
DISCOVERY ARTIFACT CREATED
WHAT THE CAP — BUSINESS RULE REGISTER — DISCOVERY DRAFT V0.1
This contains provisional WTC business-rule IDs and open decisions. It is not frozen and does not authorize implementation.
CURRENT CONCEPTUAL STOCK MODEL
Product / SKU
→ Batch / Stock Source
→ Owner
→ Allocation / Custody
→ Sale Channel
→ Sale / Settlement Events
Current working allocation states include Retail, Wholesale, Reseller-held, Reserved, Damaged/Unavailable, and other approved states to be confirmed.
NEXT DISCOVERY PRIORITY
Before Whimsical architecture is frozen, continue owner interview on exact Sale establishment, payments, shipping, returns/refunds, reseller rules, investor terms, stock reservation, damaged/lost stock, service liability, machine sales, permissions, and reporting requirements.
12. DISCOVERY UPDATE — SALES, SHIPPING, AUCTION, LOYALTY, CAP CARE, WHIMSICAL START — 2026-09-30
STATUS
WORKING DISCOVERY INPUT
NOT FROZEN
WHIMSICAL ARCHITECTURE PHASE STARTED
IMPLEMENTATION STILL NOT AUTHORIZED
A. SALE ESTABLISHMENT
1. Default Sale rule
A transaction becomes a Sale only when full payment is received and confirmed.
Shipping/fulfillment may occur later.
A confirmed order, reservation, downpayment, or partial payment is not yet a Sale.
2. Reservation / downpayment
Partial payment/downpayment creates a RESERVED state only.
Reserved stock is temporarily unavailable to other buyers but is not counted as sold.
Minimum downpayment: ₱500.
Standard reservation validity: 72 hours / 3 days from confirmed downpayment.
Downpayment is non-refundable by default.
If full payment is completed before expiry, the transaction becomes SOLD.
If not completed by expiry, the reservation expires and stock returns to AVAILABLE.
Reservation extension beyond 72 hours is allowed only with owner approval and must carry a new explicit expiry date/time.
For transactions below ₱500, full payment is the default unless owner approves another arrangement.
B. SHIPPING / FULFILLMENT
3. Status lifecycle
SOLD = full payment confirmed.
SHIPPED = parcel actually handed to courier and waybill/tracking proof sent to customer.
DELIVERED = customer actually receives the parcel.
Standard lifecycle: SOLD → PREPARING → SHIPPED → DELIVERED.
4. Shipping fee responsibility
Customer pays shipping by default.
Shipping fee is separate from product price.
WhatTheCap may shoulder shipping only as owner-approved exception, promo, or defined membership benefit.
5. Failed delivery / RTS
Additional re-delivery shipping is customer-paid by default.
Eligible membership tiers may receive re-delivery shipping support subject to program rules and verification.
Customer-caused failed delivery (incorrect/incomplete address or contact details supplied by customer) remains customer responsibility even if the customer is a member, unless owner explicitly approves an exception.
C. STOREFRONT / PRODUCT EXPERIENCE EXPANSION
Working website sections now include:
- Caps
- Apparel
- Accessories
- Collections
- Wholesale
- Cap Care
- Reblocking Machine / Equipment
- Auction / Bidding
- Rewards / Club
- Referral
- Reseller Membership / Benefits / Perks
- Gift Cards
- Policies / Returns
Collections are merchandising/grouping and are distinct from product Category.
A product may belong to multiple collections.
D. AUCTION / BIDDING — SIMPLE V1 DIRECTION
Auction V1 should be controlled and simple rather than a fully automated marketplace.
Working flow:
Inventory item → AUCTION allocation → Auction Listing → Bid Form → Bid Log → Highest Valid Bid → Winner Confirmation → Payment → SOLD → Fulfillment.
Auction allocation is an inventory state, not a separate inventory system.
Moving an item into Auction does not create a Sale.
Investor ownership/source lineage must survive auction allocation and sale.
Initial implementation should avoid unnecessary complexity such as proxy bidding, realtime bidding infrastructure, auto-payment locking, or anti-sniping until proven necessary.
Open auction decisions remain:
- starting bid
- minimum increment
- reserve price
- exact closing rule/time
- winner payment deadline
- unpaid winner handling
- next-bidder handling
- bid withdrawal
- shipping treatment
- investor settlement when auction price varies
- item-condition disclosure
E. CAP CARE
Cap Care is confirmed as a dedicated service line.
Current working services include:
- Cap Cleaning
- Reblocking
- Cleaning + Reblocking
- future care/restoration services if adopted
Working lifecycle:
Cap Care Page → Service Request → Intake → Assessment → Quote/Price → Customer Approval → Service In Progress → Ready → Paid → Returned/Completed.
Cap Care must not be forced into product-inventory Sale logic.
Future design should support before/after evidence, pre-existing condition notes, service status, payment status, completion/handover, and service-liability rules.
F. LOYALTY / MEMBERSHIP / RESELLER PROGRAM
The loyalty concept should be designed as one coordinated layer rather than disconnected plugins.
Working loyalty branches:
- Customer Rewards
- Referral Credits / Points
- Gift Cards
- Member Club
- Reseller Membership
- Reseller Points
- Tier-Based Benefits / Perks
Tier-based benefits are confirmed as the preferred direction.
Exact tiers, points formulas, redemption rules, expiry, qualifying spend, free-shipping/re-delivery limits, and reseller economics remain OPEN until margin/business economics are defined.
G. RETURN POLICY
Return policy is confirmed as a required business-rule domain and should not be treated as one generic website paragraph.
Policy must eventually distinguish at least:
- Retail
- Wholesale
- Auction
- Cap Care
- Equipment / Reblocking Machine
Exact return/refund/cancellation rules remain OPEN.
H. WHIMSICAL ARCHITECTURE PHASE
Whimsical phase has now started.
Primary board:
WHATTHECAP PRODUCTION SYSTEM V1 — MASTER ARCHITECTURE
Master architecture should cover:
1. Traffic / Acquisition
2. Public Experience / WordPress
3. Customer Routes
4. CRM / Customer Layer
5. Automation / n8n
6. WhatTheCap Business OS
7. Infrastructure
8. Engineering / Recovery
9. Core Data Model
10. Status Logic
11. Open Decisions
Current master customer routes:
RETAIL:
Traffic → WordPress/WooCommerce → Product → Cart → Checkout → Payment → SOLD → PREPARING → SHIPPED → DELIVERED.
WHOLESALE:
Wholesale Page → Lead Capture → GHL Contact → Wholesale Pipeline → Messenger → Human Closing → Payment → SOLD → Fulfillment.
CAP CARE:
Cap Care Page → Service Request → Intake → Assessment → Quote → Approval → Service In Progress → Ready → Paid → Returned/Completed.
EQUIPMENT:
Reblocking Machine Page → Inquiry → Lead → Quote/Demo → Payment → Fulfillment.
AUCTION:
Auction Listing → Bid → Bid Log → Highest Valid Bid → Winner → Payment → SOLD → Fulfillment.
Next detailed Whimsical board after the master map:
WHATTHECAP — INVENTORY / OWNERSHIP / ALLOCATION FLOW
I. CURRENT CORE DATA MODEL DIRECTION
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
   → Auction
   → Damaged / Unavailable
   → Other approved states
→ SALE CHANNEL
→ SALE / SETTLEMENT EVENTS
Ownership and source lineage survive all allocation changes.
J. BUILD ORDER — CURRENT WORKING PLAN
1. Finish core business discovery/rules.
2. Complete Whimsical master architecture and detailed flows.
3. Define/freeze data authority and OS logical model.
4. Build WhatTheCap Business OS first.
5. Build WordPress/WooCommerce customer-facing layer.
6. Build GoHighLevel CRM/pipelines/conversations.
7. Integrate with n8n/APIs/webhooks.
8. Add Auction, Rewards, Referral, Reseller Club after core reliability.
9. Add AI / Voice AI only after the backend is stable.
K. RECOVERY / AUTHORITY MODEL
Business authority:
Google Drive — Business Rules, architecture decisions, SOPs, policies, approvals/change records.
Technical authority/version history:
GitHub — n8n workflow exports, Apps Script, Docker configuration, WordPress custom code, integration docs, tests, deployment history.
Live operational state:
WhatTheCap Business OS.
Runtime applications:
WordPress/WooCommerce, GoHighLevel, n8n, VPS/Docker.
Recovery principle:
A new builder/session should be able to recover project context from the Bootstrap + Business Rule Register + Whimsical blueprint + later approved technical/build specifications without relying on chat memory.
L. REMAINING CORE DISCOVERY BEFORE ARCHITECTURE FREEZE
- exact COD/COP treatment if adopted
- detailed returns/refunds/cancellations
- investor agreement models and settlement timing
- reseller economics, sale reporting, custody, remittance
- supplier receiving / stock intake
- damaged/lost stock responsibility
- payment methods and money destinations
- expense/abono rules
- Cap Care intake/liability rules
- machine warranty/support/delivery rules
- auction exact rules
- membership tiers/points economics
- staff permissions/sensitive financial access
- owner dashboard/KPI requirements
END — DISCOVERY UPDATE 12