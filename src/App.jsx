// src/App.jsx
import React, { useState, useMemo } from 'react';
import { getTagColor, getLightTagColor, getDarkTagColor } from './styles/colors.js';
import videos from './data/videos.js';
import { useFilteredVideos } from './hooks/useFilteredVideos.js';
import { useSortedVideos } from './hooks/useSortedVideos.js';
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
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
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

  const sortedVideos = useSortedVideos(filteredVideos);


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
        hiddenSidebar={hiddenSidebar}
      />

      <div className={`main-wrapper ${hiddenSidebar ? 'sidebar-hidden' : ''}`}>
        <Navbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          videoCount={sortedVideos.length}
          noAdsEnabled={noAdsEnabled}
          setNoAdsEnabled={setNoAdsEnabled}
          hiddenSidebar={hiddenSidebar}
          setHiddenSidebar={setHiddenSidebar}
          videos={sortedVideos}
        />

        <div className="main-content noise">
          <CardsGrid 
            videos={sortedVideos}
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