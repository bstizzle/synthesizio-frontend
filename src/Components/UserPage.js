import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import SynthItem from './SynthItem';
import Button from '@material-ui/core/Button';

function UserPage({ onSetCurrentSynth, currentUser }) {
    const [userSynths, setUserSynths] = useState(currentUser.synths)

    const history = useHistory()
    console.log(userSynths)

    //set currentSynth state to undefined, so the editor will use defaults and no primary-key-id, and go to the editor
    function handleNew(){
        onSetCurrentSynth(undefined)
        history.push('/syntheditor')
    }

    function handleLogout(){
        history.push('/')
    }

    //make a synthItem for all synths belonging to the currentUser
    const synthItems = userSynths.map((synth) => {
        return <SynthItem key={synth.id} synth={synth} onSetCurrentSynth={onSetCurrentSynth} userSynths={userSynths} onSetUserSynths={setUserSynths}/>;
    })

    return(
        <div>
            <Button onClick={handleLogout} variant="contained">Logout Button</Button>
            <br></br>
            USER PAGE
            {synthItems}
            <br></br>
            <Button onClick={handleNew} variant="contained">Create New Synth</Button>
        </div>
    )
}

export default UserPage;