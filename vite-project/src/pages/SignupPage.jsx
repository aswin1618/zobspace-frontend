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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const paperStyle = {
    padding: 60,
    maxWidth: 300,
    margin: "50px auto",
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

  const handleSignup = async (e) => {
    // Perform form validation
    e.preventDefault()
    // if (email === "" || password === "" || confirmPassword === "") {
    //   // Display error or validation message
    //   return;
    // }

    // Perform signup logic here (e.g., call an API or authentication service)
    // You can use the email and password states to send the signup request
    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          username,
          password
        })
      });
      if (!response.ok) {
        throw new Error('Registration request failed.'); // or handle the specific error condition
      }
      else {
        localStorage.setItem('email', email);
        setRedirect(true);
      }
    } catch (error) {
      // Handle any error that occurred during the request
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
        <Box>
          <TextField
            id="standard-basic"
            label="email"
            placeholder="enter email adress"
            variant="standard"
            type="email"
            fullWidth
            required
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            label="username"
            placeholder="enter username"
            variant="standard"
            fullWidth
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="password"
            placeholder="enter password"
            type="password"
            variant="standard"
            margin="dense"
            fullWidth
            required
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
          />
          <TextField
            label="confirm password"
            placeholder="password"
            type="password"
            variant="standard"
            margin="dense"
            fullWidth
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
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



          <Button type="submit" variant="contained" style={stylbtn1} fullWidth>
            Sign Up using google
          </Button>

          <Typography style={lasttext}>
            Already have an account?
            <Link href="#"> Sign in here</Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default SignupPage;
