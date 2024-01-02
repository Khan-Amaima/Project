import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { ImageSize } from '../constants/BoxSizes'
import SvgIcons from '../assets/images/svgicons'
import { FontSizeStandards } from '../constants/FontSizeStandards'
import AppColors from '../constants/AppColors'

function PageNotFound() {
  return (
   <Container style={{width:"100vw", height:"100vh",display:'flex' ,flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}} >
     <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
        <Container
          style={{ maxWidth:"auto", maxHeight:"40vh",display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}
        

        >
          {SvgIcons.pageNotFound}
        </Container>

        <Typography component="h1" variant="h5" style={{ fontFamily: 'Poppins', fontWeight: 500, color: AppColors.secondary, lineHeight: "20px", marginTop: 50, marginBottom: 30 }} sx={{ typography: FontSizeStandards.appName }}>
          Page not Found
        </Typography>
      </Container>
   </Container>
  )
}

export default PageNotFound