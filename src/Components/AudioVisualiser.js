import React, { Component } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class AudioVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.type = this.props.type
        this.state = { type: true }
    }

    handleAnalyserToggle = () => {
        if(this.state.type === true){
            this.setState({type: false})
        }else {
            this.setState({type: true})
        }
    }

    componentDidUpdate(){
        if(this.state.type === false){
            this.drawScope()
        }else if(this.state.type === true){
            this.drawEq()
        }
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

    drawScope(){
        const { audioData } = this.props;
        const { analyser } = this.props;
        analyser.fftSize = 2048;
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        const sliceWidth = (width * 1.0) / audioData.length;
        let x = 0;
        context.lineWidth = 2;
        context.strokeStyle = '#000000';
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(0, height / 2);

        for (const item of audioData) {
            const y = (item / 255.0) * height;
            context.lineTo(x, y);
            x += sliceWidth;
        }

        context.lineTo(x, height / 2);
        context.stroke();
    }

    render(){
        return(
            <div>
                <canvas className="analyser-container" width="600" height="200" ref={this.canvas} />
                <br></br>
                <FormControlLabel
                    control={<Switch checked={this.state.type} onChange={this.handleAnalyserToggle} name="this.state.type" />}
                    label="Oscilloscope/EQ"
                />
            </div>
        );
    };
}

export default AudioVisualiser;