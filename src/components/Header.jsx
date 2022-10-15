import React from 'react'
import { AppBar, Toolbar, Box, IconButton, Avatar } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import GroupIcon from '@mui/icons-material/Group'
import NotificationsIcon from '@mui/icons-material/Notifications'
import avatar from '../avatar.jpeg'

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
    <Toolbar sx={{ minHeight: '50px !important', width: '100%' }} disableGutters>
      <Box sx={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'spread' }}>
        <IconButton sx={{ p: 0 }}>
          <SearchIcon sx={{ width: '25px', height: '25px' }} />
        </IconButton>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton sx={{ p: 0 }}>
            <NotificationsIcon sx={{ width: '25px', height: '25px', marginRight: '16px' }} />
          </IconButton>
          <IconButton sx={{ p: 0 }}>
            <GroupIcon sx={{ width: '25px', height: '25px', marginRight: '16px' }} />
          </IconButton>
          <IconButton sx={{ p: 0 }}>
            <Avatar
              alt="Justin Baird"
              src={avatar}
              sx={{ width: '30px', height: '30px' }}
            />
          </IconButton>
        </Box>
      </Box>
    </Toolbar>
  </AppBar>
)

export default Header
