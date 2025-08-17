import React from 'react';
import { PaginationOptions } from '../types';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange
}) => {
  const pageSizeOptions = [5, 10, 20, 50];
  
  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };
  
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200 ${
            i === currentPage
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {i + 1}
        </button>
      );
    }
    
    return pages;
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 bg-gray-900 bg-opacity-60 backdrop-blur-md p-3 rounded-lg shadow-lg border border-gray-800">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-purple-200">Page Size:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="px-2 py-1 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Previous
        </button>
        
        <div className="flex items-center space-x-1">
          {renderPageNumbers()}
        </div>
        
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className="px-2 py-1 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next
        </button>
      </div>
      
      <div className="text-sm text-purple-200">
        Page {currentPage + 1} of {Math.max(1, totalPages)}
      </div>
    </div>
  );
};