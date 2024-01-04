import { Delete, IosShare, KeyboardBackspace } from "@mui/icons-material";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import AppColors from "../constants/AppColors";
import CustomButton from "./CustomButton";
import UploadVideo from "./UploadVideo";
import { useRef, useState } from "react";
import { userIcon } from "../assets/images";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import SvgIcons from "../assets/images/svgicons";
import Carousel from "react-multi-carousel";
import ConfirmationModal from "./ConfirmationModal";

function VideoDetail({ handleShowVideo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [name, setName] = useState("Christin Mark");
  const [pictureFile, setPictureFile] = useState(userIcon);
  const [videos, setVideos] = useState([pictureFile, pictureFile]);
  const videoPlayerRef = useRef();
  const [videoTitle, setVideoTitle] = useState(
    "Lyrical Lemonade feat Jack  Harlow"
  );
  const [videoDescription, setVideoDescription] = useState(
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected randomised words which don't look even slightly believable humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem"
  );

  const handleModal = () => setIsModalOpen(!isModalOpen);
  const handleConfirmModal = () => setIsConfirmModalOpen(!isConfirmModalOpen);

  return (
    <Grid>
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
          backgroundColor: "#F5F5F5",
        }}
      >
        <IconButton
          size="large"
          color={AppColors.primary}
          onClick={() => handleShowVideo(false)}
          aria-label="open drawer"
        >
          <KeyboardBackspace />
        </IconButton>

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
        <UploadVideo isModalOpen={isModalOpen} handleModal={handleModal} />
      </Grid>

      <Grid
        item
        xs={5.5}
        md={5.5}
        style={{
          marginTop: "40px",
          display: "flex",
          direction: "row",
          justifyContent: "start",
          alignItems: "center",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {pictureFile && (
          <Box
            width={"32px"}
            height={"32px"}
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              position: "relative",
              marginRight: "10px",
              borderColor: AppColors.primary,
            }}
          >
            <img
              src={pictureFile}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "50px",
              }}
            />
          </Box>
        )}

        <Typography
          style={{
            fontSize: FontSizeStandards.tertiaryHeading,
            fontWeight: 500,
            color: AppColors.tertiary,
            fontFamily: "Poppins",
            textOverflow: "clip",
          }}
        >
          {name}
        </Typography>

        <Box
          style={{
            borderRadius: "10px",
            marginLeft: "10px",
            paddingInline: "5px",
            backgroundColor: "#F5F5F5",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "12px",
              fontWeight: 400,
              color: AppColors.tertiary,
              fontFamily: "Poppins",
              textOverflow: "clip",
            }}
          >
            Owner
          </Typography>
        </Box>

        <Box
          style={{
            marginInline: "10px",
            paddingBottom: "5px",
            paddingInline: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {SvgIcons.ellipseIcon}
        </Box>

        <Typography
          style={{
            fontSize: FontSizeStandards.tertiaryHeading,
            fontWeight: 500,
            color: AppColors.tertiary,
            fontFamily: "Poppins",
            textOverflow: "clip",
          }}
        >
          03-01-2024
        </Typography>
      </Grid>
      
      <div style={{height:"30"}}>
      <Carousel
          additionalTransfrom={0}
          arrows
          afterChange={() => {
            console.log("hello");
          }}
          centerMode={false}
          containerClass="container-with-dots"
          minimumTouchDrag={80}
          showDots={false}
          slidesToSlide={1}
          responsive={{
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 20,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
              partialVisibilityGutter: 20,
            },
            laptop: {
              breakpoint: {
                max: 1724,
                min: 1024,
              },
              items: 1,
              partialVisibilityGutter: 20,
            },
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1724,
              },
              items: 1,
              partialVisibilityGutter: 20,
            },
          }}
        >
          {videos.map((singleVideo) => {
            return (
              <video
                ref={videoPlayerRef}
                width="100%"
                style={{ borderRadius: "10px" }}
                controls
              />
            );
          })}
        </Carousel>
      </div>
        
      <Grid
        item
        xs={11.5}
        md={11.5}
        style={{
          marginTop: "10px",
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        <Box>
          <Typography
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: AppColors.tertiary,
              fontFamily: "Poppins",
            }}
            sx={FontSizeStandards.mainHeading}
          >
            {videoTitle}
          </Typography>
        </Box>

        <Grid
          item
          xs={5.5}
          md={5.5}
          style={{
            display: "flex",
            direction: "row",
            justifyContent: "end",
            alignItems: "end",
            padding: "1px",
            borderRadius: "5px",
          }}
        >
          <CustomButton
            onTap={() => {}}
            prefixIcon={IosShare}
            text={"share"}
            loading={false}
            buttonStyle={{
              borderRadius: 50,
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 600,
              color: AppColors.primary,
              marginY: 1,
              marginX: 0,
              paddingX: 2,
            }}
          />
          <CustomButton
            onTap={() => {
              handleConfirmModal();
            }}
            prefixIcon={Delete}
            text={"Delete"}
            loading={false}
            buttonStyle={{
              borderRadius: 50,
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 600,
              color: "red",
              marginY: 1,
              marginX: 0,
              paddingX: 2,
            }}
          />
          <ConfirmationModal
            isModelOpen={isConfirmModalOpen}
            confirmationText={"Are you sure, you want to delete this file?"}
            leftButtonText={"Cancel"}
            rightButtonText={"Delete"}
            leftButtonFunction={handleConfirmModal}
            rightButtonFunction={() => console.log("Delete")}
          />
        </Grid>
      </Grid>

      <Box
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Typography
          style={{
            fontSize: FontSizeStandards.mainHeading,
            fontWeight: 400,
            color: AppColors.tertiary,
            fontFamily: "Poppins",
          }}
        >
          {videoDescription}
        </Typography>
      </Box>
      
    </Grid>
  );
}
export default VideoDetail;
