import React from 'react'
import { AppBar, Toolbar } from '@mui/material'

const drawerWidth = 300

const Header = () => (
  <AppBar
    dense="true"
    position="fixed"
    elevation={1}
    sx={{
      width: `calc(100% - ${drawerWidth}px)`,
      ml: `${drawerWidth}px`,
      backgroundColor: '#FFFFFF',
      height: '50px',
    }}
  >
    <Toolbar sx={{ minHeight: '50px !important' }} disableGutters />
  </AppBar>
)

export default Header
