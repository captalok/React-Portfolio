import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';
import { Link } from 'react-router-dom';

const TradeIdList = () => {
  const [tradeIds, setTradeIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTradeIds = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/tradeids`);
        setTradeIds(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching trade IDs:', error);
        setIsLoading(false);
      }
    };
    fetchTradeIds();
  }, []);

  const filteredTradeIds = tradeIds.filter(tradeId => {
    const values = Object.values(tradeId).join(' ').toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">TradeID Edit</h1>
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
          <Link to="/trade" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300">
            Trade Table
          </Link>
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
            placeholder="Search trade IDs..."
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

      <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
        <table className="min-w-full bg-gray-800 text-white">
          <thead className="bg-gray-700">
            <tr>
              {tradeIds.length > 0 && 
                Object.keys(tradeIds[0]).map(key => (
                  <th key={key} className="py-3 px-4 text-left font-semibold text-gray-300">
                    {key}
                  </th>
                ))
              }
              <th className="py-3 px-4 text-left font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTradeIds.length > 0 ? (
              filteredTradeIds.map(tradeId => (
                <tr key={tradeId.TradeID} className="border-b border-gray-700 hover:bg-gray-750 transition duration-150">
                  {Object.values(tradeId).map((value, index) => (
                    <td 
                      key={`${tradeId.TradeID}-${index}`} 
                      className="py-3 px-4 text-gray-200"
                    >
                      {value}
                    </td>
                  ))}
                  <td className="py-3 px-4">
                    <Link 
                      to={`/tradeid/edit/${tradeId.TradeID}`}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded transition duration-300"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Object.keys(tradeIds[0] || {}).length + 1} className="py-6 px-4 text-center text-gray-400">
                  No trade IDs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeIdList;