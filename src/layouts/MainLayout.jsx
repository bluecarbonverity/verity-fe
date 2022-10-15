import React from 'react'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const MainLayout = () => (
  <Box sx={{ display: 'flex', height: '100vh' }}>
    <CssBaseline />
    <Header />
    <Sidebar />
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ minHeight: '50px !important' }} disableGutters />
      <Box
        component="main"
        sx={{ bgcolor: '#F9FAFB', p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Outlet />
      </Box>
    </Box>
  </Box>
)

export default MainLayout
