import React from 'react'
import Box from "@mui/material/Box";

function PrivateLayout({children}) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, mt: 8, overflowX: "hidden" }}>
        {children}
      </Box>
    </Box>
  )
}

export default PrivateLayout