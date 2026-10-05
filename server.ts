import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  app.post('/api/ai-book', async (req, res) => {
    try {
      const { userPrompt, vehiclePreference } = req.body;
      if (!userPrompt || typeof userPrompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({ error: 'GEMINI_API_KEY not configured' });
      }

      const prompt = `You are the AI Booking Assistant for "YES BIKE SERVICE", a premier doorstep two-wheeler service in Bengaluru, India.
Analyze the user's natural language booking request and extract all details into a clean structured JSON.

Available services:
- "General Service - ₹699" (Standard 12-point doorstep service)
- "General Service with Engine Oil - ₹1,349" (General service with fresh 4T engine oil replacement)
- "Jump Start Service - ₹399" (Battery jump start emergency assistance)
- "Puncture Repair - ₹599" (Tubeless / tube tyre puncture repair)
- "Running Repair - ₹450" (Breakdown diagnosis, general vehicle checkup, minor fixes)

Common vehicle brands in India: Honda, Royal Enfield, Yamaha, TVS, Bajaj, Suzuki, KTM, Hero, Ather, Ola, Jawa, Yezdi.
Vehicle types: "Bike" or "Scooter".

User prompt: "${userPrompt}"
User selected vehicle type: "${vehiclePreference || ''}"

Return ONLY a JSON object with this exact shape:
{
  "vehicleType": "Bike" or "Scooter",
  "brand": string (e.g. "Honda"),
  "model": string (e.g. "Activa 6G"),
  "service": string (one of the 5 exact service strings above),
  "location": string (locality in Bengaluru, e.g. "Koramangala"),
  "date": string (YYYY-MM-DD or readable date like "Tomorrow"),
  "time": string (e.g. "10:00 AM", "04:30 PM", or "ASAP"),
  "customerName": string (if provided, else ""),
  "phone": string (10 digit phone number if provided, else ""),
  "friendlyReply": string (a short, enthusiastic confirmation message from YES BIKE SERVICE AI assistant)
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '{}';
      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    } catch (err: any) {
      console.error('Gemini API error in /api/ai-book:', err);
      return res.status(500).json({ error: err.message || 'AI processing error' });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`YES BIKE SERVICE server running on port ${PORT}`);
  });
}

startServer();
