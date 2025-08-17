import React, { useState } from 'react';

interface RecentContactsSelectorProps {
  onSelectRecent: (days: number) => Promise<void>;
  isLoading: boolean;
}

export const RecentContactsSelector: React.FC<RecentContactsSelectorProps> = ({
  onSelectRecent,
  isLoading
}) => {
  const [days, setDays] = useState(5);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays(parseInt(e.target.value, 10) || 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectRecent(days);
  };
  
  return (

    /*
    <form onSubmit={handleSubmit} className="bg-gray-900 bg-opacity-60 backdrop-blur-md p-4 rounded-lg shadow-lg border border-gray-800 z-5">
      <div className="text-sm text-purple-200 mb-2">Show contacts from the last:</div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="1"
          max="30"
          value={days}
          onChange={handleChange}
          className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isLoading}
        />
        <span className="text-gray-300">days</span>
        <button
          type="submit"
          disabled={isLoading}
          className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : 'Show'}
        </button>
      </div>
    </form>
    */
    <></>
  );
};