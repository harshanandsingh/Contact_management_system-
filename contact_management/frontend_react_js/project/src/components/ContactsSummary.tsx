import React from 'react';

interface ContactsSummaryProps {
  totalContacts: number;
  isLoading: boolean;
}

export const ContactsSummary: React.FC<ContactsSummaryProps> = ({
  totalContacts,
  isLoading
}) => {
  return (
    <div className="bg-gray-900 bg-opacity-60 backdrop-blur-md p-4 rounded-lg shadow-lg border border-gray-800 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium text-white">Contacts Summary</h3>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-purple-200">Total Contacts:</p>
          {isLoading ? (
            <span className="inline-block w-8 h-4 bg-gray-700 animate-pulse rounded"></span>
          ) : (
            <span className="text-sm font-semibold text-white">{totalContacts}</span>
          )}
        </div>
      </div>
    </div>
  );
};