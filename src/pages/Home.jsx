import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Navbar from "../components/NavBar";
import HomeRight from "../components/HomeRight";
import Feed from "../components/feed";
import Layout from "./Layout";

function Home() {


  return (
    <>
      <Box>
        <Layout>
    
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Feed />
            <HomeRight />
          </Stack>
        </Layout>

      </Box>
    </>
  );
}

export default Home;
