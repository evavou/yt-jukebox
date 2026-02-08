import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './AboutButton.css';

function AboutButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClick = (e) => e.stopPropagation();

  // On crée le contenu de la modale dans une variable
  const modalContent = (
    <div className="about-overlay" onClick={() => setIsOpen(false)}>
      <div className="about-modal noise" onClick={handleModalClick}>
        <button className="close-modal-btn" onClick={() => setIsOpen(false)}>
          &times;
        </button>
   
        <div className="about-text">
          <h2>Welcome to fabulous</h2>
        </div>
        <div className="about-image-container">
          <img 
            src="/logo/logo_right_text_small_dark_all.webp"
            alt="About Logo"
          />
        </div>
        <div className="about-text">
          <p>A place to acess the best<strong> youtube playlists</strong> to </p>
          <p>chill/relax/...</p>
        </div>
      </div>
    </div>
  );

  const tempAbout = (
        <div className="about-overlay" onClick={() => setIsOpen(false)}>
      <div className="about-modal noise" onClick={handleModalClick}>
        <button className="close-modal-btn" onClick={() => setIsOpen(false)}>
          &times;
        </button>
        <p>A bout :</p>
        <div className="about-image-container">
            
          <img 
            src="/img/bout.webp"
            alt="About Logo"
          />
        </div>
      </div>
    </div>
  );


  return (
    <>
      <button className="navbar-button" onClick={() => setIsOpen(true)}>
        About
      </button>

      {isOpen && createPortal(tempAbout, document.body)}
    </>
  );
}

export default AboutButton;