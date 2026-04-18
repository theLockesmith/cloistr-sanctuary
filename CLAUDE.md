# CLAUDE.md - cloistr-sanctuary

**Landing page and service directory for cloistr.xyz**

## Project Information

- **Company:** Coldforge
- **Type:** Static Web Application (SolidJS)
- **URL:** `cloistr.xyz`
- **Registry:** `registry.coldforge.xyz/coldforge/cloistr-sanctuary`
- **Repo:** `git@git.coldforge.xyz:coldforge/cloistr-sanctuary.git`

**Company Rules:** See [Coldforge CLAUDE.md](~/arbiter/coldforge/CLAUDE.md)
**Cloistr Rules:** See [Cloistr CLAUDE.md](~/arbiter/cloistr/CLAUDE.md)

## Purpose

Central welcome page for Cloistr. Serves cloistr.xyz root domain with:
- Hero messaging ("Freedom as a Service")
- Service grid linking to all Cloistr services
- Feature highlights (Zero-Knowledge, Portable, Open Source)
- CTA directing to me.cloistr.xyz for identity signup

## Architecture

Static SPA built with SolidJS, served via unprivileged container.

**Note:** cloistr.xyz also serves NIP-05 and LNURLP endpoints via path-based routing:
- `/.well-known/*` → cloistr-me backend
- `/api/*` → cloistr-me backend
- `/*` (catch-all) → cloistr-sanctuary

## Quick Commands

```bash
# Development
pnpm install
pnpm dev

# Build
pnpm build
pnpm preview
```

## Deployment

GitLab CI builds image on push. ArgoCD syncs to production.

## Services Listed

| Service | URL |
|---------|-----|
| Identity | me.cloistr.xyz |
| Social | space.cloistr.xyz |
| Files | stash.cloistr.xyz |
| Documents | docs.cloistr.xyz |
| Sheets | sheets.cloistr.xyz |
| Whiteboard | whiteboard.cloistr.xyz |
| Slides | slides.cloistr.xyz |
| Relay | relay.cloistr.xyz |
| Discovery | discover.cloistr.xyz |
