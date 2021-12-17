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

    constructor(props){
        super(props);
        this.state = {
            guestCanPauseMusic: true,
            voteToSkip: this.defaultVotes,
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

    render(){
        return (<Grid container spacing = {1}>
            <Grid item xs={12} align = "center">
                <Typography component='h4' variant = 'h4'>Create a Room :)</Typography>
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
                    defaultValue={this.defaultVotes}
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
        </Grid>
        );
    }
}