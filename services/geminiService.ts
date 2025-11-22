import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ContentAnalysisResult, MarketTrend, FundraisingGeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMarketingContent = async (text: string): Promise<ContentAnalysisResult> => {
  const prompt = `Analyze the following marketing copy for a startup. Provide a score (0-100), identify the tone, list specific actionable suggestions for improvement, and write a significantly improved version of the copy.

  Copy to analyze:
  "${text}"`;

  const schema: Schema = {
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

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ContentAnalysisResult;
    }
    throw new Error("No response from AI");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const generateFundraisingMaterial = async (
  companyDetails: string,
  type: 'email' | 'pitch_deck_outline' | 'elevator_pitch',
  targetAudience: string
): Promise<FundraisingGeneratedContent> => {
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

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 1024 }, // Use thinking for better structure
      }
    });

    const text = response.text || "";
    
    // Simple parsing for email subject if present (heuristics)
    let subject = undefined;
    let content = text;
    
    if (type === 'email') {
      const subjectMatch = text.match(/Subject:(.*)/i);
      if (subjectMatch) {
        subject = subjectMatch[1].trim();
        content = text.replace(/Subject:.*\n/i, '').trim();
      }
    }

    return {
      type,
      content,
      subject
    };
  } catch (error) {
    console.error("Gemini Fundraising Error:", error);
    throw error;
  }
};

export const getMarketIntelligence = async (industry: string): Promise<{ trends: MarketTrend[], summary: string, sources?: string[] }> => {
  const prompt = `Research the current market trends for the ${industry} industry. 
  Identify 3 major trends, their potential impact on early-stage startups, and the opportunity they present.
  Also provide a brief executive summary of the market state.`;

  // Using Google Search Tool for grounding
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Using standard model with tools
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
    
    // Extract grounding metadata if available
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: string[] = [];
    if (chunks) {
        chunks.forEach((c: any) => {
            if (c.web?.uri) sources.push(c.web.uri);
        });
    }

    return {
        trends: data.trends,
        summary: data.summary,
        sources: Array.from(new Set(sources)) // unique sources
    };

  } catch (error) {
    console.error("Gemini Market Intel Error:", error);
    throw error;
  }
};
