import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Navbar from "../components/NavBar";
import AudioPost from "../components/AudioPost";
import HomeRight from "../components/HomeRight";
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { name } = useContext(AuthContext);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
        <Sidebar />

        <div style={{ gridColumn: '2 /   3' }}>
          <Navbar />

          <Box sx={{ marginTop: '100px' }}>
            <Grid container spacing={4}>
              <Grid item xs={10} sm={6}>
                <Stack spacing={4}>
                  <AudioPost /> <AudioPost /> <AudioPost />
                </Stack>
              </Grid>
              <Grid item sm={4} xs={8}>
                <Stack spacing={4}>
                  <HomeRight />
                  <HomeRight />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Home;
