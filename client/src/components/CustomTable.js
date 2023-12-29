import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import AppColors from "../constants/AppColors";
import { deleteIcon, disableSoundIcon, soundIcon } from "../assets/images";
import CustomButton from "../components/CustomButton";
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

function CustomTable({
  tableData,
  handleDeleteFile,
  handleSetPrimarySound,
  handleDragRef,
  handleDraggedOverRef,
  handleSorting,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);
  const [targetVideo, setTargetVideo] = useState();
  

  const [startDragging, setStartDragging] = useState(false);
  const [isDraggingOver, setDraggingOver] = useState(false);

  const columns = [
    { id: "drag", label: "", minWidth: 24, align: "center" },
    { id: "no", label: "No.", minWidth: 20, align: "center" },
    {
      id: "video",
      label: "",
      minWidth: 100,
      align: "center",
      width: 120,
      height: 70,
    },
    {
      id: "sound",
      label: "Sound",
      minWidth: 100,
      align: "center",
      width: 20,
      height: 20,
    },
    {
      id: "size",
      label: "Size",
      minWidth: 170,
      align: "center",
    },
    {
      id: "button",
      label: "",
      minWidth: 50,
      align: "right",
    },
    {
      id: "deleteIcon",
      label: "",
      minWidth: 50,
      align: "right",
      width: 20,
      height: 20,
    },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "32px" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    color: AppColors.tertiary,
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  {column.label}
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
            {tableData.map((item, index) => {
              let no = index + 1;
              return (
                <TableRow
                  draggable={startDragging ? "true" : "false"}
                  onDragStart={() => handleDragRef(index)}
                  onDragEnter={() => {
                    handleDraggedOverRef(index);
                    setStartDragging(false);
                  }}
                  onDragEnd={() => {
                    if (isDraggingOver) {
                      handleSorting();
                    }
                    setStartDragging(false);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDraggingOver(true);
                    console.log("setting dragOver", isDraggingOver);
                  }}
                  onDragLeave={() => {
                    setDraggingOver(false);
                    console.log("left");
                  }}
                  hover
                  role="checkbox"
                  key={no}
                >
                  <TableCell
                    onTouchStart={() => {
                      setStartDragging(true);
                    }}
                    onTouchEnd={() => {
                      setStartDragging(false);
                    }}
                    onMouseDown={() => {
                      setStartDragging(true);
                    }}
                    onMouseUp={() => {
                      setStartDragging(false);
                    }}
                    width={24}
                    align="center"
                  >
                    <Box
                      style={{
                        align:"",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "move",
                        marginInline:"20px"
                      }}
                      sx={{
                        width: {
                          xs: ImageSize.UploadPicIcon.xs.width,
                          sm: ImageSize.UploadPicIcon.sm.width,
                          md: ImageSize.UploadPicIcon.md.width,
                          lg: ImageSize.UploadPicIcon.lg.width,
                          xl: ImageSize.UploadPicIcon.xl.width,
                        },
                        height: {
                          xs: ImageSize.UploadPicIcon.xs.height,
                          sm: ImageSize.UploadPicIcon.sm.height,
                          md: ImageSize.UploadPicIcon.md.height,
                          lg: ImageSize.UploadPicIcon.lg.height,
                          xl: ImageSize.UploadPicIcon.xl.width,
                        },
                      }}
                    >
                      {SvgIcons.dragIcon}
                    </Box>
                  </TableCell>

                  <TableCell width={20} align="center"> {no}</TableCell>
                  <TableCell
                    
                    align="start"
                    onClick={() => {
                      handleModal();
                      setTargetVideo(item.video);
                    }}
                  >
                    <video
                      width={140}
                      height={80}
                      controls
                      src={item.video}
                      style={{ borderRadius: "10px" }}
                    />
                  </TableCell>
                  <TableCell onClick={() => {}} align="center" width={"10px"}>
                  <Box
                      style={{
                        align:"",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "move",
                        marginInline:"20px",
                       
                      }}
                      sx={{
                        width: {
                          xs: ImageSize.UploadPicIcon.xs.width,
                          sm: ImageSize.UploadPicIcon.sm.width,
                          md: ImageSize.UploadPicIcon.md.width,
                          lg: ImageSize.UploadPicIcon.lg.width,
                          xl: ImageSize.UploadPicIcon.xl.width,
                        },
                        height: {
                          xs: ImageSize.UploadPicIcon.xs.height,
                          sm: ImageSize.UploadPicIcon.sm.height,
                          md: ImageSize.UploadPicIcon.md.height,
                          lg: ImageSize.UploadPicIcon.lg.height,
                          xl: ImageSize.UploadPicIcon.xl.width,
                        },
                      }}
                    >
                      {item.sound? SvgIcons.soundIcon:SvgIcons.muteIcon}
                    </Box>
                  </TableCell>
                  <TableCell onClick={() => {}} align="center">
                    <Typography
                      style={{
                        size: "16px",
                        fontWeight: 400,
                        color: AppColors.secondary,
                        fontFamily: "Poppins",
                      }}
                    >
                      {item.size}
                    </Typography>
                  </TableCell>
                  <TableCell onClick={() => {}}>
                    <CustomButton
                      onTap={() => {handleSetPrimarySound(index)}}
                      
                      text={"Primary Audio"}
                      buttonStyle={{
                        backgroundColor: item.sound
                          ? AppColors.primary
                          : AppColors.white,
                        border: item.sound ? "" : "1px solid",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: item.sound ? AppColors.white : AppColors.primary,
                      }}
                    />
                  </TableCell>
                  <TableCell onClick={() => handleDeleteFile(index)}>
                  <Box
                      style={{
                        align:"",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "move",
                        marginInline:"20px",
                        
                      }}
                      sx={{
                        width: {
                          xs: ImageSize.UploadPicIcon.xs.width,
                          sm: ImageSize.UploadPicIcon.sm.width,
                          md: ImageSize.UploadPicIcon.md.width,
                          lg: ImageSize.UploadPicIcon.lg.width,
                          xl: ImageSize.UploadPicIcon.xl.width,
                        },
                        height: {
                          xs: ImageSize.UploadPicIcon.xs.height,
                          sm: ImageSize.UploadPicIcon.sm.height,
                          md: ImageSize.UploadPicIcon.md.height,
                          lg: ImageSize.UploadPicIcon.lg.height,
                          xl: ImageSize.UploadPicIcon.xl.width,
                        },
                      }}
                    >
                      {SvgIcons.deleteIcon}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default CustomTable;
