import { useMutation } from '@tanstack/react-query'
import { toastSuccessMessage } from 'utils/toast'
import { confirmSignUp } from '../../services/auth'

const useConfirmSignUp = () =>
  useMutation({
    mutationFn: confirmSignUp,
    onSuccess: () => {
      toastSuccessMessage('Account setup complete. You should now be able to login.')
    },
  })

export default useConfirmSignUp
