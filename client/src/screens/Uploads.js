import React, { useRef, useState } from 'react'
import { Container, Box, Typography, Grid, TextField, InputAdornment, IconButton } from '@mui/material'
import AppColors from '../constants/AppColors'
import { uploadIcon, uploadVideoImage } from '../assets/images'
import CustomButton from '../components/CustomButton'
import CustomModal from '../components/CustomModal'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CustomTable from '../components/CustomTable'

function Uploads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);
  const inputRef = useRef();

  const [tableData, setTableData] = useState([])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    const url = URL.createObjectURL(file);
    let customSize = file.size / 1024 / 1024;
    setTableData([...tableData, { video: url, sound: true, size: `${customSize.toFixed(2)}Mb` }]);
  };

  // let array =[
  //   { video: url, sound: true, size: `${customSize.toFixed(2)}Mb` },
  //   { video: url, sound: true, size: `${customSize.toFixed(2)}Mb` },
  //   { video: url, sound: true, size: `${customSize.toFixed(2)}Mb` },
  // ]

  const handleDeleteFile = (id) => {
    // console.log('i am also clicking')
    let extractedVideos = tableData.filter((video, index) => index != id)
    setTableData(extractedVideos);
  }

  const handleSetPrimarySound = (id) => {;
    const updatedVideosWithSound = tableData.map((item, index) => {
      if (index === id) {
        // Set 'sound' to true for the specific object
        return { ...item, sound: true };
      } else {
        // Set 'sound' to false for other objects
        return { ...item, sound: false };
      }
    });
    setTableData(updatedVideosWithSound);
  }

  const handleChoose = () => {
    inputRef.current.click();
  };

  const MainHeading = {
    xs: {
      fontSize: 18,
    },
    sm: {
      fontSize: 20,
    },
    md: {
      fontSize: 22,
    },
    lg: {
      fontSize: 24,
    }
  }

  const inputStyle = {
    padding: "3px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: AppColors.grey,
      },
      "&:hover fieldset": {
        borderColor: AppColors.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor: AppColors.primary,
      },
    },
  }

  return (
    <Container maxWidth='100vw' style={{ height: '82vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
        <Box
          component="img"
          sx={{
            height: 220,
            width: 340,
          }}
          src={uploadVideoImage}
        />
        <Typography component="h1" variant="h5" style={{ fontFamily: 'Poppins', fontWeight: 500, color: AppColors.secondary, lineHeight: "20px", marginTop: 50, marginBottom: 30 }} sx={{ typography: { xs: MainHeading.xs, sm: MainHeading.sm, md: MainHeading.md, lg: MainHeading.lg } }}>
          No Content Uploaded
        </Typography>
        <CustomButton onTap={() => { handleModal() }} text={"upload Video"} buttonStyle={{
          borderRadius: 50,
          backgroundColor: AppColors.primary,
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: 600,
          color: AppColors.white,
          marginY: 1,
          marginX: 2,
          paddingX: 4,
        }} />
      </Container>
      <CustomModal isModalOpen={isModalOpen} handleModal={handleModal} >
        <Typography variant="h6" component="h2" style={{ fontFamily: 'Poppins', fontSize: 20, fontWeight: '600', color: AppColors.tertiary, marginBottom: '20px', textAlign: 'center' }}>
          Upload Videos
        </Typography>
        <Grid container width={'auto'} sx={{ width: { xs: '100%', lg: '60%' } }} style={{ border: '2px dashed', borderColor: AppColors.primary, borderRadius: '10px', padding: 20, direction: 'row', justifyContent: "center", alignItems: 'center', margin: 'auto' }}>
          <Grid item xs={12} md={2}>
            <Box
              component="img"
              sx={{
                height: 60,
                width: 60,
              }}
              src={uploadIcon}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: '500', color: AppColors.tertiary }}>
              Select a file or drag and drop here
            </Typography>
            <Typography style={{ marginTop: '5px', fontFamily: 'Poppins', fontSize: 12, fontWeight: '500', color: AppColors.secondary }}>
              MP3, MP4 or flash, file size no more than 10MB
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4}>
            <input
              ref={inputRef}
              style={{ display: 'none' }}
              type="file"
              onChange={handleFileChange}
              accept=".mov,.mp4"
            />
            <CustomButton onTap={() => { handleChoose() }} text={"Select Videos"} buttonStyle={{
              borderRadius: 50,
              backgroundColor: AppColors.tint,
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: 500,
              color: AppColors.primary,
            }} />
          </Grid>
        </Grid>
        <Grid container width={'auto'} sx={{ width: { xs: '100%', lg: '60%' } }} style={{ direction: 'column', justifyContent: "center", alignItems: 'center', margin: 'auto', marginTop: '32px', }}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '500', color: AppColors.tertiary, marginBottom: '6px' }}>
              Video Details
            </Typography>
            <TextField
              name="title"
              fullWidth
              id="title"
              placeholder="Video title"
              sx={inputStyle}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="pencil-icon"
                      edge="end"
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
              }}
            />
            <TextField
              name="description"
              fullWidth
              id="description"
              placeholder="Description"
              sx={inputStyle}
              style={{ marginTop: '6px' }}
              multiline={true}
              rows={4}
            />
          </Grid>
        </Grid>

        {tableData.length > 0 && <CustomTable tableData={tableData} handleDeleteFile={handleDeleteFile} handleSetPrimarySound={handleSetPrimarySound} />}

      </ CustomModal>
    </Container>
  )
}

export default Uploads