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
import { useNavigate, useParams } from 'react-router-dom'
import AssignmentIcon from '@mui/icons-material/Assignment'
import logo from '../logo.png'
import CompanyBox from './CompanyBox'

const drawerWidth = 300

const Sidebar = () => {
  const navigate = useNavigate()
  const { id } = useParams()

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
          cursor: 'pointer',
        }}
        onClick={() => navigate('/projects/1')}
      >
        <img style={{ width: '100%' }} src={logo} alt="Blue Carbon Logo" />
      </Box>
      <CompanyBox />
      <Divider sx={{ borderColor: '#1F2937' }} />
      <List>
        {[...Array(4).keys()]
          .map(n => n + 1)
          .map(num => (
            <ListItem key={num} disablePadding onClick={() => navigate(`/projects/${num}`)}>
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: num === Number(id) ? '#10B981' : '#D1D5DB',
                    fontSize: '20px',
                    minWidth: '32px',
                  }}
                >
                  {<AssignmentIcon />}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: num === Number(id) ? '#10B981' : '#D1D5DB',
                  }}
                  primary={`Project ${num}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
