import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Stack } from "@mui/material";
import Navbar from "../components/NavBar";
import ExploreContent from "../components/ExploreContent";
import Layout from "./Layout";


function Explore() {
  return (
    <>
      
        <Layout>
          <Box marginLeft={{ xs: '10px' }}>
            <ExploreContent />
          </Box>
        </Layout>

    </>
  );
}

export default Explore;
