import React from 'react'

const twelfthTwo = Math.pow(2, 1/12);

//determine the interval between oscillator pitches to maintain it
export function getOscInterval(oscFreq1, oscFreq2) {
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

export function getSecondFreq(oscInterval, firstIndex) {
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