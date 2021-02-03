import React from 'react';
import { useHistory } from 'react-router-dom'

function Login(props) {
    const history = useHistory()

    function handleLogin(){
        history.push('/userpage')
    }

    return(
        <div>
            LOGIN PAGE
            <br></br>
            <button onClick={handleLogin}>login button</button>
        </div>
    )
}

export default Login;