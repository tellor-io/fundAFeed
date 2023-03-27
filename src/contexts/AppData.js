import React, { createContext, useEffect, useState } from 'react'

export const AppDataContext = createContext()

function AppData({ children }) {
  //Component State
  const [assets, setAssets] = useState(null)
  const [currencies, setCurrencies] = useState(null)

  //useEffect for getting coinGecko data on app load
  useEffect(() => {
    let assetArray = []
    let duplicatesRemoved
    fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=true')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        //NEED TO FIGURE OUT THE DUPLICATE SITUATION!!!
        data.forEach((coin) => {
          assetArray.push(coin.symbol)
        })
        duplicatesRemoved = assetArray.filter((c, index) => {
          return assetArray.indexOf(c) === index
        })
        setAssets(duplicatesRemoved.sort())
      })
    fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data.sort())
      })
  }, [])

  const AppDataContextObj = {
    assets: assets,
    currencies: currencies,
  }

  return (
    <AppDataContext.Provider value={AppDataContextObj}>
      {children}
    </AppDataContext.Provider>
  )
}

export default AppData
