import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    setCallbotName,
    setTimeStampStart,
    setTimeStampEnd,
    selectBots,
    getBot,
    selectCallbotName
} from '../app/callbotSlice';

// Component CallbotResearcher is the graphical representation of a research form
// It allows users to research calls from a specific bot on a specific period of time
export function CallbotResearcher() {

    const dispatch = useDispatch();
    const bots = useSelector(selectBots);

    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.title}>
                <span>SELECT A BOT</span>
            </Grid>
            <Grid item xs={12}>
                <FormControl className={classes.researchBar}>
                    <InputLabel >Bot</InputLabel>
                    <Select
                        value={useSelector(selectCallbotName)}
                        onChange={e => dispatch(setCallbotName(e.target.value))}
                    >
                        {bots.map((bot, index) => {
                            return <MenuItem value={bot} key={index}>{bot}</MenuItem>
                        })
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    defaultValue="2020-06-01"
                    onChange={event => dispatch(setTimeStampStart(event.target.value))}
                />
                <TextField
                    label="End Date"
                    type="date"
                    defaultValue="2020-06-30"
                    onChange={event => dispatch(setTimeStampEnd(event.target.value))}
                />
            </Grid>
            <Grid item xs={12}>
                <button
                    onClick={() => dispatch(getBot())}
                    className={classes.button}
                >
                    <SearchIcon />
                </button>
            </Grid>
        </Grid>
    );
}


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        display: 'table',
        height: '38%',
        justifyContent: 'center',
        borderRight: '1px solid #ECF0EF',
        borderBottom: '1px solid #ECF0EF',
        textAlign: 'center',
    }, button: {
        background: '#3F51B5',
        border: 0,
        borderRadius: 3,
        color: 'white',
        height: '90%',
        width: '90%',
        textAlign: 'center',
        margin: '10px'
    }, researchBar: {
        width: '90%',
    },
    title: {
        background: '#ECF0EF',
        padding: '5%',
        color: '#3F51B5',
    },

}));