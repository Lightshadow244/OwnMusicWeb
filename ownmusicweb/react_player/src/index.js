import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './bootstrap.css';
import './index.css';

//import PropTypes from "prop-types";
import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";


class CurrentPlaylist extends React.Component {
  render(){
    var r = []
    var tableValues = []
    console.log("playlist and props")
    console.log(this.props.playlist)
    console.log(this.props)

    if(this.props.playlist !== undefined && this.props.playlist.length >= 0){
      tableValues = this.props.playlist.map(c =>
        <tr key={c.id}>
          <td className="listenEintrag h6">{c.name}</td>
        </tr>
      )

      r=<div className="right-block">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">
              Current Playlist
            </div>
            <div className="card-body">
              <table className="table table-striped fit">
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
              <table className="table table-striped fit">
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
setPlaylist(c){
  axios
  .get("http://" + window.location.hostname + ":8000/playlist/" + c.target.value)
  .then(response => {
    const currentPlaylist = response.data.songlist.map(c => {
      return{
          name: c.name,
          id: c.id
      };
    });
    this.props.setPlaylistState(currentPlaylist);
    this.props.playSong(currentPlaylist[0].id)

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
				//console.log("!!!!!NONAME is not true!!!!")
				tableValues = this.props.data_list.map(c =>
	        <tr key={"row-" + c.songName}>
	          <td className="listenEintrag">{c.songName}</td>
	          <td className="listenEintrag">{c.album}</td>
	          <td className="listenEintrag">{c.author}</td>
	          <td className="listenEintrag">{c.date}</td>
	        </tr>
	      )
				r =
					<table className="table table-striped fit">
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
			}else if(this.props.data_list[0]['typ'] === 2){
				//console.log("!!!!!NONAME is not true!!!!")
        //console.log(this)
				tableValues = this.props.data_list.map(c =>
	        <tr key={c.id}>
	          <td className="listenEintrag">{c.name}</td>
	          <td className="listenEintrag">{c.songs} </td>
            <td className="fit"><button onClick={this.setPlaylist.bind(this) } value={c.id}>play</button></td>
	        </tr>
	      )
				r =
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
	state = {
	  data_list: [0:{name:"none", album:"none", author:"none"}],
	};


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
		//console.log("button was clicked")
		//console.log("current location")
		//console.log(window.location.hostname)
		//console.log("state befor render");
		//console.log(this);
		axios
		.get("http://" + window.location.hostname + ":8000/album/")
		.then(response => {
			const data_list = response.data.map(c => {
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
			//console.log("state after api request")
			//console.log(this.state)

		})
		.catch(error => console.log(error));
	}

	renderSongs(){
		//console.log("button was clicked")
		//console.log("current location")
		//console.log(window.location.hostname)
		//console.log("this befor render");
		//console.log(this);
	  axios
	  .get("http://" + window.location.hostname + ":8000/song/")
	  .then(response => {
	    const data_list = response.data.map(c => {
	      return{
          typ: 1,
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
	    //console.log("state after api request")
	    //console.log(this.state)

	  })
	  .catch(error => console.log(error));
	}
  renderPlaylist(){
		//console.log("button was clicked")
		//console.log("current location")
		//console.log(window.location.hostname)
		//console.log("this befor render");
		//console.log(this);
	  axios
	  .get("http://" + window.location.hostname + ":8000/playlist/")
	  .then(response => {
	    const data_list = response.data.map(c => {
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
	    //console.log("state after api request")
	    //console.log(this.state)

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
							    <input type="radio" name="options" id="option1" autoComplete="off" checked />
										Songs
							  </label>
							  <label className="btn btn-secondary" onClick={this.renderAlbums.bind(this)}>
							    <input type="radio" name="options" id="option2" autoComplete="off" checked/*defaultChecked={this.state.song_set[0].songName === "noName"}*/ />
										Album
							  </label>
                <label className="btn btn-secondary" onClick={this.renderPlaylist.bind(this)}>
							    <input type="radio" name="options" id="option2" autoComplete="off" checked/*defaultChecked={this.state.song_set[0].songName === "noName"}*/ />
										Playlist
							  </label>
							</div>
	          </div>
	          <AvailableDatalist data_list={this.state.data_list} setPlaylistState={this.setPlaylistState.bind(this)} playSong={this.props.playSong.bind(this)}/> {/*songs={this.state.contacts}*/}
					</div>
					<div className="playlist col-lg-4 bg-primary">
						<CurrentPlaylist playlist={this.state.currentPlaylist} />
	        </div>
        </div>
      </div>
    )
  }
}

class Player extends React.Component {
  render() {
    console.log("bitte spiel sound")
    if(this.props.song_id !== undefined){
      var r = <ReactAudioPlayer
        src={"http://localhost:8000/player/" + this.props.song_id}
        autoPlay
        controls
      />
      console.log(typeof(this.props.song_id))
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

  playSong(id){
    console.log("play song:" + id)
    const newState = Object.assign({}, this.state, {
          song_id: id
    });
    this.setState(newState);
  }

  render() {
    var song_id
    if(this.state !== null){
      song_id = this.state.song_id
    }
    console.log(song_id)

    return (
      <div className="site">
        <div className="player">
          <Player song_id={song_id}/>
        </div>
        <div>
          <SongBoard playSong={this.playSong.bind(this)} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Site />,
  document.getElementById('root')
);
