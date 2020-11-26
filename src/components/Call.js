import { Grid } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import img from '../ressources/phone_man.png';
import {
    selectCallerNumer,
    selectRecording,
    selectTranscript,
    selectDiscussionStartTime,
    selectCallDuration,
    selectSessionId
} from '../app/callSlice'
import { selectLoader } from '../app/utilSlice';

export function Call() {
    const recording = useSelector(selectRecording);
    const transcript = useSelector(selectTranscript);
    const sessionId = useSelector(selectSessionId);
    const discussionStartTime = useSelector(selectDiscussionStartTime);
    const callDuration = useSelector(selectCallDuration);
    const loader = useSelector(selectLoader);
    const classes = useStyles();
    var date = discussionStartTime ? new Date(discussionStartTime) : null;
    var duration = callDuration ? new Date(callDuration * 1000) : null;
    return (
        <Grid container className={classes.root}>
            <Grid item className={classes.info}>
                <div className={classes.title}>
                    <span >CALL INFORMATIONS</span>
                </div>
                <Grid container>
                    <Grid item xs={6}>{
                        date && <span className={classes.left} style={{ fontSize: 'large' }} >{date.getHours()}h{date.getMinutes()}</span>
                    }

                    </Grid>
                    <Grid item xs={6}>
                        <span className={classes.right} style={{ fontSize: 'large' }}>{useSelector(selectCallerNumer)}</span>
                    </Grid>
                    <Grid item xs={6}>{
                        date && <span className={classes.left}>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span>
                    }
                    </Grid>
                    <Grid item xs={6} >{
                        duration &&
                        <span className={classes.right}>{duration.getMinutes()}:{duration.getSeconds()}s</span>
                    }
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.audio}>{
                recording !== null || sessionId === null ?
                    <AudioPlayer download={true} spacing={2} src={recording} />
                    : <Grid container>
                        <Grid item xs={4} className={classes.center}>
                            <ErrorIcon className={classes.logo} />
                        </Grid>
                        <Grid item xs={8}>
                            <span className={classes.error}> SORRY WE CANNOT FIND RECORDING FOR THIS CALL </span>
                        </Grid>

                    </Grid>
            }
            </Grid>
            <Grid item className={classes.bubblesContainer}>{
                loader ?
                    <div style={{ textAlign: 'center' }} >
                        <CircularProgress className={classes.loader} />
                    </div>
                    :
                    (sessionId !== null ?
                        (transcript.length > 0 ?
                            transcript.map((ts, index) => {
                                var bubbleStyle = (ts.speaker === 'bot' ? classes.botBubble : classes.speakerBubble)
                                return (
                                    <div key={index} className={classes.bubbleContainer} >
                                        <span className={bubbleStyle}> {ts.say}</span>
                                    </div>
                                )
                            })
                            : <Grid container>
                                <Grid item xs={12} className={classes.center}>
                                    <img src={img} className={classes.img} alt="" />
                                </Grid>
                                <Grid item xs={12} className={classes.center}>
                                    <span className={classes.error}> SORRY WE CANNOT FIND TRANSCRIPT FOR THIS CALL </span>
                                </Grid>
                            </Grid>
                        )
                        : <Grid container>
                            <Grid item xs={12} className={classes.center}>
                                <img src={img} className={classes.img} alt="" />
                            </Grid>
                            <Grid item xs={12} className={classes.center}>
                                <span className={classes.error}> Welcome to my app, please select a bot and then select a call to listen to it and read its transcription</span>
                            </Grid>

                        </Grid>
                    )}
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%'

    },
    info: {
        flexGrow: 1,
        borderBottom: '1px solid #ECF0EF',
        width: '100%',
        height: '18%',
        textAlign: 'center',
        resize: 'vertical'
    },
    title: {
        background: '#ECF0EF',
        color: '#3F51B5',
        width: '98%',
        padding: '1%'
    },
    date: {
        background: '#DEE3E2',
        color: 'white',
        borderRadius: '2px',
        float: 'left',
        margin: '1%'
    },
    audio: {
        flexGrow: 1,
        width: '70%',
        height: '12%',
        justify: 'center',
        padding: "20px",
        borderBottom: '1px solid #ECF0EF',
    },
    speakerBubble: {
        borderRadius: '20px',
        margin: '10px',
        padding: '10px',
        display: 'inline-block',
        background: '#9FB6F3',
        float: 'right',
        boxShadow: '2px 2px 10px gray',
    },
    botBubble: {
        borderRadius: '20px',
        margin: '10px',
        padding: '10px',
        display: 'inline-block',
        background: 'white',
        boxShadow: '2px 2px 10px gray',
    },
    bubblesContainer: {
        width: '100%',
        height: '67%',
        justifyContent: 'center',
        overflow: 'auto',
        margin: '1%',
        padding: '2%',
        background: '#ECF0EF',
        borderRadius: '10px',
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
    bubbleContainer: {
        width: '100%',
        minHeight: '30px',
        background: 'transparent',
    },
    left: {
        color: '#3F51B5',
        float: 'left',
        marginLeft: '5%',
        marginTop: '10px'
    },
    right: {
        color: '#3F51B5',
        float: 'right',
        marginRight: '5%',
        marginTop: '10px'
    },
    error: {
        color: '#3F51B5',
        fontSize: 'large',
        marginTop: '30px',
        padding: '30px'
    },
    img: {
        width: '250px',
        height: '300px',
    },
    logo:{
        color: '#3F51B5',
        float: 'right'
    },
    loader: {
        width: '100%',
        height: '100%',
        textAlign: 'center'
    },
    center: {
        textAlign: 'center'
    }
}));
