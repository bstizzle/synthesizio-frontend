import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AudioVisualiser from './AudioVisualiser';
import SynthForm from './SynthForm';
import Button from '@material-ui/core/Button';


class SynthEditor extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.synth = this.props.synth;
        this.state = { audioData: new Uint8Array(0), mute: false };
        this.tick = this.tick.bind(this);
    };

    handleLogout = () => {
        this.props.history.push('/')
    };

    handleSave = () => {
        this.props.history.push('/userpage')
    };

    handleMute = () => {
        if(this.state.mute === false){
            this.oscGain.gain.setValueAtTime(0, this.audioContext.currentTime); 
            this.distGain.gain.setValueAtTime(0, this.audioContext.currentTime); 
            this.setState({mute: true});
        }else{
            this.oscGain.gain.setValueAtTime(this.synth.osc_gain, this.audioContext.currentTime); 
            this.distGain.gain.setValueAtTime(this.synth.distortion_gain, this.audioContext.currentTime); 
            this.setState({mute: false});
        }
    }

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

    componentDidMount(){
        //initialize audio context node, analyser node, and frequency data array
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

        //initialized oscillator nodes
        this.osc1 = this.audioContext.createOscillator();
        this.osc1.type = this.osc1.type = 'sine';
        this.osc1.frequency.setValueAtTime(55, this.audioContext.currentTime); 

        //initialize oscillator gain node
        this.oscGain = this.audioContext.createGain();
        this.oscGain.gain.setValueAtTime(0.1, this.audioContext.currentTime); 

        //initialize distortion node
        this.distortion = this.audioContext.createWaveShaper();
        this.distortion.curve = this.softDistortionCurve(0);

        //initialize distortion gain node
        this.distGain = this.audioContext.createGain();
        this.distGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);

        //connect signal flow
        this.osc1.connect(this.oscGain);
        this.oscGain.connect(this.distortion)
        this.distortion.connect(this.distGain)
        this.distGain.connect(this.analyser)
        this.distGain.connect(this.audioContext.destination)
        this.osc1.start();
        this.rafId = requestAnimationFrame(this.tick);
    }

    componentDidUpdate(){
        //update pararms
        this.osc1.type = this.synth.osc_type_1;
        this.osc1.frequency.setValueAtTime(this.synth.osc_freq_1, this.audioContext.currentTime);
        this.distortion.curve = this.softDistortionCurve(this.synth.dist);
        if(this.state.mute === true){
            this.oscGain.gain.setValueAtTime(0, this.audioContext.currentTime); 
            this.distGain.gain.setValueAtTime(0, this.audioContext.currentTime); 
        }else{
            this.oscGain.gain.setValueAtTime(this.synth.osc_gain, this.audioContext.currentTime);
            this.distGain.gain.setValueAtTime(this.synth.distortion_gain, this.audioContext.currentTime);
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
    }

    render(){
        return(
            <div>
                <Button onClick={this.handleLogout} variant="contained">Logout Button</Button>
                <br></br>
                SYNTH EDITOR PAGE
                <br></br>
                <Button onClick={this.handleMute} variant="contained">Mute</Button>
                <br></br>
                <AudioVisualiser />
                <SynthForm />
                <br></br>
                <Button onClick={this.handleSave} variant="contained">Save/Create/Back Button</Button>
            </div>
        );
    };
}

export default withRouter(SynthEditor);