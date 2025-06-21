import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';
import { Link } from 'react-router-dom';

const TradeList = () => {
  const [trades, setTrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/trades`);
        if (response.data && response.data.length > 0) {
          setTrades(response.data);
        } else {
          setError('No trades found in the database');
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Trade fetch error:', err);
        setError('Failed to load trades. Please try again later.');
        setIsLoading(false);
      }
    };
    
    fetchTrades();
  }, []);

  const filteredTrades = trades.filter(trade => {
    const values = Object.values(trade).join(' ').toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  const getCellStyle = (key, value) => {
    const numberValue = parseFloat(value);
    
    if (key === 'Brokerage') {
      return 'text-blue-300 font-semibold';
    } else if (key === 'BuyPrice') {
      return 'text-green-400 font-semibold';
    } else if (key === 'SellPrice') {
      return 'text-red-400 font-semibold';
    } else if (key === 'DepositWithdrawal') {
      return numberValue < 0 
        ? 'text-blue-300 font-semibold' 
        : 'text-teal-400 font-semibold';
    } else if (key === 'GrossProfit') {
      return numberValue > 0 
        ? 'text-green-400 font-semibold' 
        : 'text-pink-400 font-semibold';
    }
    return 'text-gray-200';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900/30 text-red-200 p-6 rounded-xl border border-red-700">
          <h3 className="text-xl font-bold mb-2">Error Loading Trades</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Trade Edit</h1>
        <div className="flex space-x-3">
          <Link to="/home" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300">
            Home
          </Link>
          <Link to="/dashboard" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300">
            Dashboard
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <Link to="/trade/insert" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300">
            Add New Trade
          </Link>
          <Link to="/tradeid/insert" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300">
            Add New Trade ID
          </Link>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search trades..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="absolute right-3 top-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {filteredTrades.length === 0 ? (
        <div className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No Trades Found</h3>
          <p className="text-gray-500 mb-4">Try adding a new trade or adjusting your search</p>
          <Link 
            to="/trade/insert" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Trade
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
          <table className="min-w-full bg-gray-800 text-white">
            <thead className="bg-gray-700">
              <tr>
                {Object.keys(filteredTrades[0]).map(key => (
                  <th key={key} className="py-3 px-4 text-left font-semibold text-gray-300">
                    {key}
                  </th>
                ))}
                <th className="py-3 px-4 text-left font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map(trade => (
                <tr key={trade.TradeLineID} className="border-b border-gray-700 hover:bg-gray-750 transition duration-150">
                  {Object.entries(trade).map(([key, value]) => (
                    <td 
                      key={`${trade.TradeLineID}-${key}`} 
                      className={`py-3 px-4 ${getCellStyle(key, value)}`}
                    >
                      {value}
                    </td>
                  ))}
                  <td className="py-3 px-4">
                    <Link 
                      to={`/trade/edit/${trade.TradeLineID}`}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition duration-300"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TradeList;