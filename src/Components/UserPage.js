import React from 'react';
import { useHistory } from 'react-router-dom'
import SynthItem from './SynthItem';

function UserPage(props) {
    const history = useHistory()

    function handleEdit(){
        history.push('/syntheditor')
    }

    function handleLogout(){
        history.push('/')
    }

    return(
        <div>
            <button onClick={handleLogout}>Logout Button</button>
            <br></br>
            USER PAGE
            <SynthItem />
            <br></br>
            <button onClick={handleEdit}>Create New Synth</button>
        </div>
    )
}

export default UserPage;