import React, { useState } from 'react';
import { ImageSize } from '../constants/BoxSizes';
import SvgIcons from '../assets/images/svgicons';
import { FontSizeStandards } from '../constants/FontSizeStandards';
import AppColors from '../constants/AppColors';
import { Container,Typography,Box  } from "@mui/material";
import CustomButton from './CustomButton';
import UploadVideo from './UploadVideo';

function StartUploadingVideo ({ primaryLabel, secondaryLabel ,secondaryLabelSize, buttonTap }){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModal = () => setIsModalOpen(!isModalOpen);

  return ( 
  
  <Container
    maxWidth="100vw"
    style={{
      height: "82vh",
      display: "flex",
      flexDirection:'column',
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {/* <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    > */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        sx={{
          width: {
            xs: ImageSize.VideoIcon.xs.width,
            sm: ImageSize.VideoIcon.sm.width,
            md: ImageSize.VideoIcon.md.width,
            lg: ImageSize.VideoIcon.lg.width,
          },
          height: {
            xs: ImageSize.VideoIcon.xs.height,
            sm: ImageSize.VideoIcon.sm.height,
            md: ImageSize.VideoIcon.md.height,
            lg: ImageSize.VideoIcon.lg.height,
          },
        }}
      >
        {SvgIcons.videoIcon}
      </Box>

      {primaryLabel!=""?
      <Typography
      minWidth={"300px"}
          component="h1"
          variant="h5"
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,
            color: AppColors.tertiary,
            lineHeight: "20px",
            marginTop: 30,
            textAlign:'center'
          }}
          sx={{ typography: FontSizeStandards.mainHeading }}
        >
        {primaryLabel}
        </Typography>:null}

      <Typography
        component="h1"
        variant="h5"

        minWidth={"250px"}
        style={{
            
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,

          fontFamily: "Poppins",
          fontWeight: 500,
          color: AppColors.secondary,
          lineHeight: "20px",
          marginTop: 25,
          marginBottom: 30,

          textAlign:'center'
        }}
        sx={{ typography: secondaryLabelSize, width: {sm:"400px",lg:"500px",}, }}
      >
       {secondaryLabel}
      </Typography>
      <CustomButton
        onTap={() => {
          handleModal();
        }}
        text={"upload Video"}
        loading={false}
        buttonStyle={{
          borderRadius: 50,
          backgroundColor: AppColors.primary,
          fontFamily: "Poppins",
          fontSize: "14px",
          fontWeight: 600,
          color: AppColors.white,
          marginY: 1,
          marginX: 2,
          paddingX: 4,
        }}
      />
    {/* </Container> */}
    <UploadVideo
      isModalOpen={isModalOpen}
      handleModal={handleModal}
      fetchVideos={buttonTap}
    />
  </Container>
  );
};

export default StartUploadingVideo;