import { getPool } from '../config/db.js';
const pool = getPool();
import { formatDate } from '../utils/helpers.js';
import XLSX from 'xlsx';

export default class Trade {
  static async getAllTrades() {
    try {
      // Change to promise-based query
      const [rows] = await pool.query(`
        SELECT 
          t.TradeLineID, 
          t.TradeID, 
          DATE_FORMAT(tr.BuyDate, '%Y-%m-%d') AS BuyDate,
          tt.TradeType,
          t.BuyQty,
          t.BuyPrice,
          t.SellPrice,
          t.Brokerage,
          t.DepositWithdrawal,
          (t.SellPrice * t.BuyQty) - (t.BuyPrice * t.BuyQty) - t.Brokerage AS GrossProfit,
          t.SellPrice - t.BuyPrice AS Pips,
          DATE_FORMAT(t.SellDate, '%Y-%m-%d') AS SellDate,
          t.Note
        FROM tradelinet t
        INNER JOIN tradet tr ON t.TradeID = tr.TradeID
        JOIN brokert b ON t.BrokerID = b.BrokerID
        JOIN tradetypet tt ON t.TradeTypeID = tt.TradeTypeID
        JOIN scripnamet s ON t.ScripID = s.ScripID
        ORDER BY t.TradeID DESC
      `);
    
      return rows;  // Return just the rows
    } catch (error) {
      console.error('Database error in getAllTrades:', error);
      throw new Error(`Error fetching trades: ${error.message}`);
    }
  }

  static async getFormData(id = null) {
    try {
      const [brokers] = await pool.query("SELECT BrokerID, BrokerName FROM brokert");
      const [scrips] = await pool.query("SELECT ScripID, ScripName FROM scripnamet");
      const [types] = await pool.query("SELECT TradeTypeID, TradeType FROM tradetypet");
      
      let tradeData = {};
      if (id) {
        const [rows] = await pool.query(`
          SELECT TradeLineID, TradeID, BrokerID, ScripID, TradeTypeID, BuyQty, 
          BuyPrice, SellPrice, Brokerage, DepositWithdrawal, SellDate, Note 
          FROM TradeLineT WHERE TradeLineID = ?
        `, [id]);
        
        if (rows.length > 0) {
          tradeData = rows[0];
          tradeData.BuyDate = formatDate(tradeData.BuyDate);
          tradeData.SellDate = formatDate(tradeData.SellDate);
        }
      } else {
        const [result] = await pool.query(
          "SELECT TradeID FROM tradet ORDER BY TradeID DESC LIMIT 1"
        );
        tradeData.TradeID = result.length > 0 ? result[0].TradeID : 0;
      }

      return { brokers, scrips, types, tradeData };
    } catch (error) {
      throw new Error(`Error fetching form data: ${error.message}`);
    }
  }

  static async saveTrade(data, action, id = null) {
    try {
      const values = [
        data.TradeID,
        data.BuyQty,
        data.BrokerID,
        data.ScripID,
        data.TradeTypeID,
        data.Brokerage,
        data.BuyPrice,
        data.SellPrice,
        data.DepositWithdrawal,
        data.Note,
        data.SellDate
      ];

      if (action === 'insert') {
        const [result] = await pool.query(`
          INSERT INTO tradelinet 
          (TradeID, BuyQty, BrokerID, ScripID, TradeTypeID, Brokerage, BuyPrice, 
          SellPrice, DepositWithdrawal, Note, SellDate) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, values);
        return result.insertId;
      }

      if (action === 'edit' && id) {
        values.push(id);
        await pool.query(`
          UPDATE TradeLineT SET 
          TradeID = ?, BrokerID = ?, ScripID = ?, TradeTypeID = ?, 
          BuyQty = ?, BuyPrice = ?, SellPrice = ?, Brokerage = ?, 
          DepositWithdrawal = ?, SellDate = ?, Note = ? 
          WHERE TradeLineID = ?
        `, [
          data.TradeID,
          data.BrokerID,
          data.ScripID,
          data.TradeTypeID,
          data.BuyQty,
          data.BuyPrice,
          data.SellPrice,
          data.Brokerage,
          data.DepositWithdrawal,
          data.SellDate,
          data.Note,
          id
        ]);
        return id;
      }

      throw new Error('Invalid action');
    } catch (error) {
      throw new Error(`Error saving trade: ${error.message}`);
    }
  }

  static async bulkInsertTrades(trades) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        "SELECT TradeID FROM tradet ORDER BY TradeID DESC LIMIT 1"
      );
      const tradeId = result.length > 0 ? result[0].TradeID : 0;

      for (const trade of trades) {
        await connection.query(
          `INSERT INTO tradelinet 
          (TradeID, BrokerID, ScripID, TradeTypeID, BuyQty, BuyPrice, 
          SellPrice, Brokerage, DepositWithdrawal, Note, SellDate) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            tradeId,
            trade.BrokerID,
            trade.ScripID,
            trade.TradeTypeID,
            trade.BuyQty,
            trade.BuyPrice,
            trade.SellPrice,
            trade.Brokerage,
            trade.DepositWithdrawal,
            trade.Note || '',
            trade.SellDate
          ]
        );
      }

      await connection.commit();
      return trades.length;
    } catch (error) {
      await connection.rollback();
      throw new Error(`Bulk insert failed: ${error.message}`);
    } finally {
      connection.release();
    }
  }

  static async parseExcel(buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
  
    return data.map(row => {
      const sellDate = row.SellDate instanceof Date ? 
        row.SellDate : 
        new Date((row.SellDate - (25567 + 1)) * 86400 * 1000);
  
      const adjustedDate = new Date(sellDate.getTime() + 86400000);
  
      return {
        BrokerID: row.BrokerID,
        ScripID: row.ScripID,
        TradeTypeID: row.TradeTypeID,
        BuyQty: row.BuyQty,
        BuyPrice: row.BuyPrice,
        SellPrice: row.SellPrice,
        Brokerage: row.Brokerage,
        DepositWithdrawal: row.DepositWithdrawal,
        Note: row.Note || '',
        SellDate: adjustedDate.toISOString().split('T')[0]
      };
    });
  }
}