import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import WelcomeCard from './dashbordcards/WelcomeCard';
import TasksCard from './dashbordcards/TasksCard';
import OrganisationsCard from './dashbordcards/OrganisationsCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  grid: {
    alignItems: 'flex-start'
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid
          item
          container
          xs={12}
          md={8}
          spacing={2}
          className={classes.grid}
        >
          <Grid item xs={12}>
            <WelcomeCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TasksCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <OrganisationsCard />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
