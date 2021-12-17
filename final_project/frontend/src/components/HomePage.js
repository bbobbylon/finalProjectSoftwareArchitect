import React, {Component} from 'react';
import RoomJoinPage from './RoomJoinPage';  
import CreateRoomPage from './CreateRoomPage';
import {BrowserRouter, Switch, Route, Link, Redirect, Router,} from "react-router-dom";


export default class HomePage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = '/'><p>This is the home page</p></Route>
                    <Route path='/join' component ={RoomJoinPage}/>
                    <Route path='/create' component ={CreateRoomPage}/>
                </Switch>
            </BrowserRouter>
        );
    }
}