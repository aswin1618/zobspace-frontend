import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL

function Emailotp() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email')
  const [otp, setOtp] = useState("");
  const [redirect, setRedirect] = useState(false);


  const paperStyle = {
    padding: 50,
    width: 300,
    margin: "50px auto",
    backgroundColor: "black",
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
    color: 'white ',
  }
  const firsttext = {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "12px",
    color: 'white ',
  }

  const handleOtp = async (e) => {
    // Perform form validation
    e.preventDefault()
  try {
    const response = await fetch(`${API_URL}/auth/verify_otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        otp
      })
    });
    if (!response.ok) {
      throw new Error('otp verification failed.'); // or handle the specific error condition
    }
    if (response.ok) {
      localStorage.removeItem('email', email);
      setRedirect(true);
    }
  } catch (error) {
    // Handle any error that occurred during the request
    console.error(error);
  }

}
// After successful signup, navigate to a success page or login page
if (redirect) {
  navigate("/signupfinal");
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
        <h2> Enter otp </h2> <br />
      </Grid>
      <Box>
        <TextField
          id="standard-basic"
          label="otp"
          placeholder="enter otp"
          variant="standard"
          fullWidth
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          style={stylbtn}
          fullWidth
          onClick={handleOtp}
        >
          Continue
        </Button>

      </Box>
    </Paper>
  </Grid>
);
}

export default Emailotp;
