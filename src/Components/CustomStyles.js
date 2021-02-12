import { makeStyles } from '@material-ui/core/styles';
import rackSynthGif from '../Images/racksynthgif.gif';

export default function CustomStyles(){
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            border: "3px solid red",
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
            border: "3px solid purple",
        },
        editButton: {
            backgroundColor: "black",
            '&:hover': {
                backgroundColor: "purple",
            },
            color: "white",
        },
        delButton: {
            backgroundColor: "red",
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
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        formPaper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            border: "3px solid purple",
        },
    }));

    return(
        useStyles()
    );
}