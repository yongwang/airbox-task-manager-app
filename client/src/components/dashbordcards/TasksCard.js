import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListIcon from '@material-ui/icons/List';
import { IconButton, CardMedia, CardActionArea } from '@material-ui/core';

import cardImage from '../../images/tasks.jpg';

const TasksCard = (props) => {
  const { avatar, title, subtitle, imageUrl } = {
    avatar: <ListIcon />,
    title: 'Tasks',
    subtitle: 'Total in progress: 1526',
    imageUrl: cardImage
  };

  return (
    <Card>
      <CardActionArea style={{ cursor: 'default' }}>
        <CardHeader
          avatar={avatar}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={subtitle}
        />
        <CardMedia style={{ height: '150px' }} image={imageUrl} />

        <CardActions>
          <Button size="small" href="/tasks">
            VIEW
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default TasksCard;
