import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';
import CustomAppBar from '../CustomAppBar';
import CustomSideBar from '../CustomSideBar';

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
      <div style={{width: `calc(100% - 200px)`, flexGrow: 1, padding : '35px', overflow : 'hidden'}}>
        <DrawerHeader/>
        {children}
      </div>
    </Box>
  )
}

export default PrivateLayout