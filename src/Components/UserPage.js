import React from 'react';
import { useHistory } from 'react-router-dom'
import SynthItem from './SynthItem';
import Button from '@material-ui/core/Button';

function UserPage({ onSetCurrentSynth, currentUser, synths, onSetSynths }) {
    const history = useHistory()

    //set currentSynth state to undefined, so the editor will use defaults and no primary-key-id, and go to the editor
    function handleNew(){
        onSetCurrentSynth(undefined)
        history.push('/syntheditor')
    }

    function handleLogout(){
        history.push('/')
    }

    function handleSynthDelete(synthId){
        const lessSynths = synths.filter((synth) => {
            return synth.id !== synthId
        })
        onSetSynths(lessSynths)
    }

    //make a synthItem for all synths belonging to the currentUser
    const userSynths = synths.filter((synth) => {
        return synth.user.id === currentUser.id;
    })

    const synthItems = userSynths.map((synth) => {
        return <SynthItem onSynthDelete={handleSynthDelete} key={synth.id} synth={synth} onSetCurrentSynth={onSetCurrentSynth} />;
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