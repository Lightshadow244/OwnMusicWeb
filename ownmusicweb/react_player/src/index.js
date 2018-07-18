import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './bootstrap.css';
import './index.css';

//import PropTypes from "prop-types";
import ReactAudioPlayer from 'react-audio-player';
import fetch from 'isomorphic-fetch';

class Alert extends React.Component {

  render(){
    var alertText = []
    alertText = <div className="alert alert-dismissible alert-success" hidden={this.props.hidden}>
      <button type="button" className="close" onClick={this.props.hideAlert.bind(this)}>&times;</button>
      <strong>{this.props.alertText}</strong>
    </div>
    return(alertText)
  }
}

class BootsModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {alertText: "",hidden: true};
  }

  hideAlert(){
    this.setState({alertText: "",hidden: true})
    console.log("hide")
  }
  setAlert(s){
    this.setState({alertText: s,hidden: false})
  }

  addToPlaylist(c){
    var data = JSON.stringify({"playlist_id": c.target.value, "song_id": this.props.id})
    var header = {'Authorization': 'Basic YWRtaW46K2RhcmtvcmJpdDk5', 'Content-Type': 'application/json'}
    console.log("hello from addtoplaylist")
    console.log(data)
    fetch("http://" + window.location.hostname + ":8000/api/addToPlaylist/", {
  	  method: 'PUT',
  	  headers: header,
  	  body: data
  	}).then(response => {
      console.log(response)
      console.log("data")
      console.log(data)
      console.log(JSON.parse(data)['playlist_id'])
      this.setAlert(JSON.parse(data)['playlist_id'])
    }).catch(error => console.log(error));
  }

  render(){
    var list = []
    if(this.props.typ===0){
      console.log("Hello from Bootsmodal")
      console.log(this.props)
      list = this.props.modalList.map(c => {
        return(
          <tr key={c.id}>
            <td>{c.name}</td>
            <td className="fit"><button onClick={this.addToPlaylist.bind(this)} value={c.id}>add</button></td>
          </tr>
        )
      })
    }/*else if(this.props.typ === 1){
      console.log("album in modal")
      list = this.props.modalList.map(c => {
        return(
          <tr key={c.id}>
            <td>{c.name}</td>
            <td className="fit"><button>add</button></td>
          </tr>
        )
      })
    }*/

    return(
      <div className="modal" id="myModal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <table className="table table-striped table-bordered fit">
                <tbody>
                  <tr>
    		            <th>Playlist</th>
    		          </tr>
                  {list}
                </tbody>
              </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
          <Alert alertText={this.state.alertText} hidden={this.state.hidden} hideAlert={this.hideAlert.bind(this)}/>
        </div>
      )
  }
}

class CurrentPlaylist extends React.Component {
  render(){
    var r = []
    var tableValues = []
    //console.log("playlist and props")
    //console.log(this.props.playlist)
    //console.log(this.props)

    if(this.props.playlist !== undefined && this.props.playlist.length >= 0){
      tableValues = this.props.playlist.map(c =>{
				var r2 = []

				if(this.props.currentSongId === c.id){
					r2 = <tr key={c.id} className="table-dark">
	          <td className="listenEintrag h6">{c.name}</td>
	        </tr>
				}else{
					r2 = <tr key={c.id}>
	          <td className="listenEintrag h6">{c.name}</td>
	        </tr>
				}

        return(r2)
      })

      r=<div className="right-block">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">
              Current Playlist
            </div>
            <div className="card-body">
              <table className="table table-bordered fit">
                <tbody>
                {tableValues}

                </tbody>
              </table>
            </div>
          </div>
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">
              Queue
            </div>
            <div className="card-body">

            </div>
          </div>
        </div>
    }else{
      r=<div className="right-block">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">
              Current Playlist
            </div>
            <div className="card-body">
              <table className="table table-striped table-bordered fit">
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">
              Queue
            </div>
            <div className="card-body">
            </div>
          </div>
        </div>

    }

    return(r)
  }
}

class AvailableDatalist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChangePlaylist(event){
    this.setState({value: event.target.value});
  }

  createPlaylist(){
    var data = JSON.stringify({"name": this.state.value})
    var header = {'Authorization': 'Basic YWRtaW46K2RhcmtvcmJpdDk5', 'Content-Type': 'application/json'}

    fetch("http://" + window.location.hostname + ":8000/playlist/", {
  	  method: 'POST',
  	  headers: header,
  	  body: data
  	}).then(response => {
      //console.log(response)
      this.props.renderPlaylist()
    }).catch(error => console.log(error));
  }

setPlaylist(c){
  var header = {'Authorization': 'Basic YWRtaW46K2RhcmtvcmJpdDk5',}
  fetch("http://" + window.location.hostname + ":8000/playlist/" + c.target.value, {
    method:'GET',
    headers: header
  }).then(results => {
    return results.json()
  }).then(data => {
    const currentPlaylist = data.songlist.map(c => {
      return{
          name: c.name,
          id: c.id
      };
    });
    this.props.setPlaylistState(currentPlaylist);
    this.props.setSongInState(currentPlaylist, 0);

  })
  .catch(error => console.log(error));



}

  render() {
    //console.log("props during render songs")
    //console.log(this.props)
    var tableValues = []
		var r = []
    if(this.props.data_list.length !== 0){
			if(this.props.data_list[0]['typ'] === 0){
        //album
				tableValues = this.props.data_list.map(c =>
	        <tr key={"row-" + c.album}>
	          <td className="listenEintrag">{c.album}</td>
	          <td className="listenEintrag">{c.author}</td>
	          <td className="listenEintrag">{c.date}</td>
	        </tr>
				)
				r =
					<table className="table table-striped table-bordered fit">
		        <tbody>
		          <tr>
		            <th>Album</th>
		            <th>Author</th>
		            <th>Date</th>
		          </tr>
		          {tableValues}
		        </tbody>
		      </table>

			}else if(this.props.data_list[0]['typ'] === 1){
				//song
				tableValues = this.props.data_list.map(c =>
	        <tr key={"row-" + c.id}>
	          <td className="listenEintrag">{c.songName}</td>
	          <td className="listenEintrag">{c.album}</td>
	          <td className="listenEintrag">{c.author}</td>
	          <td className="listenEintrag">{c.date}</td>
            <td className="fit"><button onClick={this.props.showBootsModal.bind(this, c.id, 0)} data-toggle="modal" data-target="#myModal">add</button></td>
	        </tr>
	      )
				r =
          <div>
  					<table className="table table-striped table-bordered fit">
  		        <tbody>
  		          <tr>
  		            <th>Songname</th>
  		            <th>Album</th>
  		            <th>Author</th>
  		            <th>Date</th>
  		          </tr>
  		          {tableValues}
  		        </tbody>
  		      </table>
          </div>
			}else if(this.props.data_list[0]['typ'] === 2){
				//Playlist
				tableValues = this.props.data_list.map(c =>
	        <tr key={c.id}>
	          <td className="listenEintrag">{c.name}</td>
	          <td className="listenEintrag">{c.songs} </td>
            <td className="fit"><button onClick={this.setPlaylist.bind(this) } value={c.id}>play</button></td>
	        </tr>
	      )
				r =
          <div>
  					<table className="table table-striped table-bordered fit">
  		        <tbody>
  		          <tr>
  		            <th>Playlist</th>
  		            <th>Songs</th>
                  <th></th>
  		          </tr>
  		          {tableValues}
  		        </tbody>
  		      </table>
            <div className="container-fluid">
              <div className="row">
                <div className="col form-group">
                  <input type="text" className="form-control" id="createNewPlaylist" aria-describedby="newPlaylist" placeholder="new Playlist" value={this.state.value} onChange={this.handleChangePlaylist.bind(this)}/>
                  <small id="emailHelp" className="form-text text-muted">Create new Playlist</small>
                </div>
                <div className="col">
                  <button className="btn btn-primary" onClick={this.createPlaylist.bind(this)}>create</button>
                </div>
              </div>
            </div>

          </div>

      }
    }else{
			//console.log("loading...")
      tableValues[0] = <tr key="loading"><td>loading...</td></tr>

			r =
				<table className="table-striped">
					<tbody>
						{tableValues}
					</tbody>
				</table>
    }

    //console.log("table nach bearbeitung")
    //console.log(table)

    return(r)
  }
}


/*AvailableDatalist.propTypes = {
  song_set: PropTypes.array.isRequired
};*/

class SongBoard extends React.Component {
  constructor(props) {
    super(props);
  	this.state={data_list: [0:{name:"none", album:"none", author:"none"}],modalList:[0:{id:-1}],id: -1, typ: 0};
  }

	/*setCurrentSong(id){
		this.setState={currentSongId: id}
	}*/

  showBootsModal(id, typ, c){
    var header = {'Authorization': 'Basic YWRtaW46K2RhcmtvcmJpdDk5',}

    fetch("http://" + window.location.hostname + ":8000/playlist/", {
      method:'GET',
      headers: header
    }).then(results => {
      return results.json()
    }).then(data => {
      const modalList = data.map(c => {
	      return{
          typ: 2,
          id: c.id,
					name: c.name
	      };
      });

      const newState = Object.assign({}, this.state, {
	          modalList: modalList,
            typ:typ,
            id: id
	    });
	    this.setState(newState);

    })
    .catch(error => console.log(error));
  }

  setPlaylistState(playlist){
    //console.log(playlist)

    const newState = Object.assign({}, this.state, {
          currentPlaylist: playlist
    });
    this.setState(newState)
    //console.log("playlistState")
    //console.log(this.state)
  }

	renderAlbums(){
    var header = {'Authorization': 'Basic YWRtaW46K2RhcmtvcmJpdDk5',}

    fetch("http://" + window.location.hostname + ":8000/album/", {
      method:'GET',
      headers: header
    }).then(results => {
      return results.json()
    }).then(data => {
      console.log("data")
			console.log(data)
      const data_list = data.map(c => {
				return{
					typ: 0,
					album: c.name,
					author: c.author,
					date: c.release_date
				};
      });

			const newState = Object.assign({}, this.state, {
						data_list: data_list
			});
			this.setState(newState);

		})
		.catch(error => console.log(error));
	}

	renderSongs(){
    var header = {'Authorization': 'Basic YWRtaW46K2RhcmtvcmJpdDk5',}

    fetch("http://" + window.location.hostname + ":8000/song/", {
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
           data_list: data_list
     });
     this.setState(newState);
    })
    .catch(error => console.log(error));
	}

  renderPlaylist(){
		//console.log("button was clicked")
		//console.log("current location")
		//console.log(window.location.hostname)
		//console.log("state befor render");
		//console.log(this.state);

    var header = {'Authorization': 'Basic YWRtaW46K2RhcmtvcmJpdDk5',}

    fetch("http://" + window.location.hostname + ":8000/playlist/", {
      method:'GET',
      headers: header
    }).then(results => {
      return results.json()
    }).then(data => {
      const data_list = data.map(c => {
        switch(c.songlist.length){
          case 0:
            var s = ''
            break;
          case 1:
            var s = c.songlist[0]['name'] + ",... "
            break;
          case 2:
            var s = c.songlist[0]['name'] + ", " + c.songlist[1]['name'] + ",... "
            break;
          default:
            var s = c.songlist[0]['name'] + ", " + c.songlist[1]['name'] + ", " + c.songlist[2]['name'] + ",... "
            break;
        }
	      return{
          typ: 2,
          id: c.id,
					name: c.name,
	        songs: s,

	      };
      });
      const newState = Object.assign({}, this.state, {
	          data_list: data_list
	    });
	    this.setState(newState);
    })
    .catch(error => console.log(error));

	}

	componentDidMount() {
		this.renderSongs();
	}

  render() {

    return(
      <div className="table container-fluid">
        <div className="row">
					<div className="col-lg-8 bg-primary">
	          <div className="directory">
							<div className="btn-group btn-group-toggle" data-toggle="buttons">
							  <label className="btn btn-secondary active" onClick={this.renderSongs.bind(this)}>
							    <input type="radio" name="options" id="option1" autoComplete="off" />
										Songs
							  </label>
							  <label className="btn btn-secondary" onClick={this.renderAlbums.bind(this)}>
							    <input type="radio" name="options" id="option2" autoComplete="off" />
										Album
							  </label>
                <label className="btn btn-secondary" onClick={this.renderPlaylist.bind(this)}>
							    <input type="radio" name="options" id="option2" autoComplete="off" />
										Playlist
							  </label>
							</div>
	          </div>
	          <AvailableDatalist data_list={this.state.data_list} setPlaylistState={this.setPlaylistState.bind(this)} setSongInState={this.props.setSongInState.bind(this)} renderPlaylist={this.renderPlaylist.bind(this)} showBootsModal={this.showBootsModal.bind(this)}/> {/*songs={this.state.contacts}*/}
          </div>
					<div className="playlist col-lg-4 bg-primary">
						<CurrentPlaylist playlist={this.state.currentPlaylist} currentSongId={this.props.currentSongId} />
	        </div>
        </div>
        <BootsModal id={this.state.id} typ={this.state.typ} modalList={this.state.modalList}/>
      </div>
    )
  }
}

class Player extends React.Component {
  render() {
    if(this.props.playlist !== undefined && this.props.currentSongPositon < this.props.playlist.length){
      console.log("state in render")
      console.log(this.props)
    //console.log("bitte spiel sound")
			var r = <ReactAudioPlayer src={"http://localhost:8000/player/" + this.props.playlist[this.props.currentSongPositon].id} autoPlay controls onEnded={this.props.nextSongInState(this.props.playlist[this.props.currentSongPositon].id)} />
			//console.log(typeof(this.props.song_id))
    }else{
      var r = <ReactAudioPlayer
        src=""
        autoPlay
        controls
      />
    }
    return(r)
  }
}

class Site extends React.Component {
	constructor(props) {
    super(props);
		this.state={currentSongId: -1};

	}
  nextSongInState(id){
    //console.log("vergleich von playlist und aktueller song")
    //console.log(this.state.currentPlaylist.length)
    //console.log(this.state.currentSongPositon)

    const newState = Object.assign({}, this.state, {
          currentSongPositon: this.state.currentSongPositon + 1,
					currentSongId: id
    });
    this.setState(newState);
  }


  setSongInState(playlist, currentSongPositon){
    //console.log("play song:" + id)
    const newState = Object.assign({}, this.state, {
          currentPlaylist: playlist,
          currentSongPositon: currentSongPositon,
					currentSongId: playlist[currentSongPositon].id
    });
    this.setState(newState);
  }

  render() {
    var playlist
    var currentSongPositon
    if(this.state !== null){
      playlist = this.state.currentPlaylist
      currentSongPositon = this.state.currentSongPositon
    }
		console.log("state in site")
		console.log(this)
    //console.log("site this")
    //console.log(currentSongPositon)

    return (
      <div className="site">
        <div className="player">
          <Player playlist={playlist} currentSongPositon={currentSongPositon} nextSongInState={this.nextSongInState.bind(this)} />
        </div>
        <div>
          <SongBoard setSongInState={this.setSongInState.bind(this)} currentSongId={this.state.currentSongId}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Site />,
  document.getElementById('root')
);
