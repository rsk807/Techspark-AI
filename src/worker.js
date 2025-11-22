export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      // CORS headers
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };

      // Handle preflight requests
      if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
      }

      // Health check endpoint
      if (url.pathname === '/api/health') {
        return Response.json({
          status: 'ok',
          gemini_configured: !!env.VITE_GEMINI_API_KEY
        }, { headers: corsHeaders });
      }

      // Gemini analysis endpoint
      if (url.pathname === '/api/analyze' && request.method === 'POST') {
        try {
          const { text } = await request.json();
          
          if (!env.VITE_GEMINI_API_KEY) {
            return Response.json(
              { error: 'Gemini API key not configured' },
              { status: 500, headers: corsHeaders }
            );
          }

          // Call Gemini API
          const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${env.VITE_GEMINI_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  parts: [{
                    text: `Analyze this startup content and provide insights:\n\n${text}`
                  }]
                }]
              })
            }
          );

          const data = await geminiResponse.json();
          
          return Response.json({
            success: true,
            analysis: data.candidates?.[0]?.content?.parts?.[0]?.text || 'No analysis available'
          }, { headers: corsHeaders });

        } catch (error) {
          return Response.json(
            { error: error.message },
            { status: 500, headers: corsHeaders }
          );
        }
      }

      return Response.json(
        { error: 'Not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    // Serve static frontend from dist/
    return env.ASSETS.fetch(request);
  }
};
