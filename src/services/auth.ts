import { Auth } from 'aws-amplify'
import { CurrentUserOpts } from '@aws-amplify/auth/lib-esm/types'

type LoginBody = {
  username: string
  password: string
}

type ConfirmSignUpBody = {
  username: string
  code: string
}

type ResendConfirmCodeBody = {
  username: string
}

type ForgotPasswordSubmitBody = {
  username: string
  code: string
  password: string
}

type ForgotPasswordBody = {
  username: string
}

export const signIn = async ({ username, password }: LoginBody) => {
  const result = await Auth.signIn(username, password)
  return result.data
}

export const signUp = async ({ username, password }: LoginBody) => {
  const result = await Auth.signUp({
    username,
    password,
    attributes: {
      email: username,
    },
  })
  return result
}

export const resendConfirmCode = async ({ username }: ResendConfirmCodeBody) => {
  const result = await Auth.resendSignUp(username)
  return result.data
}

export const confirmSignUp = async ({ username, code }: ConfirmSignUpBody) => {
  const result = await Auth.confirmSignUp(username, code)
  return result.data
}

export const signOut = async () => {
  const result = await Auth.signOut()
  return result.data
}

export const currentAuthenticatedUser = async (opts: CurrentUserOpts) => {
  const result = await Auth.currentAuthenticatedUser(opts)
  return result.data
}

export const forgotPasswordSubmit = async ({
  username,
  code,
  password,
}: ForgotPasswordSubmitBody) => {
  const result = await Auth.forgotPasswordSubmit(username, code, password)
  return result
}

export const forgotPassword = async ({ username }: ForgotPasswordBody) => {
  const result = await Auth.forgotPassword(username)
  return result
}
