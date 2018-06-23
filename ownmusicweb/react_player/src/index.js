import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";

class AvailableDatalist extends React.Component {
   AvailableDatalist(props) {
    return(
      <div>{props.all_songs.map(c => <div><div>c.name</div> <div>c.album</div></div> )}</div>
    )

  }
  AvailableDatalist.propTypes = {
  songs: PropTypes.array.isRequired
};
}

class SongBoard extends React.Component {
componentDidMount() {
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


  })
  .catch(error => console.log(error));
}

  render() {
    console.log(this.state);
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
          <AvailableDatalist /> /*songs={this.state.contacts}*/
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
