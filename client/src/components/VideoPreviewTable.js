import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import AppColors from "../constants/AppColors";
import { deleteIcon, disableSoundIcon, soundIcon } from "../assets/images";
import CustomButton from "./CustomButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomVideoPlayer from "./CustomVideoPlayer";
import CustomVideoCarousel from "./CustomVideoCarousel";
import SvgIcons from "../assets/images/svgicons";
import { ImageSize } from "../constants/BoxSizes";
import CustomIcon from "./CustomIcon";
import {CheckBox,CheckBoxOutlineBlank,UnfoldMore,} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import ApiManager from "../api/ApiManager";
import {setItemDetail} from '../redux/actions/itemDetailActions'
import { connect, useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";

function VideoPreviewTable({
  tableData,
  fetchVideos
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deletedData, setDeletedData] = useState({});
 
  const dispatch = useDispatch();
  const userReducerState = useSelector((state) => state.userRed);

  const columns = [
    { id: "checkButton", label: "", minWidth: 24, align: "start" },
    { id: "videoDetail", label: "Video Detail", minWidth: 100, align: "start" },
    { id: "details", label: "", minWidth: 250, align: "center" },

    {
      id: "uploadDate",
      label: "Upload Date",
      minWidth: 200,
      align: "center",
      width: 200,
      height: 140,
    },
    {
      id: "size",
      label: "Size",
      minWidth: 100,
      align: "center",
    },
    {
      id: "editButton",
      label: "",
      minWidth: 24,
      align: "right",
    },
    {
      id: "deleteButton",
      label: "",
      minWidth: 24,
      align: "start",
    },
  ];

  const handleDeleteVideo = async (id) => {
    let response = await ApiManager.deleteVideo(userReducerState?.authToken, id)
    if(response.data.success){
      fetchVideos()
      setIsConfirmModalOpen(!isConfirmModalOpen)
    }
  }

  const handleConfirmModal = () => setIsConfirmModalOpen(!isConfirmModalOpen);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden",}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: AppColors.tertiary,
                    fontSize: "16px",
                    fontWeight: 600,
                    backgroundColor:"#F5F5F5"
                  }}
                >
                  {column.id == "checkButton" ? (
                    <CheckBoxOutlineBlank />
                  ) : column.id == "size" ? (
                    <Box
                      style={{
                        with: 100,
                        height: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      {column.label} <UnfoldMore />
                    </Box>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            style={{
              overflow: "hidden",
              overscrollBehavior: "auto",
              scrollBehavior: "smooth",
            }}
          >
            {tableData.length > 0 && tableData?.map((item, index) => {
              let no = index + 1;
              return (
                <TableRow hover role="checkbox" key={no}>
                  <TableCell width={24} align="start">
                    <IconButton
                      size="large"
                      edge="start"
                      color={AppColors.primary}
                      //  onClick={toggleDrawer}
                      aria-label="open drawer"
                    >
                      <CheckBoxOutlineBlank />
                    </IconButton>
                  </TableCell>

                  <TableCell
                    width={140}
                    height={80}
                    style={{ align: "start" }}
                    onClick={() => {
                      dispatch(setItemDetail(item))
                      navigate("/itemDetail")
                    }}
                  >
                    <video
                      width={160}
                      height={90}
                      // src={`${process.env.REACT_APP_BASE_URL}${item?.videos[0]?.video}`}
                      style={{ borderRadius: "6px" }}
                    />
                  </TableCell>

                  <TableCell
                    height={80}
                    align="start"
                    style={{ width: "250px", direction: "column" }}
                  >
                    <Typography
                      style={{
                      
                        fontWeight: 600,
                        color: item.title ? AppColors.tertiary : AppColors.primary,
                        fontFamily: "Poppins",
                        textOverflow: "clip"
                      }}
                      sx={{typography:FontSizeStandards.primaryHeading}}
                    >
                      {item.title || 'Title not added.'}
                    </Typography>

                    <Typography
                      style={{
                        fontWeight: 400,
                        color: AppColors.secondary,
                        fontFamily: "Poppins",
                        textOverflow:"clip"
                      }}
                      sx={{typography:FontSizeStandards.tertiaryHeading}}
                    >
                      {item.description || 'Description not added.'}
                    </Typography>
                  </TableCell>

                  <TableCell onClick={() => {}} align="center" width={"10px"}>
                    <Typography
                      style={{
                        size: "16px",
                        fontWeight: 400,
                        color: AppColors.secondary,
                        fontFamily: "Poppins",
                      }}
                    >
                      {"20 Dec"}
                    </Typography>
                  </TableCell>

                  <TableCell width={100} onClick={() => {}} align="center">
                    <Typography
                      style={{
                        size: "16px",
                        fontWeight: 400,
                        color: AppColors.secondary,
                        fontFamily: "Poppins",
                      }}
                    >
                      {"24 Mb"}
                    </Typography>
                  </TableCell>

                  <TableCell width={24} onClick={() => {}} align="right">
                    <CustomIcon
                      icon={SvgIcons.editIcon}
                      boxSize={ImageSize.UploadPicIcon}
                      cursor="pointer"
                      marginInline="20px"
                    />
                  </TableCell>

                  <TableCell
                    width={24}
                    onClick={() => {handleConfirmModal(); setDeletedData({id : item.id})}}
                    align="start"
                  >
                    <CustomIcon
                      icon={SvgIcons.deleteIcon}
                      boxSize={ImageSize.UploadPicIcon}
                      cursor="pointer"
                      marginInline="20px"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        isModelOpen={isConfirmModalOpen}
        confirmationText={"Are you sure, you want to delete this file?"}
        leftButtonText={"Cancel"}
        rightButtonText={"Delete"}
        leftButtonFunction={handleConfirmModal}
        rightButtonFunction={handleDeleteVideo}
        data = {deletedData}
      />
    </Paper>
  );
}

const mapDispatchToProps = {
  setItemDetail,
};

export default connect(null, mapDispatchToProps)(VideoPreviewTable);
