import React from 'react';
import Sidebar from "../components/Sidebar";
import { Box, Grid, Stack } from "@mui/material";
import Navbar from "../components/NavBar";
import OtherProfile from '../components/OtherProfile';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const OtherArtistProfile = () => {
    const { artistId } = useParams();
    const location = useLocation();
    const { artist } = location.state;
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Navbar />
                <Grid container spacing={2}>
                    <Grid xs={4} sx={{ marginLeft: '20px', marginBottom: "15px " }}>
                        <Sidebar />
                    </Grid>
                    <Grid xs={8} mt={10} sx={{
                        ml: {
                            xs: 18, // Margin-left value for extra-small screens
                            sm: 27, // Margin-left value for small screens and above
                        },
                    }}>

                        <Box flex={4} p={{ xs: 2, md: 4 }}
                            sx={{
                                backgroundColor: "#020d12",
                                borderRadius: 4,
                                minWidth: { xs: "270px", md: "1050px" },
                                maxWidth: { xs: "271px", md: "1051px" },

                            }}
                        >
                            <OtherProfile artist={artist} />
                        </Box>
                    </Grid>


                </Grid>

            </Box>
        </>
    );
};

export default OtherArtistProfile;