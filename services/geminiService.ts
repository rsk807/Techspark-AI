import { ContentAnalysisResult, MarketTrend, FundraisingGeneratedContent } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const analyzeMarketingContent = async (text: string): Promise<ContentAnalysisResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze content');
    }

    return await response.json();
  } catch (error) {
    console.error("Content Analysis Error:", error);
    throw error;
  }
};

export const generateFundraisingMaterial = async (
  companyDetails: string,
  type: 'email' | 'pitch_deck_outline' | 'elevator_pitch',
  targetAudience: string
): Promise<FundraisingGeneratedContent> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-fundraising`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ companyDetails, type, targetAudience }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate fundraising material');
    }

    return await response.json();
  } catch (error) {
    console.error("Fundraising Generation Error:", error);
    throw error;
  }
};

export const getMarketIntelligence = async (industry: string): Promise<{ trends: MarketTrend[], summary: string, sources?: string[] }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/market-intelligence`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ industry }),
    });

    if (!response.ok) {
      throw new Error('Failed to get market intelligence');
    }

    return await response.json();
  } catch (error) {
    console.error("Market Intelligence Error:", error);
    throw error;
  }
};
