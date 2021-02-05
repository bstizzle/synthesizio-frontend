import React, { useState } from 'react';
import Slider from 'react-input-slider';

function SynthForm({onFreq1Change, synth: {osc_type_1, osc_type_2, osc_freq_1, osc_freq_2, osc_gain, distortion_curve, distortion_gain, delay_length}}) {
    const [freqSlider1, setFreqSlider1] = useState({x: 49})

    const twelfthTwo = Math.pow(2, 1/12)

    const changeFreq1 = (x) => {
        const newFreq = Math.round(27.5 * Math.pow(twelfthTwo, x.x))
        setFreqSlider1(x)
        onFreq1Change(newFreq)
    }

    return(
        <div>
            SYNTH FORM
            {osc_freq_1}
            <Slider axis="x" xstep={1} xmin={0} xmax={88} x={freqSlider1.x} onChange={x => changeFreq1(x)} />
        </div>
    )
}

export default SynthForm;