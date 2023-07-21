import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL

function EditPost({ post ,onEditSuccess }) {
    const { authTokens, user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState(post.caption);
    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };
    const handlePostEdit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/feed/posts/update_caption/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: JSON.stringify({
                    post_id: post.id, 
                    caption: caption,
                }),
            });

            if (response.ok) {
                console.log('Success');
                onEditSuccess();
            } else {
                console.error('Failed');
            }
        } catch (error) {
            console.error('An error occurred while updating the post:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Box maxWidth={450} minWidth={350} bgcolor={"#273033"} p={3} borderRadius={5} display="flex"
                flexDirection="column"
                alignItems="center">
                <Typography variant="h6" textAlign="center" >Edit Post</Typography>

                <>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <div>
                            <TextField sx={{ width: "100%", marginBottom: "10px" }} id="standard-multiline-static" multiline label="caption" rows={3} variant="standard" value={caption}
                                onChange={handleCaptionChange} />
                            <Button variant="contained" onClick={handlePostEdit} >Update post</Button>
                        </div>

                    )}
                </>
            </Box>
        </>
    )
}

export default EditPost