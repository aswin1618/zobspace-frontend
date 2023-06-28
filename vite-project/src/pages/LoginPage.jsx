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
import googleicon from '../assets/googleicon.png'

import { useNavigate } from "react-router-dom";


function LoginPage() {

  const navigate = useNavigate();

  // Styling for the paper container
  const paperStyle = {
    padding: 60,
    maxWidth: 400,
    margin: "20px auto",
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
  };
  const firsttext = {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "12px",
  };
  const linkStyles = {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'blue ',
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
  const handleSubmit = (e) => {
    e.preventDefault();

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
      navigate("/");
      // You can perform additional actions here, such as submitting the form data
    }
  };
  console.log(email)  
  return (
    <Grid>
      <Grid item xs={4}>

        <Avatar
          alt="Remy Sharp"
          src="src/assets/logo.png"
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
                id="standard-basic"
                label="email"
                placeholder="enter email address"
                variant="standard"
                fullWidth
                required
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}    
                helperText={emailError}
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

              <Button
                variant="contained"
                style={stylbtn1}
                fullWidth
                rounded
                startIcon={<img src={googleicon} alt="New Logo" style={{ height: '24px'}} />}
              >
                Sign in using google
              </Button>

              <Typography style={lasttext}>
                Don't have an account ?..
                <Link onClick={() => {
                  navigate("/signup");
                }} style={linkStyles} >
                   sign Up here</Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
