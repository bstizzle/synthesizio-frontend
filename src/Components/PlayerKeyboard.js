import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PlayerKey from "./PlayerKey";
import InfoModal from "./InfoModal";
import { freqTones } from "./HashMaps";
// import AudioVisualiser from "./AudioVisualiser";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function PlayerKeyboard({ synth, classes, onLogout }){
    const [selectedOctave, setSelectedOctave] = useState(3)
    // const [audioData, setAudioData] = useState(new Uint8Array(0))

    const history = useHistory();

    let range;

    const keyList = Object.entries(freqTones)
    const twelfthTwo = Math.pow(2, 1/12);

    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let masterGainNode = audioContext.createGain();
    let distortion = audioContext.createWaveShaper(0);
    if(synth.distortion_toggle === true){
        if(synth.distortion_curve === 'soft'){
            distortion.curve = softDistortionCurve(synth.distortion_gain);
        }else {
            distortion.curve = hardDistortionCurve(synth.distortion_gain)
        }
        masterGainNode.connect(distortion);
        distortion.connect(audioContext.destination);
    }else {
        masterGainNode.connect(audioContext.destination)
    }
    // let analyser = audioContext.createAnalyser();
    // let dataArray = new Uint8Array(analyser.frequencyBinCount);

    masterGainNode.connect(distortion);
    distortion.connect(audioContext.destination);
    // masterGainNode.connect(analyser);
    masterGainNode.gain.value = 0;

    let attackTime = 1;
    let releaseTime = 1;

    const fullKeyboard = keyList.map(key => {
        const keyIndex = parseInt(key[0], 10)
        const keyFreq = Math.round((27.5 * Math.pow(twelfthTwo, keyIndex)) * 100)/100

        return <PlayerKey playTone={playTone} stopTone={stopTone} key={keyIndex} index={keyIndex} note={key[1]} frequency={keyFreq} freq1={synth.osc_freq_1} freq2={synth.osc_freq_2} type1={synth.osc_type_1} type2={synth.osc_type_2}/>;
    });

    function getOctaveKeyIndexes(){
        //set an array of lowest key index and highest key index of selected octave (12 notes)
        range = [(selectedOctave*12), ((selectedOctave*12)+12)]
    }

    getOctaveKeyIndexes();

    const octaveKeys = []
    
    for(let i = range[0]; i < range[1]; i++){
        octaveKeys.push(fullKeyboard[i])
    }

    function softDistortionCurve( amount ) {
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

    function hardDistortionCurve( amount ){
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


    function playTone(freq, type) {
        let osc = audioContext.createOscillator();
        osc.connect(masterGainNode);

        osc.type = type

        osc.frequency.value = freq

        osc.start();
        masterGainNode.gain.cancelScheduledValues(audioContext.currentTime);
        masterGainNode.gain.linearRampToValueAtTime(synth.osc_gain, audioContext.currentTime + attackTime)

        return osc;
    }

    function stopTone(osc) {
        masterGainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + attackTime + releaseTime);
        setTimeout(function(){osc.stop()}, (attackTime + releaseTime) * 1000)
    }

    function handleLogout(){
        onLogout()
    };

    function handleUserRoute(){
        history.push('/userpage')
    };

    function handleEditorRoute(){
        history.push('/syntheditor')
    };

    // useEffect(() => {
    //     analyser.getByteTimeDomainData(dataArray)
    //     setAudioData(dataArray)
    // }, [])

    return(
        <div className="page-container">
            <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.paper} elevation={10}>
                        <Grid item xs={12}>
                            <Paper className={classes.formPaper} elevation={10}>
                                <Typography className={classes.typography} variant="h3">
                                    {synth.name}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} elevation={10}>
                        <Button onClick={handleEditorRoute} variant="outlined" className={classes.editButton}>Editor</Button>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} elevation={10}>
                        <Button onClick={handleUserRoute} variant="outlined" className={classes.editButton}>User Page</Button>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper} elevation={10}>
                        <Button onClick={handleLogout} variant="outlined" className={classes.editButton}>Logout Button</Button>
                    </Paper>
                </Grid>
                {/* <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={10}>
                        <InfoModal classes={classes} topic="Audio Visualiser" />
                        <AudioVisualiser classes={classes} audioData={dataArray} analyser={analyser} />
                    </Paper>
                </Grid> */}
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={10}>
                        <div className="keyboard-div">
                            <InfoModal classes={classes} topic="Player Keyboard" />
                            <div className="keyboard-container">
                                <div className="keyboard">
                                    {octaveKeys}
                                </div>
                            </div>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Choost Octave:</InputLabel>
                                <Select
                                    native
                                    value={selectedOctave}
                                    onChange={e => setSelectedOctave(e.target.value)}
                                >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                </Select>
                            </FormControl>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default PlayerKeyboard;