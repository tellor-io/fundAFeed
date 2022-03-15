import React, { createContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'

//Globals
export const SpotPriceContext = createContext()
export const abiCoder = new ethers.utils.AbiCoder()

function SpotPrice({ children, form, infoBoxDisabled }) {
  //Component State
  const [queryId, setQueryId] = useState(null)
  const [queryData, setQueryData] = useState(null)

  useEffect(() => {
    let dataArgs
    let data
    let id

    if (!form && !form.asset) return
    if (form.asset && !infoBoxDisabled) {
      dataArgs = abiCoder.encode(
        ['string', 'string'],
        [form.asset.toString(), form.currency.toString()]
      )
      data = abiCoder.encode(['string', 'bytes'], ['SpotPrice', dataArgs])
      id = ethers.utils.keccak256(data)
      setQueryData(data)
      setQueryId(id)
    }

    return () => {
      setQueryId(null)
      setQueryData(null)
    }
  }, [form, infoBoxDisabled]) //eslint-disable-line

  const SpotPriceContextObj = {
    queryId: queryId,
    queryData: queryData,
  }

  return (
    <SpotPriceContext.Provider value={SpotPriceContextObj}>
      {children}
    </SpotPriceContext.Provider>
  )
}

export default SpotPrice
