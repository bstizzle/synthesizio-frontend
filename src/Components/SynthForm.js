import React, { useState } from 'react';
import Slider from 'react-input-slider';
import { freqTones } from "./HashMaps"
import InfoModal from "./InfoModal";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function SynthForm({classes, onNameChange, onFreq1Change, onFreq2Change, onType1Change, onType2Change, onGainChange, onDistCurveChange, onDistGainChange, onDistToggle, synth: {name, osc_type_1, osc_type_2, osc_freq_1, osc_freq_2, osc_gain, distortion_toggle, distortion_curve, distortion_gain, delay_length}}) {
    //formula for moving up and down western music notes by frequency/semi-tone
    const twelfthTwo = Math.pow(2, 1/12);

    //function to get the slider positions of the default frequencies
    const setInitialFreqSlider = (frequency) => {
        let x = 0;
        let freq = Math.round((27.5 * Math.pow(twelfthTwo, x)) * 100)/100

        while(freq !== frequency){
            freq = Math.round((27.5 * Math.pow(twelfthTwo, x)) * 100)/100
            x++;
        }
        return x;
    }
    //controlled inputs
    const [freqSlider1, setFreqSlider1] = useState({x: setInitialFreqSlider(osc_freq_1)});
    const [freqSlider2, setFreqSlider2] = useState({x: setInitialFreqSlider(osc_freq_2)});
    const [type1, setType1] = useState(osc_type_1);
    const [type2, setType2] = useState(osc_type_2);
    const [gain, setGain] = useState({x: osc_gain});
    const [distCurve, setDistCurve] = useState(distortion_curve);
    const [distGain, setDistGain] = useState({x: distortion_gain})
    const [distToggle, setDistToggle] = useState(distortion_toggle)
    const [synthName, setSynthName] = useState(name)

    //form change handlers
    const changeGain = (x) => {
        const newGain = x.x
        setGain(x)
        onGainChange(newGain)
    };

    const changeFreq1 = (x) => {
        const newFreq = Math.round((27.5 * Math.pow(twelfthTwo, x.x)) * 100)/100
        setFreqSlider1(x)
        onFreq1Change(newFreq)
    };

    const changeFreq2 = (x) => {
        const newFreq = Math.round((27.5 * Math.pow(twelfthTwo, x.x)) * 100)/100
        setFreqSlider2(x)
        onFreq2Change(newFreq)
    };

    const changeType1 = (event) => {
        setType1(event.target.value)
        onType1Change(event.target.value)
    };

    const changeType2 = (event) => {
        setType2(event.target.value)
        onType2Change(event.target.value)
    };

    const changeDistCurve = (event) => {
        setDistCurve(event.target.value)
        onDistCurveChange(event.target.value)
    };

    const changeDistGain = (x) => {
        const newGain = x.x
        setDistGain(x)
        onDistGainChange(newGain)
    }

    const changeDistToggle = () => {
        setDistToggle(!distToggle)
        onDistToggle()
    }

    const changeSynthName = (event) => {
        setSynthName(event.target.value)
        onNameChange(event.target.value)
    }

    return(
        <div className={classes.itemRoot}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.formPaper} elevation={10}>
                        <InfoModal classes={classes} topic="Oscillators" />
                        <label>Gain: {osc_gain}</label>
                        <br></br>
                        <Slider axis="x" xstep={0.01} xmin={0} xmax={0.5} x={gain.x} onChange={x => changeGain(x)} />
                        <br></br>
                        <label>Tone 1: {freqTones[freqSlider1.x]} - {osc_freq_1} Hz</label>
                        <br></br>
                        <Slider axis="x" xstep={1} xmin={0} xmax={88} x={freqSlider1.x} onChange={x => changeFreq1(x)} />
                        <br></br>
                        <label>Tone 2: {freqTones[freqSlider2.x]} - {osc_freq_2} Hz</label>
                        <br></br>
                        <Slider axis="x" xstep={1} xmin={0} xmax={88} x={freqSlider2.x} onChange={x => changeFreq2(x)} />
                        <br></br>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Waveform 1</InputLabel>
                            <Select
                                native
                                value={type1}
                                onChange={changeType1}
                            >
                            <option value='sine'>Sine</option>
                            <option value='triangle'>Triangle</option>
                            <option value='sawtooth'>Sawtooth</option>
                            <option value='square'>Square</option>
                            </Select>
                        </FormControl>
                        <br></br>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Waveform 2</InputLabel>
                            <Select
                                native
                                value={type2}
                                onChange={changeType2}
                            >
                            <option className="form-option" value='sine'>Sine</option>
                            <option value='triangle'>Triangle</option>
                            <option value='sawtooth'>Sawtooth</option>
                            <option value='square'>Square</option>
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <br></br>
                <Grid item xs={6}>
                    <Paper className={classes.formPaper} elevation={10}>
                        <InfoModal classes={classes} topic="Distortion" />
                        <FormControlLabel
                            control={<Switch checked={distToggle} onChange={changeDistToggle} name="distToggle" />}
                            label="Distortion Off/On"
                        />
                        <br></br>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Distortion Curve</InputLabel>
                            <Select
                                native
                                value={distCurve}
                                onChange={changeDistCurve}
                            >
                            <option value='soft'>Soft</option>
                            <option value='hard'>Hard</option>
                            </Select>
                        </FormControl>
                        <br></br>
                        <label>Distortion Amount: {distortion_gain}</label>
                        <br></br>
                        <Slider axis="x" xstep={1} xmin={0} xmax={100} x={distGain.x} onChange={x => changeDistGain(x)} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.formPaper} elevation={10}>
                        <TextField label="Synth Name" variant="outlined" value={synthName} onChange={changeSynthName} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default SynthForm;