const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = Number(process.env.PORT || 5000);

// Pinapayagan nito ang mga local environments pati na rin ang kahit anong live Vercel frontend URL
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  /\.vercel\.app$/ // Awtomatikong pinapayagan ang lahat ng Vercel deployment links
];

const CORS_ORIGINS = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (CORS_ORIGINS.length > 0) {
  allowedOrigins.push(...CORS_ORIGINS);
}

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

app.use(cors({ 
  origin: allowedOrigins,
  credentials: true 
}));
app.use(express.json());

const startedAt = Date.now();

const venues = [
  { id: 1, name: 'Auditorium Hall', capacity: 200, price: 5500 },
  { id: 2, name: 'Conference Room', capacity: 15, price: 3500 },
  { id: 3, name: 'Presentation Room', capacity: 50, price: 700 },
  { id: 4, name: 'Large Meeting Room', capacity: 10, price: 900 },
  { id: 5, name: 'Small Meeting Room', capacity: 5, price: 500 }
];

const addons = [
  { id: 1, name: 'Projectors', price: 200 },
  { id: 2, name: 'Speakers', price: 35 },
  { id: 3, name: 'Microphones', price: 45 },
  { id: 4, name: 'Whiteboards', price: 80 },
  { id: 5, name: 'Signage', price: 80 }
];

const meals = [
  { id: 1, name: 'Breakfast', price: 50 },
  { id: 2, name: 'High Tea', price: 25 },
  { id: 3, name: 'Lunch', price: 65 },
  { id: 4, name: 'Dinner', price: 70 }
];

app.get('/api/venues', (req, res) => res.json(venues));
app.get('/api/addons', (req, res) => res.json(addons));
app.get('/api/meals', (req, res) => res.json(meals));
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    startedAt: new Date(startedAt).toISOString(),
  });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));