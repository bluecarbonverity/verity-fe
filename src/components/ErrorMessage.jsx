import { Typography } from '@mui/material'

const ErrorMessage = ({ children }) => (
  <Typography variant='body2' sx={{ color: 'red' }}>{children}</Typography>
)

export default ErrorMessage