import React from 'react';
import ChatPage from '../components/ChatPage'
import Sidebar from "../components/Sidebar";
import { Box, Stack } from "@mui/material";
import Navbar from "../components/NavBar";
import Layout from './Layout';

const Messages = () => {
  return (
    <>
      <Layout>


        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ChatPage />
        </Box>
      </Layout>
    </>
  );
};

export default Messages;