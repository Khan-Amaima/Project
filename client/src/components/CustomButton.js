import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

import AppColors from "../constants/AppColors";
import { FontSizeStandards } from "../constants/FontSizeStandards";


function CustomButton({
  prefixIcon: PrefixIcon,
  iconColor: IconColor,
  suffixIcon: SuffixIcon,
  text,
  loading,
  isDisable,
  buttonStyle,
  onTap,
  type,
}) {

  // console.log("disable",isDisable)
  return (
    <Button
      disabled={isDisable}
      type={type}
      startIcon={PrefixIcon && <PrefixIcon style={{ width: 24, height: 24,color:IconColor }} />}
      endIcon= {SuffixIcon && <SuffixIcon style={{ width: 24, height: 24 }} />}
      style={{minWidth:"fit-content"}}
      sx={{
        typography: FontSizeStandards.tertiaryHeading,
        paddingX: 2,
        paddingY: 1,
        display: "flex",
        justifyContent: "start",
        ...buttonStyle,
        "&:hover": {
          opacity: 0.8,
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
