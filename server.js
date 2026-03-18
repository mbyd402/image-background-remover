const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 12 * 1024 * 1024 } });

// Remove.bg API Key
const REMOVE_BG_API_KEY = '3K9RgPY668AueP26K4UzPenL';

// Serve static files
app.use(express.static(__dirname));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Handle background removal
app.post('/api/removebg', upload.single('image_file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const formData = new FormData();
    formData.append('image_file', req.file.buffer, req.file.originalname);
    formData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': REMOVE_BG_API_KEY,
        ...formData.getHeaders()
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('remove.bg API error:', response.status, errorText);
      return res.status(response.status).json({ error: `remove.bg API returned ${response.status}` });
    }

    const buffer = await response.buffer();
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`External access: http://42.193.138.8:${PORT}`);
});
