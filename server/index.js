import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import propertiesRoutes from './routes/properties.js';
import projectsRoutes from './routes/projects.js';
import locationsRoutes from './routes/locations.js';
import leadsRoutes from './routes/leads.js';
import analyticsRoutes from './routes/analytics.js';
import settingsRoutes from './routes/settings.js';
import servicesRoutes from './routes/services.js';
import testimonialsRoutes from './routes/testimonials.js';
import { getDb } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize DB connection at start
getDb().catch(err => {
  console.error('Failed to initialize SQLite Database:', err);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/testimonials', testimonialsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'Vedik Reality', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error Stack:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Vedik Reality Backend API running on http://localhost:${PORT}`);
  });
}

export default app;

