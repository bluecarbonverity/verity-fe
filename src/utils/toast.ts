import { toast, ToastOptions } from 'react-toastify'

const toastConfig: ToastOptions<{}> = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export const toastSuccessMessage = (message: string) =>
  toast.success(message, toastConfig)
export const toastErrorMessage = (message: string) =>
  toast.error(message, toastConfig)
