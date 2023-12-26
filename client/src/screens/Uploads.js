import React, { useState } from 'react'
import { Container, Box, Typography } from '@mui/material'
import AppColors from '../constants/AppColors'
import { uploadVideoImage } from '../assets/images'
import CustomButton from '../components/CustomButton'
import { FontSizeStandards } from '../constants/FontSizeStandards'
import UploadVideo from '../components/UploadVideo'
import { ImageSize } from '../constants/BoxSizes'
import SvgIcons from '../assets/images/SvgIcons'

function Uploads() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <Container maxWidth='100vw' style={{ height: '82vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
        <Container
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}
          sx={{
            width: { xs: ImageSize.VideoIcon.xs.width, sm: ImageSize.VideoIcon.sm.width, md: ImageSize.VideoIcon.md.width, lg: ImageSize.VideoIcon.lg.width },
            height: { xs: ImageSize.VideoIcon.xs.height, sm: ImageSize.VideoIcon.sm.height, md: ImageSize.VideoIcon.md.height, lg: ImageSize.VideoIcon.lg.height }
          }}

        >
          {SvgIcons.videoIcon}
        </Container>

        <Typography component="h1" variant="h5" style={{ fontFamily: 'Poppins', fontWeight: 500, color: AppColors.secondary, lineHeight: "20px", marginTop: 50, marginBottom: 30 }} sx={{ typography: FontSizeStandards.mainHeading }}>
          No Content Uploaded
        </Typography>
        <CustomButton onTap={() => { handleModal() }} text={"upload Video"} loading={loading} buttonStyle={{
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