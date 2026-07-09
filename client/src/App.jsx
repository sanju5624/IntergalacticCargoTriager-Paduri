import React, { useState } from 'react';
import './App.css';
import { useCargo } from './hooks/useCargo';
import { sortCargo } from './utils/sorting';
import Header from './components/Header';
import StatsPanel from './components/StatsPanel';
import ControlsBar from './components/ControlsBar';
import CargoGrid from './components/CargoGrid';
import CargoTable from './components/CargoTable';

function App() {
  const { cargo, loading, syncing, error, syncCargo, retry } = useCargo();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Filter cargo based on user search query
  const getFilteredCargo = (list) => {
    return list.filter(item => {
      const query = searchQuery.toLowerCase();
      const idMatch = (item.cargoId || '').toLowerCase().includes(query);
      const destMatch = (item.destination || '').toLowerCase().includes(query);
      return idMatch || destMatch;
    });
  };

  const sortedCargoList = sortCargo(cargo);
  const displayedCargo = getFilteredCargo(sortedCargoList);

  return (
    <div className="app-container">
      {/* Background stars / grid effect */}
      <div className="space-bg"></div>

      {/* Header with brand and Sync actions */}
      <Header syncing={syncing} loading={loading} onSync={syncCargo} />

      {/* Statistics Panel Summary */}
      <StatsPanel cargo={cargo} loading={loading} />

      {/* Controls Bar for Search Filters and Layout Views */}
      <ControlsBar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        viewMode={viewMode} 
        onViewModeChange={setViewMode} 
      />

      {/* Main Content Area */}
      <main className="main-content">
        {loading && !syncing ? (
          <div className="loader-container">
            <div className="quantum-spinner"></div>
            <p>Stabilizing containment field...</p>
          </div>
        ) : error ? (
          <div className="error-card">
            <h3>⚠️ TELEMETRY LINK OFFLINE</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={() => retry()}>Re-establish Connection</button>
          </div>
        ) : displayedCargo.length === 0 ? (
          <div className="empty-state">
            <p>No manifests found matching current search queries.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <CargoGrid cargo={displayedCargo} />
        ) : (
          <CargoTable cargo={displayedCargo} />
        )}
      </main>
      
      {/* Footer */}
      <footer className="dashboard-footer-info">
        <p>Quantum Core aligned to Paduri mainframe. All systems functional.</p>
      </footer>
    </div>
  );
}

export default App;
