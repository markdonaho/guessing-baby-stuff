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
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Column - Messaging */}
        <div className="space-y-6 text-left">
          <div className="animate-slide-up">
            <h1 className="text-4xl font-bold text-gradient-primary tracking-tight mb-4">
              Guess the Gooden
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              The Goodens are adding one more to the crew, 
              let's guess some detes!
            </p>
          </div>

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
              className="w-full group btn-secondary-outline flex items-center justify-between px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <FiBarChart2 className="text-gray-600 w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-900">View Current Stats</span>
              </div>
              {showStats ? (
                <FiChevronUp className="text-gray-600 group-hover:translate-y-1 transition-transform" />
              ) : (
                <FiChevronDown className="text-gray-600 group-hover:translate-y-1 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Right Column - Image Carousel */}
        <div className="hidden md:block">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <ImageCarousel />
          </div>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden mt-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <ImageCarousel />
        </div>
      </div>

      {/* Stats Section - Only shown when toggled */}
      {showStats && (
        <div className="mt-12 max-w-4xl mx-auto animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary-700 flex items-center justify-center">
              <FiBarChart2 className="mr-2" />
              Current Baby Predictions
            </h2>
            <SuccessStats />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;