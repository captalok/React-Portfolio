import express from 'express';
import {
  getTrades,
  getFormData,
  saveTrade,
  handleUpload,
  downloadTemplate
} from '../controllers/tradeController.js';
import {
  getTradeIds,
  getTradeId,
  createTradeId,
  updateTradeId
} from '../controllers/tradeIdController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Trade routes
router.get('/trades', getTrades);
router.get('/trade/form-data/:id', getFormData); // With ID parameter
router.get('/trade/form-data', getFormData); // Without ID parameter
router.post('/trade/insert', saveTrade);
router.put('/trade/edit/:id', saveTrade);
router.post('/trade/upload', upload.single('excelFile'), handleUpload);
router.get('/trade/template', downloadTemplate);

// Trade ID routes
router.get('/tradeids', getTradeIds);
router.get('/tradeid/:id', getTradeId);
router.post('/tradeid/insert', createTradeId);
router.put('/tradeid/edit/:id', updateTradeId);

export default router;