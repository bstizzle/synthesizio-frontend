import React from 'react';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';

function Login({ users }) {
    const history = useHistory()

    function handleLogin(){
        history.push('/userpage')
    }

    return(
        <div>
            LOGIN PAGE
            <br></br>
            <Button onClick={handleLogin} variant="contained" >Login Button</Button>
        </div>
    )
}

export default Login;