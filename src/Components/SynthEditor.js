import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AudioVisualiser from './AudioVisualiser';
import SynthForm from './SynthForm';
import Keyboard from './Keyboard';
import InfoModal from './InfoModal';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

class SynthEditor extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        //set up default synth if no synth (this.props.synth = undefined) is passed as a prop
        if(this.props.synth){
            this.synth = this.props.synth;
        }else{
            this.synth = {
                "osc_type_1": "sine",
                "osc_type_2": "sine",
                "osc_freq_1": 220.0,
                "osc_freq_2": 440.0,
                "osc_gain": 0.1,
                "distortion_toggle": false,
                "distortion_curve": "soft",
                "distortion_gain": 0,
                "delay_length": 0,
                "name": 'default'
            }
        }
        console.log(this.synth)
        this.onLogout = this.props.onLogout
        this.state = { audioData: new Uint8Array(0), mute: true };
        this.tick = this.tick.bind(this);
        this.classes = this.props.classes
    };

    //CRUD/routing methods
    handleLogout = () => {
        this.onLogout()
    };

    handleUserRoute = () => {
        this.props.history.push('/userpage')
    };

    handlePlayerRoute = () => {
        this.props.onSetCurrentSynth(this.synth)
        this.props.history.push('/player')
    }

    handleSynthSubmit = () => {
        if(this.synth.id) {
            //if the synth being edited belongs to the user, patch, if it doesnt, post a copy belonging to the user
            if(this.synth.user.id === this.props.currentUser.id){
                fetch(`${process.env.REACT_APP_API_BASE_URL}/synths/${this.synth.id}`, {
                    method: 'PATCH',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.synth),
                })
                .then(resp => resp.json())
                .then(alert("Synth Saved!"))
            }else{
                fetch(`${process.env.REACT_APP_API_BASE_URL}/synths`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({...this.synth, user_id: this.props.currentUser.id}),
                })
                .then(resp => resp.json())
                .then(newSynth => {
                    this.synth["id"] = newSynth.id
                    this.props.synths.push(newSynth);
                    alert("Synth Copied!");
                })
            }
        }else {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/synths`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({...this.synth, user_id: this.props.currentUser.id}),
            })
            .then(resp => resp.json())
            .then(newSynth => {
                this.synth["id"] = newSynth.id
                this.props.synths.push(newSynth);
                alert("Synth Created!");
            })
        }
    }
    //end of CRUD/routing methods

    handleMute = () => {
        this.attackTime = 0.1;
        this.releaseTime = 0.5;
        if(this.state.mute === false){
            this.oscGain.gain.cancelScheduledValues(this.audioContext.currentTime);
            this.oscGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + this.attackTime + this.releaseTime);
            this.setState({mute: true});
        }else{
            this.oscGain.gain.cancelScheduledValues(this.audioContext.currentTime);
            this.oscGain.gain.linearRampToValueAtTime(this.synth.osc_gain, this.audioContext.currentTime + this.attackTime);
            this.setState({mute: false});
        }
    }

    //form methods
    handleFreq1Change = (newFreq) => {
        this.synth.osc_freq_1 = newFreq
    }

    handleFreq2Change = (newFrew) => {
        this.synth.osc_freq_2 = newFrew
    }

    handleType1Change = (newType) => {
        this.synth.osc_type_1 = newType
    }

    handleType2Change = (newType) => {
        this.synth.osc_type_2 = newType
    }

    handleGainChange = (newGain) => {
        this.synth.osc_gain = newGain
    }

    handleDistCurveChange = (newCurve) => {
        this.synth.distortion_curve = newCurve
    }

    handleDistGainChange = (newGain) => {
        this.synth.distortion_gain = newGain
    }

    handleDistToggle = () => {
        this.synth.distortion_toggle = !this.synth.distortion_toggle
    }

    handleNameChange = (newName) => {
        this.synth.name = newName
    }
    //end of form methods

    //distortion formulas
    softDistortionCurve( amount ) {
        let k = (typeof amount === 'number' ? amount : 0);
        let n_samples = 44100;
        let curve = new Float32Array(n_samples);
        let deg = Math.PI / 180;
        let x;

        for (let i = 0; i < n_samples; ++i ) {
          x = i * 2 / n_samples - 1;
          curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
        }
        return curve;
    }

    hardDistortionCurve( amount ){
        let k = amount;
        let n_samples = 44100;
        let curve = new Float32Array(n_samples);
        let x;
        for (let i = 0; i < n_samples; ++i ) {
            x = i * 2 / n_samples - 1;
            curve[i] = ((3 + k) * Math.sin(x) * Math.cos(x)) - 4;
        }
        return curve;
    }
    //end of distortion methods

    //component mound/update/unmount methods
    componentDidMount(){
        //initialize audio context node, analyser node, and frequency data array
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

        //initialized oscillator nodes
        this.osc1 = this.audioContext.createOscillator();
        this.osc1.type = 'sine';
        this.osc1.frequency.setValueAtTime(55, this.audioContext.currentTime); 

        this.osc2 = this.audioContext.createOscillator();
        this.osc2.type = 'sawtooth';
        this.osc2.frequency.setValueAtTime(55, this.audioContext.currentTime); 

        //initialize oscillator gain node
        this.oscGain = this.audioContext.createGain();
        this.oscGain.gain.setValueAtTime(0, this.audioContext.currentTime);

        //initialize distortion node
        this.distortion = this.audioContext.createWaveShaper();
        this.distortion.curve = this.softDistortionCurve(0);

        //connect signal flow
        this.osc1.connect(this.oscGain);
        this.osc2.connect(this.oscGain);
        if(this.synth.distortion_toggle === true) {
            this.oscGain.connect(this.distortion);
            this.distortion.connect(this.analyser);
            this.distortion.connect(this.audioContext.destination);
        }else {
            this.oscGain.connect(this.analyser);
            this.oscGain.connect(this.audioContext.destination);
        }
        this.osc1.start();
        this.osc2.start();
        this.rafId = requestAnimationFrame(this.tick);
    }

    componentDidUpdate(){
        //update pararms
        this.osc1.type = this.synth.osc_type_1;
        this.osc1.frequency.setValueAtTime(this.synth.osc_freq_1, this.audioContext.currentTime);
        this.osc2.type = this.synth.osc_type_2;
        this.osc2.frequency.setValueAtTime(this.synth.osc_freq_2, this.audioContext.currentTime);

        if(this.state.mute === false){
            this.oscGain.gain.setValueAtTime(this.synth.osc_gain, this.audioContext.currentTime);
        }

        //update these conditionally, because if they set every time (even if the value doesnt actually change) it causes clicking
        //this conditional makes it only change if the curve was changed, rather than resetting it every loop
        if(this.synth.distortion_curve === 'soft' && this.softDistortionCurve(this.synth.distortion_gain)[0] !== this.distortion.curve[0]){
            this.distortion.curve = this.softDistortionCurve(this.synth.distortion_gain);
        }else if(this.synth.distortion_curve === 'hard' && this.hardDistortionCurve(this.synth.distortion_gain)[0] !== this.distortion.curve[0]){
            this.distortion.curve = this.hardDistortionCurve(this.synth.distortion_gain);
        }

        //have to be very careful with how we disconnect and reconnect the audio nodes
        if(this.synth.distortion_toggle === true) {
            //disconnect down the chain
            this.analyser.disconnect();
            this.oscGain.disconnect();

            //recconect up with distortion in the path
            this.oscGain.connect(this.distortion);
            this.distortion.connect(this.analyser);
            this.distortion.connect(this.audioContext.destination);
        }else {
            //disconnect down the chain
            this.analyser.disconnect();
            this.distortion.disconnect();
            this.oscGain.disconnect();

            //recconect up without distortion in the path
            this.oscGain.connect(this.analyser);
            this.oscGain.connect(this.audioContext.destination);
        }
    }

    tick() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.setState({ audioData: this.dataArray });
        this.rafId = requestAnimationFrame(this.tick);
    }

    componentWillUnmount(){
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.osc1.stop();
        this.osc2.stop();
    }

    render(){
        return(
            <div className="page-container">
                <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
                    <Grid item xs={6}>
                        <Paper className={this.classes.paper} elevation={10}>
                            <Grid item xs={12}>
                                <Paper className={this.classes.formPaper} elevation={10}>
                                    <Typography className={this.classes.typography} variant="h3">
                                        SYNTH EDITOR
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={this.classes.paper} elevation={10}>
                            <Button onClick={this.handlePlayerRoute} variant="outlined" className={this.classes.editButton}><KeyboardIcon/>Player</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={this.classes.paper} elevation={10}>
                            <Button onClick={this.handleUserRoute} variant="outlined" className={this.classes.editButton}><PersonIcon/>User Page</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={this.classes.paper} elevation={10}>
                            <Button onClick={this.handleLogout} variant="outlined" className={this.classes.editButton}><ExitToAppIcon/>Logout</Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={this.classes.paper} elevation={10}>
                            <InfoModal classes={this.classes} topic="Audio Visualiser" />
                            <AudioVisualiser classes={this.classes} audioData={this.dataArray} analyser={this.analyser} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={this.classes.paper} elevation={10}>
                            <Button onClick={this.handleMute} variant="outlined" className={this.classes.editButton}>
                                {this.state.mute ? <MusicNoteIcon/> : <MusicOffIcon/>}{this.state.mute ? "Play" : "Mute"}{this.state.mute ? <MusicNoteIcon/> : <MusicOffIcon/>}
                            </Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={this.classes.paper} elevation={10}>
                            <Keyboard classes={this.classes} freq1={this.synth.osc_freq_1} freq2={this.synth.osc_freq_2} onFreq1Change={this.handleFreq1Change} onFreq2Change={this.handleFreq2Change} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={this.classes.paper} elevation={10}>
                            <SynthForm synth={this.synth} classes={this.classes}
                                onFreq1Change={this.handleFreq1Change} 
                                onFreq2Change={this.handleFreq2Change}
                                onType1Change={this.handleType1Change}
                                onType2Change={this.handleType2Change}
                                onGainChange={this.handleGainChange}
                                onDistCurveChange={this.handleDistCurveChange}
                                onDistGainChange={this.handleDistGainChange}
                                onDistToggle={this.handleDistToggle}
                                onNameChange={this.handleNameChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={this.classes.paper} elevation={10}>
                            <Button onClick={this.handleSynthSubmit} variant="outlined" className={this.classes.editButton}>{this.synth.id ? "Save Synth" : "Create Synth"}</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    };
}

export default withRouter(SynthEditor);