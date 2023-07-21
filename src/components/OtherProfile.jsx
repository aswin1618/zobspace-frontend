import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar, Button, Divider, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ProfileFeed from './ProfileFeed';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import OtherArtistFeed from './OtherArtistFeed';
const API_URL = import.meta.env.VITE_API_URL



function OtherProfile({ artist }) {
    const { authTokens, user } = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(artist.followers.includes(user.user_id));
    console.log(user)
    console.log(authTokens)
    const FollowUnfollow = async (artistId) => {
        try {
            const response = await fetch(`${API_URL}/auth/follow/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify({
                    artist_id: artistId,
                })
            });

            if (response.ok) {

                console.log('Artist followed successfully!');
            } else {
                console.error('Failed to follow artist');
            }
        } catch (error) {
            console.error('An error occurred while following the artist:', error);
        }
    };


    console.log(artist)
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4} sx={{ marginBottom: "40px" }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',

                            }}
                        >
                            <Avatar
                                src={artist && artist.profile_picture ? artist.profile_picture : ""}
                                sx={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '50%',
                                    '@media (max-width: 959px)': {
                                        width: '70px',
                                        height: '70px',
                                    },
                                    '@media (min-width: 960px) and (max-width: 1279px)': {
                                        width: '90',
                                        height: '90',
                                    },
                                }} />
                        </div>
                    </Grid>
                    <Grid container direction="column" item xs={6}>
                        <Typography variant="h4" gutterBottom>
                            {artist && artist.user}
                        </Typography>
                        <Typography variant="body1">
                            {artist && artist.bio}
                        </Typography>
                        <Button size="small" sx={{ width: "160px", borderRadius: 8, marginTop: "12px", backgroundColor: isFollowing ? 'green' : 'blue', }}
                            variant="contained" onClick={() => { FollowUnfollow(artist.id); setIsFollowing((prevState) => !prevState); }} >
                            {isFollowing ? 'Following' : 'Follow'}
                        </Button>
                    </Grid>


                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            {artist.total_posts}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Posts
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            {artist.total_followers}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Followers
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            {artist.total_following}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Following
                        </Typography>
                    </Grid>
                </Grid>
                <Divider
                    sx={{
                        marginTop: "15px",
                        backgroundColor: 'white',
                        marginBottom: '15px'
                    }}
                />
                <OtherArtistFeed artistId={artist.user_id} />
            </Box>
        </>

    )
}

export default OtherProfile