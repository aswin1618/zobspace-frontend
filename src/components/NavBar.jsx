
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useState ,useContext}  from "react";
import { AuthContext } from "../context/AuthContext";



const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "30%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Add anchorEl state
  const {user, logoutUser ,profile} = useContext(AuthContext);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };
  
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="Remy Sharp"
            src="src/assets/logo.png"
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant='h8' sx={{ display: { xs: 'none', sm: 'block' } }}>zobspace</Typography>
        </div>
        
        <Search>
          <InputBase placeholder="search..." sx={{ color: 'black' }} />
        </Search>
        <Icons>
        <Typography variant="body1">{user && user.name}</Typography>

          <Avatar
            sx={{ width: 30, height: 30 }}
            src={profile && profile.profile_picture ? profile.profile_picture : ""}
            onClick={handleMenuOpen}
          />
        </Icons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={handleMenuClose} // Update onClose event handler
        anchorEl={anchorEl} // Pass anchorEl as prop
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem sx={{ color: "black" }} onClick={logoutUser}><LogoutIcon /> Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
