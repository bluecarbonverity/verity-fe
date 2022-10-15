import React from 'react'
import {
  Drawer,
  Divider,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import logo from '../logo.png'
import CompanyBox from './CompanyBox'

const drawerWidth = 300

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#111827',
          color: '#D1D5DB',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          height: '64px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px 18px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
        <img style={{ width: '100%' }} src={logo} alt="Blue Carbon Logo" />
      </Box>
      <CompanyBox />
      <Divider sx={{ borderColor: '#1F2937' }} />
      <List>
        {['Dashboard', 'Customers', 'Products', 'Accounts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{
                  color: '#D1D5DB',
                  fontSize: '20px',
                  minWidth: '32px',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
