// src/App.jsx
import React, { useState } from 'react';
import VideoGrid from './components/CardsGrid'; // Importer le nouveau composant
import videos from './data/videos';
import './App.css';

function App() {
  const [selectedTag, setSelectedTag] = useState('tous');
  
  const allTags = ['tous', ...new Set(videos.flatMap(video => video.tags))];
  
  const filteredVideos = selectedTag === 'tous' 
    ? videos 
    : videos.filter(video => video.tags.includes(selectedTag));

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5 fw-bold">playlist of playlists</h1>
        <p className="lead">Toutes mes musiques préférées en un seul endroit</p>
      </header>
      
      {/* Filtre par tags */}
      <div className="mb-4">
        <div className="d-flex align-items-center">
          <label htmlFor="tagFilter" className="me-2 fw-medium">
            Filtrer par tag :
          </label>
          <select 
            id="tagFilter"
            className="form-select w-auto"
            value={selectedTag} 
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            {allTags.map(tag => (
              <option key={tag} value={tag}>
                {tag === 'tous' ? 'Toutes les vidéos' : `#${tag}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Compteur de résultats */}
      <div className="alert alert-light mb-3">
        <i className="bi bi-music-note me-2"></i>
        {filteredVideos.length} vidéo{filteredVideos.length > 1 ? 's' : ''} trouvée{filteredVideos.length > 1 ? 's' : ''}
        
        {/* Afficher le nombre de colonnes calculées */}
        {filteredVideos.length > 0 && (
          <span className="ms-3 text-muted">
            <small>
              (Affichage optimal: {Math.min(filteredVideos.length, 4)} par ligne)
            </small>
          </span>
        )}
      </div>
      
      {/* Nouvelle grille dynamique */}
      <VideoGrid 
        videos={filteredVideos}
        cardWidth={200}  // Largeur de vos cartes
        minGap={10}      // Espacement minimum entre les cartes (en px)
        maxCardsPerRow={10} // Maximum de cartes par ligne
      />
      
      {/* Message si pas de résultats */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-5">
          <div className="display-1 mb-3">🎵</div>
          <h3>Aucune vidéo trouvée</h3>
          <p className="text-muted">Essayez avec un autre tag</p>
        </div>
      )}
      
      <footer className="mt-5 pt-4 border-top text-center text-muted">
        <p>
          Créé avec React et Bootstrap • 
          Les vidéos sont hébergées sur YouTube
        </p>
      </footer>
    </div>
  );
}

export default App;