import React from 'react';
import { useHistory } from 'react-router-dom'
import { rackSynthGif } from '../Images/Racksynthgif';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

function SynthItem({ synth, onSetCurrentSynth, onSynthDelete }) {
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

    //Material-UI styling
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            backgroundImage: `url(${rackSynthGif})`,
            padding: theme.spacing(2),
            textAlign: 'center',
            border: "3px solid purple",
        },
    }));

    const classes = useStyles();
    ///////////////////////////////////

    //render all the user's synths with a button routing to the editor and a delete button
    return(
        <div className={classes.root}>
            <Grid container item xs={12}>
                <Paper className={classes.paper}>
                    <Button onClick={handleEdit} variant="contained" color="primary">{synth.name}</Button>
                    <Button onClick={handleDelete} variant="contained" color="secondary">X</Button>
                </Paper>
            </Grid>
        </div>
    )
}

export default SynthItem;