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

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };


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

          <Box noValidate onSubmit={handleSubmit} sx={{ mt: 3, margin: '40px' }} style={{ width: '85%' }}>
            <TextField
              autoComplete="email"
              name="email"
              required
              fullWidth
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />

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