import React from 'react';

function CargoTable({ cargo }) {
  return (
    <div className="table-responsive">
      <table className="cargo-table">
        <thead>
          <tr>
            <th>CARGO ID</th>
            <th>DATE</th>
            <th>DESTINATION</th>
            <th>MASS (KG)</th>
            <th>STATUS / FLAGS</th>
          </tr>
        </thead>
        <tbody>
          {cargo.map((item) => {
            const isSector7 = (item.destination || '').includes('Sector-7');
            const isEarth = (item.destination || '').trim().toLowerCase() === 'earth';

            return (
              <tr key={item.cargoId} className={isEarth ? 'table-earth-pinned' : ''}>
                <td className="table-id">{item.cargoId}</td>
                <td>{item.date}</td>
                <td className="table-dest">{item.destination}</td>
                <td className="table-weight">{item.weightInKg} kg</td>
                <td>
                  <div className="table-badges">
                    {isSector7 && <span className="badge sector-badge-sm">⚡ 1.45x</span>}
                    {isEarth && <span className="badge earth-badge-sm">🌍 Earth Pinned</span>}
                    {!isSector7 && !isEarth && <span className="badge standard-badge-sm">Standard</span>}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CargoTable;
