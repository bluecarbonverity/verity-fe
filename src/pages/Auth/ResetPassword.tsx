import { TextField, Link, Box, Grid, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import AuthLayout from '../../layouts/AuthLayout'
import { toastSuccessMessage } from '../../utils/toast'
import { useAuthContext } from '../../contexts/AuthContext'
import ErrorMessage from '../../components/ErrorMessage'

const ResetPassword = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()
  const { submitNewPassword, resendConfirmationCode, error, isLoading, username } = useAuthContext()
  const navigate = useNavigate()

  const password = watch('password', '')
  const onSubmit = async ({ code, password }: FieldValues) => {
    const path = await submitNewPassword!(username, code, password)
    if (path) {
      toastSuccessMessage('Password successfully reset. You should now be able to login.')
      navigate(path)
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
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="confirmationCode"
              autoFocus
              type="text"
              label="Confirmation Code"
              placeholder="_ _ _ _ _ _"
              {...register('code', {
                required: { value: true, message: 'Confirmation code should not be empty.' },
              })}
            />
            <ErrorMessage>
              {errors.code && errors.code.message && <span>{errors.code.message.toString()}</span>}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="New Password"
              type="password"
              id="password"
              autoComplete="new-password"
              {...register('password', {
                required: { value: true, message: 'Password should not be empty.' },
                minLength: { value: 8, message: 'Password should be at least 8 characters.' },
                maxLength: {
                  value: 99,
                  message: 'Password should not be more than 99 characters.',
                },
                validate: {
                  requireLowerCase: value =>
                    /(?=.*[a-z])/.test(value) ||
                    'Password must have at least one lowercase character.',
                  requireUpperCase: value =>
                    /(?=.*[A-Z])/.test(value) ||
                    'Password must have at least one uppercase character.',
                  requireNumber: value =>
                    /(?=.*[0-9])/.test(value) || 'Password must have at least one number.',
                  hasSpecialChar: value =>
                    /(?=.*[\^$*.[\]{}()?\-"!@#%&/,><’:;|_~`])/.test(value) ||
                    'Password must have at least one special character.',
                  noWhitespace: value =>
                    /\S/.test(value) || 'Password must not include whitespace.',
                },
              })}
            />
            <ErrorMessage>
              {errors.password && errors.password.message && (
                <span>{errors.password.message.toString()}</span>
              )}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Re-enter New Password"
              type="password"
              id="re-enter-password"
              autoComplete="new-password"
              {...register('reenterpassword', {
                required: { value: true, message: 'Password should not be empty.' },
                minLength: { value: 8, message: 'Password should be at least 8 characters.' },
                maxLength: {
                  value: 99,
                  message: 'Password should not be more than 99 characters.',
                },
                validate: {
                  passwordsMatch: value => value === password || 'The passwords do not match.',
                  requireLowerCase: value =>
                    /(?=.*[a-z])/.test(value) ||
                    'Password must have at least one lowercase character.',
                  requireUpperCase: value =>
                    /(?=.*[A-Z])/.test(value) ||
                    'Password must have at least one uppercase character.',
                  requireNumber: value =>
                    /(?=.*[0-9])/.test(value) || 'Password must have at least one number.',
                  hasSpecialChar: value =>
                    /(?=.*[\^$*.[\]{}()?\-"!@#%&/,><’:;|_~`])/.test(value) ||
                    'Password must have at least one special character.',
                  noWhitespace: value =>
                    /\S/.test(value) || 'Password must not include whitespace.',
                },
              })}
            />
            <ErrorMessage>
              {errors.reenterpassword && errors.reenterpassword.message && (
                <span>{errors.reenterpassword.message.toString()}</span>
              )}
            </ErrorMessage>
          </Grid>
        </Grid>
        <LoadingButton
          loading={isLoading}
          type="submit"
          size="large"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Change Password
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

export default ResetPassword
