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
          if(this.props.songs !== undefined){
          tableValues = this.props.songs.map(c => {
            return(
              <tr key={c.id}>
                <td>{c.songName}</td>
                <td>{c.album}</td>
                <td>{c.author}
                  <div className="float-right">
                    <button type="button" className="btn btn-secondary btn-sm" onClick={this.props.playSong.bind(this, c.id, this.props.songs)} value={c.id}><IcoPlay /></button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={this.props.playSong.bind(this, c.id)} value={c.id}><IcoPlus /></button>
                  </div>
                </td>
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
          }
        break;
      case 1:
        if(this.props.albums !== undefined){
          tableValues = this.props.albums.map(c => {
            return(
              <tr key={c.id}>
                <td>{c.albumName}</td>
                <td>{c.date}</td>
                <td>{c.author}</td>
              </tr>
            )
          })

          table =
            <tbody>
              <tr>
                <th>Name</th>
                <th>Datum</th>
                <th>Author</th>
              </tr>
              {tableValues}
            </tbody>
          break;
        }
      case 2:
        if(this.props.playlists !== undefined){
          tableValues = this.props.playlists.map(c => {
            return(
              <tr key={c.id}>
                <td>{c.playlistName}</td>
                <td>{c.preview}</td>
              </tr>
            )
          })

          table =
            <tbody>
              <tr>
                <th>Name</th>
                <th>Preview</th>
              </tr>
              {tableValues}
            </tbody>
          break;
        }
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

    //set currentqueue

    r =
      <div>
        <div className="row">
          <div className="btn-group btn-group-toggle col-sm-8" data-toggle="buttons">
            <label className="btn btn-secondary active" onClick={this.props.renderSongs.bind(this)}>
              <input type="radio" name="options" id="option1" autoComplete="off" />
                Songs
            </label>
            <label className="btn btn-secondary" onClick={this.props.renderAlbums.bind(this)}>
              <input type="radio" name="options" id="option2" autoComplete="off" />
                Album
            </label>
            <label className="btn btn-secondary" onClick={this.props.renderPlaylist.bind(this)}>
              <input type="radio" name="options" id="option2" autoComplete="off" />
                Playlist
            </label>
          </div>
        </div>
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
    console.log(this.props.path)
    if(this.props.path !== undefined){
      console.log(this.props.path)
       r = <div>
                <ReactAudioPlayer src={this.props.path} controls autoPlay onEnded={this.props.playNextSong.bind(this)} />
              </div>;
    }else{
      r=  <div>
            <ReactAudioPlayer src={""} controls />
          </div>;
    }
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

  getAlbums(){
    fetch("http://" + database + ":8000/album/", {
      method:'GET',
      headers: header
    }).then(results => {
      return results.json()
    }).then(data => {
      const data_list = data.map(c => {
        return{
          typ: 2,
          id: c.id,
          albumName: c.name,
          author: c.author,
          date: c.release_date
        };
      });
      const newState = Object.assign({}, this.state, {
           albums: data_list
     });
     this.setState(newState);
    })
    .catch(error => console.log(error));
  }

  getPlaylists(){
    fetch("http://" + database + ":8000/playlist/", {
      method:'GET',
      headers: header
    }).then(results => {
      return results.json()
    }).then(data => {
      const data_list = data.map(c => {

        var pre = ""

        for(var i = 0; i < c.songlist.length; i++){
          if(i === 3) { break; }
          pre = pre + c.songlist[i].name.substring(0, 8) + ", "
        }

        return{
          typ: 3,
          id: c.id,
          playlistName: c.name,
          preview: pre.substring(0, pre.length - 2)
        };
      });
      const newState = Object.assign({}, this.state, {
           playlists: data_list
     });
     this.setState(newState);
    })
    .catch(error => console.log(error));
  }

  //set state with song id which shoul be played
  playSong(SongId, playlist){
    for(var i = 0; i < playlist.length;i++){
      if(playlist[i].id === SongId){
        fetch("http://" + database + ":8000/song/" + SongId + "/", {
            method:'GET',
            headers: header
          }).then(results => {
            return results.json()
          }).then(data => {
            const path = data.audio_file
            const newState = Object.assign({}, this.state, {
                 path: path,
                 currentSongId: SongId,
                 currentPlaylist:[playlist, -1, 'All Songs'],

           });
           this.setState(newState);
          })
          .catch(error => console.log(error));
          this.setState({currentSongPositon: i})
      }
    }

  }

  playNextSong(){
    if(this.state.currentSongPositon + 1 <= this.state.currentPlaylist.length){
      var id = this.state.currentPlaylist[0][this.state.currentSongPositon + 1].id
      console.log(id)
      fetch("http://" + database + ":8000/song/" + id + "/", {
          method:'GET',
          headers: header
        }).then(results => {
          return results.json()
        }).then(data => {
          const path = data.audio_file
          const newState = Object.assign({}, this.state, {
               path: path,
               currentSongId: id
         });
         this.setState(newState);
        })
        .catch(error => console.log(error));
      }
    //this.setState({currentSongId: SongId});
  }

  renderSongs(){
    this.setState({sbStatus: 0});
  }

  renderAlbums(){
    this.setState({sbStatus: 1});
    this.getAlbums()
  }

  renderPlaylist(){
    this.setState({sbStatus: 2});
    this.getPlaylists()
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
          <Player path = {this.state.path} playNextSong = {this.playNextSong.bind(this)} />
        </div>
        <div>
          <SongBoard getSongs={this.getSongs.bind(this)}
            songs={this.state.songs}
            albums={this.state.albums}
            playlists={this.state.playlists}
            sbStatus={this.state.sbStatus}
            currentPlaylist={this.state.currentPlaylist}
            playSong={this.playSong.bind(this)}
            renderSongs={this.renderSongs.bind(this)}
            renderAlbums={this.renderAlbums.bind(this)}
            renderPlaylist={this.renderPlaylist.bind(this)}
          />
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
