import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CustomCard from './CustomCard';
import { Container, Link, Typography } from '@mui/material';
import AppColors from '../constants/AppColors';
import { FontSizeStandards } from '../constants/FontSizeStandards';

function CustomCarousel({ data, heading, subHeading, redirectTo }) {
  return (
    <>
      {heading && <Container style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 0, margin: 0, marginBottom: '10px', }}>
        <Typography style={{ fontFamily: 'Poppins',fontWeight: '600', color: AppColors.tertiary, textAlign: 'center' }} sx={{typography:FontSizeStandards.primaryHeading}}>
          {heading}
        </Typography>
        {/* <Link href={redirectTo} style={{ color: AppColors.primary, fontFamily: "Poppins", fontWeight: '500', marginLeft: '5px' }}sx={{typography:FontSizeStandards.subHeading}}>
          {subHeading}
        </Link> */}
      </Container>}
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        itemClass=""
        partialVisible
        minimumTouchDrag={80}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        responsive={{
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 20
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 3,
            partialVisibilityGutter: 20
          },
          laptop: {
            breakpoint: {
              max: 1724,
              min: 1024
            },
            items: 5,
            partialVisibilityGutter: 20
          },
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1724
            },
            items: 6,
            partialVisibilityGutter: 20
          },

        }}
      >
        {data.map(card => {
          return <CustomCard {...card} key={card.id} />;
        })}
      </Carousel>
    </>
  )
}

export default CustomCarousel