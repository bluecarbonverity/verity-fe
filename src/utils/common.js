import { ethers } from 'ethers'

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

  return ethereum
}

export const setupEthereumEventListeners = ethereum => {
  const provider = new ethers.providers.Web3Provider(ethereum, 'any')
  provider.on('network', (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      window.location.reload()
    }
  })

  window.ethereum.on('accountsChanged', async accounts => {
    window.location.reload()
  })

  return ethereum
}

export const connectWallet = async () => {
  const { ethereum } = window
  if (!ethereum) return null

  await ethereum.request({ method: 'eth_requestAccounts' })
  window.location.reload()
}

export const getCurrentAccount = async () => {
  const { ethereum } = window

  const accounts = await ethereum.request({ method: 'eth_accounts' })

  if (!accounts || accounts?.length === 0) {
    return null
  }
  const account = accounts[0]
  return account
}

export const getUnsignedContract = (address, abi) => {
  const provider = new ethers.providers.AlchemyProvider(
    'maticmum',
    process.env.REACT_APP_ALCHEMY_API_KEY
  )
  return new ethers.Contract(address, abi, provider)
}

export const getSignedContract = (address, abi) => {
  const { ethereum } = window

  const provider = new ethers.providers.Web3Provider(ethereum, 'any')

  const signer = provider.getSigner()
  return new ethers.Contract(address, abi, signer)
}
