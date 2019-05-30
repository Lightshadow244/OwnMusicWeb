import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './bootstrap.css';
import './index.css';
import IcoPlus from 'react-icons/lib/ti/plus';
import IcoPlay from 'react-icons/lib/ti/notes';

//import PropTypes from "prop-types";
import ReactAudioPlayer from 'react-audio-player';
import fetch from 'isomorphic-fetch';

//var database = window.location.hostname
var database = "192.168.178.39"
var header = {}

//====================================================

//contains list of songs/albums/playlist, currentPlaylist, Queue
class SongBoard extends React.Component {
  constructor(props) {
    super(props);
	}

  render() {
    var r

    //var for songs
    var table
    var tableValues

    //var for albums

    //var for playlists
    var currentPlaylist
    var currentPlaylistName

    //set list of avaiable songs/albums/playlists
    switch(this.props.sbStatus){
      case 0:
        tableValues = this.props.songs.map(c => {
          return(
            <tr key={c.id}>
              <td>{c.songName}</td>
              <td>{c.album}</td>
              <td>{c.author}</td>
            </tr>
          )
        })

        table =
          <tbody>
            <tr>
              <th>Name</th>
              <th>Album</th>
              <th>Author</th>
            </tr>
            {tableValues}
          </tbody>
        break;
    }

    //set currentPlaylist
    if(this.props.currentPlaylist !== undefined) {
      currentPlaylist = this.props.currentPlaylist[0].map(c => {
        return(
          <tr key={c.id}>
            <td>{c.songName}</td>
          </tr>
        )
      })
      currentPlaylistName = this.props.currentPlaylist[2]
    }

    r =
      <div className="row">
        <div className="col-sm-8">
          <table className="table table-striped table-bordered fit">
            {table}
          </table>
        </div>
        <div className="col-sm-4">
          <table className="table table-striped table-bordered fit h-50">
            <tbody>
              <tr>
                <th>CurrentPlaylist: {currentPlaylistName}</th>
              </tr>
              {currentPlaylist}
            </tbody>
          </table>
          <div className ="h-50">
            Queue
          </div>
        </div>
      </div>
    return(r)
  }
}

//=============================================

//contains the player
class Player extends React.Component {
  constructor(props) {
    super(props);
	}

  render() {
    var r
    r = <div>
              <ReactAudioPlayer src={""} controls />
            </div>;
    return(r)
  }
}

//=============================================

//contains the root
class Site extends React.Component {
	constructor(props) {
    super(props);
    this.state={songs: [{name:"none", album:"none", author:"none"}],
      sbStatus: 0
    }
    this.getSongs(0)
    this.getPlaylist(1)
	}

  // get all songs, if ALbumID=0 get all songs, if ALbumID!=0 get songs of one album
  getSongs(AlbumID){
    if(AlbumID === 0)
      fetch("http://" + database + ":8000/song/", {
        method:'GET',
        headers: header
      }).then(results => {
        return results.json()
      }).then(data => {
        const data_list = data.map(c => {
          return{
            typ: 1,
            id: c.id,
            songName: c.name,
            album: c.album,
            author: "c.author",
            date: "c.release_date"
          };
        });
        const newState = Object.assign({}, this.state, {
             songs: data_list
       });
       this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  //get all Songs from a Playlist
  getPlaylist(playlistID){
    fetch("http://" + database + ":8000/playlist/" + playlistID + "/", {
      method:'GET',
      headers: header
    }).then(results => {
      return results.json()
    }).then(data => {
      const data_list = data.songlist.map(c => {
        return{
          typ: 2,
          id: c.id,
          songName: c.name
        };
      });
      const newState = Object.assign({}, this.state, {
           currentPlaylist: [data_list, data.id, data.name]
     });
     this.setState(newState);
    })
    .catch(error => console.log(error));
  }

  render() {
    var playlist
    var currentSongPositon
    if(this.state !== null){
      playlist = this.state.currentPlaylist
      currentSongPositon = this.state.currentSongPositon
    }
    return (
      <div className="site">
        <div className="player">
          <Player playlist={playlist} currentSongPositon={currentSongPositon}  />
        </div>
        <div>
          <SongBoard getSongs={this.getSongs.bind(this)} songs={this.state.songs} sbStatus={this.state.sbStatus} currentPlaylist={this.state.currentPlaylist}  />
        </div>
      </div>
    )
  }
}

// ===================================================

ReactDOM.render(
  <Site />,
  document.getElementById('root')
);
