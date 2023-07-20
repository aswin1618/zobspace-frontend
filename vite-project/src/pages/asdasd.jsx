import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ExploreIcon from '@mui/icons-material/Explore';
import addmusic from '../assets/addmusic.png'
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { Mail, Notifications, } from "@mui/icons-material";
import MicIcon from '@mui/icons-material/Mic';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import CreateModal from "../pages/CreateModal";

const Sidebar = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = useState(false)
    return (
        <List sx={{ marginTop: '20vh', [theme.breakpoints.down('sm')]: { position: 'fixed', bottom: 0, width: '100%' } }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "black",
                    borderRadius: 8,
                    width: 50,
                    marginLeft: 2,
                    boxShadow: "0px 2px 8px 2px rgba(0, 0, 0, 0.5)",
                }}
            >
                <ListItem disablePadding onClick={() => navigate('/')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding onClick={() => navigate('/explore')}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ExploreIcon />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                {/* create page */}
                <ListItem disablePadding sx={{ display: "block" }} onClick={e => setOpen(true)}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <Modal
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    open={open}
                    onClose={e =>
                        setOpen(false)
                    }
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <CreateModal />
                </Modal>

                {/* messages section */}

                <ListItem disablePadding onClick={() => navigate("/messages")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Mail sx={{ color: "white" }} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                {/* Notifications section */}

                <ListItem disablePadding onClick={() => navigate("/notifications")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Notifications sx={{ color: "white" }} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                {/* Profile section */}

                <ListItem disablePadding onClick={() => navigate("/profilepage")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <PersonIcon sx={{ color: "white" }} />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </Box>
        </List>
    );
};

export default Sidebar;
