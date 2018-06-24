import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import PropTypes from "prop-types";
import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";

class AvailableDatalist extends React.Component {

  render() {
    {/*var songArray = []
    for (var i = 0; i < this.props.songs.length; i++) {
      songArray.push(
        <div>{this.props.songs[i]['name']}</div>
      )
    }
      console.log(songArray)*/}
        {/*return(<div>{songArray</div>)*/}
        return(<div>test</div>)
  }
}

AvailableDatalist.propTypes = {
  songs: PropTypes.array.isRequired
};

class SongBoard extends React.Component {
state = {
  songs: [0:{name:"none", album:"none", author:"none"}]
};

componentDidMount() {
  axios
  .get("http://192.168.1.107:8000/album/")
  .then(response => {
    const songs = response.data.map(c => {
      console.log(c)
      return{
        songName: c.songs[].name,
        album: c.name,
        author: c.author,
        date: c.release_date
      };
    });
    const newState = Object.assign({}, this.state, {
          songs: songs
    });
    this.setState(newState);


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
