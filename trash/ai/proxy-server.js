import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { URL } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS config for your frontend (adjust origin if needed)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Simple logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ⭐ FIXED ROUTE: Catch everything after /proxy/ as a param
app.get('/proxy/:urlBase64', async (req, res) => {
  const encoded = req.params.urlBase64;

  try {
    const targetUrl = Buffer.from(encoded, 'base64').toString('utf-8');

    if (!targetUrl || !targetUrl.startsWith('http')) {
      return res.status(400).json({ error: 'Invalid target URL' });
    }

    const response = await axios.get(targetUrl, {
      responseType: 'text',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': new URL(targetUrl).origin
      },
      maxRedirects: 5
    });

    let responseData = response.data;
    const contentType = response.headers['content-type'] || '';

    // 🔁 Handle HLS playlists
    if (
      contentType.includes('application/vnd.apple.mpegurl') ||
      contentType.includes('application/x-mpegurl') ||
      targetUrl.includes('.m3u8')
    ) {
      console.log('Processing HLS playlist...');
      const targetBaseUrl = new URL(targetUrl);

      responseData = responseData
        .split('\n')
        .map((line) => {
          const trimmed = line.trim();

          if (!trimmed || trimmed.startsWith('#')) return line;

          if (
            trimmed.endsWith('.m3u8') ||
            trimmed.endsWith('.ts') ||
            trimmed.includes('http')
          ) {
            try {
              const absUrl = new URL(trimmed, targetBaseUrl.href).href;
              return `http://localhost:${PORT}/proxy/${encodeURIComponent(absUrl)}`;
            } catch (err) {
              console.error('URL parsing error:', err);
              return line;
            }
          }

          return line;
        })
        .join('\n');
    }

    res.set({
      'Content-Type': response.headers['content-type'] || 'text/plain',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control',
      'Access-Control-Allow-Credentials': 'true'
    });

    res.send(responseData);
  } catch (error) {
    console.error('Proxy Error:', error.message);

    if (error.code === 'ECONNABORTED') {
      res.status(408).json({ error: 'Request timeout' });
    } else if (error.response) {
      res.status(error.response.status).json({
        error: `Upstream server error: ${error.response.status}`
      });
    } else {
      res.status(500).json({ error: 'Proxy request failed' });
    }
  }
});

// Handle preflight CORS
app.options('*', cors());

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Smart HLS Proxy Server running at http://localhost:${PORT}`);
  console.log(`📡 Proxy ready for frontend at http://localhost:5173`);
});
