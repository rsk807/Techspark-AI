import { getAssetFromKV } from "@cloudflare/kv-asset-handler";


// Gemini API call helper (production)
async function callGeminiAI(apiKey, prompt, options = {}) {
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    ...options
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    return { error: true, status: res.status, message: await res.text() };
  }
  const data = await res.json();
  // Extract text from Gemini response
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return { text, raw: data };
}

async function handleApi(request, env) {
  const url = new URL(request.url);
  const apiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: true, message: "Missing Gemini API key" }), { status: 500 });
  }

  // Parse JSON body if needed
  let body = {};
  if (request.method === "POST") {
    try {
      body = await request.json();
    } catch {}
  }

  // Route endpoints with real prompts
  switch (url.pathname) {
    case "/api/analyze-deck": {
      // Expects: { pitchText: string }
      const prompt = `Analyze this startup pitch deck. Give an overall score (0-100), clarity, business model, market, competitor, team scores, and suggestions.\n\n${body.pitchText || body.prompt || ""}`;
      const result = await callGeminiAI(apiKey, prompt);
      return new Response(JSON.stringify({ ok: true, endpoint: "analyze-deck", result }), { headers: { "Content-Type": "application/json" } });
    }
    case "/api/startup-score": {
      // Expects: { startup: { ...fields } }
      const prompt = `Given this startup data, calculate a 0-100 strength score, funding readiness, market viability, customer fit, and innovation index.\n\n${JSON.stringify(body.startup || body)}`;
      const result = await callGeminiAI(apiKey, prompt);
      return new Response(JSON.stringify({ ok: true, endpoint: "startup-score", result }), { headers: { "Content-Type": "application/json" } });
    }
    case "/api/customers": {
      // Expects: { customerInfo: ... }
      const prompt = `Analyze these target customers. Return personas, ICP, acquisition channels, marketing ideas, and pain point clarity.\n\n${JSON.stringify(body.customerInfo || body)}`;
      const result = await callGeminiAI(apiKey, prompt);
      return new Response(JSON.stringify({ ok: true, endpoint: "customers", result }), { headers: { "Content-Type": "application/json" } });
    }
    case "/api/competitors": {
      // Expects: { competitors: [...] }
      const prompt = `Compare these competitors. Give summary, strengths, weaknesses, feature gap, and market advantage suggestions.\n\n${JSON.stringify(body.competitors || body)}`;
      const result = await callGeminiAI(apiKey, prompt);
      return new Response(JSON.stringify({ ok: true, endpoint: "competitors", result }), { headers: { "Content-Type": "application/json" } });
    }
    case "/api/investor-match": {
      // Expects: { industry, stage, geography }
      const prompt = `Find top 10 suitable investors for a startup in this industry, stage, and geography. Explain why, give pitch personalization, email template, and contact strategy.\n\n${JSON.stringify(body)}`;
      const result = await callGeminiAI(apiKey, prompt);
      return new Response(JSON.stringify({ ok: true, endpoint: "investor-match", result }), { headers: { "Content-Type": "application/json" } });
    }
    case "/api/content": {
      // Expects: { type, companyDetails, targetAudience }
      const prompt = `Generate ${body.type || "content"} for this startup targeting ${body.targetAudience || "investors"}.\n\nStartup Details: ${body.companyDetails || ""}`;
      const result = await callGeminiAI(apiKey, prompt);
      return new Response(JSON.stringify({ ok: true, endpoint: "content", result }), { headers: { "Content-Type": "application/json" } });
    }
    case "/api/recommendations": {
      // Expects: { startup: { ...fields } }
      const prompt = `Given this startup data, suggest what to improve next, weak sections, and recommended actions.\n\n${JSON.stringify(body.startup || body)}`;
      const result = await callGeminiAI(apiKey, prompt);
      return new Response(JSON.stringify({ ok: true, endpoint: "recommendations", result }), { headers: { "Content-Type": "application/json" } });
    }
    default:
      return new Response(JSON.stringify({ error: true, message: "Unknown API endpoint" }), { status: 404 });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env);
    }
    // Static asset serving fallback
    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: JSON.parse(env.__STATIC_CONTENT_MANIFEST),
        }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: true,
          message: "Worker backend active, asset not found.",
          reason: err.message,
          keyExists: !!env.VITE_GEMINI_API_KEY,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};
          
