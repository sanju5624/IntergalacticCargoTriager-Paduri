import React from 'react';

function StatsPanel({ cargo, loading }) {
  const totalWeight = cargo.reduce((sum, item) => sum + (item.weightInKg || 0), 0);
  const averageWeight = cargo.length ? Math.round(totalWeight / cargo.length) : 0;
  const sector7Count = cargo.filter(item => (item.destination || '').includes('Sector-7')).length;

  return (
    <section className="stats-container">
      <div className="stat-card">
        <span className="stat-label">TOTAL SHIPMENTS</span>
        <span className="stat-value">{loading ? '...' : cargo.length}</span>
        <span className="stat-indicator green">ACTIVE LINK</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">TOTAL WEIGHT</span>
        <span className="stat-value">{loading ? '...' : `${totalWeight.toLocaleString()} kg`}</span>
        <span className="stat-indicator blue">QUANTUM MASS</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">AVG SHIPMENT WEIGHT</span>
        <span className="stat-value">{loading ? '...' : `${averageWeight} kg`}</span>
        <span className="stat-indicator purple">OPTIMIZED</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">SECTOR-7 BOOSTS</span>
        <span className="stat-value">{loading ? '...' : sector7Count}</span>
        <span className="stat-indicator gold">1.45x MULTIPLIER</span>
      </div>
    </section>
  );
}

export default StatsPanel;
