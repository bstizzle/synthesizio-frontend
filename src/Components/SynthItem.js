import React from 'react';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';

function SynthItem({synth, onSetCurrentSynth}) {
    const history = useHistory()

    function handleEdit(){
        onSetCurrentSynth(synth)
        history.push('/syntheditor')
    }

    function handleDelete(){
        fetch(`${process.env.REACT_APP_API_BASE_URL}/synths/${synth.id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
        .then(deletedSynth => {
            
        })
    }

    return(
        <div>
            <Button onClick={handleEdit} variant="contained" color="primary">{synth.name}</Button>
            <Button onClick={handleDelete} variant="contained" color="secondary">X</Button>
        </div>
    )
}

export default SynthItem;