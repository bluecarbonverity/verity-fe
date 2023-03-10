import { useMutation } from '@tanstack/react-query'
import { signIn } from '../../services/auth'

const useLogin = () =>
  useMutation({
    mutationFn: signIn,
    onSuccess: (data: any) => {
      localStorage.setItem('idToken', data?.signInUserSession?.idToken?.jwtToken)
      return data
    },
  })

export default useLogin
