# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Meme Judge** — a web courtroom where two users present a petty dispute to an AI judge (Homelander). The judge responds via Gemini 2.5 Flash and speaks out loud via ElevenLabs TTS.

## Stack

| Layer | Tool |
|---|---|
| Frontend | React 18 + Vite 5 + Framer Motion + Axios |
| Backend | Node.js (ESM) + Express on port 3001 |
| AI Judge | Gemini 2.5 Flash (`gemini-2.5-flash`) |
| Judge Voice | ElevenLabs TTS (`eleven_multilingual_v2`) |

## Dev Commands

**Backend** (from `backend/`):
```
npm install
npm run dev      # nodemon — auto-restarts on changes
npm start        # plain node
```

**Frontend** (from `frontend/`):
```
npm install
npm run dev      # Vite dev server on :5173, proxies /api → :3001
npm run build    # output to dist/
```

Both servers must run simultaneously during development.

## Environment Variables

**`backend/.env`** — copy from template and fill in real keys:
```
GEMINI_API_KEY=...
ELEVENLABS_API_KEY=...
HOMELANDER_VOICE_ID=...
```

The root `.env` (`VITE_GEMINI_API_KEY`) is unused — Gemini calls are handled server-side.

## Architecture

```
App.jsx
 └── LandingPage.jsx     — collects names + rounds, calls onStart()
 └── Courtroom.jsx       — orchestrates the full game loop
      ├── Judge.jsx       — avatar with pulsing glow when speaking
      ├── MessageFeed.jsx — animated message history (judge centered, A left, B right)
      ├── InputBar.jsx    — text input, switches between players
      └── VerdictOverlay.jsx — full-screen verdict (fetches from /api/chat + plays audio)
```

**Game loop** (`Courtroom.jsx`): on mount → POST `/api/chat` with empty history for opening → each user submission sends full history → judge responds → audio plays → speakers alternate → after N rounds both spoke, `roundsComplete = true` → GET VERDICT button appears → `VerdictOverlay` fetches final verdict with `isVerdict: true`.

**Backend routes:**
- `POST /api/chat` — calls Gemini with Homelander system prompt; `isVerdict: true` appends verdict instruction
- `POST /api/speak` — calls ElevenLabs TTS, pipes `audio/mpeg` back to client

## Hosting

- Frontend → Vercel (set `VITE_` env vars if any are added back)
- Backend → Railway (set `GEMINI_API_KEY`, `ELEVENLABS_API_KEY`, `HOMELANDER_VOICE_ID`)
- Update `vite.config.js` proxy target for production (or use `VITE_API_URL`)
