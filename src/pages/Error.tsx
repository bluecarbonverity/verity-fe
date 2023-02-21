import { Box } from '@mui/material'
import { useRouteError } from 'react-router-dom'

type RouteError = {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error: RouteError = useRouteError() || {}

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Box>
  )
}
