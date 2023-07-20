import React from 'react';
import Sidebar from "../components/Sidebar";
import { Box, Grid, Stack } from "@mui/material";
import Navbar from "../components/NavBar";
import NotificationPage from '../components/NotificationPage';
import Layout from './Layout';


const Notifications = () => {
    return (
        <>
        <Layout>
            <Box flex={4} p={{ xs: 2, md: 4 }}
                sx={{
                    backgroundColor: "#020d12",
                    borderRadius: 4,
                    marginTop: "10vh",
                    minWidth: { xs: "270px", md: "800px" },
                    maxWidth: { xs: "271px", md: "801px" },
                    marginLeft: { xs: "15%", md: "18%" },
                }}
            >
                <NotificationPage />
            </Box>
        </Layout>

        </>
    );
};

export default Notifications;