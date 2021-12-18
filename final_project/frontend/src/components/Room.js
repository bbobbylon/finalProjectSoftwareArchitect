//main page of app
import React, {Component} from "react";
import {Grid, Button, Typography} from '@material-ui/core';
import {Link} from "react-router-dom";

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
        this.leaveButtonIsPressed = this.leaveButtonIsPressed.bind(this);
    }

    getRoomDetails(){
        return fetch('/api/get-room' + '?code=' + this.roomCode)
        .then((response) => 
        {
            if (!response.ok){
                this.props.leaveRoomCallback();
                this.props.history.push("/");
            }
            return response.json();
        })
        .then((data) =>{
        this.setState({
            voteToSkip: data.vote_to_skip,
            guestCanPauseMusic: data.guest_can_pause_music,
            isDJ : data.is_dj,
        });
    });
    }

    leaveButtonIsPressed (){
        const requestOption = {
            method: 'POST',
            headers : {"Content-Type": "application/json"},
        }
        fetch('/api/leave-the-room', requestOption).then((_response) => {
            this.props.leaveRoomCallback();
            this.props.history.push("/");
        });
    }

    render(){
        return (
            <Grid container spacing={1}>

            <Grid item xs={12} align = "center">
                <Typography variant="h4" component="h4">
                    Code: {this.roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
            <Typography variant="h4" component="h4">
                Votes: {this.state.voteToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
            <Typography variant="h6" component="h6">
            Guests Can Pause? {this.state.guestCanPauseMusic.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
            <Typography variant="h6" component="h6">
                Current DJ: {this.state.isDJ}
                </Typography>
            </Grid>
            <Grid item xs={12} align = "center">
            <Button variant="contained" color = 'secondary' onClick = {this.leaveButtonIsPressed}>
                Leave Room and DJ
            </Button>
            </Grid>
        
            </Grid>
        
        );
    }
}


/*
<div>
            <h3>{this.roomCode}</h3>
            <p>Votes: {this.state.voteToSkip}</p> 
            <p>Guests Can Pause? {this.state.guestCanPauseMusic}</p>
            <p>Current DJ: {this.state.isDJ}</p>
        </div>
*/