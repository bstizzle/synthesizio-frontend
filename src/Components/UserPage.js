import React from 'react';
import { useHistory } from 'react-router-dom'
import SynthItem from './SynthItem';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function UserPage({ classes, onSetCurrentSynth, currentUser, synths, onSetSynths, onLogout }) {
    const history = useHistory()

    //set currentSynth state to undefined, so the editor will use defaults and no primary-key-id, and go to the editor
    function handleNew(){
        onSetCurrentSynth(undefined)
        history.push('/syntheditor')
    }

    function handleLogout(){
        onLogout()
    }

    function handleSynthDelete(synthId){
        const lessSynths = synths.filter((synth) => {
            return synth.id !== synthId
        })
        onSetSynths(lessSynths)
    }

    function handleBrowse(){
        history.push('/index')
    }

    //make a synthItem for all synths belonging to the currentUser
    const userSynths = synths.filter((synth) => {
        return synth.user.id === currentUser.id;
    })

    const synthItems = userSynths.map((synth) => {
        return <SynthItem onSynthDelete={handleSynthDelete} classes={classes} key={synth.id} synth={synth} onSetCurrentSynth={onSetCurrentSynth} />;
    })

    return(
        <div className="page-container">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.paper} elevation={10}>
                        <Grid item xs={12}>
                            <Paper className={classes.formPaper} elevation={10}>
                                <Typography className={classes.typography} variant="h3">
                                    {currentUser.username}'s synths
                                </Typography>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper} elevation={10}>
                        <Button onClick={handleLogout} variant="outlined" className={classes.editButton}>Logout Button</Button>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper} elevation={10}>
                        {synthItems}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper} elevation={10}>
                        <Button onClick={handleNew} variant="outlined" className={classes.editButton}>Create New Synth</Button>
                        <br></br>
                        <br></br>
                        <Button onClick={handleBrowse} variant="outlined" className={classes.editButton}>Browse Synths</Button>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserPage;