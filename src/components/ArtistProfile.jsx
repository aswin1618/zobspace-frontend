import React, { useState, useRef } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Avatar, Backdrop, Button, CircularProgress, Divider, Modal, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ProfileFeed from './ProfileFeed';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL


function ArtistProfile() {
    const { user, profile, authTokens } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const fileInputRef = useRef(null);
    const initialBio = profile && profile.bio ? profile.bio : '';
    const [bio, setBio] = useState(initialBio);
    const [loading, setLoading] = useState(false);


    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setSelectedImageUrl(imageUrl);
        setSelectedImage(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleSave = async () => {
        setLoading(true)
        try {
            const formData = new FormData();
            if (bio !== profile.bio) {
                formData.append('bio', bio);
            }
            if (selectedImage) {
                formData.append('profile_picture', selectedImage);
            }

            const response = await fetch(`${API_URL}/auth/update_profile/`, {
                method: 'PATCH',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access),
                }
            });

            const data = await response.json();

            if (response.ok) {
                setLoading(false)

                console.log('Profile updated:', data);
                // Handle the response data or update the UI as needed.

                // Close the modal after successful save
                setOpen(false);
            } else {
                console.error('Error updating profile:', data);
                // Handle errors or show error messages on the UI.
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle network errors or other exceptions
        }
    };
    const totalPosts = profile ? profile.total_posts : 0;
    const FollowerCount = profile ? profile.total_followers : 0;
    const FollowingCount = profile ? profile.total_following : 0;

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
                                src={profile && profile.profile_picture ? profile.profile_picture : ""}
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
                            {user && user.name}
                        </Typography>
                        <Typography variant="body1">
                            {profile && profile.bio}
                        </Typography>
                        <Button size="small" sx={{ width: "160px", borderRadius: 8, marginTop: "12px", marginLeft: "-12px" }} variant="contained" endIcon={<EditIcon />} onClick={() => setOpen(true)}>
                            edit profile
                        </Button>

                    </Grid>
                    <Modal
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box maxWidth={450} minWidth={350} bgcolor={"#273033"} p={3} borderRadius={5} display="flex"
                            flexDirection="column"
                            alignItems="center">
                            <>
                                <Avatar
                                    src={selectedImageUrl ? selectedImageUrl : (profile && profile.profile_picture ? profile.profile_picture : "")}
                                    sx={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        '@media (max-width: 959px)': {
                                            width: '45px',
                                            height: '45px',
                                        },
                                        '@media (min-width: 960px) and (max-width: 1279px)': {
                                            width: '65',
                                            height: '65',
                                        },
                                    }} />
                                <Button
                                    size="small"
                                    sx={{
                                        width: '120px',
                                        borderRadius: 8,
                                        marginTop: '12px',
                                        marginLeft: '-12px',
                                        fontSize: '8px',
                                    }}
                                    variant="contained"
                                    endIcon={<EditIcon />}
                                    onClick={handleButtonClick}
                                    component="span"
                                    ref={fileInputRef}
                                >
                                    select picture
                                </Button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageSelect}
                                    ref={fileInputRef}
                                />
                            </>
                            <TextField sx={{ width: "100%", marginBottom: "10px", marginTop: "10px" }} id="standard-multiline-static" multiline label="bio" rows={3} variant="standard" value={bio && bio}
                                onChange={handleBioChange} />
                            <Button size="small" sx={{ width: "160px", borderRadius: 8, marginTop: "12px", marginLeft: "-12px" }} variant="contained" endIcon={<EditIcon />} onClick={handleSave}>
                                save
                            </Button>
                        </Box>
                    </Modal>




                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            {totalPosts}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Posts
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            {FollowerCount}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Followers
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            {FollowingCount}
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
                <ProfileFeed />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </>

    )
}

export default ArtistProfile