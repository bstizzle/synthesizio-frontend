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
             <Grid key={synth.id} item xs={4}>
                 <Paper key={synth.id} className={classes.paper}>
                     <SynthItem key={synth.id} classes={classes} synth={synth} onSetCurrentSynth={onSetCurrentSynth} />
                 </Paper>
             </Grid>
         );
     })

    return(
        <div className="page-container">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h3">
                            SYNTH INDEX
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Button onClick={handleUserRoute} variant="contained">User Page</Button>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Button onClick={handleLogout} variant="contained">Logout Button</Button>
                    </Paper>
                </Grid>
                {synthList}
            </Grid>
        </div>
    );
}

export default SynthIndex;