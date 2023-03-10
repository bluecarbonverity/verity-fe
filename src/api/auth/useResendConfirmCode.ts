import { useMutation } from '@tanstack/react-query'
import { toastSuccessMessage } from 'utils/toast'
import { resendConfirmCode } from '../../services/auth'

const useResendConfirmCode = () =>
  useMutation({
    mutationFn: resendConfirmCode,
    onSuccess: () => {
      toastSuccessMessage('Code successfully resent. Please check your email.')
    },
  })

export default useResendConfirmCode
