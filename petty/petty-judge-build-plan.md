# Meme Judge — Full Build Plan
> Demo-ready by tomorrow. One judge (Homelander). Two users. Full voice. Dramatic verdict.

---

## The Idea
A web-based courtroom where two people present their petty dispute to an AI judge. The judge (Homelander) asks questions to both sides, roasts everyone, and delivers a hilarious unhinged verdict. Judge speaks out loud using ElevenLabs TTS. Users can speak their case using speech-to-text.

---

## Stack
| Layer | Tool |
|---|---|
| Frontend | React + Vite + Framer Motion |
| Backend | Node.js + Express |
| AI Judge | Gemini 2.5 Flash |
| Judge Voice | ElevenLabs TTS |
| User Voice Input | ElevenLabs STT (if time allows) |
| Hosting | Vercel (frontend) + Railway (backend) |

---

## API Keys Setup

### Rotate your keys first!
You shared both keys in screenshots. Rotate them before building:
- **Gemini** → aistudio.google.com → API Keys → delete → recreate
- **ElevenLabs** → elevenlabs.io → Profile → API Keys → delete → recreate

### Frontend `.env`
```
VITE_GEMINI_API_KEY=your_new_gemini_key
```

### Backend `.env`
```
ELEVENLABS_API_KEY=your_new_elevenlabs_key
HOMELANDER_VOICE_ID=your_voice_id_from_elevenlabs
```

> **Why split?** VITE_ prefix exposes keys in the browser. ElevenLabs key must stay backend only or people can steal your credits.

---

## Pricing (Free Tier is Fine for Demo)

| Service | Free Tier | Demo Usage | Pay? |
|---|---|---|---|
| Gemini 2.5 Flash | 1,500 req/day | ~20-30 requests | NO |
| ElevenLabs TTS | 10,000 chars/month | ~200-300 chars per response | NO |

**Total cost for demo: $0** — only pay if you go public or run out of credits.

---

## Folder Structure
```
petty/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.jsx       ← enter names + pick rounds
│   │   │   ├── Courtroom.jsx         ← main courtroom layout
│   │   │   ├── Judge.jsx             ← Homelander avatar + speaking animation
│   │   │   ├── UserPanel.jsx         ← left/right user panels
│   │   │   ├── MessageFeed.jsx       ← scrolling chat history
│   │   │   ├── InputBar.jsx          ← mic + text input + speaker toggle
│   │   │   └── VerdictOverlay.jsx    ← dramatic full screen verdict
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── .gitignore                    ← make sure .env is in here!
│
└── backend/
    ├── server.js
    ├── routes/
    │   ├── chat.js                   ← Gemini API calls
    │   └── voice.js                  ← ElevenLabs API calls
    └── .env
```

---

## Interaction Flow

```
1. LANDING PAGE
   └── Person A enters their name
   └── Person B enters their name
   └── Pick number of rounds (2 or 3)
   └── Judge is Homelander (hardcoded for demo)
   └── Hit START

2. COURTROOM OPENS
   └── Homelander greets both users by name
   └── ElevenLabs plays greeting audio
   └── Judge asks Person A to present their case

3. ROUND LOOP (repeats N times)
   └── Person A speaks or types their argument
   └── Gemini generates Homelander response + follow-up question
   └── ElevenLabs speaks the response out loud
   └── Person B speaks or types their argument
   └── Gemini generates Homelander response + follow-up question
   └── ElevenLabs speaks the response out loud
   └── Repeat for chosen number of rounds

4. VERDICT
   └── User hits GET VERDICT button
   └── Screen dims dramatically
   └── Gemini generates final unhinged verdict picking a winner
   └── Big VERDICT text appears on screen
   └── ElevenLabs reads verdict out loud
   └── Winner announced with animation
```

---

## Judge Personality — Homelander

**Vibe:** Unhinged. Threatening. Thinks he's the greatest. Zero patience. Dramatic. Occasionally references his powers.

**Gemini System Prompt:**
```
You are Homelander from The Boys, acting as a courtroom judge. 
You are unhinged, narcissistic, threatening, and dramatic. 
You think you are the greatest judge who has ever lived.
You are judging a petty dispute between [PERSON_A] and [PERSON_B].
You speak in short punchy sentences. You make pop culture and meme references.
You occasionally threaten people with laser eyes or other powers.
You ask one sharp follow-up question per turn.
Keep responses under 4 sentences — short, punchy, and funny.
After all rounds, deliver a final verdict picking one winner. Be dramatic.
```

**Example responses:**
- "You DISGUST me. I've heard better arguments from people I've vaporized. [NAME], that was embarrassing. Did you even prepare for this?"
- "Okay I'm not going to lie, that was kind of impressive. Don't let it go to your head. I could still end you. [OTHER NAME], your turn — impress me."
- "VERDICT: [NAME] wins. [OTHER NAME], you owe them an apology and frankly you should be grateful I don't use my laser eyes right now. Court dismissed."

---

## Claude Code Prompts (Run These in Order)

### Step 1 — Project Setup
```
Create a React Vite app in a /frontend folder and an Express backend 
in a /backend folder. 

Frontend dependencies: react, vite, framer-motion, axios
Backend dependencies: express, cors, dotenv, node-fetch

Add a .gitignore to both folders that ignores node_modules and .env files.
```

### Step 2 — Backend Server
```
Create /backend/server.js with Express on port 3001.
Add CORS and dotenv.

Create two routes:
1. POST /api/chat
   - Accepts: { messages: [], personA: string, personB: string, isVerdict: boolean }
   - Calls Gemini 2.5 Flash API with Homelander system prompt
   - Returns: { response: string }

2. POST /api/speak
   - Accepts: { text: string }
   - Calls ElevenLabs TTS API with HOMELANDER_VOICE_ID from .env
   - Returns audio buffer as audio/mpeg
   - Use model: eleven_multilingual_v2
```

### Step 3 — Landing Page
```
Create /frontend/src/components/LandingPage.jsx

Include:
- Dark dramatic background (black and red theme)
- Big title: MEME JUDGE
- Input for Person A name (left side)
- Input for Person B name (right side)
- Dropdown to select number of rounds: 2 or 3
- Large START button
- Homelander judge shown as selected (hardcoded, no selection needed)
- On submit, pass names and rounds to App.jsx and switch to Courtroom view
- Use Framer Motion for entrance animations
- Font should feel dramatic and bold
```

### Step 4 — Courtroom Layout
```
Create /frontend/src/components/Courtroom.jsx

Layout:
- Full screen dark courtroom background
- Top center: Judge.jsx component (Homelander avatar)
- Left side: Person A name + their messages
- Right side: Person B name + their messages  
- Center: MessageFeed.jsx showing full conversation
- Bottom: InputBar.jsx with text input and mic button
- Top right: GET VERDICT button (red, bold)

Pass in: personA, personB, rounds as props
```

### Step 5 — Conversation Logic
```
In Courtroom.jsx add conversation state and logic:

- On mount, call POST /api/chat with empty history to get opening message
- Store messages as array: { role: 'judge' | 'a' | 'b', content: string }
- Track currentSpeaker (starts as 'a')
- Track roundCount
- On user submit:
  - Add message to history
  - Call POST /api/chat with full history
  - Add judge response to history
  - Call POST /api/speak with judge response text
  - Play returned audio in browser using Audio API
  - Switch currentSpeaker to other person
  - Increment round count when both have spoken
  - Disable input when max rounds reached, show GET VERDICT button prominently
```

### Step 6 — Judge Component
```
Create /frontend/src/components/Judge.jsx

- Display Homelander avatar image (use a placeholder div with HL initials if no image)
- Red and black color scheme
- When prop isSpeaking=true: add pulsing glow animation using Framer Motion
- When prop isSpeaking=false: static display
- Show "HOMELANDER" label underneath
- Position at top center of courtroom
```

### Step 7 — Verdict Overlay
```
Create /frontend/src/components/VerdictOverlay.jsx

- Full screen overlay triggered when GET VERDICT clicked
- Background dims to near black
- Call POST /api/chat with isVerdict: true
- System adds to prompt: "Give your final verdict now. Pick a winner. 
  Be dramatic, unhinged, and threatening. End with COURT DISMISSED."
- Show large VERDICT text that animates in
- Display verdict text in styled box
- Play verdict audio via ElevenLabs
- Show winner name with dramatic animation
- Add confetti or red flash effect for winner
- Use Framer Motion for all animations
```

### Step 8 — Polish
```
Add final polish:

- Messages fade in with Framer Motion when they appear
- User A messages appear on left, User B on right, Judge centered
- Add a gavel sound effect when verdict is triggered (find a free .mp3)
- Add loading spinner while waiting for judge response
- Add "Homelander is thinking..." text while API loads
- Make sure audio plays automatically without user needing to click anything
- Test full flow: landing → courtroom → 2 rounds → verdict
```

---

## Voice ID — Before You Start
1. Go to **elevenlabs.io/voice-library**
2. Search for a deep, dramatic, authoritative voice
3. Click the voice → copy the **Voice ID** from the URL or settings
4. Add to `backend/.env`:
```
HOMELANDER_VOICE_ID=paste_id_here
```

---

## Future Judges (After Demo)
| Judge | Vibe |
|---|---|
| Justin Bieber | Dramatic, emotional, pop star energy, says "bro" a lot |
| LeBron James | Competitive, stats-obsessed, passive aggressive, references championships |

---

## Security Reminders
- Never screenshot your `.env` file
- Never commit `.env` to GitHub
- After the demo, move Gemini key to backend too
- Rotate any keys you've already shared in screenshots

---

## Demo Checklist
- [ ] Rotate Gemini API key
- [ ] Rotate ElevenLabs API key  
- [ ] Pick Homelander voice ID from ElevenLabs voice library
- [ ] Add all keys to `.env` files
- [ ] Run through Steps 1-8 in Claude Code
- [ ] Test full flow at least twice before demo
- [ ] Make sure audio works in the browser you're demoing in
- [ ] Keep demo under 30 seconds — petty dispute, 2 rounds, verdict
