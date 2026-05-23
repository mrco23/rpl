import React from 'react';
import { Search } from 'lucide-react';

export default function SearchSortBar({ 
  searchQuery, 
  setSearchQuery, 
  sortOrder, 
  setSortOrder, 
  searchPlaceholder 
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-normal focus:ring-2 focus:ring-blue-100 outline-none text-gray-700"
        />
        <Search className="w-6 h-6 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
      </div>

      <select 
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="px-6 py-4 rounded-2xl border border-gray-200 focus:border-blue-normal outline-none text-gray-700 bg-white"
      >
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
      </select>
    </div>
  );
}
