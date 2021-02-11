import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Login({ users, onSetUsers, onSetCurrentUser, handleAuthLogin }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [errors, setErrors] = useState("")

    const history = useHistory()

    const newUser = {
        username: newUsername,
        password: newPassword
    }

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
        event.preventDefault()
            
        fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            credentials: 'include',
        })
            .then(resp => resp.json())
            .then(response => {
                console.log(response)
                if (response.logged_in) {
                    handleAuthLogin(response.user)
                    history.push('/userpage')
                } else {
                    setErrors(response.errors)
                }
            })
            .catch(console.log('api errors:' + errors))

        
        // const user = users.find((user) => {
        //     //no password auth currently, fake only
        //     return (user.username === username);
        // })
        // if(user){
        //     alert(`Welcome, ${username}!`)
        //     onSetCurrentUser(user)
        //     history.push('/userpage')
        // }else {
        //     alert(`Incorrect username or password`)
        // }
    }

    function handleErrors(){
        return (
            <div>
                <ul>
                {this.state.errors.map(error => {
                    return <li key={error}>{error}</li>
                })}
                </ul>
            </div>
        )
    };
    
    function handleSignup(event){
        event.preventDefault();
        let validLogin = true;

        users.forEach((user) => {
            if(user.username === newUsername){
                validLogin = false;
            }
        })
        if(validLogin){
            fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
            .then(resp => resp.json())
            .then(newUser => {
                console.log(newUser)
                onSetCurrentUser(newUser)
                onSetUsers([...users, newUser])
                alert(`Thanks for joining, ${newUsername}!`)
                history.push('/userpage')
            }) 
        }else{
            alert("Username taken!")
        }
    }

    return(
        <div className="page-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h1">
                            Welcome to Synthesiz.io!
                        </Typography>
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