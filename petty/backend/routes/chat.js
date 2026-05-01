import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

const BASE_SYSTEM_PROMPT = `You are Homelander from The Boys, acting as a courtroom judge.
You ARE Homelander — speak exactly like him: aggressive, self-obsessed, threatening, unhinged, and darkly funny.
Use his actual speech patterns: short declarative sentences, sudden mood swings, casual threats of violence, references to being the most powerful person in the room.
You are judging a petty dispute between PERSON_A and PERSON_B.
Keep ALL responses under 4 sentences. Be punchy, dramatic, and funny.
End every response with one sharp follow-up question — directed only at whoever you are currently addressing.
Never break character. Never be polite. Never be neutral.`;

router.post('/', async (req, res) => {
  try {
    const { messages = [], personA, personB, currentSpeakerName, isVerdict } = req.body;

    let systemPrompt = BASE_SYSTEM_PROMPT
      .replace('PERSON_A', personA)
      .replace('PERSON_B', personB);

    if (currentSpeakerName) {
      systemPrompt += `\n\nThe person currently presenting their case is ${currentSpeakerName}. Direct your response and follow-up question ONLY to ${currentSpeakerName}. Do NOT address or ask questions to the other person yet.`;
    }

    if (isVerdict) {
      systemPrompt += `\n\nDeliver your final verdict. You MUST follow this exact format:
1. Start by dramatically declaring the winner: "I hereby declare [winner's name] THE WINNER of this case."
2. Give one brutal sentence explaining why the loser lost.
3. Give one sentence mocking the loser personally.
4. End with: "COURT DISMISSED." spoken like only Homelander can.
Pick a winner — you are NOT allowed to call it a tie.`;
    }

    const geminiContents = messages.length > 0
      ? messages.map(m => ({
          role: m.role === 'judge' ? 'model' : 'user',
          parts: [{
            text: m.role === 'judge'
              ? m.content
              : `[${m.role === 'a' ? personA : personB}]: ${m.content}`
          }]
        }))
      : [{
          role: 'user',
          parts: [{ text: `Greet ${personA} and ${personB} dramatically by name, then ask ${personA} to present their case first.` }]
        }];

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: geminiContents
        })
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error('Gemini error:', JSON.stringify(data, null, 2));
      return res.status(500).json({ error: data.error?.message ?? 'Gemini API error' });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      ?? "I have no words. Actually I do — you're all beneath me. Next!";

    res.json({ response: text });
  } catch (err) {
    console.error('Chat route error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
