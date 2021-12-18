//main page of app
import React, {Component} from "react";
import {Grid, Button, Typography} from '@material-ui/core';
import {Link} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voteToSkip: 2, 
            guestCanPauseMusic:true,
            isHost: true, 
            showSettings: false,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.leaveButtonIsPressed = this.leaveButtonIsPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
    }


    getRoomDetails() {
        return fetch("/api/get-room" + "?code=" + this.roomCode)
          .then((response) => {
            if (!response.ok) {
              this.props.leaveRoomCallback();
              this.props.history.push("/");
            }
            return response.json();
          })
          .then((data) => {
            this.setState = ({
              voteToSkip: data.vote_to_skip,
              guestCanPauseMusic: data.guest_can_pause_music,
              isHost: data.is_host,
            });
          });
      }

    leaveButtonIsPressed (){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };
          fetch("/api/leave-room", requestOptions).then((_response) => {
            this.props.leaveRoomCallback();
            this.props.history.push("/");
          });
        }

        updateShowSettings(value) {
            this.setState = ({
              showSettings: value,
            });
          }

    renderSettings(){
        return(<Grid container spacing={1}>
            <Grid item xs ={12} align="center">
                <CreateRoomPage update = {true} voteToSkip={this.state.voteToSkip} guestCanPauseMusic = {this.state.guestCanPauseMusic} roomCode = {this.roomCode} updateCallback={this.getRoomDetails} />
            </Grid>
            <Grid item xs ={12} align="center">
            <Button variant = "contained" color = 'secondary' onClick={() => this.updateShowSettings(false)}>
                    Close Settings
                </Button>
            </Grid>

        </Grid>

        );
    }
    renderSettingsButton(){
        return (
            <Grid item xs={12} align = "center">
                <Button variant = "contained" 
                color = 'primary' 
                onClick={this.updateShowSettings(true)}>
                    Go to Settings
                </Button>
            </Grid>

        );
    }
    render(){
        if(this.state.showSettings){
            return this.renderSettings();
        }
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
                Current DJ: {this.state.isHost}
                </Typography>
            </Grid>
            {this.state.isHost ? this.renderSettingsButton(): null}
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