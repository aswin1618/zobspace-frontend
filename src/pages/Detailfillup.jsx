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

function Detailfillup() {
  const navigate = useNavigate(); 

  const paperStyle = {
    padding: 80,
    width: 300,
    margin: "50px auto",
  };
  const stylbtn = {
    marginTop: "25px",
  };
  return (
    <Grid>
      <Avatar
        alt="Remy Sharp"
        src="src/assets/logo.png"
        sx={{ width: 40, height: 40 }}
      />
      <Paper elevation={10} style={paperStyle}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <h2>Fill Up!!</h2>
          <TextField
            id="standard-basic"
            label="First Name"
            variant="standard"
            margin="dense"
          />
          <TextField
            id="standard-basic"
            label="Last Name"
            variant="standard"
            margin="dense"
          />
          <TextField
            id="standard-basic"
            label="Location"
            variant="standard"
            margin="dense"
          />
          <TextField
            id="standard-multiline-flexible"
            label="Bio    "
            multiline
            maxRows={4}
            variant="standard"
          />
          <TextField
            id="dob-input"
            label="Date of Birth"
            type="date"
            variant="outlined"
            margin="dense"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button type="submit" variant="contained" style={stylbtn} fullWidth onClick={() => {
              navigate("/signupfinal");
            }}>
            Continue
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Detailfillup;
