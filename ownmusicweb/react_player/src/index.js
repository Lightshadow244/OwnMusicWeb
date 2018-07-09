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
    if(this.props.song_set.length !== 0){
			if(this.props.song_set[0].songName === "noName"){
				console.log("!!!!!NONAME is true!!!!")
				tableValues = this.props.song_set.map(c =>
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

			}else{
				console.log("!!!!!NONAME is not true!!!!")
				tableValues = this.props.song_set.map(c =>
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
	  song_set: [0:{name:"none", album:"none", author:"none"}],
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
			const song_set = response.data.map(c => {
				return{
					songName: "noName",
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

	renderSongs(){
		//console.log("button was clicked")
		//console.log("current location")
		//console.log(window.location.hostname)
		console.log("this befor render");
		console.log(this);
	  axios
	  .get("http://" + window.location.hostname + ":8000/song/")
	  .then(response => {
	    const song_set2 = response.data.map(c => {
	      return{
					songName: c.name,
	        album: c.album,
	        author: "c.author",
	        date: "c.release_date"
	      };
	    });

	    const newState = Object.assign({}, this.state, {
	          song_set: song_set2
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
							</div>
	          </div>
	          <AvailableDatalist song_set={this.state.song_set}/> {/*songs={this.state.contacts}*/}
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
