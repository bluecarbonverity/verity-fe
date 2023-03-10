import { useMutation } from '@tanstack/react-query'
import { toastSuccessMessage } from 'utils/toast'
import { forgotPassword } from '../../services/auth'

const useForgotPassword = () =>
  useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toastSuccessMessage('Confirmation code successfully sent.')
    },
  })

export default useForgotPassword
