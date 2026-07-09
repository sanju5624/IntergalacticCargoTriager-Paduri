require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to log requests (helpful for visibility and debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Endpoint: GET /api/cargo
app.get('/api/cargo', (req, res) => {
  const dataPath = path.join(__dirname, 'output', 'Task 1 - Paduri - Parser.json');

  try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(rawData);
    res.json(jsonData);
  } catch (error) {
    console.error('Failed to read or parse manifest data:', error);
    res.status(500).json({ error: 'Failed to read or parse manifest data.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Cargo Manifest API Server is running!`);
  console.log(`Local URL: http://localhost:${PORT}`);
  console.log(`Endpoint:  http://localhost:${PORT}/api/cargo`);
});
