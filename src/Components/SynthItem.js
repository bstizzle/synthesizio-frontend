import React from 'react';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';

function SynthItem({synth, onSetCurrentSynth}) {
    const history = useHistory()

    function handleEdit(){
        onSetCurrentSynth(synth)
        history.push('/syntheditor')
    }

    return(
        <div>
            <Button onClick={handleEdit} variant="contained" color="primary">{synth.name}</Button>
        </div>
    )
}

export default SynthItem;