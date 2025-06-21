import TradeId from '../models/TradeId.js';

// Remove the individual export keywords from the function declarations
// and export them all at the end

// GET: List all trade IDs
const getTradeIds = async (req, res) => {
  try {
    const tradeIds = await TradeId.getAll();
    res.json(tradeIds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET: Get single trade ID
const getTradeId = async (req, res) => {
  try {
    const id = req.params.id;
    const tradeId = await TradeId.getById(id);
    if (!tradeId) {
      return res.status(404).json({ error: 'Trade ID not found' });
    }
    res.json(tradeId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: Create trade ID
const createTradeId = async (req, res) => {
  try {
    const { BuyDate } = req.body;
    const result = await TradeId.create(BuyDate);
    res.json({ success: true, id: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT: Update trade ID
const updateTradeId = async (req, res) => {
  try {
    const id = req.params.id;
    const { BuyDate } = req.body;
    await TradeId.update(id, BuyDate);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all functions at once
export {
  getTradeIds,
  getTradeId,
  createTradeId,
  updateTradeId
};

// Alternatively, you can use this concise syntax:
// export { getTradeIds, getTradeId, createTradeId, updateTradeId };