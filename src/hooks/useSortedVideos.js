import { useMemo, useRef } from 'react';

export function useSortedVideos(filteredVideos) {
  const randomWeights = useRef(new Map());

  return useMemo(() => {
    // 1. On s'assure que chaque vidéo a un poids aléatoire stable (fixé une seule fois)
    filteredVideos.forEach(v => {
      if (!randomWeights.current.has(v.id)) {
        randomWeights.current.set(v.id, Math.random());
      }
    });

    // 2. Fonction pour obtenir le rang du tier (0, 1, 2, 3, ou 4 pour "other")
    const getTierRank = (v) => 
      (v.tier !== null && v.tier !== undefined && v.tier >= 0 && v.tier <= 3) 
        ? v.tier 
        : 4;

    // 3. Un seul tri basé sur deux critères : le tier, puis le poids aléatoire
    return [...filteredVideos].sort((a, b) => {
      const tierDiff = getTierRank(a) - getTierRank(b);
      if (tierDiff !== 0) return tierDiff; // D'abord par tier
      
      // Si même tier, on utilise le poids aléatoire stable stocké dans le Ref
      return randomWeights.current.get(a.id) - randomWeights.current.get(b.id);
    });
  }, [filteredVideos]);
}