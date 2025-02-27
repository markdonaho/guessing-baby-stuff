// src/pages/PredictionForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import CustomCalendar from '../components/PredictionForm/CustomCalendar';
import WeightPicker from '../components/PredictionForm/WeightPicker';
import LengthPicker from '../components/PredictionForm/LengthPicker';
import { useFirestore } from '../hooks/useFirestore';
import { validateName, validateRequired } from '../utils/validators';
import { formatWeight, formatLength } from '../utils/formatters';
import { FiUser, FiCalendar, FiClock, FiActivity } from 'react-icons/fi';
import { TbRulerMeasure} from 'react-icons/tb';
import { GiWeight } from 'react-icons/gi';

// Simple time picker component
const SimpleTimePicker = ({ selectedTime, onChange }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <label htmlFor="time-input" className="text-gray-600 mr-2">Select time:</label>
        <input
          id="time-input"
          type="time"
          value={selectedTime}
          onChange={(e) => onChange(e.target.value)}
          className="form-input w-full max-w-xs"
        />
      </div>
      <div className="mt-2 text-center">
        <span className="text-sm text-gray-500">
          {selectedTime ? 
            `Selected time: ${selectedTime}` : 
            'Please select a time'
          }
        </span>
      </div>
    </div>
  );
};

const PredictionForm = () => {
  const navigate = useNavigate();
  const { addDocument, isPending } = useFirestore('predictions');
  
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    date: new Date(2025, 2, 1), // March 1st, 2025 (default)
    time: '12:00',
    weight: { pounds: 7, ounces: 8 },
    length: 21,
    ipAddress: 'dummy-ip-123'
  });
  
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const genderError = validateRequired(formData.gender, 'Gender');
    if (genderError) newErrors.gender = genderError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    try {
      // Format data for submission - CRITICAL: use formatters to get correct string format
      const predictionData = {
        name: formData.name,
        gender: formData.gender,
        date: formData.date,
        time: formData.time,
        // Use formatters to convert to proper string formats
        weight: formatWeight(formData.weight),
        length: formatLength(formData.length),
        ipAddress: formData.ipAddress
      };
      
      console.log('Submitting prediction:', predictionData);
      
      // Add the document to Firestore
      await addDocument(predictionData);
      
      toast.success('Your prediction has been submitted!');
      navigate('/success');
    } catch (error) {
      toast.error('Error submitting prediction. Please try again.');
      console.error('Error submitting prediction:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="bg-primary-600 text-white p-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Baby Prediction</h1>
            <p className="text-primary-100">Make your prediction for the Gooden's baby!</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-700 font-medium flex items-center">
                <FiUser className="mr-2 text-primary-600" />
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your name"
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            {/* Gender Selection */}
            <div>
              <label htmlFor="gender" className="block mb-2 text-gray-700 font-medium flex items-center">
                <FiUser className="mr-2 text-primary-600" />
                Gender Prediction
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`form-input ${errors.gender ? 'border-red-500' : ''}`}
                required
              >
                <option value="" disabled>Select gender</option>
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
              )}
            </div>

            {/* Date Selection */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium flex items-center">
                <FiCalendar className="mr-2 text-primary-600" />
                Birth Date
              </label>
              
              <div className="flex justify-center">
                <CustomCalendar
                  selectedDate={formData.date}
                  onChange={(date) => setFormData(prev => ({ ...prev, date }))}
                />
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block mb-2 text-gray-700 font-medium flex items-center">
                <FiClock className="mr-2 text-primary-600" />
                Birth Time
              </label>
              
              <SimpleTimePicker 
                selectedTime={formData.time}
                onChange={(time) => setFormData(prev => ({ ...prev, time }))}
              />
            </div>

            {/* Weight and Length Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Weight Picker */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium flex items-center">
                  <GiWeight className="mr-2 text-primary-600" />
                  Weight
                </label>
                <WeightPicker
                  weight={formData.weight}
                  onChange={(weight) => setFormData(prev => ({ ...prev, weight }))}
                />
                <p className="mt-2 text-sm text-gray-500 text-center">
                  {formatWeight(formData.weight)}
                </p>
              </div>
              
              {/* Length Picker - ADDED */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium flex items-center">
                  <TbRulerMeasure className="mr-2 text-primary-600" />
                  Length
                </label>
                <LengthPicker
                  length={formData.length}
                  onChange={(length) => setFormData(prev => ({ ...prev, length }))}
                />
                <p className="mt-2 text-sm text-gray-500 text-center">
                  {formatLength(formData.length)}
                </p>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full btn btn-primary py-3 text-lg rounded-xl hover:shadow-lg transition-all duration-300"
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Submitting...</span>
                  </span>
                ) : (
                  'Submit Your Prediction'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;