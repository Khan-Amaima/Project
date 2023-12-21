import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';
import CustomAppBar from '../CustomAppBar';
import CustomSideBar from '../CustomSideBar';
import { Container, Grid } from '@mui/material';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function PrivateLayout({children}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true); 

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box
      component="main"
      sx={{flexGrow: 1, display: 'flex', overflowX: 'hidden' }}>
      <CssBaseline />
      <CustomAppBar toggleDrawer={toggleDrawer} open={open}/>
      <CustomSideBar theme={theme} open={open} handleDrawerClose={handleDrawerClose}/>
      <Container fixed maxWidth='auto' sx={{ flexGrow: 1, padding : 5, margin: 0}}>
        <DrawerHeader/>
        {children}
      </Container>
    </Box>
  )
}

export default PrivateLayout