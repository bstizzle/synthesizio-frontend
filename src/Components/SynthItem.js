import React from 'react';

function SynthItem({synth}) {

    return(
        <div>
            <h1>SYNTH NAME</h1>
            <ul>
                <li>{synth.osc_freq_1}</li>
                <li>{synth.osc_freq_2}</li>
                <li>{synth.osc_type_1}</li>
                <li>{synth.osc_type_2}</li>
            </ul>
        </div>
    )
}

export default SynthItem;