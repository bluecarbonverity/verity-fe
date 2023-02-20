import {
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
  Tabs,
  Tab,
  Button,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import image from '../login.png'

const Login = () => {
  const navigate = useNavigate()
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        component={Paper}
        elevation={6}
        square
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Box
          sx={{
            margin: '0px auto',
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
          }}
        >
          <Typography variant="h4" sx={{ mb: 1, fontWeight: '500' }}>
            Welcome to VERITY
          </Typography>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: '100' }}>
            Sign in to the platform
          </Typography>
          <Tabs value={0} sx={{ mb: 3 }}>
            <Tab label="Email" sx={{ textTransform: 'none', minWidth: '0px' }} />
          </Tabs>
          <TextField
            label="Email"
            defaultValue="demo@bluecarbons2c.com"
            helperText="Enter a valid email since this is a fully integrated authentication system."
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/projects/goc-north/koolatong-north')}
          >
            Continue
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: t => t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  )
}

export default Login
