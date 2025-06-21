import { getPool } from '../config/db.js';
const pool = getPool();
import { formatDate } from '../utils/helpers.js';

export default class TradeId {
  static async getAll() {
    try {
      const [rows] = await pool.query(
        "SELECT TradeID, BuyDate FROM tradet ORDER BY TradeID DESC"
      );
      return rows.map(row => ({
        ...row,
        BuyDate: formatDate(row.BuyDate)
      }));
    } catch (error) {
      throw new Error(`Error fetching trade IDs: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query(
        "SELECT TradeID, BuyDate FROM tradet WHERE TradeID = ?",
        [id]
      );
      if (rows.length === 0) return null;
      return {
        ...rows[0],
        BuyDate: formatDate(rows[0].BuyDate)
      };
    } catch (error) {
      throw new Error(`Error fetching trade ID ${id}: ${error.message}`);
    }
  }

  static async create(buyDate) {
    try {
      const [result] = await pool.query(
        "INSERT INTO tradet (BuyDate) VALUES (?)",
        [buyDate]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating trade ID: ${error.message}`);
    }
  }

  static async update(id, buyDate) {
    try {
      await pool.query(
        "UPDATE tradet SET BuyDate = ? WHERE TradeID = ?",
        [buyDate, id]
      );
      return true;
    } catch (error) {
      throw new Error(`Error updating trade ID ${id}: ${error.message}`);
    }
  }
}