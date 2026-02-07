// src/App.jsx
import React, { useState, useMemo } from 'react';
import { getTagColor, getLightTagColor, getDarkTagColor } from './styles/colors.js';
import videos from './data/videos.js';
import { useFilteredVideos } from './hooks/useFilteredVideos.js';
/*COMPONENTS*/
import CardsGrid from './components/main_content/CardsGrid.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Navbar from './components/navbar/Navbar.jsx';
/*CSS*/
import './styles/themes.css'
import './App.css';


function App() {
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [noAdsEnabled, setNoAdsEnabled] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState('every channel');
  const [durationRange, setDurationRange] = useState({ min: 0, max: Infinity });
  
  const allTags = ['all', 'house', 'energy', 'jazz', 'chill', 'lofi', 'peace', 'ambient', 'ost',
                  'games', 'nintendo', 'japan', 'wtf', 'french'];

  const allChannels = ['every channel', 'utopic dreamer', 'rain and dirt', 'gesus8', 'ambient2k',
                  'denz1000', 'vanille', 'alf', 'other'];
  
  const tagColor = getTagColor(selectedTag);

  // Utilisez le hook
  const filteredVideos = useFilteredVideos({
    videos,
    selectedTag,
    selectedChannel,
    searchQuery,
    durationRange,
    allChannels
  });


  return (
    <div
      className="app-container"
      style={{
        '--selected-tag-color': tagColor,
        '--selected-tag-color-light': getLightTagColor(tagColor),
        '--selected-tag-color-dark': getDarkTagColor(tagColor)
      }}
    >
      <Sidebar 
        allTags={allTags}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        allChannels={allChannels}
        selectedChannel={selectedChannel}
        onChannelChange={setSelectedChannel}
        videos={videos}
        onDurationChange={setDurationRange}
      />

      <div className="main-wrapper">
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          videoCount={filteredVideos.length}
          noAdsEnabled={noAdsEnabled}
          setNoAdsEnabled={setNoAdsEnabled}
        />

        <div className="main-content noise">
          <CardsGrid 
            videos={filteredVideos}
            selectedTagColor={getTagColor(selectedTag)}
            onTagClick={setSelectedTag}
            noAdsEnabled={noAdsEnabled}
          />
        </div>
      </div>
    </div>
  );
}

export default App;