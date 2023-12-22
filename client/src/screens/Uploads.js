import React, { useState } from 'react'
import { Container, Box, Typography, SvgIcon, Grid } from '@mui/material'
import AppColors from '../constants/AppColors'
import { uploadIcon, uploadVideoImage } from '../assets/images'
import CustomButton from '../components/CustomButton'
import CustomModal from '../components/CustomModal'


function Uploads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);

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
        <Grid container width={'auto'} sx={{width : {xs : '100%', lg : '60%'}}} style={{ border: '2px dashed', borderColor: AppColors.primary, borderRadius: '10px', padding: 20, direction: 'row', justifyContent: "center", alignItems: 'center', margin: 'auto' }}>
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select a file or drag and drop here
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              MP3, MP4 or flash, file size no more than 10MB
            </Typography>
          </Grid>
          <Grid item xs={12} lg={4}>
            <CustomButton onTap={() => { }} text={"Select Videos"} buttonStyle={{
              borderRadius: 50,
              backgroundColor: AppColors.tint,
              fontFamily: 'Poppins',
              fontSize: '14px',
              fontWeight: 500,
              color: AppColors.primary,
            }} />
          </Grid>
        </Grid>
      </ CustomModal>
    </Container>
  )
}

export default Uploads