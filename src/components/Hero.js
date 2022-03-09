import React, { useState } from 'react';
import "../styles/Hero.css";

const initialDropdownValues = {
    asset: "",
    currency: "",
  }

function Hero() {
  const [form, setForm] = useState(initialDropdownValues);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className="HeroInnerContainer">
          <h1 className="HeroHeader">Fund a SpotPrice Feed</h1>
          <p className="HeroMainText">Already have your <a href="https://querybuilder.tellor.io/spotprice">SpotPrice Query ID</a>? To fund your feed, select your SpotPrice asset and currency, connect your wallet, and then set your funding parameters.</p>
          <div className="HeroDropdowns">
            <label htmlFor="asset">Set Asset:</label>
            <input 
              list="assetDropdown" 
              type="text" 
              placeholder="Search"
              id="assetInput"
              className="dropdown"
            />
            <datalist 
              id="assetDropdown"
              onChange={handleChange}
              value={form.asset}
            >
              <option value="option1"/>
              <option value="option2"/>
            </datalist>
            <label htmlFor="currency">Set Currency:</label>
            <input 
              list="currencyDropdown" 
              type="text" 
              placeholder="Search"
              className="dropdown"
            />
            <datalist 
              id="currencyDropdown"
              onChange={handleChange}
              value={form.currency}
            >
              <option value="option1"/>
              <option value="option2"/>
            </datalist>
          </div>
        </div>
  )
}

export default Hero