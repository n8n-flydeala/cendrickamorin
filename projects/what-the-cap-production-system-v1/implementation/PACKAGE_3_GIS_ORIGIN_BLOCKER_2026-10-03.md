# Package 3 GIS DEV setup — PARTIAL / NOT ACCEPTED

## Confirmed execution

The Business Cloud credential inventory shows `WHATTHECAP Package 3 DEV — GIS Web`
as **Web application**, created October 3. It already existed when Builder resumed;
Builder did not create a duplicate. Existing Desktop clients were preserved.

Non-secret public client ID:
`532797405360-e2i5vlovec0h19q8euebo8t3ohminfb3.apps.googleusercontent.com`.
Cloud project: `wtc-as-bridge-qual-202609`.
No client secret or Google credential was read, copied, logged or committed.

Business-owned standalone Apps Script project:
`1jAl9sLlPQZsCzAHsn3xI9-NIWrRNtUx8VtFBxwuHtNl7zcn0JqsW765v`.
Protected Script Properties were empty before setup. Builder configured and reread:

| Property | Final verified state |
|---|---|
| GIS_CLIENT_ID | Public Web-client ID above |
| ENVIRONMENT | DEV |
| POSTING_ENABLED | false |
| DEV_WEB_ENABLED | false, after disabling the attempted identity screen |

Role registry and posting policy were not fabricated or installed.
Default Apps Script GCP association was not changed.

A private DEV web-app version 1 was created to inspect the identity screen:
execute as Business owner; access **Only myself**; description
`PACKAGE 3 DEV — Owner GIS identity test only — posting disabled`.
Google confirmed deployment success at Oct 3, 2026, 10:29 PM (displayed).
Source is the guarded WIP source associated with implementation commit
`aa2910d5b0f2381f1012018154e37353854bb799`, not an accepted Production build.

Deployment ID:
`AKfycbxptBe437t7AIcwtNZl4k-7_awz-jLfK_ZNU0C51TKjXPvHBKW4q3P44HQMzTRWhrjO`.
No Production deployment, public access, main merge or Package 4 work occurred.
The deployment is retained for evidence; the runtime identity screen is disabled.

Post-configuration live `package3DevPreflight` PASS: started 10:35:03 PM,
result 10:35:08 PM, completed 10:35:10 PM (displayed; project timezone Manila).
DEV identity and all eight canonical schemas verified. Eight canonical row counts
and three SKU/location/party master counts remain zero. `gisClientConfigured:true`,
`roleRegistryConfigured:false`, `policyConfigured:false`, `postingEnabled:false`,
`frozen:false`, `accepted:false`. No inventory or audit records posted.

## Exact blocker and preserved evidence

The private screen rendered `Package 3 DEV — Owner identity verification`.
Its actual sandbox frame origin, read from the browser's iframe src, was:

`https://n-myefupc35v6nl5zc5rftaxep5bqlc3gkrwmcp7i-0lu-script.googleusercontent.com`

Owner expressly approved adding this exact origin, with no wildcard/redirect.
The Cloud form rejected it with **Invalid Origin: uses a forbidden domain**.
Save was disabled (`aria-disabled=true`). A reload verified that no origin had
persisted. Re-entering and blurring the field surfaced the validation message.
Builder discarded the unsaved invalid origin via Cancel and disabled
DEV_WEB_ENABLED. Reloading the private app verified **DEV access denied.**

Classification: **external-provider origin restriction / WIP sign-in-host design
conflict**. This is not missing Owner permission, an Operations-account problem,
or a reason to weaken identity verification.

Google's [OAuth origin validation documentation](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow)
states that googleusercontent.com host domains are not allowed for JavaScript
origins. This supports the observed Cloud validation, rather than a transient
save/network explanation.

## Scope of stop

Stop only embedded GIS sign-in, Owner subject binding and dependent live posting.
Do not substitute script.google.com for a frame that actually originates elsewhere;
do not use wildcard origins, Desktop clients, trusted client-side email/roles,
unverified tokens or direct spreadsheet posting. No ID token was obtained.

Web-client identity and protected public configuration are now verified. Real GIS
caller verification, nonce, Owner registry binding, Event/Exception persistence and
live inventory exit tests remain unverified. Operations-role tests separately remain
BLOCKED — OPERATIONS TEST IDENTITY TO CONFIRM.

Existing master/enum/policy/sequence/approval prerequisites also remain unresolved;
the origin blocker must not conceal them.

## Next safe step — requires approved design resolution

Frozen BS requires GIS credential verification, protected roles and controlled
Business-owned Apps Script actions. The WIP's embedded HtmlService GIS host does
not meet Google's accepted-origin constraint.

**PROPOSED SYSTEM POLICY / DESIGN, NOT IMPLEMENTED:** approve a permitted DEV
sign-in host and an explicit credential/challenge transport contract to the existing
privileged Apps Script boundary. Review allowed origins, message/request integrity,
nonce/action binding, replay, token non-disclosure, caller identity and deny-default
behavior before implementing that replacement sign-in path. Do not silently adopt
a new auth method or enable a public endpoint as a workaround.

Package 3 remains PARTIAL / NOT ACCEPTED; V1.0 / Package 2 accepted baseline remains.
