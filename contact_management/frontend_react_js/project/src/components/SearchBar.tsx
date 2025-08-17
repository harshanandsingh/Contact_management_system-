import React, { useState } from 'react';
import { SearchOptions, Tag } from '../types';

interface SearchBarProps {
  onSearch: (options: SearchOptions) => Promise<void>;
  onReset: () => Promise<void>;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onReset, isLoading }) => {
  const [searchType, setSearchType] = useState<'name' | 'phone' | 'tag' | 'advanced'>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedOptions, setAdvancedOptions] = useState<SearchOptions>({
    name: '',
    tag: undefined,
    notes: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchType === 'advanced') {
      onSearch(advancedOptions);
    } else if (searchType === 'name' && searchQuery) {
      onSearch({ name: searchQuery });
    } else if (searchType === 'phone' && searchQuery) {
      onSearch({ phone: searchQuery });
    } else if (searchType === 'tag' && searchQuery) {
      onSearch({ tag: searchQuery as Tag });
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setAdvancedOptions({
      name: '',
      tag: undefined,
      notes: ''
    });
    onReset();
  };

  const handleAdvancedOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAdvancedOptions(prev => ({
      ...prev,
      [name]: value === '' ? undefined : value
    }));
  };

  return (
    <div className="w-full bg-gray-900 bg-opacity-60 backdrop-blur-md p-4 rounded-lg shadow-lg border border-gray-800">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="sm:w-1/4">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as any)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value="name">Search by Name</option>
              <option value="phone">Search by Phone</option>
              <option value="tag">Search by Tag</option>
              <option value="advanced">Advanced Search</option>
            </select>
          </div>

          {searchType !== 'advanced' ? (
            <>
              <div className="sm:flex-1">
                {searchType === 'tag' ? (
                  <select
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isLoading}
                  >
                    <option value="">Select Tag</option>
                    <option value="Friend">Friend</option>
                    <option value="Family">Family</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Enter ${searchType}...`}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || !searchQuery}
                  className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10">Search</span>
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </>
          ) : null}
        </div>

        {searchType === 'advanced' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={advancedOptions.name || ''}
                onChange={handleAdvancedOptionChange}
                placeholder="Enter name..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="tag" className="block text-sm font-medium text-purple-200 mb-1">
                Tag
              </label>
              <select
                id="tag"
                name="tag"
                value={advancedOptions.tag || ''}
                onChange={handleAdvancedOptionChange}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              >
                <option value="">Select Tag</option>
                <option value="Friend">Friend</option>
                <option value="Family">Family</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-purple-200 mb-1">
                Notes
              </label>
              <input
                type="text"
                id="notes"
                name="notes"
                value={advancedOptions.notes || ''}
                onChange={handleAdvancedOptionChange}
                placeholder="Search in notes..."
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
          </div>
        )}
        
        {searchType === 'advanced' && (
          <div className="flex justify-end space-x-3 mt-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
            >
              Reset
            </button>
            
            <button
              type="submit"
              disabled={isLoading || (!advancedOptions.name && !advancedOptions.tag && !advancedOptions.notes)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10">Search</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};