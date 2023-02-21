import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Container,
  Paper,
  AppBar,
  Toolbar,
  Grid,
  Button,
  Skeleton,
} from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import logo from '../logo.png'
import { requestFile } from '../utils/api'
import { truncate } from '../utils/common'
import { useContract } from '../contexts'
import { IFile, IProject } from 'types/files'

const ViewFile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [file, setFile] = useState<IFile | null>(null)
  const [project, setProject] = useState<IProject | null>(null)
  const { unsignedContract } = useContract()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      if (!unsignedContract) return
      const metadata = await requestFile(id!)
      const tokenURI = await unsignedContract.tokenURI(metadata.tokenId)
      const projectInfo = await requestFile(tokenURI.substring(7, tokenURI.length))
      setFile(metadata)
      setProject(projectInfo)
      setLoading(false)
    }
    load()
  }, [id, unsignedContract])

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', backgroundColor: '#F9FAFB' }}>
      <AppBar color="secondary" position="fixed" elevation={1}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            onClick={() => navigate('/projects/goc-north/koolatong-north')}
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
              {!loading ? (
                <Typography variant="h5" sx={{ flex: 1, fontWeight: 700 }} mb={3}>
                  {file && file.fileName}
                </Typography>
              ) : (
                <Skeleton sx={{ width: '80%', height: '80px' }} animation="wave" />
              )}
              {!loading ? (
                <>
                  {file && (
                    <img
                      style={{ width: '75%' }}
                      src={`${process.env.REACT_APP_IPFS_GATEWAY_URL}${file.thumbnailURI}`}
                      alt={`Thumbnail for ${file.fileName}`}
                    />
                  )}
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                    File uploaded at: {file && new Date(file.createdAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
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
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                    IPFS file hash: {file && truncate(id!, 20)}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                    File description: {file && file.fileDescription}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 400 }} mb={1}>
                    MRV: {file && file.mrv}
                  </Typography>
                </>
              ) : (
                <Box mb={2}>
                  <Skeleton width="75%" height="200px" animation="wave" />
                  <Skeleton sx={{ width: '65%', height: '40px' }} animation="wave" />
                  <Skeleton sx={{ width: '65%', height: '40px' }} animation="wave" />
                  <Skeleton sx={{ width: '65%', height: '40px' }} animation="wave" />
                  <Skeleton sx={{ width: '65%', height: '40px' }} animation="wave" />
                  <Skeleton sx={{ width: '65%', height: '40px' }} animation="wave" />
                </Box>
              )}
              {file && (
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none', marginBottom: '16px' }}
                  target="_blank"
                  href={`${process.env.REACT_APP_IPFS_GATEWAY_URL}${file.fileURI}`}
                >
                  View file on IPFS
                </Button>
              )}
              {!loading ? (
                <>
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
                  <Typography variant="body2" sx={{ fontWeight: 400 }}>
                    Project name: {project && project.name}
                  </Typography>
                  {unsignedContract && (
                    <Typography variant="body2" sx={{ fontWeight: 400 }}>
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
                  )}
                  <Typography variant="body2" sx={{ fontWeight: 400 }} mb={1}>
                    Project description: {project && project.description}
                  </Typography>
                </>
              ) : (
                <Box mb={2}>
                  <Skeleton sx={{ width: '75%', height: '200px' }} animation="wave" />
                  <Skeleton sx={{ width: '65%', height: '40px' }} animation="wave" />
                  <Skeleton sx={{ width: '65%', height: '40px' }} animation="wave" />
                  <Skeleton sx={{ width: '65%', height: '40px' }} animation="wave" />
                  <Skeleton sx={{ width: '65%', height: '40px' }} animation="wave" />
                </Box>
              )}
              {file && (
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                  target="_blank"
                  href={`https://testnets.opensea.io/assets/mumbai/0x54d8ef369a7733abbb4f482066c6d3456fb93fb7/${file.tokenId}`}
                >
                  View project on OpenSea
                </Button>
              )}
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
