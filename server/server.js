import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import os from 'os';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js'; // Now importing default export
import tradeRoutes from './routes/tradeRoutes.js';
import { query } from './config/db.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api', authRoutes); // Now using the default exported router
app.use('/api', tradeRoutes);

// Test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await query('SELECT 1 + 1 AS solution');
    res.json({ success: true, solution: result[0].solution });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get IP address
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost';
};

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log('\x1b[36m%s\x1b[0m', `Server running on:`);
  console.log('\x1b[33m%s\x1b[0m', `- Local:    http://localhost:${PORT}`);
  console.log('\x1b[32m%s\x1b[0m', `- Network:  http://${ip}:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});