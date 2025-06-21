import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Fixed import

const TradeForm = () => {
  const { action, id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    TradeID: '',
    BuyQty: '',
    BuyPrice: '',
    SellPrice: '',
    Brokerage: '',
    DepositWithdrawal: '',
    BrokerID: '',
    ScripID: '',
    TradeTypeID: '',
    Note: '',
    SellDate: ''
  });
  const [brokers, setBrokers] = useState([]);
  const [scrips, setScrips] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch form data (brokers, scrips, types)
        const response = await axios.get(`${API_BASE_URL}/api/trade/form-data${id ? `/${id}` : ''}`);
        setBrokers(response.data.brokers);
        setScrips(response.data.scrips);
        setTypes(response.data.types);
        
        // Set default values if new trade
        if (action === 'insert') {
          setFormData({
            ...response.data.tradeData,
            BrokerID: response.data.brokers[0]?.BrokerID || '',
            ScripID: response.data.scrips[24]?.ScripID || '',
            TradeTypeID: response.data.types[0]?.TradeTypeID || ''
          });
        } else if (id) {
          setFormData(response.data.tradeData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching form data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [action, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'insert') {
        await axios.post(`${API_BASE_URL}/api/trade/insert`, formData);
      } else {
        await axios.put(`${API_BASE_URL}/api/trade/edit/${id}`, formData);
      }
      navigate('/trade');
    } catch (error) {
      console.error('Error saving trade:', error);
      alert('Failed to save trade. Please try again.');
    }
  };

  const calculateBrokerage = () => {
    const buyQty = parseFloat(formData.BuyQty) || 0;
    const buyPrice = parseFloat(formData.BuyPrice) || 0;
    const totalBuyAmount = buyQty * buyPrice;
    const totalSellAmount = buyQty * (parseFloat(formData.SellPrice) || 0);
    const brokerage = ((totalBuyAmount + totalSellAmount) * 0.000999999) + 20;
    setFormData({ ...formData, Brokerage: brokerage.toFixed(2) });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">
              {action === 'insert' ? 'Add New Trade' : 'Edit Trade'}
            </h1>
            <div className="flex space-x-3">
              <Link 
                to="/trade/upload" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Upload Trades
              </Link>
              <Link 
                to="/calculator" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Open Calculator
              </Link>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Trade ID */}
            <div className="form-group">
              <label htmlFor="TradeID" className="block text-gray-300 mb-2">Trade ID</label>
              <input
                type="number"
                id="TradeID"
                name="TradeID"
                value={formData.TradeID}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Buy Quantity */}
            <div className="form-group">
              <label htmlFor="BuyQty" className="block text-gray-300 mb-2">Buy Quantity</label>
              <input
                type="number"
                id="BuyQty"
                name="BuyQty"
                value={formData.BuyQty}
                onChange={handleChange}
                onBlur={calculateBrokerage}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Buy Price */}
            <div className="form-group">
              <label htmlFor="BuyPrice" className="block text-gray-300 mb-2">Buy Price</label>
              <input
                type="number"
                step="0.01"
                id="BuyPrice"
                name="BuyPrice"
                value={formData.BuyPrice}
                onChange={handleChange}
                onBlur={calculateBrokerage}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Sell Price */}
            <div className="form-group">
              <label htmlFor="SellPrice" className="block text-gray-300 mb-2">Sell Price</label>
              <input
                type="number"
                step="0.01"
                id="SellPrice"
                name="SellPrice"
                value={formData.SellPrice}
                onChange={handleChange}
                onBlur={calculateBrokerage}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Brokerage */}
            <div className="form-group">
              <label htmlFor="Brokerage" className="block text-gray-300 mb-2">Brokerage</label>
              <input
                type="number"
                step="0.01"
                id="Brokerage"
                name="Brokerage"
                value={formData.Brokerage}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Deposit/Withdrawal */}
            <div className="form-group">
              <label htmlFor="DepositWithdrawal" className="block text-gray-300 mb-2">Deposit/Withdrawal</label>
              <input
                type="number"
                step="0.01"
                id="DepositWithdrawal"
                name="DepositWithdrawal"
                value={formData.DepositWithdrawal}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Broker Selection */}
            <div className="form-group">
              <label htmlFor="BrokerID" className="block text-gray-300 mb-2">Broker</label>
              <select
                id="BrokerID"
                name="BrokerID"
                value={formData.BrokerID}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {brokers.map(broker => (
                  <option key={broker.BrokerID} value={broker.BrokerID}>
                    {broker.BrokerName}
                  </option>
                ))}
              </select>
            </div>

            {/* Scrip Selection */}
            <div className="form-group">
              <label htmlFor="ScripID" className="block text-gray-300 mb-2">Scrip Name</label>
              <select
                id="ScripID"
                name="ScripID"
                value={formData.ScripID}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {scrips.map(scrip => (
                  <option key={scrip.ScripID} value={scrip.ScripID}>
                    {scrip.ScripName}
                  </option>
                ))}
              </select>
            </div>

            {/* Trade Type */}
            <div className="form-group">
              <label htmlFor="TradeTypeID" className="block text-gray-300 mb-2">Trade Type</label>
              <select
                id="TradeTypeID"
                name="TradeTypeID"
                value={formData.TradeTypeID}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {types.map(type => (
                  <option key={type.TradeTypeID} value={type.TradeTypeID}>
                    {type.TradeType}
                  </option>
                ))}
              </select>
            </div>

            {/* Sell Date */}
            <div className="form-group">
              <label htmlFor="SellDate" className="block text-gray-300 mb-2">Sell Date</label>
              <input
                type="date"
                id="SellDate"
                name="SellDate"
                value={formData.SellDate}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Note */}
          <div className="mb-6">
            <label htmlFor="Note" className="block text-gray-300 mb-2">Note</label>
            <textarea
              id="Note"
              name="Note"
              value={formData.Note}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              {action === 'insert' ? 'Add Trade' : 'Save Changes'}
            </button>
            <Link
              to="/trade"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeForm;