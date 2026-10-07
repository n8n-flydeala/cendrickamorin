# Cendrick Amorin — Professional Portfolio

AI-Assisted Business Systems Builder. Automation • Operations • CRM • AI-Assisted Workflows.

## Purpose and current phase
Recruiter-facing static portfolio with Phase 1 foundations for SKU Health Monitor, PrimeFlow Home Services, and supporting SmileCare Dental proof. Existing black/gold identity and homepage integrations are retained. A full redesign is not part of this phase.

## Stack
HTML, CSS, vanilla JavaScript, existing Tailwind runtime CDN, and Inter via Google Fonts. Contact/chat use existing n8n webhook integrations. Walkthrough playback uses a click-loaded YouTube embed.

## Local preview
From the repository root, if Python is installed, run:

```sh
python -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ and the three project pages. Otherwise use an installed local static server such as VS Code Live Server. Do not submit forms or chat during a visual-only review: those controls call existing external endpoints. No preview server was started by Phase 1.

## Structure
- index.html: primary homepage
- style.css: shared existing styles and Phase 1 foundations
- script.js: unchanged contact/chat/proof behavior
- walkthrough.js: unchanged walkthrough behavior
- images/: original proof assets, unchanged
- projects/primeflow/, projects/sku-health-monitor/, projects/smilecare/: project-page foundations
- preview.html: legacy alternate candidate; not source of truth, contact/chat not wired

Internal WHATTHECAP records were verified and moved outside this repository to the sibling PORTFOLIO-ARCHIVE directory. The archive is not part of this website or Git staging.

## GitHub Pages assumptions
Relative paths support hosting at /cendrickamorin/. Actual Pages publishing source and deployment configuration are not verified. No deployment method is asserted. Removing internal files locally does not remove prior Git history or already-published copies; any remote remediation requires separate review and authorization.

## Truthfulness and proof
Portfolio/demo builds are labeled explicitly. SKU metrics use seeded/synthetic data; the browser dashboard is demo mode. Its reporting and SMTP paths were live-tested according to Owner-confirmed context. G2 live API validation is pending. PrimeFlow claims demo QA, not live client performance. SmileCare details remain to confirm. Missing proof links/assets are disclosed rather than invented.

## Branch workflow
Phase 1 operates locally on portfolio-refresh. No commit, push, merge, or publication is authorized by this phase. Review the local diff and browser behavior before any later release. Never commit credentials or secrets; .env variants are ignored and .env.example is permitted only for non-secret placeholders.
