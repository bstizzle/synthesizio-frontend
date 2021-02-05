import React, { useState } from 'react';
import Slider from 'react-input-slider';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function SynthForm({onFreq1Change, onFreq2Change, onType1Change, onType2Change, synth: {osc_type_1, osc_type_2, osc_freq_1, osc_freq_2, osc_gain, distortion_curve, distortion_gain, delay_length}}) {
    const [freqSlider1, setFreqSlider1] = useState({x: 49})
    const [freqSlider2, setFreqSlider2] = useState({x: 49})
    const [type1, setType1] = useState(osc_type_1)
    const [type2, setType2] = useState(osc_type_2)

    //formula for moving up and down western music notes by frequency
    const twelfthTwo = Math.pow(2, 1/12)

    //form change handlers
    const changeFreq1 = (x) => {
        const newFreq = Math.round(27.5 * Math.pow(twelfthTwo, x.x))
        setFreqSlider1(x)
        onFreq1Change(newFreq)
    }

    const changeFreq2 = (x) => {
        const newFreq = Math.round(27.5 * Math.pow(twelfthTwo, x.x))
        setFreqSlider2(x)
        onFreq2Change(newFreq)
    }

    const changeType1 = (event) => {
        setType1(event.target.value)
        onType1Change(event.target.value)
    }

    const changeType2 = (event) => {
        setType2(event.target.value)
        onType2Change(event.target.value)
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
            {osc_freq_1}
            <br></br>
            <Slider axis="x" xstep={1} xmin={0} xmax={88} x={freqSlider1.x} onChange={x => changeFreq1(x)} />
            <br></br>
            {osc_freq_2}
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
        </div>
    )
}

export default SynthForm;