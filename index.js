import html from './index.html';

const REMOVE_BG_API_KEY = '3K9RgPY668AueP26K4UzPenL';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // API endpoint
    if (url.pathname === '/api/removebg') {
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        });
      }

      try {
        const formData = await request.formData();
        const apiKey = env.REMOVE_BG_API_KEY || REMOVE_BG_API_KEY;
        
        const removeBgRequest = new Request('https://api.remove.bg/v1.0/removebg', {
          method: 'POST',
          headers: {
            'X-Api-Key': apiKey,
          },
          body: formData,
        });

        const response = await fetch(removeBgRequest);
        const blob = await response.blob();

        return new Response(blob, {
          status: response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': response.headers.get('Content-Type') || 'image/png',
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        });
      }
    }

    // Serve main HTML
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  },
};
