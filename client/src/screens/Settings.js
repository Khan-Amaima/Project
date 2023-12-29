import { Typography, Container, Grid, Box, TextField } from "@mui/material";
import { ImageSize } from "../constants/BoxSizes";
import SvgIcons from "../assets/images/svgicons";
import AppColors from "../constants/AppColors";
import * as Yup from "yup";
import React, { useRef, useState } from "react";
import { FontSizeStandards } from "../constants/FontSizeStandards";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { CustomStyle } from "../constants/CustomStyle";
import CustomButton from "../components/CustomButton";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Cancel } from "@mui/icons-material";

function Settings() {
  const navigate = useNavigate();
  const pictureInputRef = useRef();
  const [pictureFile, setPicture] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (event, values) => {
      handleSubmit(event, values);
    },
  });

  const handleSubmit = (event, values) => {
    try {
      console.log("signup successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleChoose = () => {
    pictureInputRef.current.click();
  };


  const handleFileChange = (event) => {
    try{
        const file = event.target.files[0];
        if(file){

            const url = URL.createObjectURL(file);
            console.log(file, '//////////////////////////////', url)

            // let customSize = file.size / 1024 / 1024;
            setPicture(url);
        }
    }catch(err){
        console.log(err, 'upload Picture error')
    }
};

const handleDeleteFile = () => {
    setPicture(null);
}

  return (
    <Grid
      Container
      className="Main"
      gap={3}
      spacing={1}
      width={"auto"}
      sx={{ width: { xs: "100%", lg: "100%" } }}
      style={{
        borderColor: AppColors.primary,
        backgroundColor: "white",
        borderRadius: "10px",
        padding: 20,
        direction: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Grid
        container
        className="Personal Information"
        gap={3}
        spacing={1}
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
              placeholder="Enter your name"
              defaultValue={"Christian Mark"}
              //  value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              sx={CustomStyle.inputStyle}
            />
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
              placeholder="Enter Your Email"
              defaultValue={"chris123@gmail.com"}
              //  value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              sx={CustomStyle.inputStyle}
            />
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
              placeholder="Enter Your Number"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              sx={CustomStyle.inputStyle}
            />
          </Grid>

          <Grid
            item
            xs={5.5}
            md={5.5}
            direction={"column"}
            wrap="nowrap"
            style={{
              borderColor: AppColors.primary,
              justifyContent: "center",
              alignItems: pictureFile!==null? "center":"start",
              margin: "auto",
              backgroundColor:"",
              display:"flex"
            

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
            {
              pictureFile!==null ?
              
             <Grid>
                <Box width={"100px"} height={'100px'} style={{backgroundColor:"white",borderRadius:"50px" , position:"relative"}}>
                 {pictureFile && (<Box width={"100px"} height={'100px'} style={{backgroundColor:"white",borderRadius:"50px",position:"absolute",borderColor: AppColors.primary,}}>
                 <img src={pictureFile}  style={{ objectFit: 'cover', width: '100%', height: '100%',borderRadius:"50px" }} />
                 
                 <IconButton 
                   onClick={()=>handleDeleteFile()}
                   style={{ position: 'absolute',top :"0px",right:"-10px",}}>
                 <Cancel sx={{
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
                          style={{color:"red"}}
                          />
              
              </IconButton> 
                 
                 </Box>)}
                
                </Box>
             </Grid>

                          


              
              :
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
                <Box
                  style={{ justifyContent: "center", alignItems: "center" }}
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
                >
                  {SvgIcons.uploadPicIcon}
                </Box>
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
            </Grid>}




          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        className="Change Password"
        gap={3}
        spacing={1}
        width={"auto"}
        sx={{ width: { xs: "100%", lg: "100%" } }}
        style={{
          borderColor: AppColors.primary,
          backgroundColor: "#F5F5F5",
          borderRadius: "10px",
          display:"flex",
          padding: 20,
          direction: "row",
          justifyContent: "center",
          alignItems: "center",
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
            spacing={0}
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
              id="password"
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
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              sx={CustomStyle.inputStyle}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
          </Grid>

          <Grid
            spacing={0}
            item
            xs={5.5}
            md={5.5}
            style={{
              borderColor: AppColors.primary,
              backgroundColor: "",
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
              Confirm Password
            </Typography>
            <TextField
              id="confirmPassword"
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
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              sx={CustomStyle.inputStyle}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
            />
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
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <CustomButton
            onTap={() => {
              console.log("Updating Password");
            }}
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

       
      </Grid>
    </Grid>
  );
}

export default Settings;
