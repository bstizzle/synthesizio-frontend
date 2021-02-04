import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AudioVisualiser from './AudioVisualiser';
import SynthForm from './SynthForm';
import Button from '@material-ui/core/Button';


class SynthEditor extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.history)
        this.state = { audioData: new Uint8Array(0) };
        // this.tick = this.tick.bind(this);
    };

    handleLogout = () => {
        this.props.history.push('/')
    };

    handleSave = () => {
        this.props.history.push('/userpage')
    };

    // componentDidMount(){

    // }

    // componentDidUpdate(){

    // }

    // componentWillUnmount(){

    // }

    render(){
        return(
            <div>
                <Button onClick={this.handleLogout} variant="contained">Logout Button</Button>
                <br></br>
                SYNTH EDITOR PAGE
                <AudioVisualiser />
                <SynthForm />
                <br></br>
                <Button onClick={this.handleSave} variant="contained">Save/Create/Back Button</Button>
            </div>
        );
    };
}

export default withRouter(SynthEditor);