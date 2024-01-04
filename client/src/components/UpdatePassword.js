import React, { useState } from "react";
import { FormHelperText, Grid, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CustomButton from "../components/CustomButton";
import AppColors from "../constants/AppColors";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import { CustomStyle } from "../constants/CustomStyle";
import { ImageSize } from "../constants/BoxSizes";
import ApiManager from "../api/ApiManager";
import { useSelector } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";
import { Delete, Verified } from "@mui/icons-material";

function UpdatePassword({}) {
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const userReducerState = useSelector((state) => state.userRed);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => setIsModalOpen(!isModalOpen);

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .required("Old password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmNewPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match with new password"),
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (event, values) => {
      handleSubmit(event, values);
    },
  });

  const handleSubmit = async (event, values) => {
    try {
      let response = await ApiManager.UpdatePassword(userReducerState?.authToken, event.oldPassword, event.newPassword)
      if(response.data.success){
        setMessage('Password Updated successfully')
        handleModal();
        console.log(response, 'res----------------');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowOldPassword = () => setShowOldPassword((show) => !show);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return (
    <Grid
      direction="row"
      justifyContent="flex-start"
      alignItems="start"
      container
      className="Change Password"
      gap={3}
      width={"auto"}
      sx={{ width: { xs: "100%", lg: "100%" } }}
      style={{
        borderColor: AppColors.primary,
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        display: "flex",
        padding: 20,
        // direction: "row",
        // justifyContent: "center",
        // alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Grid
        item
        xs={11.5}
        md={11.5}
        alignItems={"start"}
        justifyContent={"start"}
      >
        <Typography
          variant="h6"
          component="h2"
          style={{
            fontFamily: "Poppins",
            fontWeight: "600",
            color: AppColors.tertiary,
          }}
          sx={{ typography: FontSizeStandards.primaryHeading }}
        >
          Change Password
        </Typography>
      </Grid>

      <Grid
        gap={2}
        component="form"
        onSubmit={formik.handleSubmit}
        container
        width={"auto"}
        alignItems={"left"}
        sx={{ width: { xs: "100%", lg: "100%" } }}
        style={{
          borderColor: AppColors.primary,
          backgroundColor: "#F5F5F5",
          display: "flex",
          direction: "row",
          // justifyContent: "center",
          alignItems: "center",
          // margin: "auto",
        }}
      >

        <Grid
          // spacing={0}
          item
          xs={5.5}
          md={5.5}
          style={{
            borderColor: AppColors.primary,
            backgroundColor: "",
            borderRadius: "10px",
            display: 'block',
            justifyContent: "center",
            alignItems: "center",
            // margin: "auto",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            style={{
              paddingLeft: "5px",
              fontFamily: "Poppins",
              fontWeight: "500",
              color: AppColors.tertiary,
            }}
            sx={{ typography: FontSizeStandards.secondaryHeading }}
          >
            Old Password
          </Typography>
          <TextField
            id="oldPassword"
            type={showOldPassword ? "text" : "password"}
            fullWidth
            InputProps={{
              sx: {
                typography: {
                  xs: FontSizeStandards.secondaryHeading.xs,
                  sm: FontSizeStandards.secondaryHeading.sm,
                  md: FontSizeStandards.secondaryHeading.md,
                  lg: FontSizeStandards.secondaryHeading.lg,
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowOldPassword}
                    edge="end"
                  >
                    {showOldPassword ? (
                      <VisibilityOff
                        sx={{
                          width: {
                            xs: ImageSize.UploadPicIcon.xs.width,
                            sm: ImageSize.UploadPicIcon.sm.width,
                            md: ImageSize.UploadPicIcon.md.width,
                            lg: ImageSize.UploadPicIcon.lg.width,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                          height: {
                            xs: ImageSize.UploadPicIcon.xs.height,
                            sm: ImageSize.UploadPicIcon.sm.height,
                            md: ImageSize.UploadPicIcon.md.height,
                            lg: ImageSize.UploadPicIcon.lg.height,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          width: {
                            xs: ImageSize.UploadPicIcon.xs.width,
                            sm: ImageSize.UploadPicIcon.sm.width,
                            md: ImageSize.UploadPicIcon.md.width,
                            lg: ImageSize.UploadPicIcon.lg.width,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                          height: {
                            xs: ImageSize.UploadPicIcon.xs.height,
                            sm: ImageSize.UploadPicIcon.sm.height,
                            md: ImageSize.UploadPicIcon.md.height,
                            lg: ImageSize.UploadPicIcon.lg.height,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Old password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            sx={CustomStyle.inputStyle}
            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <FormHelperText error id="oldPassword">
              {formik.errors.oldPassword}
            </FormHelperText>
          )}
        </Grid>

        <Grid
          // spacing={0}
          item
          xs={5.5}
          md={5.5}
          style={{
            borderColor: AppColors.primary,
            backgroundColor: "",
            borderRadius: "10px",
            direction: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            style={{
              paddingLeft: "5px",
              fontFamily: "Poppins",
              fontWeight: "500",
              color: AppColors.tertiary,
            }}
            sx={{ typography: FontSizeStandards.secondaryHeading }}
          >
            New Password
          </Typography>
          <TextField
            id="newPassword"
            type={showPassword ? "text" : "password"}
            fullWidth
            InputProps={{
              sx: {
                typography: {
                  xs: FontSizeStandards.secondaryHeading.xs,
                  sm: FontSizeStandards.secondaryHeading.sm,
                  md: FontSizeStandards.secondaryHeading.md,
                  lg: FontSizeStandards.secondaryHeading.lg,
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff
                        sx={{
                          width: {
                            xs: ImageSize.UploadPicIcon.xs.width,
                            sm: ImageSize.UploadPicIcon.sm.width,
                            md: ImageSize.UploadPicIcon.md.width,
                            lg: ImageSize.UploadPicIcon.lg.width,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                          height: {
                            xs: ImageSize.UploadPicIcon.xs.height,
                            sm: ImageSize.UploadPicIcon.sm.height,
                            md: ImageSize.UploadPicIcon.md.height,
                            lg: ImageSize.UploadPicIcon.lg.height,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          width: {
                            xs: ImageSize.UploadPicIcon.xs.width,
                            sm: ImageSize.UploadPicIcon.sm.width,
                            md: ImageSize.UploadPicIcon.md.width,
                            lg: ImageSize.UploadPicIcon.lg.width,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                          height: {
                            xs: ImageSize.UploadPicIcon.xs.height,
                            sm: ImageSize.UploadPicIcon.sm.height,
                            md: ImageSize.UploadPicIcon.md.height,
                            lg: ImageSize.UploadPicIcon.lg.height,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="New password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            sx={CustomStyle.inputStyle}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <FormHelperText error id="newPassword">
              {formik.errors.newPassword}
            </FormHelperText>
          )}
        </Grid>

        <Grid
          item
          gap={2}
          xs={5.5}
          md={5.5}
          style={{
            borderColor: AppColors.primary,
            backgroundColor: "",
            direction: "row",
            justifyContent: "center",
            alignItems: "center",
            // margin: "auto",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            style={{
              fontFamily: "Poppins",
              fontWeight: "500",
              color: AppColors.tertiary,
              paddingLeft: "5px",
            }}
            sx={{ typography: FontSizeStandards.secondaryHeading }}
          >
            Confirm Password
          </Typography>
          <TextField
            id="confirmNewPassword"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            InputProps={{
              sx: {
                typography: {
                  xs: FontSizeStandards.secondaryHeading.xs,
                  sm: FontSizeStandards.secondaryHeading.sm,
                  md: FontSizeStandards.secondaryHeading.md,
                  lg: FontSizeStandards.secondaryHeading.lg,
                },
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff
                        sx={{
                          width: {
                            xs: ImageSize.UploadPicIcon.xs.width,
                            sm: ImageSize.UploadPicIcon.sm.width,
                            md: ImageSize.UploadPicIcon.md.width,
                            lg: ImageSize.UploadPicIcon.lg.width,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                          height: {
                            xs: ImageSize.UploadPicIcon.xs.height,
                            sm: ImageSize.UploadPicIcon.sm.height,
                            md: ImageSize.UploadPicIcon.md.height,
                            lg: ImageSize.UploadPicIcon.lg.height,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          width: {
                            xs: ImageSize.UploadPicIcon.xs.width,
                            sm: ImageSize.UploadPicIcon.sm.width,
                            md: ImageSize.UploadPicIcon.md.width,
                            lg: ImageSize.UploadPicIcon.lg.width,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                          height: {
                            xs: ImageSize.UploadPicIcon.xs.height,
                            sm: ImageSize.UploadPicIcon.sm.height,
                            md: ImageSize.UploadPicIcon.md.height,
                            lg: ImageSize.UploadPicIcon.lg.height,
                            xl: ImageSize.UploadPicIcon.xl.width,
                          },
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Confirm new password"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            sx={CustomStyle.inputStyle}
            error={
              formik.touched.confirmNewPassword &&
              Boolean(formik.errors.confirmNewPassword)
            }
          />
          {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
            <FormHelperText error id="confirmNewPassword">
              {formik.errors.confirmNewPassword}
            </FormHelperText>
          )}
        </Grid>

        <Grid
          item
          xs={11.5}
          md={11.5}
          alignItems={"end"}
          justifyContent={"end"}
          style={{
            display: "flex",
            direction: "row",
          }}
        >
          <CustomButton
            type={"submit"}
            text={"Update Password"}
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
              color: AppColors.white,
            }}
          />
        </Grid>
      </Grid>
      <ConfirmationModal
        isModelOpen={isModalOpen}
        confirmationText={message}
        rightButtonText={"Close"}
        rightButtonFunction={handleModal}
        icon={
          <Verified style={{ width: "60px", height: "60px", color: "green" }} />
        }
      />
    </Grid>
  );
}

export default UpdatePassword;
