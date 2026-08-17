# The Derelicts — Official Site

Marketing website for **The Derelicts**, a stylized third-person multiplayer action game.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion

## Develop

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Email signup

`POST /api/crew` is implemented, but it will not claim success until `CREW_PROVIDER` is configured in `.env`. Copy `.env.example` and wire a provider later (Resend, SendGrid, Mailchimp, ConvertKit, or a database).

## Assets

Placeholder art lives under `public/images/`. Drop production artwork in the same paths to replace it without rewriting components.

```text
public/images/characters/
public/images/punktown/
public/images/inventions/
public/images/backgrounds/
public/images/brand/
public/video/
public/audio/
```
