import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';
import { useParams, useNavigate } from 'react-router-dom';

const TradeIdForm = () => {
  const { action, id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    BuyDate: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (action === 'edit' && id) {
          const response = await axios.get(`${API_BASE_URL}/api/tradeid/${id}`);
          setFormData(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching trade ID data:', error);
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
        await axios.post(`${API_BASE_URL}/api/tradeid/insert`, formData);
        navigate('/trade/insert');
      } else {
        await axios.put(`${API_BASE_URL}/api/tradeid/edit/${id}`, formData);
        navigate('/tradeid');
      }
    } catch (error) {
      console.error('Error saving trade ID:', error);
      alert('Failed to save trade ID. Please try again.');
    }
  };

  useEffect(() => {
    // Set current date if inserting new trade ID
    if (action === 'insert' && !formData.BuyDate) {
      const today = new Date().toISOString().split('T')[0];
      setFormData({ BuyDate: today });
    }
  }, [action, formData.BuyDate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">
            {action === 'insert' ? 'Add New Trade ID' : 'Edit Trade ID'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="BuyDate" className="block text-gray-300 mb-2">Buy Date</label>
            <input
              type="date"
              id="BuyDate"
              name="BuyDate"
              value={formData.BuyDate}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              {action === 'insert' ? 'Add Trade ID' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => action === 'insert' ? navigate('/tradeid') : navigate('/tradeid')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeIdForm;