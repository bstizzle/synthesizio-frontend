import React from 'react'
import { getOscInterval, getSecondFreq } from './OscUtils'

function Key({ note, frequency, index, freq1, freq2, onChangeFreq1, onChangeFreq2 }) {
    let noteLabel;
    let noteAccents;
    let octave;
    let keyClass = "white-key";
    
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
    //end key rendering details

    const oscInterval = getOscInterval(freq1, freq2)

    //event listeners
    function keyPressed(event) {
        if (event.buttons & 1) {
            let dataset = event.target.dataset;

            if (!dataset["pressed"]) {
                dataset["pressed"] = "yes";
                console.log(dataset)
                console.log(freq1)
                let secondFreq = getSecondFreq(oscInterval, index)
                console.log(secondFreq)
                onChangeFreq1(frequency)
                onChangeFreq2(secondFreq)
            }
        }
    }

    function keyReleased(event) {
        let dataset = event.target.dataset;
      
        if (dataset && dataset["pressed"]) {
          delete dataset["pressed"];
          console.log(dataset)
        }
    }
    //end event listeners

    return(
        <div className={keyClass} data-id={index} onMouseDown={keyPressed} onMouseUp={keyReleased} >
            <div className="key-label">
                {noteLabel === note ? noteLabel : noteAccents}
                <br></br>
                <sub>{octave}</sub>
            </div>
        </div>
    )
}

export default Key;