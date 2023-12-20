import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppColors from '../../constants/AppColors';
import { appImage } from '../../assets/images';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormHelperText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {                           // - The TextField-root
                                         // - For demonstration: set the TextField-root border
          padding: '3px',               // - Make the border more distinguishable
  
          // (Note: space or no space after `&` matters. See SASS "parent selector".)
          '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
              '& fieldset': {            // - The <fieldset> inside the Input-root
                  borderColor: AppColors.secondary,   // - Set the Input border
              },
              '&:hover fieldset': {
                  borderColor: AppColors.primary, // - Set the Input border when parent has :hover
              },
              '&.Mui-focused fieldset': { // - Set the Input border when parent is focused 
                  borderColor: AppColors.tertiary,
              },
          },
      },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          "&:hover fieldset": {
            borderColor: AppColors.primary // use the original border color on hover
          },
          '&:before': {
            borderColor: AppColors.secondary, // Change select menu border color
          },
          '&.Mui-focused fieldset': {
            borderColor: AppColors.secondary, // Change border color on focus
          },
        },
        icon: {
          color: AppColors.secondary, // Change select menu icon color
        },
      },
    },
  }, 
});

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").required("Email is required"),
  });

  const initialValues = {
    email: '',
  };

  const handleSubmit = (event, values) => {
    setLoading(true);
    event.preventDefault();
    try {
      console.log('SignIn successfully')
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

  return (
    <Container maxWidth='auto' style={{ height: '100vh', backgroundColor: AppColors.backgroundColor, display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
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

          <Typography component="h1" variant="h5" style={{ marginTop: 40, fontFamily: 'Poppins', fontSize: 24, fontWeight: '500', color: AppColors.tertiary }}>
            Forgot password ?
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, margin: '40px' }} style={{ width: '85%' }}>
          <ThemeProvider theme={theme}>
          <div >
            <TextField
              autoComplete="email"
              name="email"
              fullWidth
              id="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              InputProps={{
                classes: {
                  notchedOutline: 'Mui-disabled', // Apply the Mui-disabled class to the notchedOutline
                },
              }} 
             
            />
            </div>
            </ThemeProvider>
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error id="confirmPassword">
                {formik.errors.email}
              </FormHelperText>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: AppColors.primary, borderRadius: '4px', padding: '10px', color: AppColors.white, fontFamily: 'Poppins', fontSize: '15px', fontWeight: 500 }}
            >
              Get new password
            </Button>
            <Link href="./login" style={{ textDecoration: 'none' }}>
              <Typography style={{ color: AppColors.secondary, fontFamily: "Poppins", fontSize: '14px', fontWeight: '400' }} align="center" >
                {'Go Back'}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default ForgotPassword;