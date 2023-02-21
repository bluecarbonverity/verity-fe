import { createContext, useContext } from 'react'
import { Contract } from 'ethers'

export interface IContractState {
  unsignedContract: null | Contract
  signedContract: null | Contract
}

export const AccountContext = createContext('')
export const ContractContext = createContext<IContractState>({
  unsignedContract: null,
  signedContract: null,
})

export function useAccount() {
  return useContext(AccountContext)
}
export function useContract() {
  return useContext(ContractContext)
}
