import React from 'react';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';

function SynthItem({synth, onSetCurrentSynth, userSynths, onSetUserSynths }) {
    const history = useHistory()

    //set the currentSynth state to the selected one from the list, and bring the params to the editor
    function handleEdit(){
        onSetCurrentSynth(synth)
        history.push('/syntheditor')
    }
    console.log(userSynths)
    function handleDelete(){
        fetch(`${process.env.REACT_APP_API_BASE_URL}/synths/${synth.id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
        .then(deletedSynth => {
            //remove the deleted synth from the userSynths state array, so the page reflects the database after the delete
            let i = 0;
            let x;
            userSynths.forEach(synth => {
                if(synth.id === deletedSynth.id){
                    x = i
                }
                i++;
            })
            userSynths.splice(x, 1)
            onSetUserSynths(userSynths)
            alert("Synth deleted!")
        })
    }

    //render all the user's synths with a button routing to the editor and a delete button
    return(
        <div>
            <Button onClick={handleEdit} variant="contained" color="primary">{synth.name}</Button>
            <Button onClick={handleDelete} variant="contained" color="secondary">X</Button>
        </div>
    )
}

export default SynthItem;