import React from "react";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";
import Navbar from "../components/NavBar";
function Library() {
  return (
    <>
    <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h2>Library</h2>
        
       
      </Box>
      </Box>
    </>
  );
}

export default Library;
