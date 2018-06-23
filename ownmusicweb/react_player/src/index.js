import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactAudioPlayer from 'react-audio-player';

class SongBoard extends React.Component {
  render() {
    return(
      <h1>hello</h1>
    )
  }
}

class Player extends React.Component {
  render() {
    return(
      <ReactAudioPlayer
        src="my_audio_file.ogg"
        autoPlay
        controls
      />
    )
  }
}

class Site extends React.Component {
  render() {
    return (
      <div className="site">
        <div className="player">
          <Player />
        </div>
        <div className="song-board">
          <SongBoard />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Site />,
  document.getElementById('root')
);
