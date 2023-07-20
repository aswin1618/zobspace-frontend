import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)({
  marginTop: "30px", // Add top spacing
  backgroundColor: "#1a1a1a",
});

const CustomTypography = styled(Typography)({
  cursor: "pointer",
});


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  height: "120px", // Increase the height of the navbar
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[800], // Darker background color
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "200px", // Smaller width
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const AdminNavbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Add anchorEl state
  const navigate = useNavigate();


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="Remy Sharp"
            src="src/assets/logo.png"
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant="h8" sx={{ display: { xs: "none", sm: "block" } }}>
            zobspace
          </Typography>
        </div>
        <Stack direction="row" spacing={6}>
          <CustomTypography variant="subtitle2" sx={{ display: { xs: "none", sm: "block" } }} onClick={() => { navigate('/admin/users'); }} style={{ cursor: "pointer" }}>
            Users
          </CustomTypography>
          <CustomTypography variant="subtitle2" sx={{ display: { xs: "none", sm: "block" } }} onClick={() => { navigate('/admin/posts'); }} style={{ cursor: "pointer" }}> 
            Posts
          </CustomTypography>
        </Stack>
        <Search>
          <InputBase placeholder="Search..." sx={{ color: "white" }} />
        </Search>

        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="#"
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

        <MenuItem sx={{ color: "black" }}>
          <LogoutIcon /> Logout
        </MenuItem>
      </Menu>
    </StyledAppBar>
  );
};

export default AdminNavbar;
