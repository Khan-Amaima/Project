import { Delete, IosShare, KeyboardBackspace } from "@mui/icons-material";
import { Box, CircularProgress, Container, Grid, IconButton, Typography } from "@mui/material";
import AppColors from "../constants/AppColors";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import SvgIcons from "../assets/images/svgicons";
import Carousel from "react-multi-carousel";
import React, { useRef, useState, useEffect } from "react";
import ConfirmationModal from "../components/ConfirmationModal";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ApiManager from "../api/ApiManager";
import moment from "moment";

function ItemDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pictureFile, setPictureFile] = useState();
  const userReducerState = useSelector((state) => state.userRed);
  const [userMedia, setUserMedia] = useState();
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  let [videoCurrentTime, setVideoCurrentTime] = useState(0);
  let [isPlaying, setIsPlaying] = useState(false);
  let videoPlayerRefs = useRef([]);
  let audioPlayerRefs = useRef([]);
  const navigate = useNavigate()
  const [isPortrait, setIsPortrait] = useState(false);
  
  const handleModal = () => setIsModalOpen(!isModalOpen);
  const handleConfirmModal = () => setIsConfirmModalOpen(!isConfirmModalOpen);
  
  const fetchVideos = async () => {
    setLoading(true);
    let response = await ApiManager.fetchVideos(userReducerState?.authToken, id);
    if(response.success){
      setUserMedia(response.data[0]);
    }
    setLoading(false)
  };
  
  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDeleteVideo = async (id) => {
    let response = await ApiManager.deleteVideo(userReducerState?.authToken, id)
    if(response.data.success){
      setIsConfirmModalOpen(!isConfirmModalOpen)
      navigate(-1);
      fetchVideos()
    }
  }
  
  return (
    loading ? 
    (
      <Box
        maxWidth="100vw"
        style={{
          height: "82vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          size={50}
          style={{
            marginInline: 30,
            padding: 1,
            color: AppColors.primary,
          }}
        />
      </Box>
    )
    : 
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
          onClick={() => {
            navigate(-1)
          }}
          aria-label="open drawer"
        >
          <KeyboardBackspace />
        </IconButton>

        {/* <CustomButton
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
        <UploadVideo isModalOpen={isModalOpen} handleModal={handleModal} /> */}
      </Grid>
      <Container>
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
              fontWeight: 600,
              color: AppColors.tertiary,
              fontFamily: "Poppins",
              textOverflow: "clip",
            }}
            sx={{typography : FontSizeStandards.tertiaryHeading}}
          >
            {userMedia?.user?.first_name ?? userMedia?.user?.username}
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
                fontWeight: 500,
                color: AppColors.tertiary,
                fontFamily: "Poppins",
                textOverflow: "clip",
              }}
              sx={{typography : FontSizeStandards.tertiaryHeading}}
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
              fontWeight: 600,
              color: AppColors.tertiary,
              fontFamily: "Poppins",
              textOverflow: "clip",
            }}
            sx={{typography : FontSizeStandards.tertiaryHeading}}
          >
            {moment(userMedia?.created_at).format("MMM Do yy")}
          </Typography>
        </Grid>

        {
          userMedia?.primaryAudio != null ?            
            <audio 
              ref={ref => ref != null && !audioPlayerRefs.current.includes(ref) && audioPlayerRefs.current.push(ref)}
              style={{display: 'none'}}
              src={`${process.env.REACT_APP_BASE_URL}${userMedia?.primaryAudio?.audio != null &&  userMedia?.primaryAudio?.audio}`} 
              controls
            >
            </audio>
          :
          userMedia?.videos?.map((singleVideo, index) => {
            return (
              <audio 
                key={index} 
                ref={ref => ref != null && !audioPlayerRefs.current.includes(ref) && audioPlayerRefs.current.push(ref)}
                style={{display: 'none'}}
                src={`${process.env.REACT_APP_BASE_URL}${singleVideo.audio != null &&  singleVideo.audio}`} 
                controls
              >
              </audio>
            );
          })
        }
        <Carousel
          additionalTransfrom={0}
          arrows
          centerMode={false}
          containerClass="container-with-dots"
          minimumTouchDrag={80}
          showDots={false}
          slidesToSlide={1}
          beforeChange={(e)=>{
            if(userMedia?.primaryAudio == null){
              if(isPlaying && userMedia.videos[e].audio != null){
                audioPlayerRefs.current[e].volume = 1;
              }
            }
            setCurrentSlideIndex(e)
          }}
          afterChange={(e)=>{
            if(userMedia?.primaryAudio == null && isPlaying){
              audioPlayerRefs.current[e].volume = 0;
            }
          }}
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
          {userMedia?.videos?.map((singleVideo, index) => {
            return (
              <Grid
              style={{ position: "relative", paddingTop: "56.25%" }}
              key={index}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <video
                    key={index}
                    ref={ref => ref != null && !videoPlayerRefs.current.includes(ref) && videoPlayerRefs.current.push(ref)}
                    style={{ borderRadius: "10px",objectFit:"contain",width:"100%", height: isPortrait? "100%":"auto"}}
                    controls
                    controlsList="nodownload noplaybackrate"
                    muted
                    src={`${process.env.REACT_APP_BASE_URL}${singleVideo?.video}`}
                    type="video/mp4"
                    preload="auto"
                    onLoadedMetadata={()=>{
                      const video = videoPlayerRefs.current[index];    
                      if(video.videoHeight > video.videoWidth){   
                        setIsPortrait(true);
                      }
                    }}
                    onPlay = {()=>{
                      try{
                        // check is there any primary audio
                        // if yes then prefer primary audio else play all audio's
                        if(userMedia?.primaryAudio != null){
                          try{
                            !isPlaying && userMedia?.videos[0]?.audio != null && audioPlayerRefs?.current[0]?.play();
                          }catch(err){
                            console.log(err)
                          }
                        }else{
                          for(let i=0 ; i < audioPlayerRefs?.current?.length ; i++){
                            try{
                              !isPlaying && userMedia?.videos[i]?.audio != null && audioPlayerRefs?.current[i]?.play();
                              if(i === currentSlideIndex){
                                audioPlayerRefs.current[i].volume = 1
                              }else{
                                audioPlayerRefs.current[i].volume = 0
                              }
                            }catch(err){
                              console.log(err)
                            }
                          }
                        }
                        // play all videos
                        for(let i=0 ; i < videoPlayerRefs?.current?.length ; i++){
                          try{
                            !isPlaying && videoPlayerRefs?.current[i]?.play();
                          }catch(err){
                            console.log(err, '-------')
                          }
                        }
                        setIsPlaying(true);
                      }
                      catch(err){
                        console.log(err, 'err onPlay')
                      }
                    }}
                    onPause = {()=>{
                      for(let i=0 ; i < videoPlayerRefs?.current?.length ; i++){
                        try{
                          isPlaying && videoPlayerRefs?.current[i]?.pause()
                          isPlaying && audioPlayerRefs?.current[i]?.pause();
                        }
                        catch(err){
                          console.log(err, 'err onPause')
                        }
                      }
                      setIsPlaying(false);
                    }}
                    // onSeeked={(e)=>{
                    //   let videoTime = e.currentTarget.currentTime;
                    //   setVideoCurrentTime(videoTime)
                    //   for(let i=0 ; i < videoPlayerRefs?.current?.length ; i++){
                    //     try{
                    //       audioPlayerRefs.current[i].currentTime = videoTime;
                    //       if(i !== currentSlideIndex){
                    //         videoPlayerRefs.current[i].currentTime = videoTime;
                    //       }
                    //     }
                    //     catch(err){
                    //       console.log(err, 'err onPause')
                    //     }
                    //   }
                    // }}
                    onTimeUpdate={(e)=>{
                      let videoTime = e.currentTarget.currentTime;
                      setVideoCurrentTime(videoTime)
                    }}
                    onWaiting={
                      () => {
                        console.log('Video is waiting/buffering');
                        for(let i=0 ; i < videoPlayerRefs?.current?.length ; i++){
                          try{
                            isPlaying && audioPlayerRefs?.current[i]?.pause();
                          }
                          catch(err){
                            console.log(err, 'err onPause')
                          }
                        }
                      }
                    }
                    onCanPlay={()=>{
                      console.log("Can Play")
                      for(let i=0 ; i < videoPlayerRefs?.current?.length ; i++){
                        try{
                          isPlaying && audioPlayerRefs?.current[i]?.play();
                        }
                        catch(err){
                          console.log(err, 'err onPause')
                        }
                      }
                    }}
                    onEnded={()=>{
                        for(let i=0 ; i < audioPlayerRefs?.current?.length ; i++){
                          isPlaying && audioPlayerRefs?.current[i]?.pause();
                        }
                        setIsPlaying(false)
                        setVideoCurrentTime(0);
                        for(let i=0 ; i < videoPlayerRefs?.current?.length ; i++){
                          try{
                            videoPlayerRefs.current[i].currentTime = 0;
                            audioPlayerRefs.current[i].currentTime = 0;
                          }catch(err){
                            console.log(err, '-------')
                          }
                        }
                      }
                    }
                  />
                </Box>
              </Grid>
            );
          })}
        </Carousel>
  
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
              {userMedia?.title || "Title not added"}
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
            {userMedia?.user?.email === userReducerState?.userDetail?.email &&  <CustomButton
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
            />}
            <ConfirmationModal
              isModelOpen={isConfirmModalOpen}
              confirmationText={"Are you sure, you want to delete this file?"}
              leftButtonText={"Cancel"}
              rightButtonText={"Delete"}
              leftButtonFunction={() => {handleConfirmModal()}}
              rightButtonFunction={() => handleDeleteVideo(id)}
              icon={
                <Delete
                  style={{ width: "60px", height: "60px", color: "red" }}
                />
              }
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
            {userMedia?.description || "Description not added"}
          </Typography>
        </Box>
      </Container>
    </Grid>
  );
}

export default ItemDetail;