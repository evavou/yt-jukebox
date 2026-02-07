import { useRef, useEffect, useCallback } from 'react';

export const useHorizontalScroll = (containerRef, dependency = null) => {
  const state = useRef({ velocity: 0, isAnimating: false, lastTime: 0 });
  const rafRef = useRef(null);

  // 1. Trouver le conteneur cible (.main-content ou le ref lui-même)
  const getTarget = useCallback(() => {
    let target = containerRef.current;
    while (target && !target.classList.contains('main-content')) {
      target = target.parentElement;
    }
    return target || containerRef.current;
  }, [containerRef]);

  // 2. Boucle d'animation pour l'inertie fluide
  const animate = useCallback((timestamp) => {
    const target = getTarget();
    if (!target || Math.abs(state.current.velocity) < 0.2) {
      state.current.isAnimating = false;
      state.current.velocity = 0;
      return;
    }

    const deltaTime = Math.min((timestamp - state.current.lastTime) / 16, 2);
    state.current.lastTime = timestamp;

    target.scrollLeft += state.current.velocity * deltaTime;
    
    // Friction adaptée (plus fluide sur Chrome, plus réactive sur Firefox)
    const friction = navigator.userAgent.includes('Firefox') ? 0.92 : 0.1;
    state.current.velocity *= Math.pow(friction, deltaTime);

    rafRef.current = requestAnimationFrame(animate);
  }, [getTarget]);

  // 3. Gestionnaire d'événement Wheel (molette)
  const handleWheel = useCallback((e) => {
    // On ne gère que le scroll vertical pour le transformer en horizontal
    if (e.deltaY === 0) return;
    
    e.preventDefault();
    const boost = navigator.userAgent.includes('Firefox') ? 1 : 50000;
    state.current.velocity += e.deltaY * boost;

    if (!state.current.isAnimating) {
      state.current.isAnimating = true;
      state.current.lastTime = performance.now();
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  // 4. Effet : Attachement des écouteurs d'événements
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, handleWheel]);

  // 5. Effet : RESET CRITIQUE lors du changement de données
  useEffect(() => {
    const target = getTarget();
    if (target) {
      // Arrêt immédiat de toute animation en cours
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      state.current.velocity = 0;
      state.current.isAnimating = false;

      setTimeout(() => {
        target.scrollLeft = 0;
      }, 0);
    }
  }, [dependency, getTarget]);


  // Fonction manuelle exposée au cas où
  const resetScrollState = useCallback(() => {
    const target = getTarget();
    if (target) target.scrollLeft = 0;
    state.current.velocity = 0;
  }, [getTarget]);

  return { resetScrollState };
};