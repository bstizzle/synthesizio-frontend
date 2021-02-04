import React, { Component } from 'react';

class AudioVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidUpdate(){
        this.drawEq()
    }

    drawEq(){
        const { analyser } = this.props;
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, width, height);

        analyser.getByteFrequencyData(dataArray);

        context.fillStyle = 'rgb(0, 0, 0)';
        context.fillRect(0, 0, width, height);

        let barWidth = (width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for(var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]/2;
    
            context.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
            context.fillRect(x,height-barHeight/2,barWidth,barHeight);
    
            x += barWidth + 1;
        }
    }

    render(){
        return(
            <canvas width="600" height="200" ref={this.canvas} />
        );
    };
}

export default AudioVisualiser;