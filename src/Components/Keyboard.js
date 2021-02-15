import React from 'react'
import { freqTones } from "./HashMaps";
import Key from "./Key";
import InfoModal from "./InfoModal";

function Keyboard({ classes, freq1, freq2, onFreq1Change, onFreq2Change }){
    const keyList = Object.entries(freqTones)

    const twelfthTwo = Math.pow(2, 1/12);

    const fullKeyboard = keyList.map(key => {
        const keyIndex = parseInt(key[0], 10)
        const keyFreq = Math.round((27.5 * Math.pow(twelfthTwo, keyIndex)) * 100)/100

        return <Key key={keyIndex} index={keyIndex} note={key[1]} frequency={keyFreq} freq1={freq1} freq2={freq2} onChangeFreq1={onFreq1Change} onChangeFreq2={onFreq2Change} />;
    });

    return(
        <div className="keyboard-div">
            <InfoModal classes={classes} topic="Keyboard" />
            <div className="keyboard-container">
                <div className="keyboard">
                    {fullKeyboard}
                </div>
            </div>
        </div>
    )
}

export default Keyboard;