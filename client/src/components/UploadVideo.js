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

function UploadVideo({ isModalOpen, handleModal, fetchVideos }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const videoInputRef = useRef();
  const dragTabRef = useRef(0);
  const draggedOverTabRef = useRef(0);
  const [tableData, setTableData] = useState([]);
  const [isDisableButton, setButtonDisable] = useState();
  const [isPrimarySound, setPrimarySound] = useState(true);
  const [selectedSoundIndex, setSelectedSoundIndex] = useState(undefined);
  const userReducerState = useSelector((state) => state.userRed);

  const handleFileChange = (event) => {
    if (tableData.length >= 0 && tableData.length < 4) {
      try {
        const file = event.target.files[0];
        if (file) {
          const url = URL.createObjectURL(file);
          let customSize = file.size / 1024 / 1024;
          setTableData([
            ...tableData,
            { video: url, sound: true, size: `${customSize.toFixed(2)}Mb`, file: file },
          ]);
          if (tableData.length === 3) {
            setButtonDisable(true);
          }
        }
      } catch (err) {
        console.log(err, "upload Video error");
      }
    }
  };

  const handleDeleteFile = (id) => {
    let extractedVideos = tableData.filter((video, index) => index != id);

    setTableData(extractedVideos);
    if (tableData.length <= 4) {
      setButtonDisable(false);
    }
  };

  const handleSetPrimarySound = (id) => {
    const updatedVideosWithSound = tableData?.map((item, index) => {
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
          fontSize: 20,
          fontWeight: "600",
          color: AppColors.tertiary,
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Upload Videos
      </Typography>
      <Grid
        container
        width={"auto"}
        sx={{ width: { xs: "100%", lg: "60%" } }}
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
        <Grid item xs={12} md={2}>
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
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            component="h2"
            style={{
              fontFamily: "Poppins",
              fontSize: 14,
              fontWeight: "500",
              color: AppColors.tertiary,
            }}
          >
            Select a file or drag and drop here
          </Typography>
          {isDisableButton ? (
            <Typography
              style={{
                marginTop: "5px",
                fontFamily: "Poppins",
                fontSize: 12,
                fontWeight: "500",
                color: "red",
              }}
            >
              Can't Add more than 4 Videos
            </Typography>
          ) : (
            <Typography
              style={{
                marginTop: "5px",
                fontFamily: "Poppins",
                fontSize: 12,
                fontWeight: "500",
                color: AppColors.secondary,
              }}
            >
              MP3, MP4 or flash, file size no more than 10MB
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
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
              fontSize: "14px",
              fontWeight: 500,
              color: AppColors.primary,
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        width={"auto"}
        sx={{ width: { xs: "100%", lg: "60%" } }}
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
              fontSize: 16,
              fontWeight: "500",
              color: AppColors.tertiary,
              marginBottom: "6px",
            }}
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
            onChange={e=>setTitle(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="pencil-icon" edge="end">
                    <EditOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="description"
            fullWidth
            id="description"
            placeholder="Description"
            sx={CustomStyle.inputStyle}
            style={{ marginTop: "6px" }}
            multiline={true}
            rows={4}
            value={description}
            onChange={e=>setDescription(e.target.value)}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <CustomButton
            onTap={() => {
              handleModal();
              setTableData([]);
              setButtonDisable(false)
            }}
            text={"Cancel"}
            buttonStyle={{
              borderRadius: 50,
              backgroundColor: AppColors.white,
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 600,
              color: AppColors.tertiary,
              border: "1px solid",
              marginRight: "20px",
              paddingX: 4,
              paddingY: 1,
            }}
          />
          <CustomButton
            onTap={ async () => {
              try{
                let response = await ApiManager.uploadVideo(userReducerState?.userDetail?.username, title, description, tableData)
                fetchVideos();
                handleModal();
                console.log(response, '--------response-------')
              }
              catch(err){
                console.log(err)
              }
              console.log("do some functionality");
            }}
            text={"Upload Videos"}
            buttonStyle={{
              borderRadius: 50,
              backgroundColor: AppColors.primary,
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 600,
              color: AppColors.white,
              paddingX: 4,
              paddingY: 1,
            }}
          />
        </Box>
      )}
    </CustomModal>
  );
}

export default UploadVideo;
