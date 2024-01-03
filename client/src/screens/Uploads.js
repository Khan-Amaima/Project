import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Grid, IconButton } from "@mui/material";
import AppColors from "../constants/AppColors";
import { uploadVideoImage } from "../assets/images";
import CustomButton from "../components/CustomButton";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import UploadVideo from "../components/UploadVideo";
import { ImageSize } from "../constants/BoxSizes";
import SvgIcons from "../assets/images/svgicons";
import CustomTable from "../components/CustomTable";
import UploadedVideosTable from "../components/VideoPreviewTable";
import { AddCircleOutline, CheckBoxOutlineBlank, CheckBoxOutlineBlankOutlined, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from "@mui/icons-material";
import ApiManager from "../api/ApiManager";
import { connect, useDispatch, useSelector } from "react-redux";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import VideoPreviewTable from "../components/VideoPreviewTable";

function Uploads() {
  const [loading, setLoading] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([1, 2]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);
  const userReducerState = useSelector((state) => state.userRed);

  const fetchVideos = async () => {
    let response = await ApiManager.fetchVideos(userReducerState?.authToken);
    console.log(response, "------------------");
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return uploadedVideos.length == 0 ? (
    <Container
      maxWidth="100vw"
      style={{
        height: "82vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
          backgroundColor: "#F5F5F5",
          display: "flex",
          direction: "row",
          justifyContent: "end",
          alignItems: "end",
          padding: "20px",
          borderRadius: "5px",
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
          onTap={() => {
            handleModal();
          }}
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

      <Grid
       item
       xs={11.5}
       md={11.5}
       style={{
         display: "flex",
         direction: "row",
         justifyContent: "space-between",
         alignItems: "center",
         padding: "5px",
         borderRadius: "5px",
       }}
      >
          <IconButton
            size="large"
            // edge="start"
            color={AppColors.primary}
            // onClick={toggleDrawer}
            aria-label="open drawer"
            // sx={{
            //   marginRight: "36px",
            //   ...(open && { display: "none" }),
            // }}
          >
            <CheckBoxOutlineBlank />
          </IconButton>
      <Grid
        item
        xs={5.5}
        md={5.5}
        style={{
          display: "flex",
          direction: "row",
          justifyContent: "end",
          alignItems: "end",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <Typography style={{ fontFamily: 'Poppins', fontWeight: 500, color: AppColors.secondary, lineHeight: "20px", }} sx={{ typography: FontSizeStandards.subHeading }}>1 - 08 of 20</Typography>
        <Box style={{height:"20px",width:"20px", borderRadius:"10px", border: "1px solid",borderColor:AppColors.secondary,justifyContent:"center",alignItems:"center",display:"flex",marginInline:"10px"}}>
        <IconButton
            
            
            color={AppColors.primary}
            // onClick={toggleDrawer}
            aria-label="open drawer"
            >
            <KeyboardArrowLeftOutlined style={{color:AppColors.tertiary,padding:"3px"}} />
          </IconButton>
        </Box>

        <Box style={{height:"20px",width:"20px", borderRadius:"10px", border: "1px solid",borderColor:AppColors.secondary,justifyContent:"center",alignItems:"center",display:"flex"}}>
        <IconButton
            
            color={AppColors.secondary}
            // onClick={toggleDrawer}
            aria-label="open drawer"
            >
            <KeyboardArrowRightOutlined style={{color:AppColors.tertiary ,padding:"3px"}}/>
          </IconButton>
        </Box>

      </Grid>
     
      </Grid>
      <VideoPreviewTable tableData={uploadedVideos} />
    </>
  );
}

export default Uploads;
