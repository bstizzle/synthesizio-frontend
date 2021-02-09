import React from 'react'

function Key({note, frequency, index}) {
    const twelfthTwo = Math.pow(2, 1/12);
    const keyFreq = Math.round((27.5 * Math.pow(twelfthTwo, index)) * 100)/100

    let noteLabel;
    let noteAccents;

    if(note.length === 1){
        noteLabel = note;
    }else{
        noteAccents = note.split("/")[0]
    }
  
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

    return(
        <div className="key" data-id={index} onMouseDown={keyPressed} onMouseUp={keyReleased} >
            <div className="key-label">
                {noteLabel === note ? noteLabel : noteAccents}
            </div>
        </div>
    )
}

export default Key;