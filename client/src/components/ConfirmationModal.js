import React from "react";
import { Box, Typography } from "@mui/material";
import CustomModal from "./CustomModal";
import CustomButton from "./CustomButton";
import AppColors from "../constants/AppColors";
import { FontSizeStandards } from "../constants/FontSizeStandards";

function ConfirmationModal({
  isModelOpen,
  confirmationText,
  leftButtonText: LeftButtonText,
  rightButtonText: RightButtonText,
  leftButtonIcon: LeftButtonIcon,
  rightButtonIcon: RightButtonIcon,
  leftButtonFunction: LeftButtonFunction,
  rightButtonFunction: RightButtonFunction,
  data,
  icon,
}) {
  return (
    <CustomModal
      isModalOpen={isModelOpen}
      customStyle={{
        width: "auto",
        height: "auto",
        padding: "20px",
        borderRadius: "5px",
      }}
    >
      <Box
        style={{
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {icon}
        <Typography
          style={{
            fontFamily: "Poppins",
            fontWeight: 500,
            color: AppColors.tertiary,
            marginTop: "10px",
          }}
          sx={{ typography: FontSizeStandards.primaryHeading }}
        >
          {confirmationText}
        </Typography>
        <Box
          style={{
            display: "flex",
            direction: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "5px",
          }}
        >
          {(LeftButtonText || LeftButtonText) && (
            <CustomButton
              text={LeftButtonText}
              onTap={() => LeftButtonFunction()}
              prefixIcon={LeftButtonIcon}
              isDisable={false}
              buttonStyle={{
                borderRadius: 50,
                backgroundColor: AppColors.primary,
                fontFamily: "Poppins",
                fontSize: {
                  typography: {
                    xs: FontSizeStandards.secondaryHeading.xs,
                    sm: FontSizeStandards.secondaryHeading.sm,
                    md: FontSizeStandards.secondaryHeading.md,
                    lg: FontSizeStandards.secondaryHeading.lg,
                  },
                },
                fontWeight: 500,
                color: AppColors.tint,
                paddingInline: "20px",
                marginInline: "10px",
              }}
            />
          )}
          {(RightButtonText || RightButtonText) && (
            <CustomButton
              text={RightButtonText}
              prefixIcon={RightButtonIcon}
              onTap={() => RightButtonFunction(data?.id)}
              isDisable={false}
              buttonStyle={{
                borderRadius: 50,
                backgroundColor: AppColors.tint,
                fontFamily: "Poppins",
                fontSize: {
                  typography: {
                    xs: FontSizeStandards.secondaryHeading.xs,
                    sm: FontSizeStandards.secondaryHeading.sm,
                    md: FontSizeStandards.secondaryHeading.md,
                    lg: FontSizeStandards.secondaryHeading.lg,
                  },
                },
                fontWeight: 500,
                color: AppColors.tertiary,
                paddingInline: "20px",
                marginInline: "10px",
              }}
            />
          )}
        </Box>
      </Box>
    </CustomModal>
  );
}
export default ConfirmationModal;
