import { TextField, Link, Box, Grid, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useNavigate } from 'react-router-dom'

import AuthLayout from '../../layouts/AuthLayout'
import { toastSuccessMessage } from '../../utils/toast'
import { useAuthContext } from '../../contexts/AuthContext'
import ErrorMessage from '../../components/ErrorMessage'

const ConfirmEmail = () => {
  const navigate = useNavigate()
  const {
    username,
    isLoading,
    error,
    confirmSignUp,
    resendConfirmationCode,
  } = useAuthContext()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget as HTMLFormElement)

    const confirmationCode = data.get('confirmationCode')
    const result = await confirmSignUp!(username, confirmationCode)
    if (result) {
      toastSuccessMessage('Account setup complete. You should now be able to login.')
      navigate('/')
    }
  }

  const handleResendCode = async () => {
    const res = await resendConfirmationCode!(username)
    if (res) toastSuccessMessage('Code successfully resent. Please check your email.')
  }

  return (
    <AuthLayout
      title="We’ve sent a six-digit confirmation code to your email. Please enter it below to confirm your email
        address."
    >
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
        <TextField
          required
          fullWidth
          id="confirmationCode"
          name="confirmationCode"
          autoFocus
          type="text"
          label="Confirmation Code"
          placeholder="_ _ _ _ _ _"
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          size="large"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Verify
        </LoadingButton>
        <ErrorMessage>{error!.message}</ErrorMessage>
        <Grid container>
          <Grid item>
            <Typography variant="body2" color="text.secondary" align="center">
              Didn't recieve the code?
            </Typography>
            <Link onClick={handleResendCode} variant="body2" sx={{ cursor: 'pointer' }}>
              Resend code
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default ConfirmEmail
