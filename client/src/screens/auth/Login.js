import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppColors from "../../constants/AppColors";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { appImage } from "../../assets/images";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomStyle } from "../../constants/CustomStyle";
import CustomButton from "../../components/CustomButton";
import { FontSizeStandards } from "../../constants/FontSizeStandards";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (event, values) => {
    setLoading(true);
    try {
      console.log("SignIn successfully");
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (event, values) => {
      handleSubmit(event, values);
    },
  });

  const handleShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container
      maxWidth="auto"
      style={{
        height: "100vh",
        backgroundColor: AppColors.backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="sm" disableGutters>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 50,
              width: 40,
            }}
            src={appImage}
          />
          <Typography
            component="h1"
            variant="h5"
            style={{
              fontFamily: "Rajdhani",
              fontWeight: 600,
              color: AppColors.primary,
            }}
            sx={{ typography: FontSizeStandards.appName }}
          >
            Rostraa
          </Typography>
        </Container>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "12px",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{
              marginTop: 40,
              fontFamily: "Poppins",
              fontWeight: "500",
              color: AppColors.tertiary,
            }}
            sx={{ typography: FontSizeStandards.mainHeading }}
          >
            Login in to your account
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3, margin: "40px" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
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
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  sx={CustomStyle.inputStyle}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
                {formik.touched.email && formik.errors.email && (
                  <FormHelperText error id="confirmPassword">
                    {formik.errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  sx={CustomStyle.inputStyle}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                />
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText error id="password">
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                style={{ paddingTop: "0px", marginTop: "5px" }}
              >
                <Link
                  href="./forgotPassword"
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    style={{
                      color: AppColors.secondary,
                      fontFamily: "Poppins",
                      fontWeight: "400",
                    }}
                    sx={{ typography: FontSizeStandards.tertiaryHeading }}
                    align="end"
                  >
                    {"Forgot Password? "}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
            <CustomButton
              type={"submit"}
              text={"Login"}
              buttonStyle={{
                borderRadius: "4px",
                padding: "10px",
                backgroundColor: AppColors.primary,
                color: AppColors.white,
                fontFamily: "Poppins",
                fontSize: "15px",
                fontWeight: 500,
                width: "100%",
                justifyContent: "center",
                marginTop: 3,
                marginBottom: 2,
              }}
            />
            <Typography
              style={{
                color: AppColors.secondary,
                fontFamily: "Poppins",
                fontWeight: "400",
              }}
              sx={{ typography: FontSizeStandards.tertiaryHeading }}
              align="center"
            >
              {"New here? "}
              <Link
                href="./signup"
                style={{
                  color: AppColors.primary,
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
                sx={{ typography: FontSizeStandards.tertiaryHeading }}
              >
                Sign Up
              </Link>
              {" instead"}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default Login;
