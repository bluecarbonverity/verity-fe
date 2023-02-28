import { Auth } from 'aws-amplify'
import { CurrentUserOpts } from '@aws-amplify/auth/lib-esm/types'

export default class BCAuth {
  static signIn(username: string, password: string) {
    return Auth.signIn(username, password)
  }

  static signUp(username: string, password: string, email: string) {
    return Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    })
  }

  static resendConfirmCode(username: string) {
    return Auth.resendSignUp(username)
  }

  static confirmSignUp(username: string, code: string) {
    return Auth.confirmSignUp(username, code)
  }

  static signOut() {
    return Auth.signOut()
  }

  static currentAuthenticatedUser(opts: CurrentUserOpts) {
    return Auth.currentAuthenticatedUser(opts)
  }

  static forgotPasswordSubmit(username: string, code: string, password: string) {
    return Auth.forgotPasswordSubmit(username, code, password)
  }

  static forgotPassword(username: string) {
    return Auth.forgotPassword(username)
  }
}
