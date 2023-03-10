import { TextField, Link, Box, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import useForgotPassword from 'api/auth/useForgotPassword'
import AuthLayout from '../../layouts/AuthLayout'
import ErrorMessage from '../../components/ErrorMessage'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { mutate: forgotPassword, isSuccess, isLoading, error } = useForgotPassword()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = async ({ email: username }: FieldValues) => {
    await forgotPassword!({ username })
    if (isSuccess) navigate('/reset-password')
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
        {error instanceof Error && <ErrorMessage>{error!.message!}</ErrorMessage>}
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
