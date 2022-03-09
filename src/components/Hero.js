import React, { useState, useContext } from 'react'
//Styles
import '../styles/Hero.css'
//Context
import { AppDataContext } from '../contexts/AppData'
//Components
import WalletConnect from './frontendBoilerplate/WalletConnect'
import LinearIndeterminate from './reusableComponents/LinearIndeterminate'

const initialDropdownValues = {
  asset: '',
  currency: '',
}

function Hero() {
  //Component State
  const [form, setForm] = useState(initialDropdownValues)
  //Context
  const data = useContext(AppDataContext)
  console.log(data)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  console.log('FORM VALUES:: ', form)

  return (
    <div className="HeroInnerContainer">
      <h1 className="HeroHeader">Fund a SpotPrice Feed</h1>
      <p className="HeroMainText">
        Already have your{' '}
        <a
          href="https://querybuilder.tellor.io/spotprice"
          target="_blank"
          rel="noopener noreferrer"
        >
          SpotPrice Query ID
        </a>
        ? To fund your feed, select your SpotPrice asset and currency, connect
        your wallet, and then set your funding parameters.
      </p>
      {data.assets ? (
        <div className="HeroDropdowns">
          <label htmlFor="asset">Set Asset:</label>
          <input
            list="assetDropdown"
            type="text"
            name="asset"
            id="assetInput"
            className="dropdown"
            value={form.asset}
            onChange={handleChange}
            placeholder="Search"
          />
          <datalist id="assetDropdown">
            {data.assets &&
              data.assets.map((asset) => <option key={asset} value={asset} />)}
          </datalist>
          <label htmlFor="currency">Set Currency:</label>
          <input
            list="currencyDropdown"
            type="text"
            name="currency"
            className="dropdown"
            value={form.currency}
            onChange={handleChange}
            placeholder="Search"
          />
          <datalist id="currencyDropdown">
            {data.currencies &&
              data.currencies.map((currency) => (
                <option key={currency} value={currency} />
              ))}
          </datalist>
        </div>
      ) : (
        <LinearIndeterminate />
      )}
      <div className="HeroInfoBox">
        <WalletConnect />
      </div>
      <div className="HeroSetParameters">
        <p>
          Tip your reporter <input type="text" /> for data reported within a{' '}
          <input type="text" /> window every <input type="text" /> beginning{' '}
          <input type="text" />
          <input type="text" />.
        </p>
      </div>
      <div className="HeroFundFeed">
        <p>fund your feed</p>
      </div>
    </div>
  )
}

export default Hero
