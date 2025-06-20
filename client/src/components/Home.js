import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full z-[-1]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      </div>

      {/* Navigation */}
      <nav className="glass-card bg-white/80 backdrop-blur-md border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-1 px-3 rounded-lg">
                Brand
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                Dashboard
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Welcome to Your Dashboard
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            You've successfully accessed your personalized dashboard. Start exploring your metrics and insights.
          </p>
          
          <div className="mt-10 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              {/* Stats Cards */}
              {[
                { title: 'Total Users', value: '12,402', change: '+12%' },
                { title: 'Engagement Rate', value: '78.3%', change: '+4.2%' },
                { title: 'Active Sessions', value: '2,483', change: '+8.1%' },
              ].map((stat, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border border-white/30">
                  <p className="text-gray-500">{stat.title}</p>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <span className="ml-2 text-sm font-medium text-green-500">{stat.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Button */}
          <div className="mt-16">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:opacity-90 transition transform hover:-translate-y-1 shadow-lg">
              Explore Features
            </button>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Powerful Features
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Everything you need to manage your business effectively
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Real-time Analytics', 
                description: 'Track user behavior and engagement with live data visualization',
                icon: '📊'
              },
              { 
                title: 'Secure Transactions', 
                description: 'Bank-grade security for all your financial operations',
                icon: '🔒'
              },
              { 
                title: 'Custom Integrations', 
                description: 'Connect with your favorite tools and services seamlessly',
                icon: '🔌'
              }
            ].map((feature, idx) => (
              <div key={idx} className="glass-card p-8 rounded-2xl border border-white/30 hover:shadow-xl transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="glass-card bg-white/80 backdrop-blur-md border-t border-white/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © 2023 Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;