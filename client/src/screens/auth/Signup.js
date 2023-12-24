import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppColors from '../../constants/AppColors';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { appImage, checkBoxOutline } from '../../assets/images';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormHelperText } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { CustomStyle } from '../../constants/CustomStyle';
import CustomButton from '../../components/CustomButton';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Enter a valid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (event, values) => {
    setLoading(true);
    try {
      console.log('signup successfully')
      navigate('/')
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (event, values) => {
      handleSubmit(event, values)
    },
  });


  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <Container maxWidth='auto' style={{ height: '100vh', backgroundColor: AppColors.backgroundColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container component="main" maxWidth='sm' disableGutters >

        <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 32 }}>
          <Box
            component="img"
            sx={{
              height: 50,
              width: 40,
            }}
            src={appImage}
          />
          <Typography component="h1" variant="h5" style={{ fontFamily: 'Rajdhani', fontSize: 36, fontWeight: 600, color: AppColors.primary }}>
            Rostraa
          </Typography>
        </Container>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: '12px',
          }}
        >

          <Typography component="h1" variant="h5" style={{ marginTop: '40px', fontFamily: 'Poppins', fontSize: 24, fontWeight: '500', color: AppColors.tertiary }}>
            Create new account
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, margin: '40px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  fullWidth
                  id="name"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  sx={CustomStyle.inputStyle}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                />
                {formik.touched.name && formik.errors.name && (
                  <FormHelperText error id="confirmPassword">
                    {formik.errors.name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  fullWidth
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
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>

                  }}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  sx={CustomStyle.inputStyle}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                />
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText error id="password">
                    {formik.errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  }}
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  sx={CustomStyle.inputStyle}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <FormHelperText error id="confirmPassword">
                    {formik.errors.confirmPassword}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '40px', display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  sx={{
                    height: 20,
                    width: 20,
                  }}
                  src={checkBoxOutline}
                />
                <Typography style={{ color: AppColors.secondary, fontFamily: "Poppins", fontSize: '14px', fontWeight: '400', marginLeft: 10 }} >
                  {'Agree to all '}
                  <Link href="./login" style={{ color: AppColors.primary, fontFamily: "Poppins", fontSize: '14px', fontWeight: '500' }}>
                    Term
                  </Link>
                  {' and '}
                  <Link href="./login" style={{ color: AppColors.primary, fontFamily: "Poppins", fontSize: '14px', fontWeight: '500' }}>
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
            </Grid>

            <CustomButton type={'submit'} text={"Sign Up"} buttonStyle={{
              borderRadius: '4px',
              padding: '10px',
              backgroundColor: AppColors.primary,
              color: AppColors.white,
              fontFamily: 'Poppins',
              fontSize: '15px',
              fontWeight: 500,
              width: '100%',
              justifyContent : 'center',
              marginTop : 3,
              marginBottom : 2
            }} />
            <Typography style={{ color: AppColors.secondary, fontFamily: "Poppins", fontSize: '14px', fontWeight: '400' }} align="center" >
              {'Already have an account? '}
              <Link href="./login" style={{ color: AppColors.primary, fontFamily: "Poppins", fontSize: '14px', fontWeight: '500', textDecoration: 'none' }}>
                Log In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default SignUp;