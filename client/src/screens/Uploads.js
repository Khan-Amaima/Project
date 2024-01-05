import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  TableRow,
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
} from "@mui/icons-material";
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CustomTablePagination from "../components/CustomTablePagination";
import ApiManager from "../api/ApiManager";
import { connect, useDispatch, useSelector } from "react-redux";

function Uploads() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [uploadedVideos, setUploadedVideos] = useState([1, 2]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);
  const userReducerState = useSelector((state) => state.userRed);
  

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
    if(response.data.success){
      setLoading(false)
      setUserData(response.data.data);
    }
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
  ) : userData.length == 0 ? (
    <Container
      maxWidth="100vw"
      style={{
        height: "82vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          sx={{
            width: {
              xs: ImageSize.VideoIcon.xs.width,
              sm: ImageSize.VideoIcon.sm.width,
              md: ImageSize.VideoIcon.md.width,
              lg: ImageSize.VideoIcon.lg.width,
            },
            height: {
              xs: ImageSize.VideoIcon.xs.height,
              sm: ImageSize.VideoIcon.sm.height,
              md: ImageSize.VideoIcon.md.height,
              lg: ImageSize.VideoIcon.lg.height,
            },
          }}
        >
          {SvgIcons.videoIcon}
        </Container>

        <Typography
          component="h1"
          variant="h5"
          style={{
            fontFamily: "Poppins",
            fontWeight: 500,
            color: AppColors.secondary,
            lineHeight: "20px",
            marginTop: 50,
            marginBottom: 30,
          }}
          sx={{ typography: FontSizeStandards.mainHeading }}
        >
          No Content Uploaded
        </Typography>
        <CustomButton
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
      </Container>
      <UploadVideo
        isModalOpen={isModalOpen}
        handleModal={handleModal}
        fetchVideos={fetchVideos}
      />
    </Container>
  ) : (
    <>
      <Grid
        item
        xs={11.5}
        md={11.5}
        style={{
          backgroundColor: "#F5F5F5",
          display: "flex",
          direction: "row",
          justifyContent: "end",
          alignItems: "end",
          padding: "20px",
          borderRadius: "5px",
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
            marginX: "5px",
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
        }}
      >
        <IconButton
          size="large"
          color={AppColors.primary}
          aria-label="open drawer"
        >
          <CheckBoxOutlineBlank />
        </IconButton>
        <Grid
          item
          xs={5.5}
          md={5.5}
          style={{
            display: "flex",
            direction: "row",
            justifyContent: "end",
            alignItems: "end",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
        
            <TableRow>
            <CustomTablePagination
              // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={40}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'Rows per page',
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
        </Grid>
      </Grid>

      <VideoPreviewTable tableData={userData} fetchVideos={fetchVideos} />
    </>
  );
}

export default Uploads;
