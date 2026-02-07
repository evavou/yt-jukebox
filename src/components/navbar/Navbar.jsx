// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react'; 
import './Navbar.css'
import ThemeToggle from './ThemeToggle';

function Navbar({ searchQuery, onSearchChange, videoCount, noAdsEnabled, setNoAdsEnabled }) {

  return (
    <nav className="navbar noise">

        {/* Barre de recherche */}
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search videos"
            />
            {searchQuery && (
                <button
                    className="clear-search-btn"
                    onClick={() => onSearchChange('')}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>

        {/* Compteur de vidéos */}
        <div className="video-count">
            videos : {videoCount}
        </div>
        
        {/* Toggle de thème */}
        <ThemeToggle/>

        {/* No Ads */}
        <div className="navbar-button-wrapper tooltip-wrapper">
            <button className={`navbar-button no-ads ${!noAdsEnabled ? 'active' : ''}`}>
                {noAdsEnabled ? "No Ads" : "Ads"}
            </button>
            
            <div className="tooltip-content">
                <p>Tweaks the youtube url to remove ads</p>
                <button 
                    className="toggle-ads-btn"
                    onClick={() => setNoAdsEnabled(!noAdsEnabled)}
                    style={{
                        backgroundColor: noAdsEnabled ? 'var(--selected-tag-color)' : 'var(--selected-tag-color-dark)',
                        boxShadow: noAdsEnabled ? '0 0 15px var(--selected-tag-color)' : 'none',
            }}
                >
                    {noAdsEnabled ? "Enabled" : "Disabled"}
                </button>
            </div>
        </div>


        {/*About*/}
        <button 
            className="navbar-button-wrapper navbar-button"
            aria-label={"About"}
        >
            About
        </button>
    </nav>
  );
}

export default Navbar;