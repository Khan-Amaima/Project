import React, { useEffect, useState } from "react";
import CustomCarousel from "../components/CustomCarousel";
import ApiManager from "../api/ApiManager";
import { connect, useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";
import AppColors from "../constants/AppColors";

function Home() {
  const dispatch = useDispatch();
  const [allUserData, setAllUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userReducerState = useSelector((state) => state.userRed);

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
