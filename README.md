# MyCarPerson

An employee-centered automotive identity and reputation platform. The first release is a clearly labeled product preview built with Next.js App Router, React, TypeScript, and Zod.

## Available in this release

- Responsive professional directory with combined name/brand/specialty, city/state, and role filters; deterministic sorting and empty states.
- Six fictional public example profiles with specialties, work history, and correctly derived sample-review averages.
- Saved people stored only in this browser, including cross-tab synchronization.
- Public example-profile sharing, downloadable QR codes, and downloadable sample vCards.
- Accessible review-form preview. Reviews are not sent, stored, or published.
- Profile studio with live preview, validation, locally saved drafts, JSON backup/import, profile color, and vCard export.
- Professional positioning page with an explicit roadmap.
- Custom missing-profile and error states; all sample content is excluded from indexing.

## Run

Requires Node.js 20.9+ (the linked Vercel project uses Node.js 24).

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run build
```

No environment variables or database are required for this product-preview release.

## Routes

| Route                | Purpose                                                          |
| -------------------- | ---------------------------------------------------------------- |
| `/`                  | Directory and search                                             |
| `/alex-morgan`       | Representative example public profile                            |
| `/:slug`             | Six known fictional profiles; other slugs return 404             |
| `/studio`            | Editable local profile draft                                     |
| `/preview`           | The current device's saved draft; not a shareable public profile |
| `/saved`             | This device's saved example profiles                             |
| `/for-professionals` | Positioning and delivery roadmap                                 |

## Deployment

The existing `persalabsllc/mycarperson` GitHub repository is linked to the Persa Labs Vercel project `mycarperson`. `vercel.json` selects Next.js and a reproducible `npm ci` install. Push to its production branch to trigger deployment.

## Important release boundaries

This is **not an account-backed social network yet**. All sample identities, employers, achievements, and reviews are fictional and explicitly labeled. The app does not claim to have verified these records. No form pretends to submit successfully to a nonexistent service. Contact links are not active for sample people. A studio draft or proposed handle is not published or reserved; browser storage can be cleared and is not a backup.

Do not enable indexing until sample content has been removed from the real directory or isolated from it. The current release has both a noindex directive and a disallow-all robots file.

## Next implementation slice

1. Configure app-owned authentication and a dedicated durable Postgres database. Do not reuse another product's customer database or secrets.
2. Introduce users, employee-owned profiles, mutable employment records, unique claimed handles, and authenticated owner-only profile mutations. Keep draft and published states explicit.
3. Add profile photo uploads with file limits and object storage. Initials are used until members upload real images.
4. Add real review invitations, appropriate verification evidence, abuse reporting, moderation, and review-response permissions. Imported reviews require a permitted source and clear provenance; never scrape and relabel third-party reviews as verified.
5. Add direct messages, professional connections, and a distinct opt-in career area. Employer visibility controls must be enforced server-side; never promise complete secrecy from inference or screenshots.
6. Add account/data deletion, privacy and terms pages grounded in the real data flows, rate limiting, and operational monitoring before public sign-ups.

The core identity is a person, not a dealership. Updating a workplace should not change their stable profile URL or detach reviews legitimately collected for that person on this platform.
