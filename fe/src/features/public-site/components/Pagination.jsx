import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-5 py-3 rounded-2xl font-medium transition-colors ${
            i === currentPage
              ? 'bg-blue-dark text-white'
              : 'border border-gray-200 hover:border-blue-normal hover:text-blue-normal text-gray-700'
          }`}
        >
          {i}
        </button>
      );
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pages.push(
        <span key={`ellipsis-${i}`} className="px-3 py-3 text-gray-400">
          ...
        </span>
      );
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 hover:border-blue-normal hover:text-blue-normal transition-colors ${
          currentPage === 1 ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        ← Sebelumnya
      </button>

      {pages}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 hover:border-blue-normal hover:text-blue-normal transition-colors ${
          currentPage === totalPages ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        Berikutnya →
      </button>
    </div>
  );
}
