// src/Sidebar.jsx
import { useState } from 'react';
import Logo from './Logo';
import TagFilter from './TagFilter';
import DurationFilter from './DurationFilter';
import './Sidebar.css'


function Sidebar({ 
  allTags, 
  selectedTag, 
  onTagChange, 
  allChannels, 
  selectedChannel, 
  onChannelChange,
  videos,
  onDurationChange 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (channel) => {
    onChannelChange(channel);
    setIsOpen(false);
  };

  return (
    <div className="sidebar noise">
      <div className="sidebar-content">
        <Logo
        selectedTag={selectedTag}
        />

        <div className="text-subsection">
          The best youtube playlists,
          all in one place
        </div>
        
        {/* Dropdown channel */}
        <div className="channel-selector-wrapper dropdown"> 
          <button 
            className={`btn custom-dropdown-toggle dropdown-toggle ${isOpen ? 'show' : ''}`}
            type="button" 
            onClick={toggleDropdown}
            aria-expanded={isOpen}
          >
            {selectedChannel}
          </button>

          <ul className={`dropdown-menu custom-dropdown-menu ${isOpen ? 'show' : ''}`}>
            {allChannels.map(channel => (
              <li key={channel}>
                <button 
                  className={`dropdown-item custom-dropdown-item ${channel === selectedChannel ? 'active' : ''}`}
                  type="button"
                  onClick={() => handleSelect(channel)}
                >
                  {channel}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Conteneur pour DurationFilter et Tags côte à côte */}
        <div className="filters-row">

          <DurationFilter 
            videos={videos}
            onDurationChange={onDurationChange}
          />
          
          <TagFilter
            allTags={allTags}
            selectedTag={selectedTag}
            onTagChange={onTagChange}
          />

        </div>
      </div>
    </div>
  );
}

export default Sidebar;