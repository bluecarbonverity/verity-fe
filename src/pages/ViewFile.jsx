import React, { useState, useEffect } from 'react'
import { Box, Typography, Container, Paper, AppBar, Toolbar, Grid, Button } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import logo from '../logo.png'
import { requestFile } from '../utils/api'
import { truncate } from '../utils/common'
import { useContract } from '../contexts'

const ViewFile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [project, setProject] = useState(null)
  const { unsignedContract } = useContract()

  useEffect(() => {
    const load = async () => {
      if (!unsignedContract) return
      const metadata = await requestFile(id)
      const tokenURI = await unsignedContract.tokenURI(metadata.tokenId)
      const projectInfo = await requestFile(tokenURI.substring(7, tokenURI.length))
      setFile(metadata)
      setProject(projectInfo)
    }
    load()
  }, [id, unsignedContract])

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
                  style={{ width: '75%' }}
                  src={`${process.env.REACT_APP_IPFS_GATEWAY_URL}${file.thumbnailURI}`}
                  alt={`Thumbnail for ${file.fileName}`}
                />
              )}
              <Typography variant="body2" sx={{ fontWeight: 200 }}>
                File uploaded at: {file && new Date(file.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 200 }}>
                Author address:{' '}
                {file && (
                  <a
                    rel="noreferrer"
                    href={`https://mumbai.polygonscan.com/address/${file.createdBy}`}
                    target="_blank"
                  >
                    {truncate(file.createdBy, 20)}
                  </a>
                )}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 200 }}>
                IPFS file hash: {file && truncate(id, 20)}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 200 }} mb={1}>
                File description: {file && file.fileDescription}
              </Typography>
              <Button
                variant="outlined"
                sx={{ textTransform: 'none', marginBottom: '16px' }}
                target="_blank"
                href={file && `${process.env.REACT_APP_IPFS_GATEWAY_URL}${file.fileURI}`}
              >
                View file on IPFS
              </Button>
              {project && (
                <img
                  style={{ width: '75%' }}
                  src={`${process.env.REACT_APP_IPFS_GATEWAY_URL}${project.image.substring(
                    7,
                    project.image.length
                  )}`}
                  alt={`${project.name}`}
                />
              )}
              <Typography variant="body2" sx={{ fontWeight: 200 }}>
                Project name: {project && project.name}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 200 }}>
                Project contract address:{' '}
                {file && (
                  <a
                    rel="noreferrer"
                    href={`https://mumbai.polygonscan.com/address/${unsignedContract.address}`}
                    target="_blank"
                  >
                    {truncate(unsignedContract.address, 20)}
                  </a>
                )}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 200 }} mb={1}>
                Project description: {project && project.description}
              </Typography>
              <Button
                variant="outlined"
                sx={{ textTransform: 'none' }}
                target="_blank"
                href={
                  file &&
                  `https://testnets.opensea.io/assets/mumbai/0x54d8ef369a7733abbb4f482066c6d3456fb93fb7/${file.tokenId}`
                }
              >
                View project on OpenSea
              </Button>
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
