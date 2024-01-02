import React, { useRef, useState } from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Cancel } from "@mui/icons-material";
import { FormHelperText } from "@mui/material";
import SvgIcons from "../assets/images/svgicons";
import AppColors from "../constants/AppColors";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import { CustomStyle } from "../constants/CustomStyle";
import { ImageSize } from "../constants/BoxSizes";
import CustomIcon from "./CustomIcon";
import CustomButton from "./CustomButton";

function UpdateProfile({}) {
  const navigate = useNavigate();
  const [isDisableButton, setIsDisableButton] = useState(true);
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [pictureFile, setPictureFile] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const pictureInputRef = useRef();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const initialValues = {
    name: "Jason",
    email: "Jason@gmail.com",
    phone: "",
  };

  const handleSubmit = (event, values) => {
    try {
      console.log(" success", event);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,

    onSubmit: async (event, values) => {
      handleSubmit(event, values);
    },
    validate: (values) => {
      if (focusedField == "email") {
        if (values.email == initialValues.email) {
          setIsEmailChanged(false);
          if (!isNameChanged) {
            setIsDisableButton(true);
          } else {
            setIsDisableButton(false);
          }
        } else {
          setIsEmailChanged(true);
          setIsDisableButton(false);
        }
      } else if (focusedField == "name") {
        if (values.name == initialValues.name) {
          setIsNameChanged(false);
          if (!isEmailChanged) {
            console.log("nothing Changed");
            setIsDisableButton(true);
          } else {
            console.log("name not but email");
            setIsDisableButton(false);
          }
        } else {
          console.log("Name changed");
          setIsNameChanged(true);
          setIsDisableButton(false);
        }
      }
    },
  });

  const handleChoose = () => {
    pictureInputRef.current.click();
  };

  const handleFileChange = (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setPictureFile(url);
      }
    } catch (err) {
      console.log(err, "upload Picture error");
    }
  };

  const handleDeleteFile = () => {
    setPictureFile(null);
  };

  return (
    <Grid
      container
      component="form"
      onSubmit={formik.handleSubmit}
      className="Personal Information"
      gap={3}
      width={"auto"}
      sx={{ width: { xs: "100%", lg: "100%" } }}
      style={{
        borderColor: AppColors.primary,
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        padding: 20,
        direction: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "",
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
          Personal Information
        </Typography>
      </Grid>

      <Grid
        gap={2}
        container
        width={"auto"}
        sx={{ width: { xs: "100%", lg: "100%" } }}
        style={{
          borderColor: AppColors.primary,
          backgroundColor: "#F5F5F5",
          display: "flex",
          direction: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Grid
          item
          xs={5.5}
          md={5.5}
          style={{
            borderColor: AppColors.primary,
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
            Full Name
          </Typography>
          <TextField
            name="name"
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
            }}
            id="name"
            onFocus={() => handleFocus("name")}
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            sx={CustomStyle.inputStyle}
          />
          {formik.touched.name && formik.errors.name && (
            <FormHelperText error id="confirmPassword">
              {formik.errors.name}
            </FormHelperText>
          )}
        </Grid>

        <Grid
          item
          xs={5.5}
          md={5.5}
          style={{
            borderColor: AppColors.primary,
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
              fontFamily: "Poppins",
              fontWeight: "500",
              color: AppColors.tertiary,
              paddingLeft: "5px",
            }}
            sx={{ typography: FontSizeStandards.secondaryHeading }}
          >
            Email
          </Typography>
          <TextField
            disabled
            autoComplete="email"
            name="email"
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
            }}
            id="email"
            onFocus={() => handleFocus("email")}
            placeholder="Enter Your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            sx={CustomStyle.inputStyle}
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText error id="confirmPassword">
              {formik.errors.email}
            </FormHelperText>
          )}
        </Grid>

        <Grid
          item
          xs={5.5}
          md={5.5}
          style={{
            borderColor: AppColors.primary,
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
              fontFamily: "Poppins",
              fontWeight: "500",
              color: AppColors.tertiary,
              paddingLeft: "5px",
            }}
            sx={{ typography: FontSizeStandards.secondaryHeading }}
          >
            Phone Number
          </Typography>
          <TextField
            name="phoneNumber"
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
            }}
            id="phoneNumber"
            onFocus={() => handleFocus("phoneNumber")}
            placeholder="Enter Your Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            sx={CustomStyle.inputStyle}
          />
        </Grid>

        <Grid
          item
          xs={5.5}
          md={5.5}
          style={{
            borderColor: AppColors.primary,
            justifyContent: "center",
            alignItems: pictureFile !== null ? "center" : "start",
            margin: "auto",
            backgroundColor: "",
            wrap: "nowrap",
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
            Upload Picture
          </Typography>
          {pictureFile !== null ? (
            <Grid
              style={{ alignContent: "", display: "flex", alignSelf: "center" }}
            >
              <Box
                width={"100px"}
                height={"100px"}
                style={{
                  backgroundColor: "white",
                  borderRadius: "50px",
                  position: "relative",
                }}
              >
                {pictureFile && (
                  <Box
                    width={"100px"}
                    height={"100px"}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "50px",
                      position: "absolute",
                      borderColor: AppColors.primary,
                    }}
                  >
                    <img
                      src={pictureFile}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        borderRadius: "50px",
                      }}
                    />

                    <IconButton
                      onClick={() => handleDeleteFile()}
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "-10px",
                      }}
                    >
                      <Cancel
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
                        style={{ color: "red" }}
                      />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Grid>
          ) : (
            <Grid
              container
              onClick={() => handleChoose()}
              width={"auto"}
              sx={{ width: { xs: "100%", lg: "100%" } }}
              style={{
                border: "2px dashed",
                borderColor: AppColors.grey,
                borderRadius: "5px",
                padding: "5px",
                direction: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Grid item xs={3} md={1}>
                <CustomIcon
                  icon={SvgIcons.uploadPicIcon}
                  boxSize={ImageSize.UploadPicIcon}
                  justifyContent={"center"}
                  alignItems={"center"}
                />
              </Grid>

              <Grid item xs={9} md={6}>
                <Typography
                  variant="h6"
                  component="h2"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    color: AppColors.secondary,
                  }}
                  sx={{ typography: FontSizeStandards.subHeading }}
                >
                  Upload Photo
                </Typography>
                <Typography
                  style={{
                    marginTop: "5px",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    color: AppColors.secondary,
                  }}
                  sx={{ typography: FontSizeStandards.subHeading }}
                >
                  (. tiff, . tif, . jpeg, . jpg, . jpe, . png)
                </Typography>
              </Grid>
              <Grid item xs={6} lg={6}>
                <input
                  ref={pictureInputRef}
                  style={{ display: "none", backgroundColor: "red" }}
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg, .jpeg, .png, .gif"
                />
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid
          item
          xs={11.5}
          md={11.5}
          style={{
            display: "flex",
            direction: "row",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <CustomButton
            type={"submit"}
            text={"Update Profile"}
            isDisable={isDisableButton}
            buttonStyle={{
              borderRadius: 50,
              backgroundColor: isDisableButton
                ? AppColors.grey
                : AppColors.primary,
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
    </Grid>
  );
}

export default UpdateProfile;
