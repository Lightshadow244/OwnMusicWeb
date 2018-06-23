import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";

class availableDatalist extends React.Component {
   availableDatalist(props) {
    return(
      <div>{props.all_songs.map(c => <div><div>c.name</div> <div>c.album</div></div> )}</div>
    )

  }
}

class SongBoard extends React.Component {
getAllSongs() {
  axios
  .get("http://localhost:8000/song/")
  .then(response => {
    const songs = response.data.map(c => {
      return{
        name: c.name,
        album: c.album
      };

    });



    const newState = Object.assign({}, this.state, {
          all_songs: songs
        });

    this.setState(newState);
    console.log(this.state)

  })
  .catch(error => console.log(error));
}

  render() {
    return(
      <div>
        <div className="table">
          <div className="directory">
            <button className="song">
              Song
            </button>
            <button className="album">
              Album
            </button>
          </div>
          <availableDatalist />//songs={this.state.songs} />
        </div>
        <div className="playlist">
        </div>
      </div>
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
