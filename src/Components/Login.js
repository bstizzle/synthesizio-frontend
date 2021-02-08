import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function Login({ users, onSetUsers, onSetCurrentUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const history = useHistory()

    //Material-UI styling
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            border: "3px solid red",
        },
    }));

    const classes = useStyles();
    ////////////////////

    function handleLogin(event){
        event.preventDefault();
        const user = users.find((user) => {
            //no password auth currently, fake only
            return (user.username === username);
        })
        if(user){
            alert(`Welcome, ${username}!`)
            onSetCurrentUser(user)
            history.push('/userpage')
        }else {
            alert(`Incorrect username or password`)
        }
    }

    //currently no feedback for failed signup (duplicate username)
    function handleSignup(event){
        event.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: newUsername,
                password: newPassword
            }),
        })
        .then(resp => resp.json())
        .then(newUser => {
            console.log(newUser)
            onSetCurrentUser(newUser)
            onSetUsers([...users, newUser])
            alert(`Thanks for joining, ${newUsername}!`)
            history.push('/userpage')
        }) 
    }

    return(
        <div className="page-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <h1>Welcome to Synthesiz.io!</h1>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <form onSubmit={handleLogin} className={classes.root} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)} />
                            <TextField id="outlined-basic" label="Password" type='password' variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
                            <br></br>
                            <Button type='submit' variant="contained">Login</Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <form onSubmit={handleSignup} className={classes.root} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="Username" variant="outlined" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
                            <TextField id="outlined-basic" label="Password" type='password' variant="outlined" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                            <br></br>
                            <Button type='submit' variant="contained">Signup</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;