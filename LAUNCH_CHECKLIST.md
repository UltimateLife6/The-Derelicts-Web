# Launch checklist

Items that still need a human: an asset, a credential, a real URL, or a decision. Site plumbing that already exists (404, sitemap, robots, canonicals, form error states, skip link, reduced-motion gates, generated favicon/OG fallbacks) is not listed.

## Production artwork

Drop files using the paths in `ASSET_MANIFEST.md`. Nothing here should be faked.

- [ ] Homepage hero / Punktown key art (`public/images/backgrounds/hero.webp`)
- [ ] Spark portrait (`public/images/characters/spark.webp`)
- [ ] Volt portrait (`public/images/characters/volt.webp`)
- [ ] Remaining Derelict portraits (Moldy, Ratchet, Packet, Scraps, Willow, Icebox)
- [ ] Optional character atmosphere stills (`{slug}-bg.webp`)
- [ ] Tesla Bat, Microwave Drone, Rocket Cart, Vacuum Cannon, Scout Drone
- [ ] Remaining invention stills (concept scraps)
- [ ] Deadman’s Arcade, Scrapyard, Old Rollercoaster, Radio Tower
- [ ] Remaining Punktown location stills
- [ ] Punktown overview / map art (`public/images/punktown/overview.webp`), painted to match marker positions in `data/locations.ts`
- [ ] News stills for the three live posts
- [ ] Logo raster or final lockup (`public/images/brand/logo.webp`)
- [ ] App icon 512×512 (`public/images/brand/icon.png`) and optional `public/favicon.ico`
- [ ] Apple touch icon 180×180 (`public/images/brand/apple-touch.png`)
- [ ] Open Graph image 1200×630 (`public/images/brand/og.webp`)
- [ ] Verify face, invention, logo, and landmark crops at mobile, tablet, desktop, and ultrawide after each drop

## Gameplay and trailer media

- [ ] Trailer file (`public/video/trailer.webm` or `.mp4`) — or a later decision to use a real host URL instead of a self-hosted file
- [ ] Optional muted hero loop (`public/video/hero-loop.webm`) only after key art exists
- [ ] Movement stills and/or desktop loops for the eleven clip ids in `data/media.ts`
- [ ] Press screenshot pack (`public/press/screenshots.zip` or a collage at that logical path)
- [ ] Press fact sheet PDF (`public/press/fact-sheet.pdf`)

## URLs, credentials, and copy decisions

- [ ] After the custom domain is live, set `NEXT_PUBLIC_SITE_URL` to that origin. Leave it unset (not blank) on Vercel until then so the deployment URL is used
- [ ] Choose host/CDN and wire the production domain
- [ ] Fill real social profile URLs in `data/socials.ts` (Discord, YouTube, TikTok, Instagram, X). Leave `null` until the account exists
- [ ] Publish a contact address or form destination on `/contact`
- [ ] Replace `/privacy` and `/terms` with counsel-reviewed copy before collecting email
- [ ] Decide Join the Crew provider, then set `CREW_PROVIDER` and complete the provider integration in `lib/crew.ts` (until then, valid emails return 503 and are not stored)
- [ ] Provider API keys / list IDs in the host environment — never commit them
- [ ] Decide whether analytics is on. Only then set `NEXT_PUBLIC_ANALYTICS=1` and attach a real destination to the `derelicts:analytics` events
- [ ] Do not add platform-store links, review quotes, player counts, or a release date until those are real

## Post-drop QA

- [ ] After art lands, spot-check `/`, `/derelicts`, `/punktown`, `/inventions`, `/press`, and a news post on a phone
- [ ] Confirm the trailer button label flips from **TRAILER / COMING SOON** only when the file is present
- [ ] Confirm press tiles flip from **COMING SOON** to **READY** only for non-SVG files
- [ ] Confirm no console 404s for missing rasters (the resolver must not request files that were never dropped)
