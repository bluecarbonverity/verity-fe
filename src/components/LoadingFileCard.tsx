import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Skeleton
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const LoadingFileCard = () => (
  <Grid item xs={3} sx={{ cursor: 'pointer' }}>
    <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ height: '110px', width: '100%', transform: 'none' }}
      />
      <Box
        sx={{
          padding: '18px 12px',
          flex: 1,
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
          <Skeleton sx={{ width: '150px' }} />
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 100, fontSize: 12 }}>
          <Skeleton sx={{ width: '200px', height: '40px' }} />
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          color: '#6B7280',
        }}
      >
        <div></div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTimeIcon sx={{ fontSize: '16px' }} />
          <Typography sx={{ fontSize: '10px', paddingLeft: '6px' }}>
            <Skeleton sx={{ width: '150px' }} />
          </Typography>
        </Box>
      </Box>
    </Paper>
  </Grid>
)

export default LoadingFileCard
