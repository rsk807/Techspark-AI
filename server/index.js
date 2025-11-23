import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI with API key from environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Health check endpoint
app.get('/', (req, res) => {
  res.send('FundSpark AI Backend is running!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FundSpark AI Backend is running' });
});

// Analyze Marketing Content
app.post('/api/analyze-content', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const prompt = `Analyze the following marketing copy for a startup. Provide a score (0-100), identify the tone, list specific actionable suggestions for improvement, and write a significantly improved version of the copy.

    Copy to analyze:
    "${text}"`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "Effectiveness score from 0 to 100" },
        tone: { type: Type.STRING, description: "Detected tone of the text" },
        suggestions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of actionable suggestions"
        },
        improvedVersion: { type: Type.STRING, description: "A rewritten, optimized version of the text" }
      },
      required: ["score", "tone", "suggestions", "improvedVersion"]
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      const result = JSON.parse(response.text);
      return res.json(result);
    }

    throw new Error("No response from AI");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    res.status(500).json({ error: 'Failed to analyze content', details: error.message });
  }
});

// Generate Fundraising Material
app.post('/api/generate-fundraising', async (req, res) => {
  try {
    const { companyDetails, type, targetAudience } = req.body;

    if (!companyDetails || !type || !targetAudience) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let prompt = "";

    if (type === 'email') {
      prompt = `Write a compelling cold email to a potential investor (${targetAudience}) for the following startup. 
      Keep it concise, personalized, and action-oriented.
      
      Startup Details: ${companyDetails}`;
    } else if (type === 'pitch_deck_outline') {
      prompt = `Create a 10-slide pitch deck outline for the following startup targeting ${targetAudience}. 
      Include key points for each slide.
      
      Startup Details: ${companyDetails}`;
    } else {
      prompt = `Write a punchy 30-second elevator pitch for the following startup targeting ${targetAudience}.
      
      Startup Details: ${companyDetails}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 1024 },
      }
    });

    const text = response.text || "";

    let subject = undefined;
    let content = text;

    if (type === 'email') {
      const subjectMatch = text.match(/Subject:(.*)/i);
      if (subjectMatch) {
        subject = subjectMatch[1].trim();
        content = text.replace(/Subject:.*\n/i, '').trim();
      }
    }

    res.json({
      type,
      content,
      subject
    });
  } catch (error) {
    console.error("Gemini Fundraising Error:", error);
    res.status(500).json({ error: 'Failed to generate fundraising material', details: error.message });
  }
});

// Get Market Intelligence
app.post('/api/market-intelligence', async (req, res) => {
  try {
    const { industry } = req.body;

    if (!industry) {
      return res.status(400).json({ error: 'Industry is required' });
    }

    const prompt = `Research the current market trends for the ${industry} industry. 
    Identify 3 major trends, their potential impact on early-stage startups, and the opportunity they present.
    Also provide a brief executive summary of the market state.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            trends: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  trend: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  opportunity: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text generated");

    const data = JSON.parse(text);

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = [];
    if (chunks) {
      chunks.forEach((c) => {
        if (c.web?.uri) sources.push(c.web.uri);
      });
    }

    res.json({
      trends: data.trends,
      summary: data.summary,
      sources: Array.from(new Set(sources))
    });
  } catch (error) {
    console.error("Gemini Market Intel Error:", error);
    res.status(500).json({ error: 'Failed to get market intelligence', details: error.message });
  }
});

// Pitch Deck Review (AI-powered analysis)
app.post('/api/review-pitch-deck', async (req, res) => {
  try {
    const { slides, startupName } = req.body;

    if (!slides || !Array.isArray(slides) || slides.length === 0) {
      return res.status(400).json({ error: 'Slides data is required' });
    }

    // Combine all slide text for comprehensive analysis
    const fullDeckText = slides.map((slide, idx) =>
      `Slide ${idx + 1}: ${slide.title}\n${slide.content}`
    ).join('\n\n');

    const prompt = `You are an expert investor and pitch deck consultant. Analyze this pitch deck thoroughly.

Startup Name: ${startupName}

Pitch Deck Content:
${fullDeckText}

Provide a comprehensive analysis in JSON format with:
1. overallScore (0-100): Overall deck quality
2. fundingReadiness (0-100): How ready this startup is for funding
3. strengths: Array of 3-5 strong points
4. weaknesses: Array of 3-5 areas for improvement  
5. missingSlides: Array of critical slides that are missing
6. redFlags: Array of major concerns that would worry investors
7. slideReviews: Array of objects with { slideNumber, title, score (0-10), feedback }
8. recommendations: Array of specific actionable improvements

Be honest, specific, and actionable. Focus on what matters to investors.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.NUMBER },
            fundingReadiness: { type: Type.NUMBER },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            missingSlides: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            redFlags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            slideReviews: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  slideNumber: { type: Type.NUMBER },
                  title: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  feedback: { type: Type.STRING }
                }
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No analysis generated");

    const analysis = JSON.parse(text);
    res.json(analysis);
  } catch (error) {
    console.error("Pitch Deck Review Error:", error);
    res.status(500).json({ error: 'Failed to review pitch deck', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 FundSpark AI Backend running on http://localhost:${PORT}`);
});
