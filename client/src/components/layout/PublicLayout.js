import React from 'react'
import Box from "@mui/material/Box";

function PublicLayout({ children }) {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, overflowX: "hidden" }}>
      {children}
    </Box>
  )
}

export default PublicLayout