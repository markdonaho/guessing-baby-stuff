import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiBarChart2 } from 'react-icons/fi';
import SuccessStats from '../components/Success/SuccessStats';

const Success = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Success message card */}
        <div className="bg-white rounded-lg shadow-xl p-8 text-center mb-8">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Prediction Submitted!</h1>
          <p className="mb-6 text-gray-600 text-lg">
            Thank you for your prediction! We've recorded your guess and will see how close you get.
          </p>
          
          <div className="flex justify-center">
            <Link to="/" className="btn btn-primary flex items-center px-6 py-3 text-lg">
              <FiHome className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
        
        {/* Stats Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold flex items-center justify-center">
            <FiBarChart2 className="mr-2 text-primary-600" />
            Baby Prediction Stats
          </h2>
          <p className="text-gray-600">
            Here's how everyone is predicting the baby's arrival!
          </p>
        </div>
        
        {/* Stats Component */}
        <SuccessStats />
      </div>
    </div>
  );
};

export default Success;