import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import PropTypes from "prop-types";
import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";

class AvailableDatalist extends React.Component {
  render() {
    console.log("props during render songs")
    console.log(this.props)
    var ret = []
    if(this.props.song_set[0] !== 0){
      ret = this.props.song_set.map(c =>
        <tr>
          <td className="listenEintrag">{c.songName[0]}</td>
          <td className="listenEintrag">{c.album}</td>
          <td className="listenEintrag">{c.author}</td>
          <td className="listenEintrag">{c.date}</td>
        </tr>
      )
    }else{
      ret[0] = "loading..."
    }
    console.log("ret nach bearbeitung")
    console.log(ret)
    return(
      <table>
        <tbody>
          <tr>
            <th>Songname</th>
            <th>Album</th>
            <th>Author</th>
            <th>Date</th>
          </tr>
          {ret}
        </tbody>
      </table>
    )
  }
}

AvailableDatalist.propTypes = {
  song_set: PropTypes.array.isRequired
};

class SongBoard extends React.Component {
state = {
  song_set: [0:{name:"none", album:"none", author:"none"}]
};

componentDidMount() {
	console.log(window.location.hostname)
  axios
  .get("http://192.168.1.107:8000/album/")
  .then(response => {
    const song_set = response.data.map(c => {

      return{
        songName: c.song_set.map(d => {return(d.name)}),
        album: c.name,
        author: c.author,
        date: c.release_date
      };
    });

    const newState = Object.assign({}, this.state, {
          song_set: song_set
    });
    this.setState(newState);
    console.log("state after api request")
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
          <AvailableDatalist song_set={this.state.song_set}/> {/*songs={this.state.contacts}*/}
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
