import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardDataProps } from '../../pages/LandingPage/index';


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomCard: React.FC<CardDataProps> = ({
  name,
  type,
  description,
  short_description,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ 
        maxWidth: 345, 
        backgroundColor: '#001524', 
        color: 'white', 
        borderRadius: '8px', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)' 
      }}>
      <CardHeader
        title={name}
        subheader={type}
        titleTypographyProps={{ style: { color: 'white' } }} 
        subheaderTypographyProps={{ style: { color: 'white' } }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" style={{ color: 'white' }}>
          {short_description}
        </Typography>
      </CardContent>
      {description && (
        <>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
                style={{ color: 'white' }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph sx={{ color: 'white' }} >{description}</Typography>
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  );
}

export default CustomCard;
