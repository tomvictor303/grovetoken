// src/components/GradientCard.js

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles'
import { Box, Button, CardMedia } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import Link from 'next/link';

const my_styles = {
  card: {
     position: 'relative',
  },
  media: {
     height: 0,
     paddingTop: '25%' // height : width
  }
}
const TextOverlay = styled(Box)({
  position: 'absolute',
  left: 0,
  top: `40%`, 
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
  background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))',
  zIndex: 1,
});

const TopExperts = ({}) => {
  return (
    <Card sx={my_styles.card}>
      <CardMedia image={`/images/landing/top-rated.jpg`} style={my_styles.media}/>
      <GradientOverlay />
      <TextOverlay>
        <Typography variant="h2" color={'white'}>
          Find Top Session Pros
        </Typography>
        <Typography variant="h6" color={'white'} pl={2}>
          Hire Lawyers, Health & Exercise Experts
        </Typography>
        <Box mt={5}>
          <Link passHref href={'/experts'} legacyBehavior>
            <a>
              <Button variant='contained' color='error'>Get Started</Button>
            </a>
          </Link>
        </Box>
      </TextOverlay>
    </Card>
  );
};

export default TopExperts;
