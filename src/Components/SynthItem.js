import React from 'react';
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function SynthItem({ classes, synth, onSetCurrentSynth, onSynthDelete }) {
    const history = useHistory()

    //set the currentSynth state to the selected one from the list, and bring the params to the editor
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
            onSynthDelete(deletedSynth.id)
            alert("Synth deleted!")
        })
    }

    //render all the user's synths with a button routing to the editor and a delete button
    return(
        <div className={classes.itemRoot}>
            <Grid container item xs={12}>
                <Paper className={classes.itemPaper}>
                    <Button onClick={handleEdit} variant="contained" className={classes.editButton}>{synth.name}</Button>
                    <Button onClick={handleDelete} variant="contained" className={classes.delButton}>X</Button>
                </Paper>
            </Grid>
        </div>
    )
}

export default SynthItem;