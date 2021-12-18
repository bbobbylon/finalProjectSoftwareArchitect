import React, {Component} from 'react';
import RoomJoinPage from './RoomJoinPage';  
import CreateRoomPage from './CreateRoomPage';
import {BrowserRouter, Switch, Route, Link, Redirect, Router,} from "react-router-dom";
import Room from "./Room";
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core";


export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state ={
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    //life cycle method to check and see if parameters are met once screen is loaded, before screen is rendered
    async componentDidMount() {
        fetch("/api/user-in-room")
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              roomCode: data.code,
            });
          });
      }

    renderHomePage(){
        return(
            <Grid container spacing={3}>
                <Grid item xs={12} align = "center">
                    <Typography variant = "h3" compact="h3">
                        Bob's Music Player
                    </Typography>
                </Grid>
                <Grid item xs={12} align = "center">
                    <ButtonGroup disableElevation variant ="contained" color="primary">
                        <Button color="primary" to ="/join" component = {Link}>Click here to Join a Room!</Button>
                        <Button color="secondary" to ="/create" component = {Link}>Click here to Create a Room!</Button>
                           
                    </ButtonGroup>


                </Grid>
            </Grid>
        );
    }

    clearRoomCode(){
        this.setState = ({
            roomCode: null,
        });
    }

    render(){
        return (
            <BrowserRouter>
                <Switch>
                <Route exact path = '/' render={()=>{
                    return this.state.roomCode ? (
                    <Redirect to ={`/room/${this.state.roomCode}`} />
                    ) : (this.renderHomePage() );
                }}
                />
                    <Route path='/join' component ={RoomJoinPage}/>
                    <Route path='/create' component ={CreateRoomPage}/>
                    <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
            }}
          />
                </Switch>
            </BrowserRouter>
        );
    }
}