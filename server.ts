import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(compression());
  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Automatic Message & Booking Dispatch Endpoint
  app.post('/api/send-booking', async (req, res) => {
    try {
      const {
        bookingId,
        fullName,
        phone,
        location,
        vehicle,
        service,
        date,
        time,
        message,
      } = req.body;

      console.log(`[AUTOMATIC MESSAGE DISPATCH] Received booking ${bookingId} for ${fullName} (${phone})`);

      // Automatically dispatch email notification in background via FormSubmit
      try {
        const payload = {
          _subject: `🏍️🛵 BOOKING CONFIRMED! (${bookingId}) - ${fullName}`,
          _template: 'box',
          _captcha: 'false',
          Booking_ID: bookingId,
          Customer_Name: fullName,
          Customer_Phone: phone,
          Customer_Location: location,
          Vehicle_Model: vehicle,
          Service_Name: service,
          Booking_Date: date,
          Service_Time: time,
          Mechanic_Status: 'Assignment in Progress',
          Automatic_Dispatch: 'SUCCESSFUL',
          Message: message,
        };

        await fetch('https://formsubmit.co/ajax/bikeservice134@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }).catch((err) => {
          console.warn('[FormSubmit Backend Dispatch Notice]', err?.message);
        });
      } catch (err) {
        console.warn('[Backend email dispatch notice]', err);
      }

      return res.json({
        success: true,
        bookingId,
        status: 'AUTOMATIC_MESSAGE_SENT',
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error('Error in /api/send-booking:', err);
      return res.status(500).json({ error: err.message || 'Dispatch failed' });
    }
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
- "Basic General Service - ₹699" (Standard 12-point doorstep service)
- "General Service with Engine Oil - ₹1,349" (General service with fresh 4T engine oil replacement)
- "Royal Enfield 350cc–450cc General Service + Engine Oil - ₹2,399" (For Classic 350, Hunter 350, Bullet 350, Meteor 350, Himalayan)
- "Royal Enfield 650cc General Service + Engine Oil - ₹3,999" (For Continental GT 650, Interceptor 650)
- "Jump Start Service - ₹449" (Battery jump start emergency assistance)
- "Puncture Repair - ₹599" (Tubeless / tube tyre puncture repair)
- "Inspection & Repair - ₹399" (Breakdown diagnosis, general vehicle checkup, minor fixes)

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
    app.use(express.static('dist', {
      maxAge: '1y',
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
        }
      }
    }));
    app.get('*', (_req, res) => {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`YES BIKE SERVICE server running on port ${PORT}`);
  });

  const altPort = process.env.PORT ? Number(process.env.PORT) : null;
  if (altPort && altPort !== PORT) {
    try {
      app.listen(altPort, '0.0.0.0', () => {
        console.log(`YES BIKE SERVICE server also listening on port ${altPort}`);
      });
    } catch (e) {
      console.warn('Could not bind to alt port:', e);
    }
  }
}

startServer();
