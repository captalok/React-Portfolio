import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const TradeUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/trade/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSuccessMessage(`Successfully imported ${response.data.count} trades`);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">📤 Trade Data Upload</h2>
          <a 
            href="/trade" 
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Trades
          </a>
        </div>

        <div className="p-6">
          {(errorMessage || successMessage) && (
            <div className={`mb-6 p-4 rounded-lg ${errorMessage ? 'bg-red-900/30 border border-red-700' : 'bg-green-900/30 border border-green-700'}`}>
              <p className={errorMessage ? 'text-red-300' : 'text-green-300'}>
                {errorMessage || successMessage}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="excelFile" className="block text-gray-300 mb-3">Select Excel File</label>
              <input
                type="file"
                id="excelFile"
                name="excelFile"
                onChange={handleFileChange}
                accept=".xlsx, .xls"
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <button
                type="submit"
                disabled={isUploading}
                className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-300 flex justify-center items-center ${isUploading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Data
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">📝 File Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  File Format: .xlsx or .xls
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Max Size: 5MB
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Date Format: YYYY-MM-DD
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  BrokerID: Valid numeric ID
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ScripID: Valid numeric ID
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  TradeTypeID: Valid numeric ID
                </li>
              </ul>
            </div>
            
            <div className="mt-6 text-center">
              <a 
                href={`${API_BASE_URL}/api/trade/template`} 
                className="inline-flex items-center bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Template
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeUpload;