import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Alert, Card, CardContent, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUserLogin = () => {
    if (userEmail === 'user@gmail.com' && userPassword === '123456') {
      localStorage.setItem('authToken', 'user-token'); // Save a token for the user
      navigate('/user');
    } else {
      setError('Invalid user credentials');
    }
  };
  
  const handleAdminLogin = () => {
    if (adminEmail === 'admin@gmail.com' && adminPassword === '123456') {
      localStorage.setItem('authToken', 'admin-token'); // Save a token for the admin
      navigate('/admin-calendar');
    } else {
      setError('Invalid admin credentials');
    }
  };
  

  return (
    <Box style={{ padding: '20px', backgroundColor: 'hsl(220deg 100% 80%)', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Calendar
      </Typography>

      {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}

      <Grid container spacing={4} style={{ marginTop: '8rem' }}>
        <Grid item xs={12} md={6}>
          <Card style={{ backgroundColor: 'white', filter: 'drop-shadow(1px 2px 8px hsl(0deg 0% 0% / 0.25))' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">User Login</Typography>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <Box textAlign="center" marginTop={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUserLogin}
                >
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card style={{ backgroundColor: 'white', filter: 'drop-shadow(1px 2px 8px hsl(0deg 0% 0% / 0.25))' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom align="center">Admin Login</Typography>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <Box textAlign="center" marginTop={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAdminLogin}
                >
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
