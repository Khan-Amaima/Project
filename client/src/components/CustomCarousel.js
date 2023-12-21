import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Container } from '@mui/material';

function CustomCarousel() {
  return (
    <Box sx={{width: '100%'}}>
      <Carousel
        axis='horizontal'
        centerMode={true}
        centerSlidePercentage={20}
        showThumbs={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 5,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
      >
        <img
          draggable={false}
          style={{ height: "auto", cursor: "pointer", paddingLeft: '20px' }}
          src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <img
          draggable={false}
          style={{ height: "auto", cursor: "pointer", paddingLeft: '20px' }}
          src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        />
        <img
          draggable={false}
          style={{ height: "auto", cursor: "pointer", paddingLeft: '20px' }}
          src="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <img
          draggable={false}
          style={{ height: "auto", cursor: "pointer", paddingLeft: '20px' }}
          src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <img
          draggable={false}
          style={{ height: "auto", cursor: "pointer", paddingLeft: '20px' }}
          src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        />
      </Carousel>
    </Box>
  )
}

export default CustomCarousel