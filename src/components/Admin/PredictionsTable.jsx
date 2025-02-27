// src/components/Admin/PredictionsTable.jsx
import React from 'react';
import { formatDate, formatTime } from '../../utils/formatters';
import { FiDownload } from 'react-icons/fi';

const PredictionsTable = ({ predictions, handleDownloadCSV }) => {
  return (
    <>
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left border-b">Name</th>
              <th className="p-3 text-left border-b">Date</th>
              <th className="p-3 text-left border-b">Time</th>
              <th className="p-3 text-left border-b">Weight</th>
              <th className="p-3 text-left border-b">Length</th>
              <th className="p-3 text-left border-b">Gender</th>
              <th className="p-3 text-left border-b">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map(prediction => (
              <tr key={prediction.id} className="hover:bg-gray-50 border-b last:border-b-0">
                <td className="p-3">{prediction.name || ''}</td>
                <td className="p-3">{formatDate(prediction.date) || ''}</td>
                <td className="p-3">{formatTime(prediction.time) || ''}</td>
                <td className="p-3">{prediction.weight || ''}</td>
                <td className="p-3">{prediction.length || ''}</td>
                <td className="p-3">
                  {prediction.gender ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prediction.gender === 'Boy' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                    }`}>
                      {prediction.gender}
                    </span>
                  ) : ''}
                </td>
                <td className="p-3">{formatDate(prediction.createdAt) || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 text-center">
        <button
          onClick={handleDownloadCSV}
          className="btn btn-primary flex items-center mx-auto"
          disabled={predictions.length === 0}
        >
          <FiDownload className="mr-2" />
          Download as CSV
        </button>
      </div>
    </>
  );
};

export default PredictionsTable;