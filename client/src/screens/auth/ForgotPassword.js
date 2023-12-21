import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppColors from '../../constants/AppColors';
import { appImage } from '../../assets/images';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import theme from '../../constants/TextFieldTheme';

import { FormHelperText } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@emotion/react';

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  

  
  const AppName = {
    xs : {
       fontSize: 30,
    }, 
    sm : {
      fontSize: 32,
    },
    md : {
      fontSize: 34,
    }, 

    lg : {
      fontSize: 36,
    }

  }

  const MainHeading = {
    xs : {
       fontSize: 18, 
    }, 
    sm : {
      fontSize: 20,
    },
    md : {
      fontSize: 22,
    }, 

    lg : {
      fontSize: 24,
    }

  }

  const PrimaryHeading = {
    xs : {
       fontSize: 14, 
    }, 
    sm : {
      fontSize: 16,
    },
    md : {
      fontSize: 18,
    }, 

    lg : {
      fontSize: 20,
    }

  }

  const SecondaryHeading = {
    xs : {
       fontSize: "25px", 
       color:"red",backgroundColor:""
       
    }, 
    sm : {
      fontSize: "10px",
      color:"blue",
    },
    md : {
      fontSize: 14,color:"red",
    }, 

    lg : {
      fontSize: 13,color:"blue",
    }

  }

  const SubHeading = {
    xs : {
       fontSize: 14, 
    }, 
    sm : {
      fontSize: 13,
    },
    md : {
      fontSize: 12,
    }, 

    lg : {
      fontSize: 11,
    }

  }

  const AppIcon = {
    xs : {
      
      height:44,width:34},
    sm : {
      height:46,width:36
    },
    md : {
      height:48,width:38
    }, 

    lg : {
      height:50,width:40
    }

  }

  



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
              box:{ xs: AppIcon.xs, sm:  AppIcon.sm, md:AppIcon.md,lg: AppIcon.lg}
             }}
            src={appImage}
          />
          <Typography component="h1" variant="h5" style={{ fontFamily: 'Rajdhani',fontWeight: 600, color: AppColors.primary }} sx={{ typography: { xs: AppName.xs, sm:  AppName.sm, md:AppName.md,lg: AppName.lg}}}>
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

          <Typography component="h1" variant="h5" style={{fontFamily: 'Poppins', fontWeight: 500, color: AppColors.tertiary,marginTop: 40,}} sx={{ typography: { xs: MainHeading.xs, sm:  MainHeading.sm, md:MainHeading.md,lg: MainHeading.lg}}}>
            Forgot password ?
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, margin: '40px' }} style={{ width: '85%' }}>
          <ThemeProvider theme={theme}>
          
            <TextField
              autoComplete="email"
              name="email"
              fullWidth
              id="email"
              placeholder="Email"
              // inputProps={{ xs: SecondaryHeading.xs, sm:  SecondaryHeading.sm, md:SecondaryHeading.md,lg: SecondaryHeading.lg}}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              // sx={styles.root}
              style={{color:"red"}}
            />
          
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