import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  Pagination,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useContract } from '../contexts'
import { requestFile } from '../utils/api'
import LoadingFileCard from '../components/LoadingFileCard'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const truncate = str => (str.length > 23 ? str.substring(0, 23) + '...' : str)

const Dashboard = () => {
  const navigate = useNavigate()
  const { unsignedContract } = useContract()
  const [fileMetadatas, setFileMetadatas] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      if (!unsignedContract) return
      const files = await unsignedContract.getTokenFiles(1)
      const results = await Promise.all(files.map(async cid => await requestFile(cid)))
      const metadatas = results
        .reduce((acc, curr, i) => {
          // filter out errors
          if (curr === undefined) return acc
          // add CID to object (for linking)
          return [...acc, { ...curr, cid: files[i] }]
        }, [])
        .sort((a, b) =>  Number(b.createdAt) - Number(a.createdAt))
      setFileMetadatas(metadatas)
      setLoading(false)
    }
    load()
  }, [unsignedContract])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'space-between', mb: 1 }}>
        <Typography variant="h5" sx={{ flex: 1, fontWeight: 700 }}>
          Project Dashboard
        </Typography>
        <Button
          variant="contained"
          sx={{ textTransform: 'none' }}
          onClick={() => navigate('/files/create')}
        >
          Add File
        </Button>
      </Box>
      <Paper sx={{ padding: '12px 12px', width: '100%', mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Search project files</InputLabel>
          <OutlinedInput
            sx={{ width: '500px' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
            label="Search project files"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            size="small"
          />
        </FormControl>
      </Paper>
      <Grid container spacing={2}>
        {loading
          ? [...Array(8).keys()].map(i => <LoadingFileCard i={i} />)
          : fileMetadatas
              .filter((_, i) => i < page * 8 && i >= (page - 1) * 8)
              .filter(d => d.fileName.toLowerCase().includes(search))
              .map((d, i) => (
                <Grid
                  key={i}
                  item
                  xs={3}
                  onClick={() => navigate(`/files/${d.cid}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ maxHeight: '110px', overflow: 'hidden' }}>
                      <img
                        src={`${process.env.REACT_APP_IPFS_GATEWAY_URL}${d.thumbnailURI}`}
                        alt={`${d.fileName}`}
                        style={{ width: '100%' }}
                      />
                    </div>
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
                        {truncate(d.fileName)}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 100, fontSize: 12 }}>
                        {d.fileDescription}
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
                          {/* TODO: remove this check in production */}
                          Uploaded {d.createdAt ? timeAgo.format(d.createdAt) : '10 days ago'}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
      </Grid>
      <Pagination
        count={Math.ceil(fileMetadatas.length / 8)}
        color="primary"
        size="large"
        sx={{ margin: '24px 0px' }}
        page={page}
        onChange={(_, v) => setPage(v)}
      />
    </Box>
  )
}

export default Dashboard
