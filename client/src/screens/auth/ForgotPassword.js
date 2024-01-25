import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppColors from "../../constants/AppColors";
import { appImage } from "../../assets/images";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormHelperText, SvgIcon } from "@mui/material";
import { CustomStyle } from "../../constants/CustomStyle";
import CustomButton from "../../components/CustomButton";
import { FontSizeStandards } from "../../constants/FontSizeStandards";
import SvgIcons from "../../assets/images/svgicons";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const AppIcon = {
    xs: {
      height: 44,
      width: 34,
    },
    sm: {
      height: 46,
      width: 36,
    },
    md: {
      height: 48,
      width: 38,
    },

    lg: {
      height: 50,
      width: 40,
    },
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const initialValues = {
    email: "",
  };

  const handleSubmit = (event, values) => {
    setLoading(true);
    event.preventDefault();
    try {
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

  return (
    <Container
      maxWidth="auto"
      style={{
        height: "100vh",
        overflow:"scroll",
        backgroundColor: AppColors.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="sm" disableGutters  style={{marginTop:"50px",marginBottom:"50px"}}>
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
            sx={{
              height: 50,
              width: 40,
            }}
          >
            {SvgIcons.appLogo}
          </Box>
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
            FocusPlayer
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
              fontFamily: "Poppins",
              fontWeight: 500,
              color: AppColors.tertiary,
              marginTop: 40,
            }}
            sx={{ typography: FontSizeStandards.mainHeading }}
          >
            Forgot password ?
          </Typography>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3, margin: "40px" }}
            style={{ width: "85%" }}
          >
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
              placeholder="Email"
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
            <CustomButton
              type={"submit"}
              text={"Get new password"}
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
            <Link href="./login" style={{ textDecoration: "none" }}>
              <Typography
                style={{
                  color: AppColors.secondary,
                  fontFamily: "Poppins",
                  fontWeight: "400",
                }}
                sx={{ typography: FontSizeStandards.tertiaryHeading }}
                align="center"
              >
                {"Go Back"}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default ForgotPassword;
