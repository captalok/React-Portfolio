require('dotenv').config();
const express = require('express');
const cors = require('cors');
const os = require('os');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Add this

// Routes
app.use('/api', authRoutes);

// Test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const { query } = require('./config/db');
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
const server = app.listen(PORT, '0.0.0.0', () => { // Listen on all interfaces
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