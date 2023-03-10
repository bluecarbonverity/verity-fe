import { useMutation } from '@tanstack/react-query'
import { toastSuccessMessage } from 'utils/toast'
import { signUp } from '../../services/auth'

const useSignUp = () =>
  useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toastSuccessMessage('Confirmation code sent. Please check your email.')
    },
  })

export default useSignUp
