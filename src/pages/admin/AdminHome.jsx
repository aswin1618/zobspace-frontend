import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar'
import { Box, Stack } from '@mui/material'
import HomeFeed from '../../components/admin/HomeFeed'
function AdminHome() {
  return (
    <>
      <Box>
        <AdminNavbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <HomeFeed/>
        </Stack>
      </Box>
    </>
  )
}

export default AdminHome    