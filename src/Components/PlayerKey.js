import React, { useState, useEffect } from 'react';
import { noteKeys } from './HashMaps';

function PlayerKey({ note, frequency, index, freq1, freq2, type1, type2, playTone, stopTone }){
    const twelfthTwo = Math.pow(2, 1/12);
    let noteLabel;
    let noteAccents;
    let octave;
    let oscList = [];
    let keyClass = "white-key";
    //change key div class for black keys
    if(note.includes("C#") || note.includes("D#") || note.includes("F#") || note.includes("G#") || note.includes("A#")){
        keyClass = "black-key";
    }

    if(note.length === 1){
        noteLabel = note;
    }else{
        noteAccents = note.split("/")[0]
    }

    if(index < 12){
        octave = 0;
    }else if(index < 24){
        octave = 1;
    }else if(index < 36){
        octave = 2;
    }else if(index < 48){
        octave = 3;
    }else if(index < 60){
        octave = 3;
    }else if(index < 72){
        octave = 4
    }else if(index < 84){
        octave = 5;
    }else if(index < 96){
        octave = 6;
    }

    function getOscInterval(oscFreq1, oscFreq2) {
        let oscIndex1 = 0;
        let freq = Math.round((27.5 * Math.pow(twelfthTwo, oscIndex1)) * 100)/100

        //find freq1 index
        while(freq !== oscFreq1){
            freq = Math.round((27.5 * Math.pow(twelfthTwo, oscIndex1)) * 100)/100
            oscIndex1++;
        }
        
        //reset freq and find freq2 index
        let oscIndex2 = 0;
        freq = Math.round((27.5 * Math.pow(twelfthTwo, oscIndex2)) * 100)/100

        while(freq !== oscFreq2){
            freq = Math.round((27.5 * Math.pow(twelfthTwo, oscIndex2)) * 100)/100
            oscIndex2++;
        }

        //return the interval
        if(oscIndex1 > oscIndex2){
            return [oscIndex1 - oscIndex2, "descending"];
        }else{
            return [oscIndex2 - oscIndex1, "ascending"];
        }
    }

    function getSecondFreq(firstIndex) {
        let secondIndex;
        if(oscInterval[1] === "ascending"){
            secondIndex = firstIndex + oscInterval[0];
        }else{
            secondIndex = firstIndex - oscInterval[0];
        }
        //raise the frequency by an octave if it would be under of the range of the keyboard
        while(Math.sign(secondIndex) === -1){
            secondIndex += 12;
        }
         //lower the frequency by an octave if it would be over of the range of the keyboard
        while(secondIndex > 88){
            secondIndex -= 12;
        }
        let secondFreq = Math.round((27.5 * Math.pow(twelfthTwo, secondIndex)) * 100)/100
        return secondFreq;
    }

    const oscInterval = getOscInterval(freq1, freq2)

    const secondFreq = getSecondFreq(index)

    //upon keypress, run our oscillator creation and attack envelope function
    function notePressed(event) {
        if (event.buttons & 1) {
            let dataset = event.target.dataset;
        
            if (!dataset["pressed"]) {
                dataset["pressed"] = "yes";
                oscList.push(playTone(frequency, type1))
                oscList.push(playTone(secondFreq, type2))
                console.log(oscList)
            }
        }
    }

    //upon keyrelease (both on mouseup and mouseleave) run our oscillator stop and release envelope function
    function noteReleased(event) {
        let dataset = event.target.dataset;
      
        if (dataset && dataset["pressed"]) {
            oscList.forEach((osc) => {
                stopTone(osc)
            })
            oscList.shift()
            oscList.shift()
            delete dataset["pressed"];
            console.log(oscList)
        }
    }

    //custom hook for handling key presses
    function useKeyPress(targetKey) {
        // State for keeping track of whether key is pressed
        const [keyPressed, setKeyPressed] = useState(false);
      
        // If pressed key is our target key then set to true
        function downHandler({ key }) {
            if (key === targetKey) {
                oscList.push(playTone(frequency, type1))
                oscList.push(playTone(secondFreq, type2))
                setKeyPressed(true);
            }
        }
      
        // If released key is our target key then set to false
        const upHandler = ({ key }) => {
            if (key === targetKey) {
                oscList.forEach((osc) => {
                    stopTone(osc)
                })
                oscList.shift()
                oscList.shift()
                setKeyPressed(false);
            }
        };
      
        // Add event listeners
        useEffect(() => {
            window.addEventListener('keydown', downHandler);
            window.addEventListener('keyup', upHandler);
            // Remove event listeners on cleanup
            return () => {
                window.removeEventListener('keydown', downHandler);
                window.removeEventListener('keyup', upHandler);
            };
        }, []); // Empty array ensures that effect is only run on mount and unmount
      
        return keyPressed;
    }

    let keyName = noteKeys[note]
    useKeyPress(keyName);

    return(
        <div className={keyClass} data-id={index} onMouseDown={notePressed} onMouseLeave={noteReleased} onMouseUp={noteReleased} >
            <div className="key-label">
                {noteLabel === note ? noteLabel : noteAccents}
                <br></br>
                <sub>{octave}</sub>
                <br></br>
                <sub>{keyName}</sub>
            </div>
        </div>
    );
}

export default PlayerKey