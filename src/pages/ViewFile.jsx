import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, Paper, AppBar, Toolbar, Grid } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import logo from '../logo.png'
import { requestFile } from '../utils/api'

const ViewFile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [file, setFile] = useState(null)

  useEffect(() => {
    const load = async () => {
      const metadata = await requestFile(id)
      setFile(metadata)
    }
    load()
  }, [id])

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', backgroundColor: '#F9FAFB' }}>
      <AppBar color="secondary" dense="true" position="fixed" elevation={1}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            onClick={() => navigate('/projects/1')}
            style={{ height: '100%', cursor: 'pointer' }}
            src={logo}
            alt="Blue Carbon Logo"
          />
        </Toolbar>
      </AppBar>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 0px' }}>
        <Toolbar />
        <Container maxWidth="lg" component={Paper} sx={{ flex: 1, padding: '32px 24px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ flex: 1, fontWeight: 700 }} mb={3}>
                {file && file.fileName}
              </Typography>
              {file && (
                <img
                  src={`${process.env.REACT_APP_IPFS_GATEWAY_URL}${file.thumbnailURI}`}
                  alt={`Thumbnail for ${file.fileName}`}
                />
              )}
              <Typography variant="body2" sx={{ fontWeight: 200 }}>
                File description: {file && file.fileDescription}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              {file && (
                <DocViewer
                  style={{ height: '600px' }}
                  config={{
                    header: {
                      disableHeader: true,
                    },
                  }}
                  pluginRenderers={DocViewerRenderers}
                  documents={[{ uri: `${process.env.REACT_APP_IPFS_GATEWAY_URL}${file.fileURI}` }]}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default ViewFile
