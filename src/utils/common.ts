import { ethers } from 'ethers'
import { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

// 1: Mainnet
// 4: Rinkeby
// 80001: Mumbai

const networkId = 80001
const networks = {
  1: 'mainnet',
  4: 'rinkeby',
  80001: 'mumbai',
}
export const networkName = networks[networkId]

export const getEthereumObject = () => {
  const { ethereum } = window
  if (!ethereum) return null

  if (Number(ethereum.networkVersion) !== networkId) {
    alert(`Please switch to the ${networkName} network`)
    return null
  }

  return ethereum as ethers.providers.ExternalProvider
}

export const setupEthereumEventListeners = (ethereum: ethers.providers.ExternalProvider) => {
  const provider = new ethers.providers.Web3Provider(ethereum, 'any')
  provider.on('network', (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload()
    }
  })

  window.ethereum?.on('accountsChanged', async accounts => {
    window.location.reload()
  })

  return ethereum
}

export const connectWallet = async (): Promise<null | void> => {
  const { ethereum } = window
  if (!ethereum) return null

  await ethereum.request({ method: 'eth_requestAccounts' })
  window.location.reload()
}

export const getCurrentAccount = async () => {
  const { ethereum } = window
  if (!ethereum) return ''

  const accounts: Array<string> = (await ethereum.request({ method: 'eth_accounts' })) as string[]

  if (!accounts || accounts?.length === 0) {
    return ''
  }
  const account = accounts[0]
  return account
}

export const getUnsignedContract = (address: string, abi: ethers.ContractInterface) => {
  const provider = new ethers.providers.AlchemyProvider(
    'maticmum',
    process.env.REACT_APP_ALCHEMY_API_KEY
  )
  return new ethers.Contract(address, abi, provider)
}

export const getSignedContract = (address: string, abi: ethers.ContractInterface) => {
  const { ethereum } = window

  const provider = new ethers.providers.Web3Provider(
    ethereum as ethers.providers.ExternalProvider,
    'any'
  )

  const signer = provider.getSigner()
  return new ethers.Contract(address, abi, signer)
}

export const truncate = (str: string, num: number) => (str.length > num ? str.substring(0, num) + '...' : str)
