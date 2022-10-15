import React from 'react'
import { Box, Typography } from '@mui/material'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'

const CompanyBox = () => (
  <Box sx={{ padding: '16px 16px 24px 16px' }}>
    <Box
      sx={{
        display: 'flex',
        color: '#9CA3AF',
        backgroundColor: '#1B2130',
        borderRadius: '8px',
        padding: '11px 24px',
        alignItems: 'center',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ color: '#FFFFFF', fontWeight: 500 }}>Acme Inc</Typography>
        <Typography>Your Tier: Premium</Typography>
      </Box>
      <UnfoldMoreIcon />
    </Box>
  </Box>
)

export default CompanyBox
