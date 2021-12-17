//main page of app
import React, {Component} from "react";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteToSkip: 2, 
            guestCanPauseMusic:true,
            isDJ: false, 
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
    }

    getRoomDetails(){
        fetch('/api/get-room' + '?code=' + this.roomCode).then((response) => 
        response.json())
        .then((data) =>{
        this.setState({
            voteToSkip: data.vote_to_skip,
            guestCanPauseMusic: data.guest_can_pause_music,
            isDJ : data.is_dj,
        });
    });
    }

    render(){
        return (<div>
            <h3>{this.roomCode}</h3>
            <p>Votes: {this.state.voteToSkip}</p> 
            <p>Guests Can Pause? {this.state.guestCanPauseMusic}</p>
            <p>Current DJ: {this.state.isDJ}</p>
        </div>
        );
    }
}