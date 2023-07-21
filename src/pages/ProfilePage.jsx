import React from 'react';
import Sidebar from "../components/Sidebar";
import { Box, Grid, Stack } from "@mui/material";
import Navbar from "../components/NavBar";
import ArtistProfile from '../components/ArtistProfile';
import Layout from './Layout';

const ProfilePage = () => {
    return (
        <>
            <Layout>

                <Box flex={4} p={{ xs: 2, md: 4 }}
                    sx={{
                        backgroundColor: "#53494966",
                        borderRadius: 4,
                        minWidth: { xs: "270px", md: "1050px" },
                        maxWidth: { xs: "271px", md: "1051px" },
                        marginLeft: { xs: "15%", md: "7%" },
                    }}
                >
                    <ArtistProfile />
                </Box>
            </Layout>

        </>
    );
};

export default ProfilePage;