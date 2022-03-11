import React, { useState, useContext, useEffect } from 'react'
//Styles
import '../styles/Hero.css'
//Context
import { AppDataContext } from '../contexts/AppData'
import { UserContext } from '../contexts/User'
//Components
import WalletConnect from './frontendBoilerplate/WalletConnect'
import LinearIndeterminate from './LinearIndeterminate'
import InfoBoxConnected from './InfoBoxConnected'
import ContainerModal from './modals/ContainerModal'

const initialDropdownValues = {
  asset: '',
  currency: '',
}

const initialParameterValues = {
  fundAmount: '',
  tipAmount: '',
  windowAmount: '',
  windowType: '',
  durationAmount: '',
  durationType: '',
  startTime: '',
  startDate: '',
}

function Hero() {
  //Component State
  const [dropdownForm, setDropdownForm] = useState(initialDropdownValues)
  const [parameterForm, setParameterForm] = useState(initialParameterValues)
  const [infoBoxDisabled, setInfoBoxDisabled] = useState(true)
  const [fundFeedDisabled, setFundFeedDisabled] = useState(true)
  const [containerModal, setContainerModal] = useState(null)
  //Context
  const data = useContext(AppDataContext)
  const userData = useContext(UserContext)

  //Handlers
  const handleDropdownChange = (event) => {
    setDropdownForm({
      ...dropdownForm,
      [event.target.name]: event.target.value,
    })
  }
  const handleParameterChange = (event) => {
    setParameterForm({
      ...parameterForm,
      [event.target.name]: event.target.value,
    })
  }
  const handleFundFeed = () => {
    containerModal.style.display = 'flex'
    console.log('FUND FEED!!!')
  }
  //Helpers
  //useEffect to make sure SpotPrice
  //asset and currency are valid entries
  //before connecting wallet to page.
  useEffect(() => {
    if (!data.assets || !data.currencies) return
    if (
      data.assets.includes(dropdownForm.asset) &&
      data.currencies.includes(dropdownForm.currency)
    ) {
      setInfoBoxDisabled(false)
    } else {
      setInfoBoxDisabled(true)
    }
  }, [dropdownForm, data.assets, data.currencies])
  //useEffect to make sure feed parameters
  //valid entries before being able to submit.
  useEffect(() => {
    console.log(parameterForm)
    if (
      parameterForm.fundAmount &&
      parameterForm.tipAmount &&
      parameterForm.windowAmount &&
      parameterForm.windowType &&
      parameterForm.durationAmount &&
      parameterForm.durationType &&
      parameterForm.startTime &&
      parameterForm.startDate
    ) {
      setFundFeedDisabled(false)
    }
  }, [
    parameterForm,
    parameterForm.fundAmount,
    parameterForm.tipAmount,
    parameterForm.windowAmount,
    parameterForm.windowType,
    parameterForm.durationAmount,
    parameterForm.durationType,
    parameterForm.startTime,
    parameterForm.startDate,
  ])

  useEffect(() => {
    const modal = document.querySelector('.ContainerModal')
    setContainerModal(modal)
    return () => {
      setContainerModal(null)
    }
  }, [])

  return (
    <>
      <div className="HeroInnerContainer">
        <h1 className="HeroHeader">Fund a Price Feed</h1>
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
              value={dropdownForm.asset}
              onChange={handleDropdownChange}
              placeholder="Search"
              spellCheck={false}
            />
            <datalist id="assetDropdown">
              {data.assets &&
                data.assets.map((asset) => (
                  <option key={asset} value={asset} />
                ))}
            </datalist>
            <label htmlFor="currency">Set Currency:</label>
            <input
              list="currencyDropdown"
              type="text"
              name="currency"
              className="dropdown"
              value={dropdownForm.currency}
              onChange={handleDropdownChange}
              placeholder="Search"
              spellCheck={false}
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
        <div
          className={infoBoxDisabled ? 'HeroInfoBox disabled' : 'HeroInfoBox'}
        >
          {userData.currentUser ? (
            <InfoBoxConnected />
          ) : (
            <WalletConnect nav={false} />
          )}
        </div>
        <div
          className={
            userData.currentUser && !infoBoxDisabled
              ? 'HeroSetParameters'
              : 'HeroSetParameters disabled'
          }
        >
          <p>
            With{' '}
            <input
              type="text"
              className="HeroParameterFeedNumberInput"
              name="fundAmount"
              value={parameterForm.fundAmount}
              onChange={handleParameterChange}
            />{' '}
            TRB to fund your feed, this autopay will tip your reporter{' '}
            <input
              type="text"
              className="HeroParameterNumberInput"
              name="tipAmount"
              value={parameterForm.tipAmount}
              onChange={handleParameterChange}
            />
            TRB, as a reward, for data reported within a{' '}
            <input
              type="text"
              className="HeroParameterNumberInput"
              name="windowAmount"
              value={parameterForm.windowAmount}
              onChange={handleParameterChange}
            />
            <select
              type="text"
              className="HeroParameterDropdownInput"
              name="windowType"
              value={parameterForm.windowType}
              onChange={handleParameterChange}
            >
              <option value="minute">minute</option>
              <option value="hour">hour</option>
              <option value="day">day</option>
            </select>{' '}
            window every{' '}
            <input
              type="text"
              className="HeroParameterNumberInput"
              name="durationAmount"
              value={parameterForm.durationAmount}
              onChange={handleParameterChange}
            />
            <select
              type="text"
              className="HeroParameterDropdownInput"
              name="durationType"
              value={parameterForm.durationType}
              onChange={handleParameterChange}
            >
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
              <option value="days">days</option>
            </select>{' '}
            beginning at{' '}
            <select
              type="text"
              className="HeroParameterDropdownInput"
              name="startTime"
              value={parameterForm.startTime}
              onChange={handleParameterChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>{' '}
            on{' '}
            <select
              type="text"
              className="HeroParameterDropdownInput"
              name="startDate"
              value={parameterForm.startDate}
              onChange={handleParameterChange}
            >
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            .
          </p>
        </div>
        <div
          className={
            fundFeedDisabled ? 'HeroFundFeed disabled' : 'HeroFundFeed'
          }
          onClick={() => handleFundFeed()}
        >
          <p>fund your feed</p>
        </div>
      </div>
      <ContainerModal modal={containerModal} />
    </>
  )
}

export default Hero
