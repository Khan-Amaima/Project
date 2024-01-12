import React, { useRef, useState } from "react";
import CustomModal from "../components/CustomModal";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CustomTable from "../components/CustomTable";
import { CustomStyle } from "../constants/CustomStyle";
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AppColors from "../constants/AppColors";
import CustomButton from "../components/CustomButton";
import SvgIcons from "../assets/images/svgicons";
import { ImageSize } from "../constants/BoxSizes";
import { tab } from "@testing-library/user-event/dist/tab";
import { CommitSharp } from "@mui/icons-material";
import ApiManager from "../api/ApiManager";
import { useSelector } from "react-redux";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import ConfirmationModal from "./ConfirmationModal";
import { WarningAmber } from "@mui/icons-material";

function UploadVideo({ isModalOpen, handleModal, fetchVideos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const videoInputRef = useRef();
  const dragTabRef = useRef(0);
  const draggedOverTabRef = useRef(0);
  const [tableData, setTableData] = useState([]);
  const [isDisableButton, setButtonDisable] = useState();
  const [isPrimarySound, setPrimarySound] = useState(true);
  const [selectedSoundIndex, setSelectedSoundIndex] = useState(undefined);
  const userReducerState = useSelector((state) => state.userRed);
  const [videoDuration, setVideoDuration] = useState(null);
  const [durationError, setDurationError] = useState(false);
  const [durationErrorMessage, setDurationErrorMessage] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const videoEl = useRef(null);

  const handleConfirmationModal = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen)
    setDurationErrorMessage("")
  };
  const handleFileChange = async (event) => {
    if (tableData.length >= 0 && tableData.length < 4) {
      try {

        const file = event.target.files[0];

        if (file) {
          const url = URL.createObjectURL(file);

          const video = document.createElement("video");
          video.src = url;
          await new Promise((resolve) => {
            video.addEventListener("loadedmetadata", resolve);
          });

          const durationInSeconds = video.duration;
          const totalDurationSeconds = Math.round(durationInSeconds);
          if (tableData.length == 0 &&  (totalDurationSeconds <= 30 && videoDuration == null)) {
            setVideoDuration(totalDurationSeconds);
          }
         

          let customSize = file.size / 1024 / 1024;

          if ((totalDurationSeconds <= 30) && ((totalDurationSeconds == videoDuration) || videoDuration==null)) {
            setTableData([
              ...tableData,
              {
                video: url,
                sound: true,
                size: `${customSize.toFixed(2)}Mb`,
                file: file,
              },
              
            ]);
            if (tableData.length === 3) {
              setButtonDisable(true);
            }
          }
           else {
            if(totalDurationSeconds > 30){
              setDurationErrorMessage("The duration of the video must be smaller than 30 seconds.")
              setIsConfirmationModalOpen(!isConfirmationModalOpen);
            }
            else{
              setDurationErrorMessage("The duration of all videos must be the same to proceed.")
              setIsConfirmationModalOpen(!isConfirmationModalOpen);
          }}
            
        }
      } catch (err) {
        console.log(err, "upload Video error");
      }
    }
  };

  const handleDeleteFile = (id) => {
    let extractedVideos = tableData.filter((video, index) => index != id);
    setTableData(extractedVideos);
    
    if (tableData.length <= 1) {
      console.log("setting vd null")
      setVideoDuration(null);
    }
    if (tableData.length <= 4) {
      setButtonDisable(false);
    }
    
  };

  const handleSetPrimarySound = (id) => {
    const updatedVideosWithSound = tableData.map((item, index) => {
      if (id == selectedSoundIndex) {
        console.log("Call reset");
        setSelectedSoundIndex(undefined);
        return { ...item, sound: true };
      } else {
        console.log("Call set");
        if (index === id) {
          // Set 'sound' to true for the specific object
          setSelectedSoundIndex(index);

          return { ...item, sound: true };
        } else {
          // Set 'sound' to false for other objects
          return { ...item, sound: false };
        }
      }
    });
    setTableData(updatedVideosWithSound);
  };

  const handleDragRef = (index) => {
    dragTabRef.current = index;
  };

  const handleDraggedOverRef = (index) => {
    draggedOverTabRef.current = index;
    setSelectedSoundIndex(index);
  };

  const handleSorting = () => {
    const temp = tableData[dragTabRef.current];
    tableData[dragTabRef.current] = tableData[draggedOverTabRef.current];
    tableData[draggedOverTabRef.current] = temp;
    setTableData([...tableData]);
  };

  const handleChoose = () => {
    videoInputRef.current.click();
  };
 
  return (
    <CustomModal isModalOpen={isModalOpen} handleModal={handleModal}>
      <Typography
        variant="h6"
        component="h2"
        style={{
          fontFamily: "Poppins",
          fontWeight: "600",
          color: AppColors.tertiary,
          marginBottom: "20px",
          textAlign: "center",
        }}
        sx={{typography:FontSizeStandards.primaryHeading}}
      >
        Upload Videos
      </Typography>
      <Grid
      gap={1}
        container
        width={"auto"}
        sx={{ width: { xs: "100%", lg: "80%" } }}
        style={{
          border: "2px dashed",
          borderColor: AppColors.primary,
          borderRadius: "10px",
          padding: 20,
          direction: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Grid item xs={12} sm ={12} md={2} style={{justifyContent:"center",alignItems:'center',display:"flex"}}>
          <Box
            style={{ justifyContent: "center", alignItems: "center" }}
            sx={{
              width: {
                xs: ImageSize.UploadIcon.xs.width,
                sm: ImageSize.UploadIcon.sm.width,
                md: ImageSize.UploadIcon.md.width,
                lg: ImageSize.UploadIcon.lg.width,
                xl: ImageSize.UploadIcon.xl.width,
              },
              height: {
                xs: ImageSize.UploadIcon.xs.height,
                sm: ImageSize.UploadIcon.sm.height,
                md: ImageSize.UploadIcon.md.height,
                lg: ImageSize.UploadIcon.lg.height,
                xl: ImageSize.UploadIcon.xl.width,
              },
            }}
          >
            {SvgIcons.uploadIcon}
          </Box>
        </Grid>
        <Grid item xs={10}  md={6} alignItems= {{ xs: "center", sm: "center",md:"start" }} style= {{ justifyContent:"center",display:"flex",flexDirection:"column",
      } }>
          <Typography
            variant="h6"
            component="h2"
            style={{
              fontFamily: "Poppins",
              fontWeight: "500",
              color: AppColors.tertiary,
            }}
            sx={{typography:FontSizeStandards.secondaryHeading}}
          >
            Select a file or drag and drop here
          </Typography>
          {durationError? (
            <Typography
              style={{
                marginTop: "5px",
                fontFamily: "Poppins",
                fontWeight: "500",
                color: "red", 
              }}
              sx={{typography:FontSizeStandards.subHeading}}
            >
              {durationErrorMessage}
            </Typography>
          ):isDisableButton ? (
            <Typography
              style={{
                marginTop: "5px",
                fontFamily: "Poppins",
                fontWeight: "500",
                color: "red", 
              }}
              sx={{typography:FontSizeStandards.subHeading}}
            >
              Can't Add more than 4 Videos
            </Typography>
          ) : (
            <Typography
              style={{
                marginTop: "5px",
                fontFamily: "Poppins",
                fontWeight: "500",
                color: AppColors.secondary,
              }}
              sx={{typography:FontSizeStandards.subHeading}}
            >
              MP3, MP4 or flash, file size no more than 10MB
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}   md={3} style={{justifyContent:"center",alignItems:'center',display:"flex"}}>
          <input
            ref={videoInputRef}
            style={{ display: "none" }}
            type="file"
            onChange={handleFileChange}
            accept=".mov,.mp4"
          />
          <CustomButton
            onTap={() => {
              if (!isDisableButton) {
                handleChoose();
              }
            }}
            isDisable={isDisableButton}
            text={"Select Videos"}
            buttonStyle={{
              borderRadius: 50,
              backgroundColor: AppColors.tint,
              fontFamily: "Poppins",
              fontWeight: 500,
              color: AppColors.primary,
            }}
            sx={{typography:FontSizeStandards.tertiary}}
          />
        </Grid>
      </Grid>
      <Grid
        container
        width={"auto"}
        sx={{ width: { xs: "100%", lg: "80%" } }}
        style={{
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "32px",
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h6"
            component="h2"
            style={{
              fontFamily: "Poppins",

              fontWeight: "500",
              color: AppColors.tertiary,
              marginBottom: "6px",
            }}
            sx={{typography:FontSizeStandards.primaryHeading}}
          >
            Video Details
          </Typography>
          <TextField
            name="title"
            fullWidth
            id="title"
            placeholder="Video title"
            sx={CustomStyle.inputStyle}
            value={title}
            inputProps={{
              maxLength: 100,
            }}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="pencil-icon" edge="end">
                    <EditOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                typography: {
                  fontSize:"16"
                },
              },
            }}
          />
          <TextField
            name="description"
            fullWidth
            id="description"
            placeholder="Description"
            inputProps={{
              maxLength: 200,
            }}
            style={{marginTop: "6px", fontSize:"14px"}}
            sx={{ ...CustomStyle.inputStyle,}}
            multiline={true}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              
                sx: {
                  typography: {fontSize:"16px"},
                },              
            }}
          />
        </Grid>
      </Grid>

      {tableData.length > 0 && (
        <CustomTable
          tableData={tableData}
          handleDeleteFile={handleDeleteFile}
          handleSetPrimarySound={handleSetPrimarySound}
          handleDragRef={handleDragRef}
          handleDraggedOverRef={handleDraggedOverRef}
          handleSorting={handleSorting}
        />
      )}

      {tableData.length > 0 && (
      <Box  sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
        alignItems: "center",
        marginTop: 8,
      }}>
          <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            marginTop: 0,
          }}
        >
          <CustomButton
            onTap={() => {
              handleModal();
              setTableData([]);
              setButtonDisable(false);
            }}
            text={"Cancel"}
            buttonStyle={{
              borderRadius: 50,
              backgroundColor: AppColors.white,
              fontSize: {
                typography: {
                  xs: FontSizeStandards.secondaryHeading.xs,
                  sm: FontSizeStandards.secondaryHeading.sm,
                  md: FontSizeStandards.secondaryHeading.md,
                  lg: FontSizeStandards.secondaryHeading.lg,
                },
              },
              fontFamily: "Poppins",
              fontWeight: 600,
              color: AppColors.tertiary,
              border: "1px solid",
              marginRight: "20px",
              paddingX: 4,
              paddingY: 1,
            }}
          />
          <CustomButton
            onTap={async () => {
              try {
                let response = await ApiManager.uploadVideo(
                  userReducerState?.userDetail?.email,
                  title,
                  description,
                  tableData,
                  selectedSoundIndex,
                );
                handleModal();
                fetchVideos();
                console.log(response, "--------response-------");
              } catch (err) {
                console.log(err);
              }
              console.log("do some functionality");
            }}
            text={"Upload Videos"}
            buttonStyle={{
              borderRadius: 50,
              backgroundColor: AppColors.primary,
              fontSize: {
                typography: {
                  xs: FontSizeStandards.secondaryHeading.xs,
                  sm: FontSizeStandards.secondaryHeading.sm,
                  md: FontSizeStandards.secondaryHeading.md,
                  lg: FontSizeStandards.secondaryHeading.lg,
                },
              },
              fontFamily: "Poppins",
              fontWeight: 600,
              color: AppColors.white,
              paddingX: 3,
              paddingY: 1.2,
            }}
          />
        </Box>
        <ConfirmationModal
        isModelOpen={isConfirmationModalOpen}
        confirmationText={durationErrorMessage}
        rightButtonText={"Close"}
        rightButtonFunction={handleConfirmationModal}
        icon={
          <WarningAmber style={{ width: "60px", height: "60px", color: "red" }} />
        }
      />
      </Box>
      )}
    </CustomModal>

  );
}

export default UploadVideo;
