# 🚀 Deployment Guide - Techspark AI

## ⚡ Quick Deploy (Vercel + Render)

### Backend: Deploy on Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Fix deployment configs"
   git push origin main
   ```

2. **Go to https://render.com** and sign in

3. **Create New → Web Service**
   - Connect GitHub repo
   - Select branch: `main`
   - Name: `fundspark-ai-backend`
   - Root Directory: `.` (project root)
   - Environment: `Python 3`
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `uvicorn backend.app.main:app --host 0.0.0.0 --port 8000`
   - Plan: **Free** (10 requests/hour limit)

4. **Set Environment Variables** in Render Dashboard:
   - `GEMINI_API_KEY`: Your API key from [Google AI Studio](https://aistudio.google.com/apikey)
   - `ALLOWED_ORIGINS`: `https://yourdomain.vercel.app,http://localhost:3000`

5. **Deploy** - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Copy the URL: `https://fundspark-ai-backend.onrender.com` (or your custom domain)

### Frontend: Deploy on Vercel

1. **Create `vercel.json`** ✅ Already done!

2. **Go to https://vercel.com** and sign in

3. **Import Project**
   - Select your GitHub repo
   - Framework: `React`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variable:**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://fundspark-ai-backend.onrender.com/api`
   - (Replace with your actual Render backend URL)

5. **Deploy** - Click "Deploy"
   - Wait 2-5 minutes
   - Your app is live! 🎉

## 📋 Checklist Before Deployment

- [ ] All changes pushed to GitHub
- [ ] Backend API key set in Render env vars
- [ ] Frontend `VITE_API_URL` points to Render backend
- [ ] Backend CORS includes frontend URL
- [ ] Both services deployed successfully

## 🔧 After Deployment - Update Backend

Once your Render backend is deployed:

1. Get your Render URL from dashboard
2. In Render → Environment Variables, add:
   ```
   ALLOWED_ORIGINS=https://yourdomain.vercel.app,https://www.yourdomain.vercel.app,http://localhost:3000
   ```

3. In Vercel → Project Settings → Environment Variables, update:
   ```
   VITE_API_URL=https://fundspark-ai-backend.onrender.com/api
   ```
   Then redeploy

## 🧪 Test After Deployment

1. Open your Vercel frontend URL
2. Try: **Create Startup** → Should work without errors
3. Check browser console (F12) for any CORS errors
4. If you see `CORS error`, update `ALLOWED_ORIGINS` in Render

## 📞 Troubleshooting

### "CORS error" on frontend
- Backend CORS not updated
- Fix: Render → Environment Variables → Update `ALLOWED_ORIGINS`
- Redeploy backend

### "Startup not found" 
- Database not persisting (Render free tier resets daily)
- This is normal - data resets when server restarts
- Upgrade to Render Pro for persistent storage ($7/month)

### "API not responding"
- Backend might be sleeping (Render free tier)
- Solution: Ping it once → `curl https://your-backend.onrender.com/health`
- Or upgrade to paid plan

### "API_BASE is undefined"
- Frontend trying to use wrong import
- Ensure files import from: `import { API_BASE } from '../lib/apiConfig';`

## 💾 Local Development

```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Terminal 2 - Frontend
npm install
npm run dev
```

Visit: http://localhost:5173

## 🔐 Security Notes

- Never commit `.env` files with real API keys
- Use Render/Vercel dashboard to manage secrets
- Rotate API keys regularly
- Whitelist only necessary origins in CORS

---

**Questions?** Check the logs:
- Render: Logs tab in dashboard
- Vercel: Deployments → Logs
