================================================================
HOMELANDER COURTROOM — UI BUILD PLAN
================================================================


OVERALL VIBE
------------
Dark courtroom, gold accents, red vs blue team colors, 
Homelander centered and dominant, military/superhero aesthetic.


================================================================
LAYOUT BREAKDOWN
================================================================

TOP BAR (HEADER)
- Left: HOMELANDER COURTROOM logo with stars underneath
- Center: Homelander quote that rotates between iconic lines
- Right: Welcome back Judge profile pill with avatar

LEFT SIDEBAR
- New Case
- Case History
- Leaderboard
- Settings
- Dark background, gold icon accents
- Active item highlighted in gold

MAIN CENTER — HOMELANDER
- Large illustrated Homelander portrait sitting on throne/bench
- JUDGE MODE badge top right — says SUPREME
- Gold eagle/vought logo watermark behind him
- VS text in center between the two panels

LEFT PANEL — Prosecution (Person A)
- Red theme
- Header: PROSECUTION with gavel icon
- Subtext: "Making the case against"
- Messages in dark red rounded cards
- Red gavel avatar per message
- Timestamps

RIGHT PANEL — Defense (Person B)
- Blue theme
- Header: DEFENSE with shield icon
- Subtext: "Making the case for"
- Messages in dark blue rounded cards
- Blue shield avatar per message
- Timestamps

INPUT BAR
- Full width dark input at the bottom
- Placeholder: "Describe your case..."
- Send button on the right with arrow icon
- Clean, minimal, no clutter

BOTTOM VERDICT BAR
- Gold stars framing FINAL VERDICT text
- Giant GUILTY or winner text in gold
- REASONING section — short explanation
- SENTENCE section — the punishment/ruling
- Homelander signature bottom right


================================================================
IMPROVEMENTS OVER CURRENT UI
================================================================

Current                          Improved
-------                          --------
Static Homelander image          Subtle glow/pulse when judge thinking
Plain send button                Button animates on hover with red glow
Messages just appear             Messages fade in with slide animation
Static verdict text              Verdict slams in with scale animation
No sound                         Gavel sound + ElevenLabs voice auto plays
No loading state                 "Homelander is thinking..." pulsing dots


================================================================
COLORS
================================================================

Background:        #0A0A0F   (near black)
Panel background:  #12121A
Red (Person A):    #8B1A1A   cards,   #C0392B accents
Blue (Person B):   #1A2A4A   cards,   #2980B9 accents
Gold accents:      #C8922A
Gold text:         #E8B84B
White text:        #F0E6D3   (warm white, not pure white)
Border:            #2A2A3A


================================================================
FONTS
================================================================

Headers/Logo:   Playfair Display Bold or Cinzel
Body text:      Crimson Pro or Georgia
UI labels:      Inter or Roboto medium
Verdict text:   Cinzel Black — massive and dramatic


================================================================
CLAUDE CODE PROMPT — COPY AND PASTE THIS
================================================================

Build a React component called Courtroom.jsx that matches 
this exact layout:

- Dark near-black background #0A0A0F
- Left sidebar with navigation: New Case, Case History, 
  Leaderboard, Settings. Gold icons, dark background.
- Top header with HOMELANDER COURTROOM logo left, 
  rotating quote center, profile pill right.
- Main area split into three columns:
  Left: Prosecution panel, red theme #8B1A1A, 
        messages in red cards with gavel avatar
  Center: Homelander portrait image, VS text, 
          JUDGE MODE badge, eagle watermark
  Right: Defense panel, blue theme #1A2A4A, 
         messages in blue cards with shield avatar
- Bottom: Full width dark input bar with send button
- Below input: Verdict bar with gold FINAL VERDICT text, 
  GUILTY verdict in massive gold Cinzel font, 
  REASONING and SENTENCE sections side by side,
  Homelander signature bottom right
- Use Framer Motion for message fade-in and verdict 
  slam animation
- Gold accent color: #C8922A throughout
- Font: Cinzel for headers, Inter for body
- Import Cinzel from Google Fonts


================================================================
HOMELANDER ROTATING QUOTES (for the header)
================================================================

"I can do whatever the f*ck I want."
"I am the most powerful person on this planet."
"You should be afraid of me."
"I'm Homelander. I can do whatever I want."
"There is no one who can stop me."


================================================================
VERDICT BAR DETAILS
================================================================

Layout (left to right):
[ Eagle Logo ] [ ★★★ FINAL VERDICT ★★★ ] [ GUILTY ] [ REASONING | SENTENCE ] [ Signature ]

GUILTY text: Cinzel Black, ~64px, gold #E8B84B
Stars: gold, decorative
REASONING box: dark panel, small gold header, white body text
SENTENCE box: dark panel, small gold header, white body text
Signature: "Homelander" in cursive/script font, red


================================================================
ANIMATIONS — FRAMER MOTION
================================================================

Messages:
- Initial: opacity 0, y: 20
- Animate: opacity 1, y: 0
- Duration: 0.3s ease

Verdict slam:
- Initial: scale 0, opacity 0
- Animate: scale 1, opacity 1
- Type: spring, stiffness 300

Judge thinking pulse:
- Animate: opacity between 0.6 and 1
- Repeat: infinite
- Duration: 1s

Send button hover:
- Scale: 1.05
- Box shadow: red glow #C0392B


================================================================