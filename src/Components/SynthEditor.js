import React from 'react';
import { useHistory } from 'react-router-dom'
import AudioVisualiser from './AudioVisualiser';
import SynthForm from './SynthForm';
import Button from '@material-ui/core/Button';


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
            <Button onClick={handleLogout} variant="contained">Logout Button</Button>
            <br></br>
            SYNTH EDITOR PAGE
            <AudioVisualiser />
            <SynthForm />
            <br></br>
            <Button onClick={handleSave} variant="contained">Save/Create/Back Button</Button>
        </div>
    )
}

export default SynthEditor;