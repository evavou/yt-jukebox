// src/components/navbar/RandomVideoButton.jsx
import React, { useState, useEffect, useCallback } from 'react';

function RandomVideoButton({ videos, noAdsEnabled }) {
  // On stocke l'URL actuelle dans un état pour que le navigateur la "voie"
  const [currentVideoUrl, setCurrentVideoUrl] = useState('#');


  // Fonction pour générer une URL aléatoire
  const generateRandomUrl = useCallback(() => {
    if (!videos || videos.length === 0) return '#';
    
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];
    const noAds = noAdsEnabled ? '.' : '';
    
    return `https://www.youtube.com${noAds}/watch?v=${randomVideo.id}&t=0s`;
  }, [videos, noAdsEnabled]);

  // Initialisation : on génère une URL dès que les vidéos sont chargées
  useEffect(() => {
    setCurrentVideoUrl(generateRandomUrl());
  }, [generateRandomUrl]);

  // on prépare la prochaine vidéo
  const handleRefreshLink = () => {
    // On laisse un tout petit délai pour que le navigateur ait le temps 
    // d'ouvrir le lien actuel avant qu'on ne le change
    setTimeout(() => {
        setCurrentVideoUrl(generateRandomUrl());
    }, 100);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* On utilise <a> au lieu de <button> */}
        <a 
            href={currentVideoUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="navbar-right-wrapper navbar-button"
            onClick={handleRefreshLink} // Sert juste à régénérer le lien pour la prochaine fois
            onAuxClick={handleRefreshLink} // Gère le clic molette pour la régénération
            aria-label="Play random video"
            title="Play a random video from current results"
            style={{
                width: '2.2rem',
            }}
        />

        <img
            className='theme-icon'
            src='/icons/dice.webp'
            alt="theme"
            style={{
                top: '8px'
            }}
        />
    </div>
  );
}

export default RandomVideoButton;