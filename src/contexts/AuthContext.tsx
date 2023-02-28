import { createContext, useState, useCallback, useContext, useMemo } from 'react'
import BCAuth from '../utils/auth'
import { useNavigate } from 'react-router-dom'

export interface AuthContextValue {
  isLoggedIn?: boolean
  setIsLoggedIn?: Function
  isLoading?: boolean
  setIsLoading?: Function
  error?: { message?: string }
  setIsError?: Function
  username?: string
  setUsername?: Function
  verify?: string
  setVerify?: Function
  signUp?: Function
  confirmSignUp?: Function
  signIn?: Function
  signOut?: Function
  resendConfirmationCode?: Function
  forgotPassword?: Function
  submitNewPassword?: Function
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

export const AuthContextProvider = (props: { children: JSX.Element | JSX.Element[] }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [verify, setVerify] = useState(localStorage.getItem('verify') || 'false')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({})
  const navigate = useNavigate()

  const signUp = useCallback(async (username: string, password: string, email: string) => {
    try {
      setIsLoading(true)
      setUsername(username)

      const { user } = await BCAuth.signUp(username, password, email)

      if (user) {
        localStorage.setItem('verify', 'true')
        setVerify('true')
        setIsLoading(false)
      }
    } catch (error: any) {
      setError({ message: error.message })
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const confirmSignUp = useCallback(
    async (code: string, username: string) => {
      try {
        setIsLoading(true)

        const response = await BCAuth.confirmSignUp(username, code)

        if (response) {
          setIsLoading(false)
        }

        return response
      } catch (error: any) {
        setIsLoading(false)
        setError({ message: error.message })
        return error
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  )

  const resendConfirmationCode = useCallback(
    async (username: string) => {
      try {
        setIsLoading(true)

        const response = await BCAuth.resendConfirmCode(username)

        if (response) {
          setIsLoading(false)
        }
      } catch (error: any) {
        setIsLoading(false)
        setError({ message: error.message })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [username]
  )

  const signIn = useCallback(
    async (username: string, password: string) => {
      try {
        setIsLoading(true)
        const user = await BCAuth.signIn(username, password)

        if (user) {
          setIsLoading(false)
          setIsLoggedIn(true)
          return user
        }
      } catch (error: any) {
        setIsLoading(false)
        setError({ message: error.message })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const signOut = useCallback(async () => {
    try {
      await BCAuth.signOut()
      setIsLoggedIn(false)
      localStorage.clear()
      sessionStorage.clear()
    } catch (error: any) {
      setIsLoading(false)
      setError({ message: error.message })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const forgotPassword = useCallback(async (username: string) => {
    try {
      setIsLoading(true)
      const user = await BCAuth.forgotPassword(username)

      if (user) {
        setIsLoading(false)
        sessionStorage.setItem('email', JSON.stringify(username))
        navigate('/reset-password')
      }
    } catch (error: any) {
      setIsLoading(false)
      setError({ message: error.message })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submitNewPassword = useCallback(
    async (username: string, code: string, password: string) => {
      try {
        setIsLoading(true)
        const user = await BCAuth.forgotPasswordSubmit(username, code, password)

        if (user) {
          setIsLoading(false)
        }

        return user
      } catch (error: any) {
        setIsLoading(false)
        setError({ message: error.message })
        return error
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  )

  const contextValue = useMemo<AuthContextValue>(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      isLoading,
      setIsLoading,
      error,
      setError,
      verify,
      setVerify,
      username,
      setUsername,
      signUp,
      confirmSignUp,
      signIn,
      signOut,
      resendConfirmationCode,
      forgotPassword,
      submitNewPassword,
    }),
    [
      isLoggedIn,
      setIsLoggedIn,
      isLoading,
      setIsLoading,
      error,
      setError,
      username,
      setUsername,
      verify,
      setVerify,
      signIn,
      signOut,
      signUp,
      confirmSignUp,
      resendConfirmationCode,
      forgotPassword,
      submitNewPassword,
    ]
  )

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
