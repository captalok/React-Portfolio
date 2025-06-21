import Trade from '../models/Trade.js';
import path from 'path';

// Implement getFormData function
export const getFormData = async (req, res) => {
  try {
    // Get id from params if it exists
    const id = req.params.id || null;
    
    const data = await Trade.getFormData(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Implement other functions
export const getTrades = async (req, res) => {
  try {
    const trades = await Trade.getAllTrades();
    if (!trades || trades.length === 0) {
      return res.status(404).json({ message: 'No trades found' });
    }
    res.json(trades);
  } catch (error) {
    console.error('Error in getTrades controller:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};

export const saveTrade = async (req, res) => {
  try {
    const action = req.params.action || 'insert';
    const id = req.params.id || null;
    const result = await Trade.saveTrade(req.body, action, id);
    res.json({ success: true, id: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const handleUpload = async (req, res) => {
  try {
    if (!req.files?.excelFile) {
      throw new Error('No file uploaded');
    }

    const trades = await Trade.parseExcel(req.files.excelFile.data);
    const count = await Trade.bulkInsertTrades(trades);

    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadTemplate = (req, res) => {
  try {
    const templatePath = path.resolve('./templates/trade_template.xlsx');
    res.download(templatePath, 'trade_template.xlsx', (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).send('Could not download the template');
      }
    });
  } catch (error) {
    console.error('Template download error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};