import React, { useState } from 'react';
import musicData from '../musicData';
import { MdFavoriteBorder } from 'react-icons/md';
import {FaPlay} from 'react-icons/fa6'
import { FaHeart } from 'react-icons/fa'; // Sử dụng icon tim từ Font Awesome


const mostPopularStyle = {
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '15px'
};

const songItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: 'white',
  borderRadius: '10px',
  marginBottom: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

const songItemHoverStyle = {
  backgroundColor: '#f0f0f0',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
};

const albumCoverStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '5px',
  marginRight: '30px'
};

const songInfoStyle = {
  flexGrow: 1,
  marginLeft: '30px'
};

const songTitleStyle = {
  fontWeight: 'bold',
  margin: '0',
  color: '#333',
  fontSize: '16px'
};

const songArtistStyle = {
  margin: '0',
  color: '#888',
  fontSize: '14px'
};

const likeButtonStyle = {
  fontSize: '20px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: 'color 0.3s ease',
  marginLeft: '30px'
};

const likedStyle = {
  color: '#ff4b5c'
};

const notLikedStyle = {
  color: '#000'
};

function MostPopular({ onSongSelect }) {
  const [likedSongs, setLikedSongs] = useState({});

  const toggleLike = (id) => {
    setLikedSongs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div style={mostPopularStyle}>
      <h2>Most Popular</h2>
      <p>{musicData.length} Songs</p>
      <ul>
        {musicData.map((song, index) => (
          <li
            key={song.id}
            style={songItemStyle}
            onClick={() => onSongSelect(song)}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = songItemHoverStyle.backgroundColor;
              e.currentTarget.style.boxShadow = songItemHoverStyle.boxShadow;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'white';
              e.currentTarget.style.boxShadow = songItemStyle.boxShadow;
            }}
          >
            <span style={{ marginRight: '80px' }}>{String(index + 1).padStart(2, '0')}</span>
            <div onClick={(e) => {
              e.stopPropagation();
              onSongSelect(song);
            }} style={{ marginRight: '80px' }}>
              <span><FaPlay/></span>
            </div>
            <img src={song.albumCover} alt={song.title} style={albumCoverStyle} />
            <div style={songInfoStyle}>
              <p style={songTitleStyle}>{song.title}</p>
              <p style={songArtistStyle}>{song.artist}</p>
            </div>
            <span style={{ marginLeft: '80px' }}>{song.duration}</span>
            <button
              style={{
                ...likeButtonStyle,
                ...(likedSongs[song.id] ? likedStyle : notLikedStyle)
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(song.id);
              }}
            >
                {likedSongs[song.id] ? <FaHeart style={{ color: 'red' }} /> : <MdFavoriteBorder />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostPopular;
