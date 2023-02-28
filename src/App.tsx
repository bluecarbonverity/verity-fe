import { useState, useEffect } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { AccountContext, ContractContext, IContractState } from './contexts'
import { AuthContextProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  getEthereumObject,
  setupEthereumEventListeners,
  getSignedContract,
  getUnsignedContract,
  getCurrentAccount,
} from './utils/common'
import verityAbi from './contracts/VerityNFT.json'
import Error from './pages/Error'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import AddFile from './pages/AddFile'
import ViewFile from './pages/ViewFile'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ConfirmEmail from './pages/Auth/ConfirmEmail'
import ResetPassword from './pages/Auth/ResetPassword'

const verityContractAddress = '0x54d8ef369A7733aBbb4F482066C6D3456FB93fB7'

const AuthLayout = () => (
  <AuthContextProvider>
    <Outlet />
  </AuthContextProvider>
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<Error />}>
      <Route element={<AuthLayout />}>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/projects/goc-north/koolatong-north" replace />} />
          <Route path="/projects/:region/:subregion" element={<Dashboard />} />
          <Route path="/projects/:region/:subregion/files/create" element={<AddFile />} />
        </Route>
        <Route path="/files/:id" element={<ViewFile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Route>
  )
)

const App = () => {
  const [account, setAccount] = useState('')
  const [contract, setContract] = useState<IContractState>({
    unsignedContract: null,
    signedContract: null,
  })

  const load = async () => {
    const unsignedContract = getUnsignedContract(verityContractAddress, verityAbi)

    const ethereum = getEthereumObject()
    if (!ethereum) {
      setContract({
        unsignedContract: unsignedContract,
        signedContract: null,
      })
      return
    }

    setupEthereumEventListeners(ethereum)

    const signedContract = getSignedContract(verityContractAddress, verityAbi)
    if (!signedContract) return

    const currentAccount = await getCurrentAccount()

    setContract({
      unsignedContract,
      signedContract,
    })
    setAccount(currentAccount)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <AccountContext.Provider value={account}>
      <ContractContext.Provider value={contract}>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <RouterProvider router={router} />
      </ContractContext.Provider>
    </AccountContext.Provider>
  )
}

export default App
