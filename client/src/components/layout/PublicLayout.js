import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";

function PublicLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  )
}

export default PublicLayout