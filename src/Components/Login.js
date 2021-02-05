import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function Login({ users, onSetCurrentUser }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory()

    //Material-UI styling
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));

    const classes = useStyles();
    ////////////////////

    function handleLogin(event){
        event.preventDefault();
        console.log(username)
        console.log(password)
        const user = users.find((user) => {
            return (user.username === username && user.password_digest === password);
        })
        if(user){
            alert(`Welcome, ${username}!`)
            onSetCurrentUser(user)
            history.push('/userpage')
        }else {
            alert(`Incorrect username or password`)
        }
    }

    return(
        <div>
            LOGIN PAGE
            <br></br>
            <form onSubmit={handleLogin} className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)} />
                <TextField id="outlined-basic" label="Password" type='password' variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
                <br></br>
                <Button type='submit' variant="contained">Login</Button>
            </form>
        </div>
    )
}

export default Login;