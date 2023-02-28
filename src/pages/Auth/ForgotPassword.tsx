import { TextField, Link, Box, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FieldValues, useForm } from 'react-hook-form'

import AuthLayout from '../../layouts/AuthLayout'
import { toastSuccessMessage } from '../../utils/toast'
import { useAuthContext } from '../../contexts/AuthContext'
import ErrorMessage from '../../components/ErrorMessage'

const ForgotPassword = () => {
  const { isLoading, error, forgotPassword } = useAuthContext()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = async ({ email }: FieldValues) => {
    const result = await forgotPassword!(email)
    if (result) {
      toastSuccessMessage('Confirmation code successfully sent.')
    }
  }

  return (
    <AuthLayout title="Enter the email address associated with your account.">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1, width: '100%' }}
      >
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          {...register('email', {
            required: { value: true, message: 'Email address should not be empty.' },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email address has invalid format.',
            },
          })}
        />
        <ErrorMessage>
          {errors.email && errors.email.message && <span>{errors.email.message.toString()}</span>}
        </ErrorMessage>
        <LoadingButton
          loading={isLoading}
          type="submit"
          size="large"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Request Reset Link
        </LoadingButton>
        <ErrorMessage>{error!.message}</ErrorMessage>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Back to Sign-in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default ForgotPassword
