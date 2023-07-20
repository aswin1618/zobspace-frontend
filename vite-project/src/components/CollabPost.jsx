import React, { useState, useRef, useContext } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MicIcon from '@mui/icons-material/Mic';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AudioPreview from '../components/AudioPreview'
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Divider } from '@mui/material';
const API_URL = import.meta.env.VITE_API_URL

function CollabPost({ post, onEditSuccess }) {
    const { authTokens, user } = useContext(AuthContext);
    const fileInputRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [loading, setLoading] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [audio, setAudio] = useState(null)
    const [postaudio] = useState(new Audio(post.audioFile));
    const [caption, setCaption] = useState('');
    const navigate = useNavigate();
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            handleSave();
        }
    };

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
        }
    };

    const handleSave = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudio(blob);
        audioChunksRef.current = [];
    };

    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    const handleSelectedFile = (e) => {
        const fileList = e.target.files;
        const firstFile = fileList[0];
        setAudio(firstFile);
    }
    const handleRemoveFile = () => {
        setAudio(null);
    };
    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handlePostUpload = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('audio_file', audio);
            formData.append('caption', caption);
            formData.append('post_id', post.id);
            formData.append('author', user.name);

            const response = await fetch(`${API_URL}/feed/collab_post/`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body: formData,
            });

            if (response.ok) {
                console.log('Post uploaded successfully.');
            } else {
                console.error('Error uploading post:', response.status, response.statusText);
            }
        } catch (error) {
            console.log(response);
        } finally {
            setLoading(false);
        }
    };
    console.log(post.audio_file)

    return (
        <>
            <Box maxWidth={450} minWidth={350} bgcolor={"#273033"} p={3} borderRadius={5} display="flex"
                flexDirection="column"
                alignItems="center">
                <Typography variant="h6" textAlign="center" sx={{
                    marginBottom: '10px'
                }} >Collab with Post</Typography>
                <Divider sx={{ my: 2, color: "white" }} />
                <div>
                    <Typography variant="body2" sx={{ marginBottom: '8px' }}>
                        Selected File:
                    </Typography>
                    <Typography
                        sx={{
                            marginRight: '8px',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            backgroundColor: 'primary.main',
                        }}
                    >
                        {post.display_name}
                    </Typography>
                </div>
                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" marginBottom="20px" marginTop="20px">
                    {audio ? (
                        <>
                            <Typography sx={{ marginRight: '8px' }}>{audio.name}</Typography>
                            <Button size="small" variant="contained" onClick={handleRemoveFile}>
                                Remove
                            </Button>
                        </>
                    ) : (
                        <>
                            <Box flexDirection="column"
                                alignItems="center">
                                <Box display="flex"
                                    flexDirection="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    marginBottom="20px"
                                    marginTop="20px" >
                                    <Typography sx={{ marginRight: '8px' }}>Select File</Typography>
                                    <Button size="small" variant="contained" onClick={handleFileSelect}>
                                        Select
                                    </Button>
                                </Box>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    marginBottom="20px"
                                    marginTop="20px"
                                >
                                    <Typography variant="h8" textAlign="center">
                                        OR
                                    </Typography>
                                </Box>
                                <Box display="flex"
                                    flexDirection="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    marginBottom="20px"
                                    marginTop="20px" >
                                    <Typography sx={{ marginRight: '8px' }}>Record One</Typography>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        endIcon={<MicIcon />}
                                        onClick={isRecording ? stopRecording : startRecording}
                                    >
                                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                                    </Button>
                                </Box>
                            </Box>
                        </>
                    )}
                    <input type="file" accept="audio/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleSelectedFile} />
                </Box>


                {!isRecording && audio && (
                    <>
                        <AudioPreview audioFile={URL.createObjectURL(audio)} />
                        <TextField sx={{ width: "100%" }} id="standard-multiline-static" multiline label="caption" rows={3} variant="standard" value={caption}
                            onChange={handleCaptionChange} />
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <Button variant="contained" onClick={handlePostUpload} >POST</Button>
                        )}
                    </>
                )}
            </Box>
        </>
    )
}

export default CollabPost