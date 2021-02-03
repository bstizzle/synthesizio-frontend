import React from 'react';
import AudioVisualiser from './AudioVisualiser';
import SynthForm from './SynthForm';

function SynthEditor(props) {

    return(
        <div>
            SYNTH EDITOR PAGE
            <AudioVisualiser />
            <SynthForm />
        </div>
    )
}

export default SynthEditor;