import React from 'react'
import { useHistory } from 'react-router-dom'
import SynthItem from './SynthItem';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function SynthIndex({ classes, synths, currentUser, onSetCurrentSynth, onLogout }) {
    const history = useHistory()

    function handleLogout(){
        onLogout();
    };

    function handleUserRoute(){
        history.push('/userpage')
    };

    const otherSynths = synths.filter((synth) => {
        return synth.user.id !== currentUser.id;
     })
 
     const synthList = otherSynths.map((synth) => {
         return (
             <Grid item xs={4}>
                 <Paper className={classes.paper}>
                    <SynthItem key={synth.id} classes={classes} synth={synth} onSetCurrentSynth={onSetCurrentSynth} />
                    <Grid item xs={12}>
                        <Paper className={classes.formPaper}>
                            <Typography className={classes.typography}>
                                by: {synth.user.username}
                            </Typography>
                        </Paper>
                    </Grid>
                 </Paper>
             </Grid>
         );
     })

    return(
        <div className="page-container">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.paper} elevation={10}>
                        <Grid item xs={12}>
                            <Paper className={classes.formPaper} elevation={10}>
                                <Typography className={classes.typography} variant="h3">
                                    SYNTH INDEX
                                </Typography>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper} elevation={10}>
                        <Button onClick={handleUserRoute} variant="outlined" className={classes.editButton}>User Page</Button>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper} elevation={10}>
                        <Button onClick={handleLogout} variant="outlined" className={classes.editButton}>Logout Button</Button>
                    </Paper>
                </Grid>
                {synthList}
            </Grid>
        </div>
    );
}

export default SynthIndex;