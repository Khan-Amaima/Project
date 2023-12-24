import React, { useState } from 'react'
import { Container, Box, Typography } from '@mui/material'
import AppColors from '../constants/AppColors'
import { uploadVideoImage } from '../assets/images'
import CustomButton from '../components/CustomButton'
import { FontSizeStandards } from '../constants/FontSizeStandards'
import UploadVideo from '../components/UploadVideo'

function Uploads() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);

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
        <Typography component="h1" variant="h5" style={{ fontFamily: 'Poppins', fontWeight: 500, color: AppColors.secondary, lineHeight: "20px", marginTop: 50, marginBottom: 30 }} sx={{ typography: FontSizeStandards.mainHeading }}>
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
      <UploadVideo isModalOpen={isModalOpen} handleModal={handleModal} />
    </Container>
  )
}

export default Uploads