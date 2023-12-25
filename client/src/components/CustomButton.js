import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

import AppColors from "../constants/AppColors";


function CustomButton({
  prefixIcon: PrefixIcon,
  text,
  loading,
  buttonStyle,
  onTap,
  type,
}) {
//   const hoveredBgColor = lightenColor(buttonStyle.backgroundColor, 0.2)
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type={type}
      startIcon={PrefixIcon && <PrefixIcon style={{ width: 24, height: 24 }} />}
      sx={{
        fontSize: {
          xs: "10px",
          sm: "11px",
          md: "12px",
          lg: "13px",
          xl: "14px",
        },
        paddingX: 2,
        paddingY: 1,
        display: "flex",
        justifyContent: "start",
        ...buttonStyle,
        "&:hover": {
            opacity:0.5,
          backgroundColor:buttonStyle.backgroundColor ,
          color: buttonStyle.color,
        },
        textTransform: "Capitalize",
      }}
      onClick={onTap}
    >
      {loading ? (
        <CircularProgress
          size={24}
          style={{
            marginInline: 30,
            padding: 1,
            color: buttonStyle.color,
          }}
        />
      ) : (
        text
      )}
    </Button>
  );
}

export default CustomButton;
