import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Alert,
  Box
} from '@mui/material';
import './LoginPage.css';
import { AuthAPI } from '../../services';
import { useUser } from '../../context/userContext'
import DogImage from '../../assests/dog_bg_4.png';

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();

const handleLogin = async () => {
  try {
    await AuthAPI.login(name, email); 
    setUser({ name, email }); 
    window.location.href = '/search';
  } catch (err) {
    setError('Login failed. Please try again.');
    console.error('Login failed', err);
  }
};

  return (
      <div className="login-container">
        <div className="login-left">
          <img src={DogImage} alt="Dog Fashion" className="dog-image" />
        </div>
        <div className="login-right">
          <Box className="login-card">
            <Typography variant="h4" className="login-title" fontSize={35} fontWeight={600} fontFamily='poppins' paddingBottom={4}>
              💕 FetchMate Login
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Name"
              value={name}
              fullWidth
              margin="normal"
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2,
                '& label.Mui-focused': {
                  color: '#ff69b4',
                  },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: '#ff69b4', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff1493', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff69b4', 
                  },
                },
                
              }}
            />
            <TextField
              label="Email"
              value={email}
              fullWidth
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2,
                '& label.Mui-focused': {
                  color: '#ff69b4',
                  },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: '#ff69b4', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff1493', 
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff69b4', 
                  },
                },
                
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                mt: 2,
                background: 'linear-gradient(90deg, #ff66b2, #ff99cc)',
                color: '#fff',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(90deg, #ff99cc, #ff66b2)'
                }
              }}
            >
              Login
            </Button>
          </Box>
        </div>
      </div>
  );
};

export default LoginPage;
