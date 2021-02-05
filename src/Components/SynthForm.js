import React, { useState } from 'react';
import Slider from 'react-input-slider';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

function SynthForm({onFreq1Change, onFreq2Change, onType1Change, onType2Change, onGainChange, onDistCurveChange, onDistGainChange, onDistToggle, synth: {osc_type_1, osc_type_2, osc_freq_1, osc_freq_2, osc_gain, distortion_toggle, distortion_curve, distortion_gain, delay_length}}) {
    const [freqSlider1, setFreqSlider1] = useState({x: 49});
    const [freqSlider2, setFreqSlider2] = useState({x: 49});
    const [type1, setType1] = useState(osc_type_1);
    const [type2, setType2] = useState(osc_type_2);
    const [gain, setGain] = useState({x: 0});
    const [distCurve, setDistCurve] = useState(distortion_curve);
    const [distGain, setDistGain] = useState({x: distortion_gain})
    const [distToggle, setDistToggle] = useState(distortion_toggle)

    //formula for moving up and down western music notes by frequency
    const twelfthTwo = Math.pow(2, 1/12);

    //form change handlers
    const changeGain = (x) => {
        const newGain = x.x
        setGain(x)
        onGainChange(newGain)
    };

    const changeFreq1 = (x) => {
        const newFreq = Math.round(27.5 * Math.pow(twelfthTwo, x.x))
        setFreqSlider1(x)
        onFreq1Change(newFreq)
    };

    const changeFreq2 = (x) => {
        const newFreq = Math.round(27.5 * Math.pow(twelfthTwo, x.x))
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
        const newToggle = !distToggle
        setDistToggle(newToggle)
        onDistToggle(newToggle)
    }

/////////////////////// Material-UI styling
    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();
////////////////////////////

    return(
        <div>
            SYNTH FORM
            <br></br>
            <label>Gain: {osc_gain}</label>
            <br></br>
            <Slider axis="x" xstep={0.05} xmin={0} xmax={0.5} x={gain.x} onChange={x => changeGain(x)} />
            <br></br>
            <label>Frequency 1: {osc_freq_1}</label>
            <br></br>
            <Slider axis="x" xstep={1} xmin={0} xmax={88} x={freqSlider1.x} onChange={x => changeFreq1(x)} />
            <br></br>
            <label>Frequency 2: {osc_freq_2}</label>
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
                <option value='sine'>Sine</option>
                <option value='triangle'>Triangle</option>
                <option value='sawtooth'>Sawtooth</option>
                <option value='square'>Square</option>
                </Select>
            </FormControl>
            <br></br>
            <FormControlLabel
                control={<Switch checked={distToggle} onChange={changeDistToggle} name="distToggle" />}
                label="Secondary"
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
            <br></br>
        </div>
    )
}

export default SynthForm;