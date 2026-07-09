import { useState, useEffect } from 'react';
import { fetchCargo } from '../api/cargoApi';

export const useCargo = () => {
  const [cargo, setCargo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  const loadCargo = async (isManualSync = false) => {
    if (!isManualSync) setLoading(true);
    try {
      const data = await fetchCargo();
      setCargo(data);
      setError(null);
    } catch (err) {
      console.error('Error loading cargo data:', err);
      setError('Could not connect to the Cargo Manifest API server. Make sure the backend is running on port 3000.');
    } finally {
      if (!isManualSync) setLoading(false);
    }
  };

  useEffect(() => {
    loadCargo();
  }, []);

  const syncCargo = () => {
    setSyncing(true);
    setTimeout(async () => {
      await loadCargo(true);
      setSyncing(false);
    }, 2500);
  };

  return {
    cargo,
    loading,
    syncing,
    error,
    syncCargo,
    retry: loadCargo
  };
};
