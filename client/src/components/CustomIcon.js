import React from "react";
import { Box } from "@mui/material";

function CustomIcon({
  icon,
  boxSize,
  align,
  justifyContent,
  alignItems,
  cursor,
  marginInline,
}) {
  return (
    <Box
      style={{
        align: align,
        justifyContent: justifyContent,
        alignItems: alignItems,
        cursor: cursor,
        marginInline: marginInline,
      }}
      sx={{
        width: {
          xs: boxSize.xs.width,
          sm: boxSize.sm.width,
          md: boxSize.md.width,
          lg: boxSize.lg.width,
          xl: boxSize.xl.width,
        },
        height: {
          xs: boxSize.xs.height,
          sm: boxSize.sm.height,
          md: boxSize.md.height,
          lg: boxSize.lg.height,
          xl: boxSize.xl.width,
        },
      }}
    >
      {icon}
    </Box>
  );
}

export default CustomIcon;
