import { Router } from 'express';
import fetch from 'node-fetch';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    const elevenRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.HOMELANDER_VOICE_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.45, similarity_boost: 0.85 }
        })
      }
    );

    if (!elevenRes.ok) {
      const err = await elevenRes.text();
      console.error('ElevenLabs error:', err);
      return res.status(500).json({ error: 'TTS failed: ' + err });
    }

    const arrayBuffer = await elevenRes.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    res.json({ audio: base64 });
  } catch (err) {
    console.error('Voice route error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
