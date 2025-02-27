import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiBarChart2, FiChevronRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ImageCarousel from '../components/Success/ImageCarousel';
import SuccessStats from '../components/Success/SuccessStats';

const Home = () => {
  const [showStats, setShowStats] = useState(false);

  const toggleStats = () => {
    setShowStats(!showStats);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gradient-primary tracking-tight mb-4 animate-slide-up">
            Guess the Gooden
          </h1>
          <p className="text-lg text-gray-600 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            The Goodens are adding one more to the crew, 
            let's guess some detes!
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Action Buttons */}
          <div className="space-y-4">
            <Link 
              to="/predict" 
              className="group btn-primary-outline flex items-center justify-between px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <FiEdit className="text-primary-600 w-6 h-6" />
                </div>
                <span className="font-semibold text-primary-900">Make Your Prediction</span>
              </div>
              <FiChevronRight className="text-primary-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button 
              onClick={toggleStats}
              className={`w-full group flex items-center justify-between px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                showStats 
                  ? 'bg-primary-50 border border-primary-200' 
                  : 'btn-secondary-outline'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${showStats ? 'bg-primary-100' : 'bg-gray-100'}`}>
                  <FiBarChart2 className={`w-6 h-6 ${showStats ? 'text-primary-600' : 'text-gray-600'}`} />
                </div>
                <span className={`font-semibold ${showStats ? 'text-primary-900' : 'text-gray-900'}`}>
                  {showStats ? 'Hide Stats' : 'View Current Stats'}
                </span>
              </div>
              {showStats ? (
                <FiChevronUp className={`${showStats ? 'text-primary-600' : 'text-gray-600'} transition-transform`} />
              ) : (
                <FiChevronDown className={`${showStats ? 'text-primary-600' : 'text-gray-600'} transition-transform`} />
              )}
            </button>
          </div>
          
          {/* Right Column - Image Carousel */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <ImageCarousel />
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showStats 
            ? 'max-h-[2000px] opacity-100 mb-8' 
            : 'max-h-0 opacity-0 mb-0'
        }`}>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary-700 flex items-center justify-center">
              <FiBarChart2 className="mr-2" />
              Current Baby Predictions
            </h2>
            {showStats && <SuccessStats />}
          </div>
        </div>
        
        {/* Mobile Carousel - appears below stats on mobile */}
        <div className="md:hidden">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;