import { query } from '../config/db.js';
import express from 'express';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
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
    
    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Database error',
      error: error.message
    });
  }
});

// Export the router as default
export default router;