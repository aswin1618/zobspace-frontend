import React, { useState, useContext } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Link,
  Typography,
  Box,
  Backdrop,
} from "@mui/material";
import googleicon from '../assets/googleicon.png'
import logo from '../assets/logo.png'

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';


function LoginPage() {
  let { loginUser } = useContext(AuthContext)

  const navigate = useNavigate();

  // Styling for the paper container
  const paperStyle = {
    padding: 60,
    maxWidth: 400,
    margin: "20px auto",
    backgroundColor: "black",
  };
  const stylbtn = {
    marginTop: "25px",
  };
  const stylbtn1 = {
    marginTop: "30px",
    backgroundColor: "white",
    border: "2px solid black",
    color: "black",
  };
  const lasttext = {
    fontSize: "12px", // Adjust the font size as needed
    marginTop: "auto",
    padding: "10px",
    textAlign: "center",
    color: 'white ',
  };
  const firsttext = {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "12px",
    color: 'white ',
  };
  const linkStyles = {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'blue ',
  };
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value);
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Email is required"); <CircularProgress style={{ margin: '16px auto' }} /> // Render CircularProgress
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length <= 6) {
      setPasswordError("Password must be more than 6 characters");
    } else {
      setPasswordError("");
    }
  };
  const handleLoginSuccess = () => {
    setLoading(false);
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Reset any previous error messages
    setEmailError("");
    setPasswordError("");

    // Perform form validation
    let isValid = true;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }
    // If the form is valid, navigate or perform any desired action
    if (isValid) {
      try {
        await loginUser(email, password, handleLoginSuccess);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        setShowAlert(true);
        console.error('Error during login:', error);
      }
    } 

  };

  return (

    <Grid>
      <Grid item xs={4}>

        <Avatar
          alt="Remy Sharp"
          src={logo}
          sx={{ width: 40, height: 40 }}
        />

      </Grid>
      <Grid item xs={8}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <h2> Sign In </h2> <br />
          </Grid>
          <form onSubmit={handleSubmit}>
            <Box>
              <TextField
                id="outlined-basic"
                label="email"
                placeholder="enter email address"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                focused
                sx={{
                  marginBottom: '16px',
                  "& label.Mui-focused": {
                    color: "white", // Change label color when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "white", // Change underline color when focused
                  },
                }}
              />
              <TextField
                label="password"
                placeholder="enter password"
                type="password"
                variant="outlined"
                margin="dense"
                fullWidth
                required
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
                focused
                sx={{
                  "& label.Mui-focused": {
                    color: "white", // Change label color when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "white", // Change underline color when focused
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                style={stylbtn}
                fullWidth
              >
                Sign In
              </Button>

              <Typography style={firsttext}>
                <Link href="#">Forgot password ?</Link>
              </Typography>

              {/* <Button
                  variant="contained"
                  style={stylbtn1}
                  fullWidth
                  startIcon={<img src={googleicon} alt="New Logo" style={{ height: '24px' }} />}
                >
                  Sign in using google
                </Button> */}

              <Typography style={lasttext}>
                Don't have an account ?..
                <Link onClick={() => {
                  navigate("/signup");
                }} style={linkStyles} >
                  sign Up here</Link>
              </Typography>
            </Box>
          </form>
          <div>
            {showAlert && (
              <Alert severity="error">
                <AlertTitle>Login error</AlertTitle>
                {error}
              </Alert>
            )}
          </div>
        </Paper>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}

export default LoginPage;
