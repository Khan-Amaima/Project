import React from "react";
import { Button, CircularProgress } from "@mui/material";
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

  return (
    <Button
      disabled={isDisable}
      type={type}
      startIcon={PrefixIcon && <PrefixIcon style={{ color:IconColor }} sx={{width:{xs:20,sm:21,md:22,lg:23,xl:24} , height:{xs:20,sm:21,md:22,lg:23,xl:24}}} />}
      endIcon= {SuffixIcon && <SuffixIcon style={{ width: 24, height: 24 }} />}
      style={{minWidth:"max-content"}}
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
