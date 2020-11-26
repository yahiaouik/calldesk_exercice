import React from 'react';
import './App.css';
import { CallbotResearcher } from './components/CallbotResearcher';
import Grid from '@material-ui/core/Grid';
import { CallList } from './components/CallList';
import { Call } from './components/Call'
import { makeStyles } from '@material-ui/core/styles';
import { AppHeader } from './components/AppHeader';
import Hidden from '@material-ui/core/Hidden';

function App() {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.header}>
          <AppHeader />
        </Grid>
        <Hidden mdDown>
          <Grid item xs={2} className={classes.containers}>
            <CallbotResearcher />
            <CallList />
          </Grid>
        </Hidden>
        <Grid item lg={10} md={12} sm={12} xs={12}  className={classes.containers}>
          <Call />
        </Grid>
        <Grid item xs={12} className={classes.footer}>
          <a className={classes.link} href="https://www.google.fr/" >GITHUB</a>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: "absolute",
    left: "0",
    overflow: "auto"

  },
  header: {
    display: 'table',
  },
  containers: {
    width: '100%',
    height: '86%'
  },
  footer: {
    width: '100%',
    height: '5%',
    background: '#3f51b5',
    textAlign: 'center',
    color: 'white',
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
}));

export default App;
