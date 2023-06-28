import { AppBar, Avatar, Toolbar, Typography } from '@mui/material'
import React from 'react'


const StytledToolbar= styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
function NavBar() {
  return (
    <AppBar position='sticky'>
      <StytledToolbar>
      <Avatar
          alt="Remy Sharp"
          src="src/assets/logo.png"
          sx={{ width: 40, height: 40 }}
        />
        <Typography variant='h7'sx={{display:{xs:'none',sm:'block'}}}>zobspace</Typography>
      </StytledToolbar>
    </AppBar>
  )
}

export default NavBar