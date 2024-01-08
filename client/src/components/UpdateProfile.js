import React, { useEffect, useRef, useState } from "react";
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
import { connect, useDispatch, useSelector } from "react-redux";
import ApiManager from "../api/ApiManager";

function UpdateProfile({}) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isDisableButton, setIsDisableButton] = useState(true);
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [pictureFile, setPictureFile] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const pictureInputRef = useRef();
  const userReducerState = useSelector((state) => state.userRed);

  const getProfileData = async () => {
    let response = await ApiManager.getProfile(userReducerState?.authToken);
    // if (response.data.success) {
      setName(response.data.data.user.first_name);
      setEmail(response.data.data.user.email);
      if (response.data.data.profile_picture) {
        const file = response?.data?.data?.profile_picture;
        setPictureFile(file);
        console.log(`${process.env.REACT_APP_BASE_URL}${file}`, "-------");
        const url = URL.createObjectURL(file);
        setPictureUrl(`${process.env.REACT_APP_BASE_URL}${file}`);
      // }
    }
  };

  setTimeout(() => {
    setResponseMessage("");
  }, 3000);
  const updateProfileData = async () => {
    let response = await ApiManager.updateProfile(
      userReducerState?.authToken,
      pictureFile
    );
    console.log(response);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
  });

  const initialValues = {
    name: name,
    email: email,
    phone: "",
  };

  const handleSubmit = (event, values) => {
    try {
      console.log(" successs", event);
      updateProfileData();
      // navigate("/");
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
      if (focusedField == "name") {
        if (values.name == initialValues.name) {
          setIsDisableButton(true);
        } else {
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
        setPictureFile(file);
        setPictureUrl(url);
      }
    } catch (err) {
      console.log(err, "upload Picture error");
    }
  };

  const handleDeleteFile = () => {
    setPictureFile(null);
    setPictureUrl(null);
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
      <Grid item xs={12} md={12} alignItems={"start"} justifyContent={"start"}>
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
          xs={12}
          sm={5.5}
          md={5.5}
          lg={5.5}
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
            value={formik.values.name || name}
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
          xs={12}
          sm={5.5}
          md={5.5}
          lg={5.5}
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
            value={formik.values.email || email}
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
          xs={12}
          sm={5.5}
          md={5.5}
          lg={5.5}
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
          xs={12}
          sm={5.5}
          md={5.5}
          lg={5.5}
          style={{
            borderColor: AppColors.primary,
            justifyContent: pictureUrl !== null ? "center" : "start",
            alignItems: pictureUrl !== null ? "center" : "start",
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
            Upload Picture
          </Typography>
          {pictureUrl !== null ? (
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
                {pictureUrl && (
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
                      src={pictureUrl}
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
                display: "flex",
                backgroundColor: "",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Grid
                item
                xs={2}
                sm={2}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <CustomIcon
                  icon={SvgIcons.uploadPicIcon}
                  boxSize={ImageSize.UploadPicIcon}
                  justifyContent={"center"}
                  alignItems={"center"}
                />
              </Grid>

              <Grid item xs={8} sm={9.5} style={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  component="h2"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    color: AppColors.secondary,
                  }}
                  sx={{ typography: FontSizeStandards.secondaryHeading }}
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
          xs={12}
          sm={7}
          md={8.5}
          lg={8.5}
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            style={{
              fontFamily: "Poppins",
              fontWeight: "500",
              color: "red",
              paddingLeft: "0px",
              marginLeft: "5px",
            }}
            sx={{ typography: FontSizeStandards.secondaryHeading }}
          >
            {responseMessage}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={3}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
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
