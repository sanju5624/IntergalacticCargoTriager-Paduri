/**
 * Sorts cargo manifest records by weight in descending order (heaviest to lightest).
 * Exception: Any cargo destined for Earth is pinned to the absolute bottom of the list.
 */
export const sortCargo = (cargo) => {
  return [...cargo].sort((a, b) => {
    const aDest = (a.destination || '').trim().toLowerCase();
    const bDest = (b.destination || '').trim().toLowerCase();
    const aIsEarth = aDest === 'earth';
    const bIsEarth = bDest === 'earth';

    // Earth exception: Pinned to bottom
    if (aIsEarth && !bIsEarth) return 1;
    if (!aIsEarth && bIsEarth) return -1;
    if (aIsEarth && bIsEarth) return 0;

    // Heaviest to lightest weight sorting
    return (b.weightInKg || 0) - (a.weightInKg || 0);
  });
};
