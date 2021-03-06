import React, {Component} from 'react';
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import  Typography from '@material-ui/core/Typography';
import  TextField  from '@material-ui/core/TextField';
import  FormHelperText  from '@material-ui/core/FormHelperText';
import  FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import  RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel  from '@material-ui/core/FormControlLabel';

export default class CreateRoomPage extends Component{
    defaultVotes = 2;
    static defaultProps = {
        voteToSkip:2,
        guestCanPauseMusic: true,
        update:false,
        roomCode:null,
        updateCallback: () => {},
    }

    constructor(props){
        super(props);
        this.state = {
            guestCanPauseMusic: this.props.guestCanPauseMusic,
            voteToSkip: this.props.voteToSkip,
        };

        //you need to bind the objec to use 'this'
        this.handleWhenRoomButtonPressed = this.handleWhenRoomButtonPressed.bind(this);
        this.handleVotesThatChange = this.handleVotesThatChange.bind(this);
        this.handleGuestsCanPauseChange = this.handleGuestsCanPauseChange.bind(this);

    }
    
    handleVotesThatChange(e){
        this.setState({
            voteToSkip: e.target.value,

        });
    }

    handleGuestsCanPauseChange(e){
        this.setState({
            guestCanPauseMusic: e.target.value == "true" ? true: false,
        });
    }

    handleWhenRoomButtonPressed(){
        console.log(this.state);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                vote_to_skip: this.state.voteToSkip,
                guest_can_pause_music: this.state.guestCanPauseMusic,
            }),
        };
        fetch("/api/create-a-room", requestOptions)
        .then((response) => response.json())
        .then((data) => this.props.history.push("/room/" + data.code));
    }

    
    remderCreateButtons(){
        return ( <Grid container spacing={1}>
            <Grid item xs={12} align = "center">
                <Button color = "secondary" variant='contained'onClick = {this.handleWhenRoomButtonPressed}>
                    Create a New Room
                </Button>
                <Button color = "primary" variant='contained' to="/" component= {Link}>
                    Go Back
                </Button>
            </Grid>
            </Grid>
        );

    }


    renderUpdateButtons(){
        return (<Grid item xs={12} align = "center">
        <Button color = "secondary" variant='contained'onClick = {this.handleWhenRoomButtonPressed}>
            Update the Room
        </Button>
        </Grid>
          );  
    }

    render(){
        const title = this.props.update ? "Update Room" : "Create a Room";
        return (<Grid container spacing = {1}>
            <Grid item xs={12} align = "center">
                <Typography component='h4' variant = 'h4'>{title}</Typography>
            </Grid>
            <Grid item xs={12} align = "center">
                <FormControl component = "fieldset">
                    <FormHelperText>
                        <div align = "center"> Here is the Guest's control of the Playback state</div>
                    </FormHelperText>
                    <RadioGroup 
                    row 
                    defaultValue= "true" 
                    onClick={this.handleGuestsCanPauseChange}>
                        <FormControlLabel value = "true" 
                            control = {<Radio color="primary"/>}
                            label = "Play/Pause"
                            labelPlacement  = "bottom"/>
                        <FormControlLabel value = "false" 
                            control = {<Radio color="secondary"/>}
                            label = "No Control"
                            labelPlacement  = "bottom"/>
                    </RadioGroup> 
                </FormControl>
            </Grid>
            <Grid item xs={12} align ="center">
                <FormControl>
                    <TextField 
                    required={true} 
                    type = "number" 
                    onClick={this.handleVotesThatChange}
                    defaultValue={this.state.voteToSkip}
                    inputProps= {{
                        min:1, 
                        style: {textAlign: 'center'}
                    }}
                    />
                    <FormHelperText>
                        <div align = "center">
                            Votes Required to skip song: 
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align = "center">
                <Button color = "secondary" variant='contained'onClick = {this.handleWhenRoomButtonPressed}>
                    Create a New Room
                </Button>
                <Button color = "primary" variant='contained' to="/" component= {Link}>
                    Go Back
                </Button>
            </Grid>
            {this.props.update ? 
            this.renderUpdateButtons
            :this.renderCreateButtons}
        </Grid>
        );
    }
}