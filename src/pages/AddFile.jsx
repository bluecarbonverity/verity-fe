import React from 'react'
import { Box, Typography } from '@mui/material'
import { useAccount } from '../contexts'
import AddFileForm from '../components/AddFileForm'
import ConnectMetamask from '../components/ConnectWallet'

const AddFile = () => {
  const account = useAccount()
  const isMetamaskConnected = !!account

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'space-between', mb: 4 }}>
        <Typography variant="h5" sx={{ flex: 1, fontWeight: 700 }}>
          Add New File
        </Typography>
      </Box>
      {isMetamaskConnected ? <AddFileForm /> : <ConnectMetamask />}
    </Box>
  )
}

export default AddFile
