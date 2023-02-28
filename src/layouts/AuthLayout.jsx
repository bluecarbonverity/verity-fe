import {
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material'
import image from '../login.png'

const AuthLayout = ({ title, children }) => (
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
          {title}
        </Typography>
        {children}
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
        backgroundColor: t =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  </Grid>
)

export default AuthLayout
