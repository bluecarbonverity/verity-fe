import { useState } from 'react'
import { TextField, FormControlLabel, Checkbox, Link, Box, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext'
import AuthLayout from '../../layouts/AuthLayout'
import ErrorMessage from '../../components/ErrorMessage'

const Login = () => {
  const navigate = useNavigate()
  const { signIn, error, isLoading } = useAuthContext()
  // TODO: actually do something with this value to make remember work
  const [remember, setRemember] = useState(true)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget as HTMLFormElement)
    const username = data.get('username')
    const password = data.get('password')

    const result = await signIn!(username, password)
    localStorage.setItem('idToken', result?.signInUserSession?.idToken?.jwtToken)

    if (result) navigate('/')
  }

  return (
    <AuthLayout title="Sign in to the platform">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Email"
          name="username"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={
            <Checkbox onChange={() => setRemember(!remember)} checked={remember} color="primary" />
          }
          label="Remember me"
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          size="large"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <ErrorMessage>{error!.message}</ErrorMessage>
        <Grid container>
          <Grid item xs>
            <Link href="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default Login
