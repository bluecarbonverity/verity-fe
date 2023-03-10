import { TextField, Link, Box, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FieldValues, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import useSignUp from 'api/auth/useSignUp'
import AuthLayout from '../../layouts/AuthLayout'
import ErrorMessage from '../../components/ErrorMessage'

const SignUp = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const { mutate: signUp, isSuccess, isLoading, error } = useSignUp()

  const onSubmit = async ({ email, password }: FieldValues) => {
    await signUp!(email, password)
    if (isSuccess) navigate('/')
  }
  const password = watch('password', '')

  return (
    <AuthLayout title="Sign up to the platform">
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
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
              {errors.email && errors.email.message && (
                <span>{errors.email.message.toString()}</span>
              )}
            </ErrorMessage>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
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
              label="Re-enter Password"
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
          Sign Up
        </LoadingButton>
        {error instanceof Error && <ErrorMessage>{error!.message!}</ErrorMessage>}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  )
}

export default SignUp
