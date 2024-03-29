import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Login({ classes, handleAuthLogin, loggedIn }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [loginSwitch, setLoginSwitch] = useState("login")

    const url = process.env.NODE_ENV === 'production' ? "https://synthesizio-backend.herokuapp.com" : "http://localhost:3000"

    const history = useHistory()

    useEffect(() => {
        if(loggedIn === true){
            history.push("/userpage")
        }
    })

    function handleLogin(event){
        event.preventDefault()
            
        fetch(`${url}/login`, {
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
                console.log(response.user)
                if(response.logged_in) {
                    handleAuthLogin(response.user)
                    history.push('/userpage')
                }else{
                    alert("Invalid username or password.")
                }
            })
    }
    
    function handleSignup(event){
        event.preventDefault();
        fetch(`${url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: newUsername,
                password: newPassword,
            }),
            credentials: 'include',
        })
            .then(resp => resp.json())
            .then(response => {
                console.log(response)
                if(response.status === 'created'){
                    handleAuthLogin(response.user)
                }
                else{
                    alert("Username taken!")
                }
            })
    }

    function handleSwitch(){
      if(loginSwitch === "login"){
        setLoginSwitch("signup")
      }
      else{
        setLoginSwitch("login")
      }
    }

    return(
        <div className="page-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={10}>
                        <Grid item xs={12}>
                            <Paper className={classes.formPaper} elevation={10}>
                                <Typography className={classes.typography} variant="h1">
                                    Welcome to Synthesiz.io!
                                </Typography>
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
                {loginSwitch === "login" ?
                  <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={10}>
                      <form onSubmit={handleLogin} className={classes.root} noValidate autoComplete="off">
                          <TextField label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)} />
                          <TextField label="Password" type='password' variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
                          <br></br>
                          <Button type='submit' variant="outlined" className={classes.loginButton}>Login</Button>
                      </form>
                    </Paper>
                  </Grid>
                  :
                  <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={10}>
                        <form onSubmit={handleSignup} className={classes.root} noValidate autoComplete="off">
                            <TextField label="Username" variant="outlined" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
                            <TextField label="Password" type='password' variant="outlined" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                            <br></br>
                            <Button type='submit' variant="outlined" className={classes.loginButton}>Signup</Button>
                        </form>
                    </Paper>
                  </Grid>
                }
                <Grid item xs={12}>
                  <Paper className={classes.paper} elevation={10}>
                    <Button type="submit" variant="outlined" className={classes.loginButton} onClick={handleSwitch}>
                      {loginSwitch === "login" ? "Sign Up?" : "Log In?"}
                    </Button>
                  </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;