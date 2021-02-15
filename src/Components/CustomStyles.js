import { makeStyles } from '@material-ui/core/styles';
import rackSynthGif from '../Images/racksynthgif.gif';
import woodTexture from '../Images/woodTexture.png';

export default function CustomStyles(){
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
                backgroundColor: 'rgb(44, 53, 57)',
                color: 'white',
                borderColor: 'white',
                '& label.Mui-focused': {
                    color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                },
            }
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            backgroundImage: `url(${woodTexture})`,
            backgroundSize: "cover",
            // border: "3px solid red",
        },
        typography: {
            fontFamily: 'Righteous'
        },
        itemRoot: {
            flexGrow: 1,
            padding: 5,
        },
        itemPaper: {
            backgroundImage: `url(${rackSynthGif})`,
            backgroundSize: "cover",
            padding: theme.spacing(2),
            textAlign: 'center',
            // border: "3px solid purple",
        },
        loginButton: {
            '&:hover': {
                backgroundColor: "black",
            },
        },
        editButton: {
            backgroundColor: 'rgb(44, 53, 57)',
            borderColor: 'white',
            '&:hover': {
                backgroundColor: "black",
            },
            color: "white",
        },
        delButton: {
            backgroundColor: "red",
            '&:hover': {
                backgroundColor: "darkred",
            },
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '50%',
            margin: 'auto'
        },
        modalPaper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            '& .MuiSelect-select': {
                color: "white"
            },
            '& .MuiInputLabel-root': {
                color: "white"
            }
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        formPaper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            backgroundColor: 'rgb(44, 53, 57)',
            border: "3px solid white",
            color: "white",
            '& label.Mui-focused': {
                color: 'white',
            },
            '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                    borderColor: 'white',
                },
                '&:hover fieldset': {
                    borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'white',
                },
            },
        },
        controlLabel: {
            backgroundColor: 'rgb(44, 53, 57)',
            width: '50%',
            margin: 'auto',
            border: "3px solid white",
            '& .MuiFormControlLabel-root': {
                color: 'white',
                backgroundColor: 'rgb(44, 53, 57)',
            }
        }
    }));

    return(
        useStyles()
    );
}