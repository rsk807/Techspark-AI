
# Techspark AI

**AI-Powered Startup Accelerator for Founders & Investors**

---

## 🚀 Product Vision
Techspark AI is an AI-powered platform that helps early-stage startups and investors with:
- Pitch deck analysis
- Startup scoring
- Customer insight
- Competitor mapping
- Investor matching
- Business report generation
- Marketing & content suggestions

---

## ⭐ Core Features
1. **Startup Creator**: Multi-step form for startup data, AI autofill, and validation.
2. **Pitch Deck Analyzer**: Upload PDF or text, get AI scores and suggestions.
3. **Startup Score Engine**: AI-calculated strength, funding readiness, and innovation index.
4. **Customer Analysis**: Persona, ICP, pain points, and acquisition channels.
5. **Competitor Analyzer**: Side-by-side competitor comparison and feature gap analysis.
6. **Investor Matcher**: AI-matched investors, pitch personalization, and email templates.
7. **Content AI Engine**: Generate taglines, hero text, social posts, and elevator pitches.
8. **Recommendation Engine**: Actionable next steps and improvement suggestions.

---

## ⭐ Architecture
- **Frontend**: React + Vite, TailwindCSS, Shadcn UI, Recharts
- **Backend**: Cloudflare Worker, Gemini 2.0 API
- **Storage**: Cloudflare D1/KV or localStorage (demo)

---

## ⭐ API Endpoints (Cloudflare Worker)
- `/api/analyze-deck` — Analyze pitch deck (PDF/text)
- `/api/startup-score` — Calculate startup scores
- `/api/customers` — Customer persona and insights
- `/api/competitors` — Competitor analysis
- `/api/investor-match` — Investor matching
- `/api/content` — Content generation
- `/api/recommendations` — Next-step suggestions

---

## ⭐ Setup & Usage
1. **Clone the repo**
2. `npm install`
3. Add your Gemini API key to `.env` as `VITE_GEMINI_API_KEY`
4. `npm run dev` for local dev
5. `npx wrangler deploy` to deploy backend

---

## ⭐ Contribution
- Fork, branch, and PR for new features
- See `/components/mockups/` for UI ideas
- All feedback and issues welcome!

---

## ⭐ License
MIT
