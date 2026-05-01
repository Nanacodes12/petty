import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import chatRouter from './routes/chat.js';
import voiceRouter from './routes/voice.js';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/models', async (req, res) => {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
  const data = await r.json();
  res.json(data.models?.map(m => m.name) ?? data);
});
app.use('/api/chat', chatRouter);
app.use('/api/speak', voiceRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
