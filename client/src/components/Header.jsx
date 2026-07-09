import React from 'react';

function Header({ syncing, loading, onSync }) {
  return (
    <header className="dashboard-header">
      <div className="header-brand">
        <div className="logo-container">
          <span className="logo-glow"></span>
          <div className="logo-icon">▲</div>
        </div>
        <div>
          <h1>INTERGALACTIC CARGO TRIAGER</h1>
          <p className="subtitle">Legacy Manifest Control Center v3.0</p>
        </div>
      </div>
      
      <button
        id="sync-btn"
        className={`sync-button ${syncing ? 'syncing' : ''}`}
        onClick={onSync}
        disabled={syncing || loading}
      >
        <span className="sync-icon">🔄</span>
        <span className="sync-text">
          {syncing ? 'Aligning quantum drives...' : 'Sync Data'}
        </span>
        {syncing && <span className="sync-progress"></span>}
      </button>
    </header>
  );
}

export default Header;
