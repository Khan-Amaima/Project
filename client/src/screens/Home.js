import React, { useEffect, useState } from "react";
import CustomCarousel from "../components/CustomCarousel";
import ApiManager from "../api/ApiManager";
import { connect, useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import AppColors from "../constants/AppColors";
import StartUploadingVideo from "../components/StartUploadingVideo";
import { useNavigate } from "react-router-dom";
import { FontSizeStandards } from "../constants/FontSizeStandards";

function Home() {
  const dispatch = useDispatch();
  const [allUserData, setAllUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userReducerState = useSelector((state) => state.userRed);
  const navigate = useNavigate();

  const afterFirstUpload=()=>{
    navigate("/uploads");
  }
  
  const fetchAllUserVideos = async () => {
    setLoading(true);
    let response = await ApiManager.fetchAllUserVideos(
      userReducerState?.authToken
    );
    if (response.success) {
      console.log(response.data);
      setAllUserData(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllUserVideos();
  }, []);

  return (
    <>
      {loading ? (
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
      ) : (
        allUserData.length == 0 && loading == false) ? (
        <StartUploadingVideo 
          primaryLabel={"Upload an existing video"}
          secondaryLabel={"Choose a video from your device to enhance, customize, and share like a pro."}
          secondaryLabelSize={FontSizeStandards.primaryHeading}
          buttonTap={afterFirstUpload}
        />
      ) : (
        <CustomCarousel
          data={allUserData}
          heading={"New Creators"}
          subHeading={"Explore All"}
          redirectTo={"./uploads"}
        />
      )}
    </>
  );
}

export default Home;
