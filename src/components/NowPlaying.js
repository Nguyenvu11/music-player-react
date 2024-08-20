import React, { useState, useRef, useEffect } from 'react';
import musicData from '../musicData';
import { FaPlay, FaPause, FaBackward,FaShuffle, FaRepeat, FaForward } from 'react-icons/fa6';


const nowPlayingStyle = {
  width: '35%',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  textAlign: 'left',
  position: 'relative',
  marginTop: '20px'
};

const songInfoStyle = {
  textAlign: 'center'
};

const progressBarStyle = {
  width: '100%',
  margin: '20px 0',
  display: 'flex',
  alignItems: 'center'
};

const controlsStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px',
  gap: '15px'
};

const playbackButtonStyle = {
  backgroundColor: 'white',
  borderRadius: '50%',
  padding: '10px',
  color: '#007bff',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  cursor: 'pointer'
};

const playbackButtonHoverStyle = {
  backgroundColor: 'white'
};

const imgStyle = {
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  marginBottom: '20px',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  transition: 'transform 0.5s linear'
};

function NowPlaying({ currentSong, onNext, onPrevious }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [rotation, setRotation] = useState(0); // State to handle rotation angle

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    // Reset playback when the song changes
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setRotation(0); // Reset rotation when changing songs
    }
  }, [currentSong]);

  useEffect(() => {
    // Update rotation angle based on current time and song duration
    let rotationInterval;
    if (isPlaying) {
      rotationInterval = setInterval(() => {
        setRotation(prevRotation => prevRotation + 2); // Increase rotation angle over time
      }, 100); // Update every 100ms for smoother effect
    }
    return () => clearInterval(rotationInterval);
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div style={nowPlayingStyle}>
      <h2>Now Playing</h2>
      <p>{musicData.length} Items on the list</p>
      <img
        src={currentSong?.albumCover}
        alt={currentSong?.title}
        style={{ 
          ...imgStyle,
          transform: `rotate(${rotation}deg)` // Apply rotation transform
        }}
      />
      <div style={songInfoStyle}>
        <h3>{currentSong?.title}</h3>
        <p>{currentSong?.artist}</p>
      </div>
      <div style={progressBarStyle}>
        <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
        <input 
          type="range" 
          min="0" 
          max={audioRef.current?.duration || 0} 
          value={currentTime} 
          onChange={handleProgressChange} 
          style={{ flexGrow: 1, margin: '0 10px' }}
        />
        <span>{Math.floor(audioRef.current?.duration / 60)}:{Math.floor(audioRef.current?.duration % 60).toString().padStart(2, '0')}</span>
      </div>
      <div style={controlsStyle}>
        <button><FaShuffle /></button>
        <button onClick={onPrevious}><FaBackward /></button>
        <button 
          onClick={togglePlayPause} 
          style={playbackButtonStyle}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = playbackButtonHoverStyle.backgroundColor}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={onNext}><FaForward /></button>
        <button><FaRepeat /></button>
      </div>
      <audio 
        ref={audioRef} 
        src={currentSong?.audioSrc} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />
    </div>
  );
}

export default NowPlaying;
