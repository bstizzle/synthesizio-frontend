import React from 'react';
import { useHistory } from 'react-router-dom'
import SynthItem from './SynthItem';
import Button from '@material-ui/core/Button';

function UserPage({ synths, onSetCurrentSynth }) {
    const history = useHistory()

    function handleEdit(){
        // onSetCurrentSynth()
        history.push('/syntheditor')
    }

    function handleLogout(){
        history.push('/')
    }

    const synthItems = synths.map((synth) => {
        return <SynthItem key={synth.id} synth={synth} />;
    })

    return(
        <div>
            <Button onClick={handleLogout} variant="contained">Logout Button</Button>
            <br></br>
            USER PAGE
            {synthItems}
            <br></br>
            <Button onClick={handleEdit} variant="contained">Create New Synth</Button>
        </div>
    )
}

export default UserPage;