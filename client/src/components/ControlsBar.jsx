import React from 'react';

function ControlsBar({ searchQuery, onSearchChange, viewMode, onViewModeChange }) {
  return (
    <div className="controls-bar">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by Cargo ID or Destination..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button className="clear-search" onClick={() => onSearchChange('')}>×</button>
        )}
      </div>

      <div className="view-toggle">
        <button 
          className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => onViewModeChange('grid')}
        >
          Grid
        </button>
        <button 
          className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
          onClick={() => onViewModeChange('table')}
        >
          Table
        </button>
      </div>
    </div>
  );
}

export default ControlsBar;
