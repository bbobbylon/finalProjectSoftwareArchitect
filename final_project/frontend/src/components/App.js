//one component that can render other components
import React, {Component, createFactory} from "react";
import {render} from "react-dom"
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <HomePage/>
            </div>
        );
    }
}

//where we pass props to components
const appDiv = document.getElementById("app");
render(<App />, appDiv);