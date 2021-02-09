import React from 'react'

function Key({ note, frequency, index, freq1, freq2, onChangeFreq1, onChangeFreq2 }) {
    //key rendering details
    const twelfthTwo = Math.pow(2, 1/12);
    let noteLabel;
    let noteAccents;
    let octave;
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
    //end key rendering details

    //determine the interval between oscillator pitches to maintain it
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

    const oscInterval = getOscInterval(freq1, freq2)

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

    //event listeners
    function keyPressed(event) {
        if (event.buttons & 1) {
            let dataset = event.target.dataset;

            if (!dataset["pressed"]) {
                dataset["pressed"] = "yes";
                console.log(dataset)
                console.log(freq1)
                let secondFreq = getSecondFreq(index)
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