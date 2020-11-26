import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { selectCalls } from '../app/callbotSlice';
import { setCall } from '../app/callSlice';
import { Grid } from '@material-ui/core';

// Component CallList is the graphical representation of a list of calls
// It allows users to know how many calls contains a specific bot on a specific period of time
// It allows users to select a specific call and then see its informations

export function CallList() {
    const selector = useSelector(selectCalls);
    const calls = useSelector(selectCalls);
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List
                subheader={
                    <ListSubheader disableSticky={true} >
                        {calls != null ? (
                            <span> {calls.length} CALLS</span>
                        ) : <span> CALLS LIST</span>}
                    </ListSubheader>
                }
            >
                {selector != null && selector.map((call) => {
                    var date = new Date(call.discussionStartTime);
                    var duration = new Date(call.callDuration * 1000);
                    return <ListItem button key={call.sessionId} onClick={e => { dispatch(setCall(call)) }}>
                        <Grid container>
                            <Grid item xs={6}>
                                <span className={classes.left}>{date.getHours()}h{date.getMinutes()}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span className={classes.right}>{call.callerNumber}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <span className={classes.left}>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>
                            </Grid>
                            <Grid item xs={6} >
                                <span className={classes.right}>{duration.getMinutes()}:{duration.getSeconds()}s</span>
                            </Grid>
                        </Grid>
                    </ListItem>;
                })
                }
            </List>
        </div>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '62%',
        borderRight: '1px solid #ECF0EF',
        '&::-webkit-scrollbar': {
            width: '0.4em',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',

        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#DEE3E2',
            borderRadius: '10px',
        }
    },
    infoContainer: {
        flexGrow: 1,
        marginTop: '5px',
        marginBottom: '5px'
    },
    container: {
        display: 'table',
    },
    left: {
        color: '#3F51B5',
        float: 'left',
    },
    right: {
        color: '#3F51B5',
        float: 'right'
    }
}));