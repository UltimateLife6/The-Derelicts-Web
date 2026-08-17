# Asset manifest

Production files drop into `public/` using the **logical path** (no extension). Rebuild or restart `npm run dev` so `scripts/scan-assets.mjs` prefers the new file. Component code does not need to change.

Preference order: `.webp` > `.avif` > `.jpg` / `.jpeg` > `.png` > `.svg`. Video: `.webm` then `.mp4`. Documents: `.pdf` then `.zip`.

Placeholder SVGs stay as fallbacks. Missing or broken files render **TRANSMISSION PENDING** and do not request a missing raster. Press slots stay **COMING SOON** until a non-SVG file exists. SVG placeholders are never offered as a press kit.

Only the homepage hero raster is preloaded (`priority` + `sizes="100vw"`). Hero and gameplay video play only at `min-width: 768px` and only when the visitor has not requested reduced motion.

## Crop rules

Keep important faces, logos, invention silhouettes, and landmarks inside the safe zone. CSS already applies fit classes; do not rely on letterboxing in the layout.

- **Mobile (~390×844, 9:19.5 hero):** the hero is full-viewport height. Top and bottom crop. Keep the subject in the vertical middle third.
- **Tablet (~768×1024):** still a tall hero. Keep faces and the park skyline away from the top 12% and bottom 18%.
- **Desktop (~1440×900):** 16:9-ish. Side crop is mild. Center the Punktown skyline.
- **Ultrawide (~2560×1080 and up):** left and right crop hard. Keep logos, faces, Radio Tower, Broken Wheel, and the rollercoaster inside the center 60% width.

| Fit | CSS behavior | Safe zone |
| --- | --- | --- |
| `hero` | cover; focal point 32% from top on phones, 42% on desktop, center on ultrawide | subject in center 60% × middle 50% |
| `face` | cover; focal point ~16–18% from top | head/shoulders in the upper third, not flush to the frame |
| `landmark` | cover, center | named building/ride in the center 70% |
| `silhouette` | contain + 8% padding | full invention visible; no edge-critical detail required |
| `logo` | contain + padding | full mark visible |
| `wide` | cover, center | headline subject in the center 70% |

## How to replace a placeholder

1. Export the production file next to the existing SVG, same basename. Example: `public/images/characters/spark.webp` beside `spark.svg`.
2. Run `npm run dev` or `npm run build`. The scanner writes `data/resolved-assets.ts`.
3. Confirm the page. If the raster is absent or 404s, the SVG (or the pending label) still shows.

---

## Priority artwork

### Homepage hero / Punktown key art

- **Filename / path:** `hero.webp` (preferred) at `public/images/backgrounds/hero`
- **Aspect ratio:** 16:9 or 21:9 landscape. Do not ship a portrait key art for this slot.
- **Recommended size:** 2560×1440 (16:9) or 2560×1080 (21:9). 3840×2160 is acceptable if compressed.
- **Purpose:** Punktown at dusk/night as the homepage atmosphere. Park silhouette, Radio Tower, and skyline must read at a glance.
- **Appears in:** `components/home/HeroMedia.tsx`, `components/home/Hero.tsx` (hides the CSS park silhouette when raster exists), press key-art download (`data/media.ts`)
- **Crop notes:** Ultrawide crops the sides. Keep the tower and coaster in the center. Mobile crops top/bottom; keep the horizon near the lower-middle, not the top edge.
- **Status:** SVG placeholder only. Raster is not live, so the CSS `hero-sky` plus park silhouette still show.

### Spark character art

- **Filename / path:** `spark.webp` at `public/images/characters/spark`
- **Aspect ratio:** 4:5
- **Recommended size:** 1600×2000
- **Purpose:** Spark portrait. Face and tool/schematic silhouette must remain readable.
- **Appears in:** homepage roster (`CharacterCard` via `CharacterCarousel`), `/derelicts`, `/derelicts/spark`, press “Character artwork”
- **Crop notes:** `fit="face"`. Place the face in the upper third. Do not put the eyes in the top 8% or they clip on 3:4 cards.
- **Related:** `spark-bg.webp` at `public/images/characters/spark-bg` — optional atmosphere, 16:9, 2400×1350. Used only if raster exists on `/derelicts/spark`.

### Volt character art

- **Filename / path:** `volt.webp` at `public/images/characters/volt`
- **Aspect ratio:** 4:5
- **Recommended size:** 1600×2000
- **Purpose:** Featured electrician portrait. Face and electrical kit must survive cover crop.
- **Appears in:** homepage featured block (`FeaturedCharacter`), roster, `/derelicts`, `/derelicts/volt`
- **Crop notes:** Same face rule as Spark. Featured frame is 4:5; carousel cards can be 3:4.
- **Related:** `volt-bg.webp` at `public/images/characters/volt-bg` — optional atmosphere on the featured section and `/derelicts/volt` when raster exists.

### Tesla Bat

- **Filename / path:** `tesla-bat.webp` at `public/images/inventions/tesla-bat`
- **Aspect ratio:** 1:1
- **Recommended size:** 1200×1200
- **Purpose:** Electrified bat silhouette/product shot on a transparent or dark field.
- **Appears in:** homepage `InventionBuilder` result, `/inventions` prototype bench (`RecipeCard`)
- **Crop notes:** `object-contain` with 8% padding. The full bat must remain uncropped.

### Microwave Drone

- **Filename / path:** `microwave-drone.webp` at `public/images/inventions/microwave-drone`
- **Aspect ratio:** 1:1
- **Recommended size:** 1200×1200
- **Purpose:** Flying microwave silhouette.
- **Appears in:** `InventionBuilder`, `/inventions`
- **Crop notes:** Same as Tesla Bat. Rotors and body must stay inside the square.

### Rocket Cart

- **Filename / path:** `rocket-cart.webp` at `public/images/inventions/rocket-cart`
- **Aspect ratio:** 1:1
- **Recommended size:** 1200×1200
- **Purpose:** Shopping-cart vehicle silhouette.
- **Appears in:** `InventionBuilder`, `/inventions`
- **Crop notes:** Wheels and exhaust must not clip. Prefer a slight three-quarter view that still reads at 80px.

### Vacuum Cannon

- **Filename / path:** `vacuum-cannon.webp` at `public/images/inventions/vacuum-cannon`
- **Aspect ratio:** 1:1
- **Recommended size:** 1200×1200
- **Purpose:** Vacuum-cannon silhouette.
- **Appears in:** `InventionBuilder`, `/inventions`
- **Crop notes:** Barrel length is the risk. Keep the whole weapon inside the square.

### Scout Drone

- **Filename / path:** `scout-drone.webp` at `public/images/inventions/scout-drone`
- **Aspect ratio:** 1:1
- **Recommended size:** 1200×1200
- **Purpose:** Camera drone silhouette.
- **Appears in:** `InventionBuilder`, `/inventions`
- **Crop notes:** Same contain rule. Antennae should not be the only identifying detail at the edge.

### Deadman’s Arcade

- **Filename / path:** `deadmans-arcade.webp` at `public/images/punktown/deadmans-arcade`
- **Aspect ratio:** 16:9
- **Recommended size:** 1920×1080
- **Purpose:** Location still for the arcade.
- **Appears in:** `LocationPanel` on `/` (`PunktownPreview`) and `/punktown`
- **Crop notes:** Cabinets and the entrance sign in the center 70%. 16:9 panel; portrait sources will lose top and bottom.

### Scrapyard

- **Filename / path:** `scrapyard.webp` at `public/images/punktown/scrapyard`
- **Aspect ratio:** 16:9
- **Recommended size:** 1920×1080
- **Purpose:** Vehicle stacks and cranes as a location still.
- **Appears in:** `LocationPanel` on `/` and `/punktown`
- **Crop notes:** Keep the crane or stacked hulks in the center. Avoid putting the only landmark on the far right (ultrawide map is separate).

### Old Rollercoaster

- **Filename / path:** `old-rollercoaster.webp` at `public/images/punktown/old-rollercoaster`
- **Aspect ratio:** 16:9
- **Recommended size:** 1920×1080
- **Purpose:** Coaster skeleton over the park.
- **Appears in:** `LocationPanel` on `/` and `/punktown`
- **Crop notes:** The track silhouette is the landmark. Keep it in the horizontal center.

### Radio Tower

- **Filename / path:** `radio-tower.webp` at `public/images/punktown/radio-tower`
- **Aspect ratio:** 16:9
- **Recommended size:** 1920×1080
- **Purpose:** Punktown’s mast / voice.
- **Appears in:** `LocationPanel` on `/` and `/punktown`
- **Crop notes:** Tower top is easy to clip on 16:9. Place the mast in the middle, with sky above and base below.

### Punktown overview / map art

- **Filename / path:** `overview.webp` at `public/images/punktown/overview`
- **Aspect ratio:** 1:1 or 4:3
- **Recommended size:** 2048×2048 (square) or 2048×1536 (4:3)
- **Purpose:** Map backdrop under location markers. Replaces the CSS/SVG park drawing when raster exists.
- **Appears in:** `components/punktown/PunktownMap.tsx` (`MapBackdrop`) on `/` and `/punktown`
- **Crop notes:** The map container is wide on desktop (~70vw × 520px) and shorter on mobile. Named landmarks must sit in the center 80%. Extra terrain can live in the margins that ultrawide will crop. Markers are overlaid in CSS at percentages from `data/locations.ts` — paint landmarks to match those positions (Deadman’s Arcade 18/38, Scrapyard 82/70, Old Rollercoaster 40/16, Radio Tower 60/10, and the rest in `data/locations.ts`).
- **Status:** No file yet. The illustrated SVG map remains until a raster is dropped.

### OG / social-share artwork

- **Filename / path:** `og.webp` at `public/images/brand/og`
- **Aspect ratio:** 1.91:1 (1200×630)
- **Recommended size:** 1200×630 (2400×1260 if you want a 2× source)
- **Purpose:** Open Graph and Twitter `summary_large_image`. Served by `app/opengraph-image.tsx` when raster exists; otherwise the generated typographic card stays.
- **Appears in:** every route via `createMetadata` (`/opengraph-image`)
- **Crop notes:** Keep logo, title, and faces inside a 1200×630 safe frame. Do not reuse the ultrawide hero without a recrop.

### Trailer

- **Filename / path:** `trailer.webm` or `trailer.mp4` at `public/video/trailer`
- **Aspect ratio:** 16:9
- **Recommended size:** 1920×1080, H.264 or VP9/AV1, under ~40MB if possible
- **Purpose:** Homepage “Watch trailer” dialog. Also the press “Gameplay footage” download when present.
- **Appears in:** `components/home/Hero.tsx`, `components/press/PressAssets.tsx`
- **Notes:** No file means the button reads **TRAILER / COMING SOON**. Do not add a fake YouTube URL.

### Hero loop (optional)

- **Filename / path:** `hero-loop.webm` or `hero-loop.mp4` at `public/video/hero-loop`
- **Aspect ratio:** match key art (16:9 or 21:9)
- **Recommended size:** 1920×1080, muted, loopable, `preload="none"`
- **Purpose:** Desktop hero atmosphere. Never plays on mobile or when `prefers-reduced-motion: reduce`.
- **Appears in:** `components/home/HeroMedia.tsx`
- **Notes:** Always ship `hero.webp` as the poster/fallback before enabling the loop.

### Gameplay / movement media

Stills: `public/images/media/movement/{id}.webp`  
Loops: `public/video/gameplay/{id}.webm`

Clip ids: `sprinting`, `sliding`, `mantling`, `vaulting`, `climbing`, `ziplines`, `grind-rails`, `jump-pads`, `shopping-carts`, `improvised-bikes`, `launchers`.

- **Aspect ratio:** 3:4 (strip cards)
- **Recommended still:** 720×960
- **Recommended loop:** 720×960 or 1080×1440, muted, a few seconds, under ~4MB each
- **Purpose:** Homepage movement ticker (`MovementSection` + `MediaPlaceholder`)
- **Crop notes:** Full-body motion in the center. Faces and vehicle silhouettes must survive a 3:4 cover crop.
- **Notes:** Video is desktop-only and motion-safe. Empty slots show the branded **CLIP SLOT** label. No files exist yet.

---

## Remaining character portraits

Same spec as Spark/Volt: 4:5, 1600×2000, `fit="face"`. Optional `{slug}-bg.webp` 16:9 atmosphere.

| Character | Path | Routes / components |
| --- | --- | --- |
| Moldy | `/images/characters/moldy` | roster, `/derelicts`, `/derelicts/moldy` |
| Ratchet | `/images/characters/ratchet` | roster, `/derelicts`, `/derelicts/ratchet` |
| Packet | `/images/characters/packet` | roster, `/derelicts`, `/derelicts/packet` |
| Scraps | `/images/characters/scraps` | roster, `/derelicts`, `/derelicts/scraps` |
| Willow | `/images/characters/willow` | roster, `/derelicts`, `/derelicts/willow` |
| Icebox | `/images/characters/icebox` | roster, `/derelicts`, `/derelicts/icebox` |

## Remaining Punktown locations

Same spec as Deadman’s Arcade: 16:9, 1920×1080, `fit="landmark"`, `LocationPanel` on `/` and `/punktown`.

| Location | Path |
| --- | --- |
| Broken Wheel | `/images/punktown/broken-wheel` |
| Trash Mountain | `/images/punktown/trash-mountain` |
| The Funhouse | `/images/punktown/the-funhouse` |
| Flooded Midway | `/images/punktown/flooded-midway` |
| Derelict Market | `/images/punktown/derelict-market` |
| Maintenance Tunnels | `/images/punktown/maintenance-tunnels` |
| The Pit | `/images/punktown/the-pit` |

## Remaining inventions

Same spec as Tesla Bat: 1:1, 1200×1200, contain. Homepage builder + `/inventions` (concepts use the scrap card).

| Invention | Path |
| --- | --- |
| Junk Cannon | `/images/inventions/junk-cannon` |
| Soda Bomb | `/images/inventions/soda-bomb` |
| Magnet Gun | `/images/inventions/magnet-gun` |
| Trash Tornado | `/images/inventions/trash-tornado` |
| Boom Box | `/images/inventions/boom-box` |
| Paint Bomb | `/images/inventions/paint-bomb` |

## News stills

16:9, 1920×1080, `fit="wide"`. Alt text is the post title.

| Post | Path | Routes |
| --- | --- | --- |
| First transmission from Punktown | `/images/news/first-transmission` | `/news`, `/news/first-transmission` |
| Volt is live on the board | `/images/news/volt-board` | `/news`, `/news/volt-on-the-board` |
| Punktown map fragments recovered | `/images/news/map-fragments` | `/news`, `/news/punktown-map-fragments` |

## Brand and press

| Slot | Path | Size | Notes |
| --- | --- | --- | --- |
| Logo | `/images/brand/logo` | 1024×1024 square or SVG lockup, contain | Press download when raster/PDF exists. Navbar stays typeset. |
| App icon | `/images/brand/icon` | 512×512 PNG | Used by `app/icon.tsx` and `manifest.ts`. Generated “D” mark until then. Optional extra: `public/favicon.ico`. |
| Apple touch | `/images/brand/apple-touch` | 180×180 PNG | `app/apple-icon.tsx`. Falls back to icon, then generated mark. |
| Screenshots pack | `/press/screenshots` | zip of stills, or one 1920×1080 collage | Press download only. |
| Fact sheet | `/press/fact-sheet` | PDF | Press download only. |

## Performance notes

- Compress WebP/AVIF. Hero under ~400KB if possible; portraits under ~200KB; invention squares under ~120KB.
- Do not drop uncompressed 8K stills into `public/`.
- Do not enable hero or gameplay video on mobile in CSS/JS — the media components already gate it.
- `next/image` serves AVIF/WebP derivatives for rasters. SVGs skip `next/image` and fall back through `<img onError>`.
