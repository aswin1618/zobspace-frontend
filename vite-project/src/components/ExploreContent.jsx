import { Avatar, Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AudioPost from './AudioPost';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL

const ArtistAvatar = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,

    [theme.breakpoints.down('sm')]: {
        width: 60,
        height: 60,
    },
}));
const CustomSkeleton = styled(Skeleton)(({ theme }) => ({
    width: "100%",
    maxWidth: '150px',
    height: '150px',

    [theme.breakpoints.down('sm')]: {
        maxWidth: '60px',
        height: '60px',
    },
}));

const ExploreContent = () => {
    const [allUsers, setAllusers] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const { authTokens } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        artistProfile();
        explorePosts();
    }, []);

    const artistProfile = async () => {
        setLoading(true)
        const response = await fetch(`${API_URL}/auth/user_profiles/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
        });
        let data = await response.json();
        setLoading(false)
        setAllusers(data);
        console.log(data);
    };

    const explorePosts = async () => {
        setLoading1(true)

        const response = await fetch(`${API_URL}/feed/explore/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access),
            },
        });
        let data = await response.json();
        setLoading1(false)
        setAllPosts(data);
        console.log(data);
    };

    // Navigate to the artist profile page with the artist ID as a parameter
    const handleAvatarClick = (artist) => {
        navigate(`/profile/${artist.id}`, { state: { artist } });
    };

    return (
        <>

            <Box flex={4} p={{ xs: 0, md: 4 }} sx={{ backgroundColor: "primary" }}>

                <Typography variant="h4">Top Artists</Typography>
                {loading ? (
                    <div>

                        <Stack direction="row" spacing={4}>

                            <CustomSkeleton variant="circular" />
                            <CustomSkeleton variant="circular" />
                            <CustomSkeleton variant="circular" />
                            <CustomSkeleton variant="circular" />
                            <CustomSkeleton variant="circular" />
                        </Stack>
                    </div>

                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "flex-start",
                            gap: {
                                xs: 1, // Gap value for extra small screens
                                sm: 10, // Gap value for small screens and above
                            },
                            marginBottom: "30px",
                            marginTop: "30px"
                        }}
                    >
                        <Grid container direction="row" alignItems="center" spacing={3}>
                            {Object.values(allUsers).map((artist) => (
                                <Grid item key={artist.id}>
                                    <ArtistAvatar alt={artist.user} src={artist.profile_picture} onClick={() => handleAvatarClick(artist)} />
                                    <Typography variant="body1" align="center">{artist.user}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
                {/* explore all postts section */}
                <Typography variant="h4">Explore more</Typography>

                <Grid container >
                    {loading1 ? (
                        <Grid container spacing={2}>
                        {Array.from(Array(6), (_, index) => (
                          <Grid item xs={12} md={4} key={index}>
                            <Stack spacing={2}>
                              <Skeleton variant="text" height={80} />
                              <Skeleton variant="text" height={20} />
                              <Skeleton variant="rectangular" height={200} />
                            </Stack>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                        <>
                            {allPosts.map((post) => (
                                <Grid item key={post.id} xs={12} md={4}>
                                    <AudioPost posts={[post]} />
                                </Grid>
                            ))
                            }
                        </>
                    )}
                </Grid>


            </Box>

        </>
    )
}
export default ExploreContent