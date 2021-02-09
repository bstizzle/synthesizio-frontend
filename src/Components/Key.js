import React from 'react'

function Key({note, frequency, index}) {
    const twelfthTwo = Math.pow(2, 1/12);
    const keyFreq = Math.round((27.5 * Math.pow(twelfthTwo, index)) * 100)/100

    //key rendering details
    let noteLabel;
    let noteAccents;
    let octave;

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
  
    //event listeners
    function keyPressed(event) {
        if (event.buttons & 1) {
            let dataset = event.target.dataset;
            console.log(dataset)

            if (!dataset["pressed"]) {
                dataset["pressed"] = "yes";
                console.log(dataset)
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
        <div className="key" data-id={index} onMouseDown={keyPressed} onMouseUp={keyReleased} >
            <div className="key-label">
                {noteLabel === note ? noteLabel : noteAccents}
                <br></br>
                <sub>{octave}</sub>
            </div>
        </div>
    )
}

export default Key;