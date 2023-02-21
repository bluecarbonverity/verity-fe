import { useState, useEffect } from 'react'
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
  ButtonGroup,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useContract } from '../contexts'
import { requestFile } from '../utils/api'
import { truncate } from '../utils/common'
import LoadingFileCard from '../components/LoadingFileCard'
import { regions } from '../regions'
import { IFile, IFileMetadata } from '../types/files'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
const activeButtonStyle = {
  backgroundColor: '#1976d2 !important',
  color: '#FFFFFF !important',
  textTransform: 'none',
}

const Dashboard = () => {
  const navigate = useNavigate()
  const { region, subregion } = useParams()
  const { unsignedContract } = useContract()
  const [fileMetadatas, setFileMetadatas] = useState<IFileMetadata[]>([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [mrv, setMrv] = useState('all')

  const { id, name, subregions } = regions!.find!(d => d.stub === region)!
  const subregionObj = subregions.find(d => d.stub === subregion)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      if (!unsignedContract) return
      const files: Array<string> = await unsignedContract.getTokenFiles(id)
      const results: Array<IFile> = await Promise.all(
        files.map(async (cid: string) => await requestFile(cid))
      )
      const metadatas: Array<IFileMetadata> = results
        .reduce((acc, curr, i) => {
          // filter out errors
          if (curr === undefined) return acc
          // add CID to object (for linking)
          return [...acc, { ...curr, cid: files[i] }]
        }, [])
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      setFileMetadatas(metadatas)
      setLoading(false)
    }
    load()
  }, [unsignedContract, id])

  const filteredMetadatas = fileMetadatas
    .filter(d => d.subregion === subregion && (mrv === 'all' || mrv === d.mrv))
    .filter(d => d.fileName.toLowerCase().includes(search))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'space-between', mb: 1 }}>
        <Typography variant="h5" sx={{ flex: 1, fontWeight: 700 }}>
          {`${name} | ${subregionObj!.name}`}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{ textTransform: 'none', marginRight: '10px' }}
            target="_blank"
            href={`https://testnets.opensea.io/assets/mumbai/0x54d8ef369a7733abbb4f482066c6d3456fb93fb7/${id}`}
          >
            View on OpenSea
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            onClick={() => navigate(`/projects/${region}/${subregion}/files/create`)}
          >
            Add File
          </Button>
        </Box>
      </Box>
      <Paper
        sx={{
          padding: '12px 12px',
          width: '100%',
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <FormControl>
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 400, fontSize: 14, pr: 1 }}>
            Show MRV:
          </Typography>
          <ButtonGroup>
            <Button
              onClick={() => setMrv('all')}
              sx={mrv === 'all' ? activeButtonStyle : { textTransform: 'none' }}
            >
              All
            </Button>
            <Button
              onClick={() => setMrv('baseline')}
              sx={mrv === 'baseline' ? activeButtonStyle : { textTransform: 'none' }}
            >
              Baseline
            </Button>
            <Button
              onClick={() => setMrv('degraded')}
              sx={mrv === 'degraded' ? activeButtonStyle : { textTransform: 'none' }}
            >
              Degraded
            </Button>
            <Button
              onClick={() => setMrv('cea')}
              sx={mrv === 'cea' ? activeButtonStyle : { textTransform: 'none' }}
            >
              CEA
            </Button>
          </ButtonGroup>
        </Box>
      </Paper>
      <Grid container spacing={2}>
        {loading
          ? [...Array(8).keys()].map(i => <LoadingFileCard key={i} />)
          : filteredMetadatas
              .filter((_, i) => i < page * 8 && i >= (page - 1) * 8)
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
                        textAlign: 'center',
                        minHeight: '110px',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                        {truncate(d.fileName, 18)}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ fontWeight: 100, fontSize: 12 }}>
                        {truncate(d.fileDescription, 70)}
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
                          Uploaded {d.createdAt ? timeAgo.format(new Date(d.createdAt)) : '10 days ago'}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
      </Grid>
      <Pagination
        count={Math.ceil(filteredMetadatas.length / 8)}
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
