// src/components/Admin/FilterControls.jsx
import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const FilterControls = ({ searchTerm, setSearchTerm, genderFilter, setGenderFilter, sortOption, setSortOption }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px] relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FiSearch />
        </div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="form-input pl-10 w-full"
        />
      </div>
      
      <div className="w-full md:w-auto flex gap-2">
        <div className="relative flex-1">
          <select
            value={genderFilter}
            onChange={e => setGenderFilter(e.target.value)}
            className="form-input pl-9 pr-8 w-full appearance-none"
          >
            <option value="all">All Genders</option>
            <option value="Boy">Boys</option>
            <option value="Girl">Girls</option>
          </select>
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FiFilter size={16} />
          </div>
        </div>
        
        <select
          value={sortOption}
          onChange={e => setSortOption(e.target.value)}
          className="form-input flex-1"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="date-asc">Date (Earlier First)</option>
          <option value="date-desc">Date (Later First)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;