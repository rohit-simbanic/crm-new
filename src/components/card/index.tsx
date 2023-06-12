import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import MuiAvatar from '@mui/material/Avatar';
import { isEmpty, isEmptyObject } from 'helpers/misc-helper';
import { styled } from '@mui/material';

const StyleCardHeader = styled(CardHeader)((props) => {
  if (!isEmptyObject(props.sx)) {
    return {
      '&.MuiCardHeader-root .MuiCardHeader-content': {
        padding: '12px'
      },
      '.MuiCardHeader-action': {
        padding: '8px'
      }
    };
  } else {
    return {};
  }
});

const Avatar = ({ content }: { content: string }) => {
  if (isEmpty(content)) return null;

  return (
    <MuiAvatar
      sx={{
        bgcolor: 'grey'
      }}
      aria-label={`${content}-avatar`}
    >
      {content}
    </MuiAvatar>
  );
};

const UnitCard = ({
  title,
  subheader,
  avatar = null,
  action = null,
  media = null,
  children,
  actions = null,
  sx,
  isLeft
}: any) => {
  return (
    <>
      <Card variant="outlined" sx={{ mr: 1, ...sx }}>
        <StyleCardHeader
          avatar={isLeft ? <Avatar content={avatar} /> : action}
          action={!isLeft ? <Avatar content={avatar} /> : action}
          title={title}
          subheader={subheader}
          sx={
            !isLeft
              ? {
                  textAlign: 'right'
                }
              : {}
          }
        />

        {media && (
          <CardMedia
            component="img"
            height="194"
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
        )}

        {children && <CardContent>{children}</CardContent>}

        {actions && <CardActions disableSpacing>{actions}</CardActions>}
      </Card>
    </>
  );
};

export default UnitCard;
