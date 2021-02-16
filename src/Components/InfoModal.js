import React, { useState } from 'react'

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function InfoModal({ classes, topic }) {
    //modal state
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    //descriptions for each of the info popups
    const paramInfo = {
        "Keyboard": "Click on keys to play your synth at that pitch, the first oscillator frequency will change to the key you click, with the second frequency mainting its interval above or below.",
        "Distortion": "Distortion creates a non-linear relationship between the input and the output of a sound. It does this by imposing another waveform on top of your sound, the more vertical the curve the more harsh the distortion. Distortion Gain determines the extremes of the change. Softer distortion provides more natural sound, while harder introduces more clipping/peaking. As an example, the default soft distortion curve used can be viewed here: https://www.desmos.com/calculator/jsqwtqac8p and the hard distortion curve here: https://www.desmos.com/calculator/nukwzztcvt",
        "Oscillators": "The oscillators produce your basic sound. You can select between four waveforms, which you can view in the Oscilliscope setting of the visualiser. You can set the overall gain (volume) for both oscillators, as well as set the frequency (or note/tone) of each oscillator separately.",
        "Audio Visualiser": "The Audio Visualiser turns your sound into visual feedback. The EQ (or 'equalizer') setting shows you a graph of the volume of the individual frequencies of the sound, lowest pitch on the left and highest on the right. The Oscilliscope setting shows you the final output waveform itself.",
        "Player Keyboard": "Here, after selected an octave (full range of one set of pitches), you can play notes either by clicking with your mouse (and you can hold to sustain) or you can play with your keyboard, the letter at the bottom of each key is they key to press. Also for this keyboard, your attack and release envelope set in the editor is applied. Attack is how long your sound takes to reach its full volume, and release is how long it take to fully mute.  Normally an envelope would also have a sustain (how long the sound stays at max volume) and decay (the rate/curve at which the volume drops off), but those features are to come later. "
    }

    return(
        <div className="modal-div">
            <Button className={classes.editButton} variant="outlined" onClick={handleOpen}>
                <Typography className={classes.typography}>
                    {topic}
                </Typography>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={open}>
                    <div className={classes.modalPaper}>
                        <Typography className={classes.typography}>
                            {paramInfo[topic]}
                        </Typography>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default InfoModal;