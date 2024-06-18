import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles'
import { Box, Button, CardMedia } from '@mui/material';
import Link from 'next/link';

const my_styles = {
  card: {
     position: 'relative',
  },
  media: {
     height: 0,
     paddingTop: '90%' // height : width
  }
}
const TextOverlay = styled(Box)({
  position: 'absolute',
  left: 0,
  bottom: `10%`, 
  paddingLeft: `10px`,
  width: '100%',
  color: 'white',
  background: 'transparent',
  zIndex: 2,
});


const GradientOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1))',
  zIndex: 1,
});

const ExerciseCategory = ({}) => {
  return (
    <Card sx={my_styles.card}>
      <CardMedia image={`/images/landing/exercise.jpg`} style={my_styles.media}/>
      <GradientOverlay />
      <TextOverlay>
        <Typography variant="h4" color={'white'}>
          Exercises
        </Typography>
        <Typography variant="h6" color={'white'}>
          Send your exercise issues
        </Typography>
        <Box mt={5}>
          <Link passHref href={`/experts?expertise=exercise`} legacyBehavior>
            <a>
              <Button variant='contained' color='primary'>Explore</Button>
            </a>
          </Link>
        </Box>
      </TextOverlay>
    </Card>
  );
};

export default ExerciseCategory;
