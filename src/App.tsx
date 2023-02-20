import { useState, useEffect } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom'
import { AccountContext, ContractContext } from './contexts'
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
import Login from './pages/Login'

const verityContractAddress = '0x54d8ef369A7733aBbb4F482066C6D3456FB93fB7'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<Error />}>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/projects/goc-north/koolatong-north" replace />} />
        <Route path="/projects/:region/:subregion" element={<Dashboard />} />
        <Route path="/projects/:region/:subregion/files/create" element={<AddFile />} />
      </Route>
      <Route path="/files/:id" element={<ViewFile />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
)

const App = () => {
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState({
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
