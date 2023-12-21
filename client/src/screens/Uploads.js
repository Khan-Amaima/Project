import React from 'react'
import { Container, Box, Typography, SvgIcon } from '@mui/material'
import AppColors from '../constants/AppColors'
import { uploadVideoImage } from '../assets/images'
import CustomButton from '../components/CustomButton'



function Uploads() {

  const AppName = {
    xs: {
      fontSize: 30,
    },
    sm: {
      fontSize: 32,
    },
    md: {
      fontSize: 34,
    },

    lg: {
      fontSize: 36,
    }

  }

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
        <CustomButton key={0} prefixIcon={""} onTap={() => { console.log("Upload Videos") }} text={"upload Video "} buttonStyle={{
          borderRadius: 50,
          backgroundColor: AppColors.primary,
          fontFamily: 'Poppins',
          fontSize: '14px',
          fontWeight: 600,
          color: AppColors.white,
          marginY: 1,
          marginX: 2,
          paddingX : 4,
          display: 'flex',
          justifyContent: 'start'
        }} />
      </Container>
    </Container>
  )
}

export default Uploads