import React, { useState } from 'react';

interface ExportButtonProps {
  onExport: (days: number) => Promise<void>;
  isLoading: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ onExport, isLoading }) => {
  const [days, setDays] = useState(30);
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = () => {
    onExport(days);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-600 transition-colors duration-200 flex items-center space-x-2 relative overflow-hidden group"
      >
        <span className="relative z-10">Export to CSV</span>
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg z-50 border border-gray-700 p-4">
          <div className="mb-4">
            <label htmlFor="days" className="block text-sm font-medium text-gray-300 mb-1">
              Export contacts from last:
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="days"
                min="1"
                max="365"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value, 10) || 30)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="inline-flex items-center px-4 py-2 bg-gray-600 border border-l-0 border-gray-600 rounded-r-md text-sm text-white">
                days
              </span>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isLoading}
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Exporting...' : 'Export'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};