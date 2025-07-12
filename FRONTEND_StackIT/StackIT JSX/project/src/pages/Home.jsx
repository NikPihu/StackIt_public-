import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to StackIT
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your go-to platform for questions, answers, and knowledge sharing
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Get Started
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">?</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ask Questions</h3>
              <p className="text-gray-600">Get help from the community by asking detailed questions</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-600 text-2xl font-bold">!</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Knowledge</h3>
              <p className="text-gray-600">Help others by sharing your expertise and insights</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 text-2xl font-bold">★</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Reputation</h3>
              <p className="text-gray-600">Earn points and recognition for quality contributions</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;