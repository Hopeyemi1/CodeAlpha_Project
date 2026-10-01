
import React, { useEffect, useRef, useState } from 'react';

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaMusic,
  FaVolumeDown,
  FaVolumeUp,
  FaHeadphones,
  FaCompactDisc,
} from 'react-icons/fa';

import './App.css';

const songs = [
  {
    title: 'Midnight Dreams',
    artist: 'The Dreamers',
    src: '/music/track-1.mp3',
    color: 'purple',
  },
  {
    title: 'Golden Hour',
    artist: 'Summer Vibes',
    src: '/music/track-2.mp3',
    color: 'orange',
  },
  {
    title: 'Ocean Waves',
    artist: 'Blue Notes',
    src: '/music/track-3.mp3',
    color: 'blue',
  },
];

function formatTime(time) {
  if (!Number.isFinite(time)) return '0:00';

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function App() {
  const audioRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [autoplay, setAutoplay] = useState(true);

  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.load();
    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(previous => !previous);
  };

  const nextSong = () => {
    setCurrentIndex(previous => (previous + 1) % songs.length);
    setIsPlaying(true);
  };

  const previousSong = () => {
    if (audioRef.current && currentTime > 3) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      setCurrentIndex(
        previous => (previous - 1 + songs.length) % songs.length
      );
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    if (autoplay) {
      nextSong();
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleSeek = event => {
    const newTime = Number(event.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolume = event => {
    setVolume(Number(event.target.value));
  };

  const selectSong = index => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="app">
      <div className="music-player">

        <header className="top-bar">
          <div className="brand">
            <FaHeadphones className="brand-icon" />
            <span>Melody</span>
          </div>

          <span className="live-badge">NOW PLAYING</span>
        </header>

        <main className="player-content">

          <p className="section-label">YOUR MUSIC</p>

          <div className={`album-art ${currentSong.color}`}>
            <div className="vinyl">
              <div className="vinyl-center">
                <FaMusic />
              </div>
            </div>

            <FaCompactDisc className="art-decoration" />
          </div>

          <div className="song-info">
            <h1>{currentSong.title}</h1>
            <p>{currentSong.artist}</p>
          </div>

          <audio
            ref={audioRef}
            src={currentSong.src}
            onTimeUpdate={() => {
              if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
              }
            }}
            onLoadedMetadata={() => {
              if (audioRef.current) {
                setDuration(audioRef.current.duration);
              }
            }}
            onEnded={handleEnded}
          />

          <div className="progress-section">
            <input
              type="range"
              className="progress-bar"
              min="0"
              max={duration || 1}
              value={Math.min(currentTime, duration || 1)}
              onChange={handleSeek}
              style={{
                '--progress': `${
                  duration ? (currentTime / duration) * 100 : 0
                }%`,
              }}
              aria-label="Song progress"
            />

            <div className="time-labels">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="controls">
            <button
              className="control-btn"
              onClick={previousSong}
              aria-label="Previous song"
            >
              <FaStepBackward />
            </button>

            <button
              className="play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button
              className="control-btn"
              onClick={nextSong}
              aria-label="Next song"
            >
              <FaStepForward />
            </button>
          </div>

          <div className="volume-section">
            <FaVolumeDown />

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolume}
              aria-label="Volume"
            />

            <FaVolumeUp />
          </div>

          <div className="playlist-heading">
            <h2>Up Next</h2>

            <label className="autoplay">
              <input
                type="checkbox"
                checked={autoplay}
                onChange={event => setAutoplay(event.target.checked)}
              />
              Autoplay
            </label>
          </div>

          <div className="playlist">
            {songs.map((song, index) => (
              <button
                className={`playlist-item ${
                  index === currentIndex ? 'active' : ''
                }`}
                key={song.src}
                onClick={() => selectSong(index)}
              >
                <span className={`mini-art ${song.color}`}>
                  <FaMusic />
                </span>

                <span className="playlist-text">
                  <strong>{song.title}</strong>
                  <small>{song.artist}</small>
                </span>

                <span className="playlist-icon">
                  {index === currentIndex && isPlaying
                    ? <FaPause />
                    : <FaPlay />}
                </span>
              </button>
            ))}
          </div>

        </main>

        <footer>
          Made with <span>♥</span> using React
        </footer>

      </div>
    </div>
  );
}

export default App;

