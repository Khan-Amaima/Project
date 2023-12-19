import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppColors from '../../constants/AppColors';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {appImage, checkBoxOutline} from '../../assets/images';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <Container maxWidth='auto' style={{ height: '100vh', backgroundColor: AppColors.backgroundColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container component="main" maxWidth='sm' disableGutters >

        <Container style={{ display: 'flex', flexDirection : 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 32 }}>
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

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, margin: '40px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <OutlinedInput
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e)=>{setConfirmPassword(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: '0px', marginTop: '40px', display: 'flex', alignItems : 'center' }}>
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
                  <Link href="./login" style={{ color: AppColors.primary, fontFamily: "Poppins", fontSize: '14px', fontWeight: '500'}}>
                    Term
                  </Link>
                  {' and '}
                  <Link href="./login" style={{ color: AppColors.primary, fontFamily: "Poppins", fontSize: '14px', fontWeight: '500'}}>
                    Privacy Policy
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: AppColors.primary, borderRadius: '4px', padding: '10px', color: AppColors.white, fontFamily: 'Poppins', fontSize: '15px', fontWeight: 500 }}
            >
              Sign Up
            </Button>
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