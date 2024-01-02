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
          xs: boxSize && boxSize.xs.width,
          sm: boxSize && boxSize.sm.width,
          md: boxSize && boxSize.md.width,
          lg: boxSize && boxSize.lg.width,
          xl: boxSize && boxSize.xl.width,
        },
        height: {
          xs: boxSize && boxSize.xs.height,
          sm: boxSize && boxSize.sm.height,
          md: boxSize && boxSize.md.height,
          lg: boxSize && boxSize.lg.height,
          xl: boxSize && boxSize.xl.width,
        },
      }}
    >
      {icon}
    </Box>
  );
}

export default CustomIcon;
