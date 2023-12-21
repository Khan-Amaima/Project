import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Container } from '@mui/material';
import CustomCarousel from '../components/CustomCarousel';

function Home() {
  return (
    <>
      <CustomCarousel />
      <Container style={{height: 50}}/>
      <CustomCarousel />
      <Container style={{height: 50}}/>
      <CustomCarousel />
      <Container style={{height: 50}}/>
      <CustomCarousel />
    </>
  );
}

export default Home