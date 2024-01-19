import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  TableRow,
  Table,
  TableBody
} from "@mui/material";
import AppColors from "../constants/AppColors";
import { uploadVideoImage } from "../assets/images";
import CustomButton from "../components/CustomButton";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import UploadVideo from "../components/UploadVideo";
import { ImageSize } from "../constants/BoxSizes";
import SvgIcons from "../assets/images/svgicons";
import CustomTable from "../components/CustomTable";
import VideoPreviewTable from "../components/VideoPreviewTable";
import {
  AddCircleOutline,
  CheckBoxOutlineBlank,
  CheckBoxOutlineBlankOutlined,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  Verified,
  WarningAmber,
} from "@mui/icons-material";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CustomTablePagination from "../components/CustomTablePagination";
import ApiManager from "../api/ApiManager";
import { useSelector } from "react-redux";
import ConfirmationModal from "../components/ConfirmationModal";
import StartUploadingVideo from "../components/StartUploadingVideo";

function Uploads() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [uploadedVideos, setUploadedVideos] = useState([1, 2]);
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

  const openConfirmationModal =()=>{
    console.log('call ----------------')
    setIsConfirmationModalOpen(true)
    setMessage('message')
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchVideos = async () => {
    setLoading(true);
    let response = await ApiManager.fetchVideos(userReducerState?.authToken);
    if(response.success){
      console.log(response.data)
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

      {/* <Grid
        item
        xs={11.5}
        md={11.5}
        style={{
          display: "flex",
          direction: "row",
          justifyContent: "end",
          alignItems: "center",
          padding: "5px",
          borderRadius: "5px",
          minWidth: "220px",
          
        }}
      >
        <Grid
          item
          xs={7}
          md={5}
          style={{
            display: "inline",
            direction: "row",
            justifyContent: "end",
            alignItems: "end",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
         
           <Table>
           <TableBody>
            <TableRow>
            < CustomTablePagination
              // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={40}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  "aria-label": "Rows per page",
                },
                actions: {
                  showFirstButton: false,
                  showLastButton: false,
                  slots: {
                    nextPageIcon: ChevronRightRoundedIcon,
                    backPageIcon: ChevronLeftRoundedIcon,
                  },
                },
              }}
              onPageChange={handleChangePage}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </TableRow>
           </TableBody>
           </Table>
          
        </Grid>
      </Grid> */}

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
