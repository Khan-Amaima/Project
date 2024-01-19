import React, { useState,lazy,Suspense } from "react";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
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
import { useSelector } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const LazyThumbnail = lazy(() => import('./LazyThumbnail.js')); 

function VideoPreviewTable({
  tableData,
  fetchVideos
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deletedData, setDeletedData] = useState({});
   const userReducerState = useSelector((state) => state.userRed);

  const columns = [
    {id: "count",label: "No",minWidth: 24,align: "center",},
    { id: "videoDetail", label: "Video Detail", minWidth: 100, align: "left" },
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
      id: "deleteButton",
      label: "",
      minWidth: 24,
      align: "center",
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
      <TableContainer sx={{ maxHeight: "auto" }}>
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
                    fontWeight: 600,
                    backgroundColor:"#F5F5F5",
                    fontSize: {
                      typography: {
                        xs: FontSizeStandards.secondaryHeading.xs,
                        sm: FontSizeStandards.secondaryHeading.sm,
                        md: FontSizeStandards.secondaryHeading.md,
                        lg: FontSizeStandards.secondaryHeading.lg,
                      },
                    },
                  }}
                >
                  { column.id == "size" ? (
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
          
                  <TableCell width={24}  align = "center" >
                    {no}
                  </TableCell>
                  <TableCell
                    width={140}
                    height={80}
                    onClick={() => {
                      navigate(`/itemDetail/${item.id}`)
                    }}
                  >
                     <Suspense fallback={<Skeleton variant="rectangular" width={160} height={90} />}>
                       <LazyThumbnail item={item}/>
                      </Suspense>
                    
                  </TableCell>

                  <TableCell
                    height={80}
                    style={{ width: "250px", direction: "column" }}
                  >
                    <Typography
                      style={{
                        width: "300px", 
                        whiteSpace: "nowrap", 
                        overflow: "hidden", 
                        textOverflow: "ellipsis",
                        fontWeight: 600,
                        color: item.title ? AppColors.tertiary : AppColors.secondary,
                        fontFamily: "Poppins",
                      }}
                      sx={{typography:FontSizeStandards.primaryHeading}}
                    >
                      {item.title || 'Title not added.'}
                    </Typography>

                    <Typography
                      style={{
                        width: "250px", 
                        whiteSpace: "normal", 
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden", 
                        fontWeight: 400,
                        color: AppColors.secondary,
                        fontFamily: "Poppins",
                      }}
                      sx={{typography:FontSizeStandards.tertiaryHeading}}
                    >
                      {item.description || 'Description not added.'}
                    </Typography>
                  </TableCell>

                  <TableCell onClick={() => {}} align="center" width={"10px"}>
                    <Typography
                      style={{
                        fontWeight: 400,
                        color: AppColors.secondary,
                        fontFamily: "Poppins",
                      }}
                      sx={{typography:FontSizeStandards.secondaryHeading}}
                    >
                      {moment(item.created_at).format("MMM Do")}
                    </Typography>
                  </TableCell>

                  <TableCell width={100}  align="center">
                    <Typography
                      style={{
                        fontWeight: 400,
                        color: AppColors.secondary,
                        fontFamily: "Poppins",
                      }}
                      sx={{typography:FontSizeStandards.secondaryHeading}}
                    >
                      {"24 Mb"}
                    </Typography>
                  </TableCell>

                  <TableCell
                    width={50}
                    onClick={() => {handleConfirmModal(); setDeletedData({id : item.id})}}
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

export default VideoPreviewTable;
