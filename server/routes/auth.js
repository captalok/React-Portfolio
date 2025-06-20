const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt: ${username}`);
  
  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username and password are required' 
    });
  }

  try {
    const results = await query(
      'SELECT * FROM tblusers WHERE UserName = ? AND Password = ?',
      [username, password]
    );
    
    console.log(`Query results: ${results.length} matches`);
    
    if (results.length > 0) {
      console.log(`✅ Login successful for: ${username}`);
      res.json({ success: true, user: results[0] });
    } else {
      console.log('❌ Invalid credentials');
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('🚨 Database error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database error',
      error: error.message
    });
  }
});

module.exports = router;