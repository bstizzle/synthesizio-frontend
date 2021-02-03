import React from 'react';
import { useHistory } from 'react-router-dom'
import AudioVisualiser from './AudioVisualiser';
import SynthForm from './SynthForm';

function SynthEditor(props) {
    const history = useHistory();

    function handleLogout(){
        history.push('/')
    }

    function handleSave(){
        history.push('/userpage')
    }

    return(
        <div>
            <button onClick={handleLogout}>Logout Button</button>
            <br></br>
            SYNTH EDITOR PAGE
            <AudioVisualiser />
            <SynthForm />
            <br></br>
            <button onClick={handleSave}>Save/Create/Back Button</button>
        </div>
    )
}

export default SynthEditor;