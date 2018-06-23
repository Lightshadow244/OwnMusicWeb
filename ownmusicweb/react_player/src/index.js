import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import PropTypes from "prop-types";
import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";

AvailableDatalist.propTypes = {
  songs: PropTypes.array.isRequired
};


class AvailableDatalist extends React.Component {
   AvailableDatalist(props) {
    return(
      <div>{props.all_songs.map(c => <div><div>c.name</div> <div>c.album</div></div> )}</div>
    )
  }
  render() {
    {/*return(<div>{this.props.songs[0]['name']}</div>)*/}
    return(<div>{this.props.songs['name']}</div>)
  }
}

AvailableDatalist.propTypes = {
  songs: PropTypes.array.isRequired
};

class SongBoard extends React.Component {
state = {
  songs: [0:{name:"none", album:"none"}]
};

componentDidMount() {
  axios
  .get("http://192.168.1.107:8000/song/")
  .then(response => {
    const songs = response.data.map(c => {
      return{
        name: c.name,
        album: c.album
      };
    });

    const newState = Object.assign({}, this.state, {
          songs: songs
        });

    this.setState(newState);
    console.log(this.state.songs[0])

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
          <AvailableDatalist songs={this.state.songs}/> {/*songs={this.state.contacts}*/}
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
