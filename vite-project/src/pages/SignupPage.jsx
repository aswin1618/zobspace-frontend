import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Link,
  Typography,
  Box,
  CircularProgress,
  Alert,
  AlertTitle,
  Backdrop,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const paperStyle = {
    padding: 60,
    maxWidth: 700,
    margin: "20px auto",
    backgroundColor: "black",
    height: "80%",
  };
  const stylbtn = {
    marginTop: "25px",
  };
  const stylbtn1 = {
    marginTop: "30px",
  };
  const lasttext = {
    fontSize: "12px",   // Adjust the font size as needed
    marginTop: "auto",
    padding: "10px",
    textAlign: "center",
  }
  const firsttext = {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "12px"
  }
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
  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    validatePassword2(value);
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Email is required");
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
  const validatePassword2 = (value) => {
    if (!value) {
      setConfirmPasswordError("Password is required");
    } else if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError("");
    }
  };
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleSignup = async (e) => {
    // Perform form validation
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          username,
          password
        })
      });
      if (!response.ok) {
        setShowAlert(true);
        setLoading(false);
        throw new Error('Registration request failed.'); // or handle the specific error condition
      }
      else {
        localStorage.setItem('email', email);
        setRedirect(true);
        setLoading(false);

      }
    } catch (error) {
      setShowAlert(true)
      console.error(error);
    }


  }
  // After successful signup, navigate to a success page or login page
  if (redirect) {
    navigate("/signupotp");
  }


  return (
    <Grid>
      <Avatar
        alt="Remy Sharp"
        src="src/assets/logo.png"
        sx={{ width: 40, height: 40 }}
      />
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2> Signup to zobspaze </h2> <br />
        </Grid>

        <Box component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' },
          }}>
          <TextField
            id="standard-basic"
            label="email"
            placeholder="enter email adress"
            variant="outlined"
            type="email"
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
            label="username"
            placeholder="enter username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
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
            label="confirm password"
            placeholder="password"
            type="password"
            variant="outlined"
            margin="dense"
            fullWidth
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
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


          <Button
            type="submit"
            variant="contained"
            style={stylbtn}
            fullWidth
            onClick={handleSignup}
          >
            Register
          </Button>



          {/* <Button type="submit" variant="contained" style={stylbtn1} fullWidth>
            Sign Up using google
          </Button> */}

          <Typography style={lasttext}>
            Already have an account?
            <Link href="#"> Sign in here</Link>
          </Typography>
        </Box>
        <div>
          {showAlert && (
            <Alert severity="error" onClose={handleAlertClose}>
              <AlertTitle>Signup error</AlertTitle>
              your signup request failed, try doing it again
            </Alert>
          )}
        </div>
      </Paper>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}

export default SignupPage;
