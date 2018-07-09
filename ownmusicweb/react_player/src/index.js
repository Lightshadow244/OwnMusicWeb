import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './bootstrap.css';
import './index.css';

//import PropTypes from "prop-types";
import ReactAudioPlayer from 'react-audio-player';
import axios from "axios";



class AvailableDatalist extends React.Component {
  render() {
    console.log("props during render songs")
    console.log(this.props)
    var tableValues = []
		var table = []
    if(this.props.data_list.length !== 0){
			if(this.props.data_list[0]['typ'] === 0){
				tableValues = this.props.data_list.map(c =>
	        <tr key={"row-" + c.album}>
	          <td className="listenEintrag">{c.album}</td>
	          <td className="listenEintrag">{c.author}</td>
	          <td className="listenEintrag">{c.date}</td>
	        </tr>
				)
				table =
					<table className="table-striped">
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
				console.log("!!!!!NONAME is not true!!!!")
				tableValues = this.props.data_list.map(c =>
	        <tr key={"row-" + c.songName}>
	          <td className="listenEintrag">{c.songName}</td>
	          <td className="listenEintrag">{c.album}</td>
	          <td className="listenEintrag">{c.author}</td>
	          <td className="listenEintrag">{c.date}</td>
	        </tr>
	      )
				table =
					<table className="table-striped">
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
				console.log("!!!!!NONAME is not true!!!!")
				tableValues = this.props.data_list.map(c =>
	        <tr key={"row-" + c.name}>
	          <td className="listenEintrag">{c.name}</td>
	          <td className="listenEintrag">{c.songs}</td>
	        </tr>
	      )
				table =
					<table className="table-striped">
		        <tbody>
		          <tr>
		            <th>Playlist</th>
		            <th>Songs</th>
		          </tr>
		          {tableValues}
		        </tbody>
		      </table>
      }
    }else{
			console.log("loading...")
      tableValues[0] = <tr key="loading"><td>loading...</td></tr>

			table =
				<table className="table-striped">
					<tbody>
						{tableValues}
					</tbody>
				</table>
    }

    console.log("table nach bearbeitung")
    console.log(table)

    return(table)
  }
}


/*AvailableDatalist.propTypes = {
  song_set: PropTypes.array.isRequired
};*/

class SongBoard extends React.Component {
	state = {
	  data_list: [0:{name:"none", album:"none", author:"none"}],
	};

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
			console.log("state after api request")
			console.log(this.state)

		})
		.catch(error => console.log(error));
	}

	renderSongs(){
		//console.log("button was clicked")
		//console.log("current location")
		//console.log(window.location.hostname)
		console.log("this befor render");
		console.log(this);
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
	    console.log("state after api request")
	    console.log(this.state)

	  })
	  .catch(error => console.log(error));
	}
  renderPlaylist(){
		//console.log("button was clicked")
		//console.log("current location")
		//console.log(window.location.hostname)
		console.log("this befor render");
		console.log(this);
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
          case 3:
            var s = c.songlist[0]['name'] + ", " + c.songlist[1]['name'] + ", " + c.songlist[2]['name'] + ",... "
            break;
        }
	      return{
          typ: 2,
					name: c.name,
	        songs: s,

	      };
	    });

	    const newState = Object.assign({}, this.state, {
	          data_list: data_list
	    });
	    this.setState(newState);
	    console.log("state after api request")
	    console.log(this.state)

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
	          <AvailableDatalist data_list={this.state.data_list}/> {/*songs={this.state.contacts}*/}
					</div>
					<div className="playlist col-lg-4 bg-primary">
						playlist
	        </div>
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
        <div>
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
