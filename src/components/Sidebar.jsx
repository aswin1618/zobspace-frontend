import React, { useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { Badge, Modal } from '@mui/material';
import CreateModal from '../pages/CreateModal';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar() {
  const { count } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const handleModalClose = () => {
    setOpen(false);
  };
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'row', md: 'column' }}
      justifyContent={{ xs: 'space-around', md: 'flex-start' }}
      alignItems="flex-start"
      pr={0} // Removed the padding on the right side
      sx={{
        [theme.breakpoints.up('md')]: {
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          maxWidth: '50px',
          marginRight: '0',
          marginLeft: { xs: 0, md: 3 },
        },
        [theme.breakpoints.down('sm')]: {
          position: 'relative',
          width: '100%',
          marginRight: '0',
        },
      }}
    >
      <List sx={{ marginTop: { xs: 0, md: '30vh' } }}>
        <Box
          flexDirection={{ xs: 'row', md: 'column' }}
          justifyContent={{ xs: 'space-around', md: 'flex-start' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          sx={{
            display: 'flex',
            backgroundColor: 'black',
            borderRadius: {md:8},
            width: { xs: '100%', md: '50px' },
            marginLeft: { xs: 0, md: 2 },
            boxShadow: '0px 2px 8px 2px rgba(0, 0, 0, 0.5)',
          }}
        >
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => {
              navigate('/');
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  justifyContent: 'center',
                }}
              >
                <HomeIcon sx={{ color: 'white' }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => {
              navigate('/explore');
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  justifyContent: 'center',
                }}
              >
                <ExploreIcon sx={{ color: 'white' }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          {/* createpage */}
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => setOpen(true)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  justifyContent: 'center',
                }}
              >
                <AddIcon sx={{ color: 'white' }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

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
            <CreateModal handleModalClose={handleModalClose} />
          </Modal>

          {/* messages section
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => {
              navigate('/messages');
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  justifyContent: 'center',
                }}
              >
                <MailIcon sx={{ color: 'white' }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem> */}

          {/* notifications section */}
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => {
              navigate('/notifications');
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  justifyContent: 'center',
                }}
              > <Badge badgeContent={count} color="secondary" showZero>
                  <NotificationsIcon sx={{ color: 'white' }} />
                </Badge>
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          {/* profile section */}
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => {
              navigate('/profilepage');
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  justifyContent: 'center',
                }}
              >
                <PersonIcon sx={{ color: 'white' }} />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </Box>
      </List>
    </Box>
  );
}
