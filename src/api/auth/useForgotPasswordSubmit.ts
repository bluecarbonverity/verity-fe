import { useMutation } from '@tanstack/react-query'
import { toastSuccessMessage } from 'utils/toast'
import { forgotPasswordSubmit } from '../../services/auth'

const useForgotPasswordSubmit = () =>
  useMutation({
    mutationFn: forgotPasswordSubmit,
    onSuccess: () => {
      toastSuccessMessage('Account setup complete. You should now be able to login.')
    },
  })

export default useForgotPasswordSubmit
