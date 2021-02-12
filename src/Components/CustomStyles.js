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
        }
    }));

    return(
        useStyles()
    );
}