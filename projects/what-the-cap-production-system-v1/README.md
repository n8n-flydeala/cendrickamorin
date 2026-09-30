# WhatTheCap Production Business System V1

## Project Bootstrap

**Status:** Discovery / Architecture Planning  
**Implementation:** Not authorized yet  
**Freeze state:** Not frozen

This repository copy is the technical bootstrap for the WhatTheCap production-system project. The operating model must be discovered first, then translated into a Whimsical blueprint before implementation.

## North Star

Build a production-grade WhatTheCap business system connecting:

- customer acquisition
- WordPress website
- WooCommerce retail commerce
- GoHighLevel CRM and wholesale lead handling
- Facebook Messenger / Instagram closing
- n8n automation and integrations
- Google Sheets / Apps Script Business OS
- content distribution
- VPS / Docker infrastructure
- GitHub source control
- analytics
- QA and documentation
- future AI / Voice AI capabilities

## Current Working Layers

1. **Customer Acquisition** — Facebook, Instagram, TikTok, YouTube, Google/SEO, organic content, future paid media.
2. **Website / Digital Front Door** — WordPress.
3. **Retail Commerce** — WooCommerce.
4. **Wholesale Lead Generation** — landing page, qualification, contact capture, GHL pipeline, Messenger/IG, human closing.
5. **CRM & Customer Lifecycle** — GoHighLevel contacts, segmentation, pipelines, conversations, workflows, follow-up.
6. **Automation / Integration** — n8n, APIs, webhooks, Apps Script where appropriate.
7. **Internal Business Operations** — WhatTheCap Business OS in Google Sheets.
8. **Content & Social Distribution** — Canva, CapCut, GHL Social Planner, FB/IG/TikTok/YouTube.
9. **Infrastructure** — managed WordPress hosting initially; VPS + Docker for automation/backend services.
10. **Engineering / Version Control** — GitHub.
11. **Analytics & Reporting** — traffic, leads, orders, inventory, fulfillment, pipeline, repeat customers, services, exceptions.
12. **QA / Governance** — tests, expected results, failures, recovery, change history.
13. **Documentation** — Whimsical, Google Drive, GitHub, walkthroughs.
14. **Future AI / Voice AI** — only after stable business/data architecture.

## Working Tool Stack

### Planning
- Whimsical

### Website / Commerce
- WordPress
- WooCommerce

### CRM / Marketing
- GoHighLevel

### Automation
- n8n
- APIs
- Webhooks
- Google Apps Script

### Operations
- Google Sheets — WhatTheCap Business OS

### Infrastructure
- VPS
- Docker
- database/reverse proxy/SSL/backups/monitoring as required

### Engineering
- GitHub

### Creative / Content
- Canva
- CapCut

### AI-Assisted Work
- ChatGPT
- Claude
- Codex
- Gemini where useful

## Architecture Principles

- Business first, tools second.
- One clear authority per important data domain.
- Automate repeatable work; preserve human judgment where it adds value.
- Simple daily operation, controlled backend complexity.
- Build in phases.
- QA before scale.
- Version and document changes.
- Never commit production secrets, credentials, tokens, API keys, or customer data.
- AI sits on top of a stable backend, not on top of operational chaos.

## Working Customer Routes

### Retail
Traffic → Website → Shop/Product → Cart → Checkout → Payment → Order → Fulfillment → CRM → Repeat Purchase

### Wholesale
Traffic → Wholesale Page → Qualification / Contact Capture → GoHighLevel → Wholesale Pipeline → Messenger / Instagram → Human Closing → Payment / Order Confirmation → Fulfillment → Repeat Buyer / Reseller Nurture

### Services
Traffic / Existing Customer → Service Page / Inquiry → Capture / Booking → Service Workflow → Completion → Follow-up

These routes are placeholders until real-business discovery is completed.

## Phase Plan

### Phase 0 — Bootstrap
- Create project authority file.
- Create Drive project folder.
- Create GitHub copy.
- Establish discovery-first rule.

### Phase 1 — Real Business Discovery
Document how WhatTheCap actually operates today: products, inventory, retail, wholesale, resellers, payments, shipping, returns/exceptions, services, suppliers, content, customer communication, tools, manual steps, pain points, and decision rules.

### Phase 2 — Business Rules & Data Authority
Define source of truth, lifecycle states, transaction rules, inventory behavior, customer/contact rules, and system handoff boundaries.

### Phase 3 — Whimsical Blueprint
Create:
1. Master System Architecture
2. Retail Customer Journey
3. Wholesale Lead-to-Close Journey
4. Reseller Lifecycle
5. Services / Reblocking Journey
6. Data Authority Map
7. CRM / Pipeline Map
8. Automation / n8n Integration Map
9. Website Information Architecture
10. Infrastructure / VPS / Docker / GitHub Map
11. Content & Social Distribution Map
12. Analytics / Reporting Map
13. Error / Exception / Recovery Map
14. Future AI & Voice AI Extension Map

### Phase 4 — Technical Design
Choose exact hosting, WordPress stack, WooCommerce setup, GHL design, n8n architecture, VPS/Docker services, GitHub structure, integrations, security, secrets, and backups.

### Phase 5 — Build
Implement controlled modules.

### Phase 6 — Integration
Connect systems one flow at a time.

### Phase 7 — QA / UAT
Test happy paths, edge cases, failures, recovery, data integrity, and operating procedures.

### Phase 8 — Production Deployment
Controlled go-live.

### Phase 9 — Observability / Optimization
Improve from real evidence.

### Phase 10 — AI / Voice AI Expansion
Only after core stability.

## Next Step

The next step is **not implementation**.

The owner will explain the actual WhatTheCap Business OS and real-world operating model. That discovery will become the basis for the Whimsical blueprint, and the approved blueprint will become the build guide.

## Change Control

This file is a working bootstrap only. Do not treat assumptions here as final business rules. Architecture becomes authoritative only after discovery, contradiction resolution, Whimsical review, and explicit owner approval.


## Discovery Update — Inventory / Channel / Investor Model — 2026-09-30

**Status:** Working discovery input; not frozen.

- Wholesale closing remains intentionally Messenger-led. Automation should capture, qualify, track, follow up, and organize leads without unnecessarily replacing human closing.
- Retail and Wholesale stock will be physically/operationally separated where useful, but the system should maintain one master inventory truth.
- Retail and Wholesale are allocations/custody/channel states, not independent inventories.
- Retail ↔ Wholesale movement is an inventory reallocation, not a Sale.
- Website availability should reflect Retail Allocation; stock can be reduced, hidden, or shown Out of Stock when moved away from retail without recording a sale.
- Investor ownership persists across Retail, Wholesale, Reseller-held, Reserved, and other approved states.
- Investor settlement must remain traceable across channels: sold quantity, payable, remitted, outstanding, and WhatTheCap margin/result.
- Sale and investor remittance are separate business events.
- Batch/source lineage is required where ownership or economics differ; product-level counts alone are insufficient.
- Reseller-held stock remains part of inventory truth; final reseller sale/remittance rules still require discovery.
- Reblocking Service is a separate service lifecycle.
- Reblocking Machine may require a separate higher-touch lead/quote/demo/payment/delivery journey.

### Current Conceptual Stock Model

Product / SKU → Batch / Stock Source → Owner → Allocation / Custody → Sale Channel → Sale / Settlement Events

Working allocation states include Retail, Wholesale, Reseller-held, Reserved, Damaged/Unavailable, and other approved states to be confirmed.

### New Discovery Artifact

A separate working Business Rule Register draft has been created:

`BUSINESS_RULE_REGISTER_DISCOVERY_V0.1.md`

The IDs and rules in that file are provisional and do not authorize implementation.
