import React from "react";
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

function FinalRegisterPage() {
  const navigate = useNavigate(); 

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
  return (
    <Grid>
      <Avatar
        alt="Remy Sharp"
        src="src/assets/logo.png"
        sx={{ width: 40, height: 40 }}
      />
      <Paper elevation={10} style={paperStyle}>
        <Box>
        <Grid align="center">
         <h2>Congratulations ! You are Registered as an artitst .. Keep Jamming</h2>
        </Grid>
          <Button type="submit" variant="contained" style={stylbtn} fullWidth onClick={() => {
              navigate("/login");
            }} >
            Continue to login
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default FinalRegisterPage;
