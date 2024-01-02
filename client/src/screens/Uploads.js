import React, { useEffect, useState } from 'react'
import { Container, Box, Typography, Grid } from '@mui/material'
import AppColors from '../constants/AppColors'
import { uploadVideoImage } from '../assets/images'
import CustomButton from '../components/CustomButton'
import { FontSizeStandards } from '../constants/FontSizeStandards'
import UploadVideo from '../components/UploadVideo'
import { ImageSize } from '../constants/BoxSizes'
import SvgIcons from '../assets/images/svgicons'
import CustomTable from "../components/CustomTable";
import VideoPreviewTable from "../components/VideoPreviewTable";
import { AddCircleOutline, KeyboardArrowDown } from "@mui/icons-material";
import ApiManager from '../api/ApiManager'
import { connect, useDispatch, useSelector } from "react-redux";
import { keyboard } from '@testing-library/user-event/dist/keyboard'


function Uploads() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([])
  const [uploadedVideos, setUploadedVideos] = useState([1, 2]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);
  const userReducerState = useSelector(state => state.userRed);

  const fetchVideos = async () =>{
    let response = await ApiManager.fetchVideos(userReducerState?.authToken)
    setUserData(response.data.data)
    console.log(userData, '------------------')
  }
  
  useEffect(() => {
    fetchVideos();
  }, [])
  

  return (
    uploadedVideos.length == 0 ? (
    <Container maxWidth="100vw" style={{ height: "82vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
      <Container style={{ display: "flex", flexDirection: "column", justifyContent: "center",alignItems: "center", }}>
        <Container
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
        </Container>

        <Typography
          component="h1"
          variant="h5"
          style={{
            fontFamily: "Poppins",
            fontWeight: 500,
            color: AppColors.secondary,
            lineHeight: "20px",
            marginTop: 50,
            marginBottom: 30,
          }}
          sx={{ typography: FontSizeStandards.mainHeading }}
        >
          No Content Uploaded
        </Typography>
        <CustomButton
          onTap={() => {
            handleModal();
          }}
          text={"upload Video"}
          loading={loading}
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
      </Container>
      <UploadVideo isModalOpen={isModalOpen} handleModal={handleModal} />
    </Container>
  ) : (
    <>
      <Grid
        item
        xs={11.5}
        md={11.5}
        style={{
          display: "flex",
          direction: "row",
          justifyContent: "end",
          alignItems: "end",
        }}
      >
        <CustomButton
          text={"Sort by"}
          suffixIcon={KeyboardArrowDown}
          isDisable={false}
          buttonStyle={{
            borderRadius: 50,
            backgroundColor: AppColors.tint,
            fontFamily: "Poppins",
            fontSize: {
              typography: {
                xs: FontSizeStandards.secondaryHeading.xs,
                sm: FontSizeStandards.secondaryHeading.sm,
                md: FontSizeStandards.secondaryHeading.md,
                lg: FontSizeStandards.secondaryHeading.lg,
              },
            
            },
            fontWeight: 500,
            color: AppColors.tertiary,
          }}
        />

        <CustomButton
          // type={"submit"}
          onTap={() => {handleModal();}}
          text={"Upload Video"}
          prefixIcon={AddCircleOutline}
          isDisable={false}
          buttonStyle={{
            borderRadius: 50,
            backgroundColor: AppColors.primary,
            fontFamily: "Poppins",
            fontSize: {
              typography: {
                xs: FontSizeStandards.secondaryHeading.xs,
                sm: FontSizeStandards.secondaryHeading.sm,
                md: FontSizeStandards.secondaryHeading.md,
                lg: FontSizeStandards.secondaryHeading.lg,
              },
            },
            marginX: "5px",
            fontWeight: 500,
            color: AppColors.white,
          }}
        />
         <UploadVideo isModalOpen={isModalOpen} handleModal={handleModal} />
      </Grid>
      <VideoPreviewTable tableData={userData} />
    </>
  ));
}

export default Uploads;