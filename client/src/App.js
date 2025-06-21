import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import TradeList from './components/trade/TradeList';
import TradeForm from './components/trade/TradeForm';
import TradeIdList from './components/trade/TradeIdList';
import TradeIdForm from './components/trade/TradeIdForm';
import TradeUpload from './components/trade/TradeUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/trade" element={<TradeList />} />
        <Route path="/trade/insert" element={<TradeForm action="insert" />} />
        <Route path="/trade/edit/:id" element={<TradeForm action="edit" />} />
        <Route path="/trade/upload" element={<TradeUpload />} />
        <Route path="/tradeid" element={<TradeIdList />} />
        <Route path="/tradeid/insert" element={<TradeIdForm action="insert" />} />
        <Route path="/tradeid/edit/:id" element={<TradeIdForm action="edit" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;