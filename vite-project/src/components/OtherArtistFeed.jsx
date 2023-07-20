import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AudioPost from './AudioPost';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function OtherArtistFeed({artistId}) {
    const { authTokens } = useContext(AuthContext);
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        ProfilePosts();
    }, []);

    const ProfilePosts = async () => {
        try {
            const response = await fetch(`${API_URL}//auth/artist_profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify({
                    artist_id: artistId, 
                }),
            });

            if (response.ok) {
                
                console.log('Success');
            } else {
                console.error('Failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {allPosts.map((post) => (
                    <Grid item key={post.id} xs={12} sm={6}>
                        <AudioPost posts={[post]} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default OtherArtistFeed