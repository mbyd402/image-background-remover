export default {
  async fetch(request, env, ctx) {
    // Get allowed origin from environment or default to your domain
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Content-Type': 'application/json',
        },
      });
    }

    try {
      // Cloudflare Workers supports formData natively now
      const formData = await request.formData();
      
      // Get API key from Cloudflare environment variable
      const apiKey = env.REMOVE_BG_API_KEY || '3K9RgPY668AueP26K4UzPenL';
      
      // Get the uploaded file
      const imageFile = formData.get('image_file');
      
      // Create a new request to remove.bg
      const removeBgRequest = new Request('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: imageFile ? formData : null,
      });

      const response = await fetch(removeBgRequest);
      const blob = await response.blob();

      return new Response(blob, {
        status: response.status,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Content-Type': response.headers.get('Content-Type') || 'image/png',
        },
      });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Content-Type': 'application/json',
        },
      });
    }
  }
};
