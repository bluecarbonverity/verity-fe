import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { connectWallet } from '../utils/common'

const ConnectWallet = () => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',

      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography variant="body1" sx={{ textAlign: 'center', mb: 3, maxWidth: '400px' }}>
      You need to connect your wallet via Metamask to add a file to the Verity contract.
    </Typography>
    <Button variant="contained" size="large" sx={{ textTransform: 'none' }} onClick={connectWallet}>
      Connect Wallet
    </Button>
  </Box>
)

export default ConnectWallet
