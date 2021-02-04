import React from 'react';
import { useHistory } from 'react-router-dom'
import SynthItem from './SynthItem';
import Button from '@material-ui/core/Button';

function UserPage({ synths }) {
    const history = useHistory()

    function handleEdit(){
        history.push('/syntheditor')
    }

    function handleLogout(){
        history.push('/')
    }

    return(
        <div>
            <Button onClick={handleLogout} variant="contained">Logout Button</Button>
            <br></br>
            USER PAGE
            <SynthItem />
            <br></br>
            <Button onClick={handleEdit} variant="contained">Create New Synth</Button>
        </div>
    )
}

export default UserPage;