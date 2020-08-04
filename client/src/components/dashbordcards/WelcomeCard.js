import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link, CardActionArea, Paper } from '@material-ui/core';

import cardImage from '../../images/dashboard-welcome1.jpg';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundImage: `url(${cardImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    height: 100
  }
}));

const WelcomeCard = () => {
  const classes = useStyles();

  return (
    <CardActionArea style={{ cursor: 'default' }}>
      <Paper className={classes.paper}>
        <Typography variant="h6">Welcome to Airbox Systems</Typography>
        <Typography variant="body2">
          <Link
            target="_blank"
            underline="none"
            href="https://airboxsystems.com/"
          >
            https://airboxsystems.com
          </Link>
        </Typography>
      </Paper>
    </CardActionArea>
  );
};

export default WelcomeCard;
