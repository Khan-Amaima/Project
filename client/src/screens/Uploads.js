import React, { useEffect, useState } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import AppColors from "../constants/AppColors";
import CustomButton from "../components/CustomButton";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import UploadVideo from "../components/UploadVideo";
import VideoPreviewTable from "../components/VideoPreviewTable";
import { AddCircleOutline, KeyboardArrowDown, Verified, WarningAmber } from "@mui/icons-material";
import ApiManager from "../api/ApiManager";
import { useSelector } from "react-redux";
import ConfirmationModal from "../components/ConfirmationModal";
import StartUploadingVideo from "../components/StartUploadingVideo";

function Uploads() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isErrorCase, setIsErrorCase] = useState(false);
  const [message, setMessage] = useState("");
  const handleModal = () => setIsModalOpen(!isModalOpen);
  const userReducerState = useSelector((state) => state.userRed);

  const handleConfirmationModal = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen)
    setIsErrorCase(false)
    setMessage("")
  };

  const fetchVideos = async () => {
    setLoading(true);
    let response = await ApiManager.fetchVideos(userReducerState?.authToken);
    if(response.success){
      setUserData(response.data);
    }
    setLoading(false)
  };
  
  useEffect(() => {
    fetchVideos();
  }, []);

  return loading ? (
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
  ) : (userData.length == 0 && loading == false) ? (
       <StartUploadingVideo secondaryLabel={"No Content Uploaded"} secondaryLabelSize={FontSizeStandards.mainHeading} buttonTap={fetchVideos}/>
  ) : (
    <>
      <Grid
       gap={1}
       container
       width={"auto"}
       sx={{ width: { xs: "100%", lg: "100%" } }}
       style={{
         backgroundColor:"#F5F5F5",
         borderRadius: "10px",
         padding: 10,
         direction: "row",
         justifyContent: "end",
         alignItems: "end",
         minWidth: "200px",
         marginBottom : 40,
       }}
      >
        
          <CustomButton
            text={"Sort by"}
            onTap={() => {}}
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
              fontWeight: 500,
              color: AppColors.white,
            }}
          />
          <UploadVideo
            isModalOpen={isModalOpen}
            handleModal={handleModal}
            fetchVideos={fetchVideos}
          />
    
      </Grid>

      <VideoPreviewTable tableData={userData} fetchVideos={fetchVideos} />
      <ConfirmationModal
        isModelOpen={isConfirmationModalOpen}
        confirmationText={message}
        rightButtonText={"Close"}
        rightButtonFunction={handleConfirmationModal}
        icon={
          isErrorCase ? 
          <WarningAmber style={{ width: "60px", height: "60px", color: "red" }} />
          :
          <Verified style={{ width: "60px", height: "60px", color: "green" }} />
        }
      />
    </>
  );
}

export default Uploads;
