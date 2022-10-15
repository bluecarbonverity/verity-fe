import { createContext, useContext } from 'react'

export const AccountContext = createContext('')
export const ContractContext = createContext({
  unsignedContract: null,
  signedContract: null,
})

export function useAccount() {
  return useContext(AccountContext)
}
export function useContract() {
  return useContext(ContractContext)
}
