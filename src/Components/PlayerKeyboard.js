import React from 'react';
import PlayerKey from "./PlayerKey";
import InfoModal from "./InfoModal";
import { freqTones } from "./HashMaps";

function PlayerKeyboard({ synth, classes }){
    console.log(synth)
    const keyList = Object.entries(freqTones)
    const twelfthTwo = Math.pow(2, 1/12);

    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let masterGainNode = audioContext.createGain();
    masterGainNode.connect(audioContext.destination);
    masterGainNode.gain.value = 0;

    let attackTime = 1;
    let releaseTime = 1;

    const fullKeyboard = keyList.map(key => {
        const keyIndex = parseInt(key[0], 10)
        const keyFreq = Math.round((27.5 * Math.pow(twelfthTwo, keyIndex)) * 100)/100

        return <PlayerKey playTone={playTone} stopTone={stopTone} key={keyIndex} index={keyIndex} note={key[1]} frequency={keyFreq} freq1={synth.osc_freq_1} freq2={synth.osc_freq_2} type1={synth.osc_type_1} type2={synth.osc_type_2}/>;
    });

    function playTone(freq, type) {
        let osc = audioContext.createOscillator();
        osc.connect(masterGainNode);

        osc.type = type

        osc.frequency.value = freq

        osc.start();
        masterGainNode.gain.cancelScheduledValues(audioContext.currentTime);
        masterGainNode.gain.linearRampToValueAtTime(synth.osc_gain, audioContext.currentTime + attackTime)

        return osc;
    }

    function stopTone(osc) {
        masterGainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + attackTime + releaseTime);
        setTimeout(function(){osc.stop()}, (attackTime + releaseTime) * 1000)
    }

    return(
        <div className="keyboard-div">
            <InfoModal classes={classes} topic="Keyboard" />
            <div className="keyboard-container">
                <div className="keyboard">
                    {fullKeyboard}
                </div>
            </div>
        </div>
    );
}

export default PlayerKeyboard;