import { TextField, Link, Box, Grid, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useNavigate, useParams } from 'react-router-dom'

import useConfirmSignUp from 'api/auth/useConfirmSignUp'
import useResendConfirmCode from 'api/auth/useResendConfirmCode'
import AuthLayout from '../../layouts/AuthLayout'
import ErrorMessage from '../../components/ErrorMessage'

const ConfirmEmail = () => {
  const navigate = useNavigate()
  const { username } = useParams()
  const { mutate: confirmSignUp, isSuccess, isLoading, error } = useConfirmSignUp()
  const { mutate: resendConfirmCode, error: errorRCC } = useResendConfirmCode()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget as HTMLFormElement)

    const confirmationCode = data.get('confirmationCode') as string

    await confirmSignUp!({ username: username || '', code: confirmationCode })
    if (isSuccess) navigate('/')
  }

  const handleResendCode = async () => {
    await resendConfirmCode!({ username: username || '' })
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
        {error instanceof Error && <ErrorMessage>{error!.message!}</ErrorMessage>}
        {errorRCC instanceof Error && <ErrorMessage>{errorRCC!.message!}</ErrorMessage>}
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
