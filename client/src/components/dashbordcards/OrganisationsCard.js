import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import cardImage from '../../images/organisations.jpg';

import { IconButton, CardMedia, CardActionArea } from '@material-ui/core';

const OrganisationsCard = (props) => {
  const { avatar, title, subtitle, imageUrl } = {
    avatar: <AccountTreeIcon />,
    title: 'Organisations',
    subtitle: 'Response rate: 89%',
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
          <Button size="small">VIEW</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default OrganisationsCard;
