import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_SYSTEM_INSTRUCTION = `You are the Senior Property Advisor at Anthony & Co., an esteemed estate agency specialising in prime residential properties across Greater Manchester (including Didsbury, West Didsbury, Ancoats, Northern Quarter, Chorlton-cum-Hardy, Castlefield, and Altrincham/Hale).

Your communication style is:
- Refined, articulate, authoritative, and polite British professional tone.
- Thoroughly informed about Greater Manchester architecture (Victorian red-brick merchant villas, listed cotton mill loft conversions, Edwardian terraces, and leafy suburban estates).
- Deeply knowledgeable about local amenities, outstanding grammar and primary school catchment zones (e.g. Altrincham Grammar, Beaver Road, Chorlton Park), Metrolink transport links, and neighbourhood culinary culture (Burton Road, Cutting Room Square, Beech Road, Altrincham Market).
- Helpful with financial and practical inquiries including UK Stamp Duty Land Tax (SDLT), council tax bands, survey advice, valuation estimation, and rental yields.

When users inquire about properties, provide thoughtful, tailored recommendations and invite them to schedule a private viewing or explore our local branch offices.`;

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: '20mb' }));

  // Initialize Google GenAI
  const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
    return new GoogleGenAI({ apiKey });
  };

  // 1. Gemini Multi-Turn Chatbot API
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, model = 'gemini-3.5-flash', systemInstruction, propertyContext } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      // Valid models check: gemini-3.5-flash, gemini-3.1-pro-preview, gemini-3.1-flash-lite
      const allowedModels = ['gemini-3.5-flash', 'gemini-3.1-pro-preview', 'gemini-3.1-flash-lite'];
      const targetModel = allowedModels.includes(model) ? model : 'gemini-3.5-flash';

      let promptSysInstruction = systemInstruction || DEFAULT_SYSTEM_INSTRUCTION;
      if (propertyContext) {
        promptSysInstruction += `\n\nSpecific Property Context under discussion:\n${JSON.stringify(propertyContext, null, 2)}`;
      }

      const ai = getAI();
      const contents = messages.map((m: any) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text || m.content || '' }]
      }));

      const response = await ai.models.generateContent({
        model: targetModel,
        contents,
        config: {
          systemInstruction: promptSysInstruction,
        }
      });

      const replyText = response.text || 'I apologize, I could not generate a response at this moment. Please try again.';
      return res.json({
        text: replyText,
        model: targetModel,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error('Chat error:', err);
      return res.status(500).json({ 
        error: err.message || 'Failed to generate advisory response.',
        details: err.status || 'AI Service Error'
      });
    }
  });

  const isSoundtrackOn = (): boolean => {
    const val = process.env.SOUNDTRACK_ON ?? process.env.VITE_SOUNDTRACK_ON ?? 'true';
    const str = String(val).trim().toLowerCase();
    return str !== 'false' && str !== '0' && str !== 'off' && str !== 'disabled';
  };

  // 2. Lyria Music Generation API
  app.post('/api/music/generate', async (req, res) => {
    try {
      if (!isSoundtrackOn()) {
        return res.status(403).json({ error: 'Soundtrack generation is currently disabled via SOUNDTRACK_ON.' });
      }

      const { prompt, model = 'lyria-3-clip-preview', title } = req.body;

      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required.' });
      }

      // Allowed models: lyria-3-clip-preview, lyria-3-pro-preview
      const targetModel = model === 'lyria-3-pro-preview' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';

      const ai = getAI();
      const responseStream = await ai.models.generateContentStream({
        model: targetModel,
        contents: prompt,
      });

      let audioBase64 = '';
      let lyrics = '';
      let mimeType = 'audio/wav';

      for await (const chunk of responseStream) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;

        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
          if (part.text && !lyrics) {
            lyrics = part.text;
          }
        }
      }

      if (!audioBase64) {
        return res.status(500).json({ error: 'No audio data was returned by the Lyria generation service.' });
      }

      return res.json({
        id: `track-${Date.now()}`,
        audioBase64,
        mimeType,
        lyrics,
        prompt,
        model: targetModel,
        title: title || 'Manchester Property Soundtrack',
        createdAt: new Date().toISOString()
      });
    } catch (err: any) {
      console.error('Lyria Music error:', err);
      return res.status(500).json({ 
        error: err.message || 'Music generation failed.',
        details: err.status || 'Lyria Generation Error'
      });
    }
  });

  // Configuration and feature flags endpoint
  app.get('/api/config', (req, res) => {
    res.json({
      soundtrackEnabled: isSoundtrackOn(),
      service: 'Anthony & Co. Greater Manchester Estate API'
    });
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Anthony & Co. Greater Manchester Estate API' });
  });

  // Vite Integration: Middleware mode in development, static in production
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: Number(PORT) },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server start error:', err);
  process.exit(1);
});
