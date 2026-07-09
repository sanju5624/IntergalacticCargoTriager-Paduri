import React from 'react';

function CargoGrid({ cargo }) {
  return (
    <div className="cargo-grid">
      {cargo.map((item) => {
        const isSector7 = (item.destination || '').includes('Sector-7');
        const isEarth = (item.destination || '').trim().toLowerCase() === 'earth';

        return (
          <div key={item.cargoId} className={`cargo-card ${isEarth ? 'earth-pinned' : ''}`}>
            <div className="card-header">
              <span className="cargo-id">{item.cargoId}</span>
              <span className="cargo-date">{item.date}</span>
            </div>
            
            <div className="card-body">
              <div className="destination-wrapper">
                <span className="dest-label">DESTINATION</span>
                <h3 className="dest-value">{item.destination}</h3>
              </div>

              <div className="weight-wrapper">
                <span className="weight-label">CARGO MASS</span>
                <div className="weight-display">
                  <span className="weight-num">{item.weightInKg}</span>
                  <span className="weight-unit">KG</span>
                </div>
              </div>
            </div>

            <div className="card-footer">
              {isSector7 && (
                <span className="badge sector-badge">⚡ Sector-7 Boost (1.45x)</span>
              )}
              {isEarth && (
                <span className="badge earth-badge">🌍 Earth Pinned (Bottom)</span>
              )}
              {!isSector7 && !isEarth && (
                <span className="badge standard-badge">✓ Verified</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CargoGrid;
