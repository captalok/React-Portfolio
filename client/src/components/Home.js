import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [lastLoginTime, setLastLoginTime] = useState('');
  const [username] = useState('Trader'); // Replace with actual username from context or props
  const [portfolioStats] = useState({
    dematValue: '₹1,250,000',
    portfolioGain: '+12.5%',
    todaysChange: '+1.2%'
  });

  // Initialize clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      const dateStr = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
      
      // Set last login time (for demo purposes)
      const lastLogin = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setLastLoginTime(lastLogin);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Create animated background particles
  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;
      
      particlesContainer.innerHTML = '';
      const particleCount = 15;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size
        const size = Math.random() * 60 + 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100 + 100}%`;
        
        // Random animation duration
        const duration = Math.random() * 20 + 15;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
      }
    };
    
    createParticles();
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 font-sans overflow-x-hidden">
      {/* Animated background particles */}
      <div id="particles" className="fixed inset-0 z-0 overflow-hidden" />
      
      {/* Header with clock */}
      <header className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Trading Dashboard</h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
              <div className="bg-gray-700/60 backdrop-blur-sm rounded-full px-6 py-2 border border-gray-600 shadow-lg">
                <div className="text-center text-lg font-semibold" id="clock">{currentTime}</div>
                <div className="text-center text-sm text-gray-300" id="date">{currentDate}</div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-2 rounded-full flex items-center transition-all duration-300 shadow-lg hover:shadow-red-500/30"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome message */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-light">
                Welcome back, <span className="font-bold text-blue-300">{username}</span>!
              </h1>
              <p className="text-gray-400">
                Your last login was today at <span className="text-blue-300">{lastLoginTime}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 min-w-[150px] text-center border border-gray-700 shadow-lg">
                <div className="text-sm text-gray-400">Demat Value</div>
                <div className="text-xl font-semibold">{portfolioStats.dematValue}</div>
              </div>
              
              <div className="bg-green-900/20 backdrop-blur-sm rounded-xl p-4 min-w-[150px] text-center border border-green-500/30 shadow-lg">
                <div className="text-sm text-green-400">Portfolio Gain</div>
                <div className="text-xl font-semibold text-green-300">{portfolioStats.portfolioGain}</div>
              </div>
              
              <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-4 min-w-[150px] text-center border border-blue-500/30 shadow-lg">
                <div className="text-sm text-blue-400">Today's Change</div>
                <div className="text-xl font-semibold text-blue-300">{portfolioStats.todaysChange}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Edit Tables */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
            <div className="bg-gray-700/70 backdrop-blur-sm py-4 px-6 border-b border-gray-600">
              <h3 className="text-xl font-semibold flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit Tables
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 gap-3">
              <button 
                onClick={() => navigate('/trade')}
                className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-green-500 flex items-center"
              >
                <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
                Trade
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-green-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Trade Journal
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-green-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Finance
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-green-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Calendar
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-green-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Password
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-green-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Document
              </button>
            </div>
          </div>

          {/* View Tables */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
            <div className="bg-gray-700/70 backdrop-blur-sm py-4 px-6 border-b border-gray-600">
              <h3 className="text-xl font-semibold flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
                </svg>
                View Tables
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 gap-3">
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-blue-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Calendar
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-blue-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Expenses
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-blue-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                All Trades
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-blue-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                Demat
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-blue-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                Day Trades
              </button>
            </div>
          </div>

          {/* Dashboards */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
            <div className="bg-gray-700/70 backdrop-blur-sm py-4 px-6 border-b border-gray-600">
              <h3 className="text-xl font-semibold flex items-center">
                <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Dashboards
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 gap-3">
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-cyan-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Main Dashboard
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-cyan-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
                Trade Dashboard
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-cyan-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Broker State
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-cyan-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Liability
              </button>
              
              <button className="text-left bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 py-3 px-4 rounded-lg border-l-4 border-cyan-500 flex items-center">
                <svg className="w-5 h-5 mr-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Monthly Savings
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 mt-12 border-t border-gray-700 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          <p className="mb-1">Trading Dashboard v2.5 | Last Updated: June 21, 2023</p>
          <p>© 2023 Financial Tracker Pro. All rights reserved.</p>
        </div>
      </footer>

      {/* Custom CSS for particles and animations */}
      <style jsx>{`
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(79, 70, 229, 0.08);
          animation: float 15s infinite linear;
        }
        
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Home;