import React, { useState } from 'react';
import MostPopular from './components/MostPopular';
import NowPlaying from './components/NowPlaying';
import musicData from './musicData';

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px',
  height: '100vh'
};

function App() {
  const [currentSong, setCurrentSong] = useState(musicData[0]);

  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

  const handleNext = () => {
    const currentIndex = musicData.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % musicData.length;
    setCurrentSong(musicData[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = musicData.findIndex(song => song.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + musicData.length) % musicData.length;
    setCurrentSong(musicData[previousIndex]);
  };

  return (
    <div style={containerStyle}>
      <MostPopular onSongSelect={handleSongSelect} />
      <NowPlaying currentSong={currentSong} onNext={handleNext} onPrevious={handlePrevious} />
    </div>
  );
}

export default App;
