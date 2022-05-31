import React from 'react'
import OscUtils from './OscUtils'

function Key({ note, frequency, index, freq1, onChangeFreq1, onChangeFreq2 }) {
    
    const octave = OscUtils.octave;
    const noteLabel = OscUtils.noteLabel;
    const keyClass = OscUtils.keyClass;
    const noteAccents = OscUtils.noteAccents;

    //event listeners
    function keyPressed(event) {
        if (event.buttons & 1) {
            let dataset = event.target.dataset;

            if (!dataset["pressed"]) {
                dataset["pressed"] = "yes";
                console.log(dataset)
                console.log(freq1)
                let secondFreq = OscUtils.getSecondFreq(index)
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