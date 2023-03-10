import { useMutation } from '@tanstack/react-query'
import { signOut } from '../../services/auth'

const useLogout = () =>
  useMutation({
    mutationFn: signOut,
    onSuccess: (data: any) => {
      localStorage.clear()
      sessionStorage.clear()
      return data
    },
  })

export default useLogout
