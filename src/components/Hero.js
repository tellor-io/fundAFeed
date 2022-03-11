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
//Utils
import { timezones, dateHelper } from '../utils/time'

const initialDropdownValues = {
  asset: '',
  currency: 'usd',
}

const initialParameterValues = {
  fundAmount: 1,
  tipAmountNumber: 0,
  tipAmountDecimal: 25,
  windowAmount: 30,
  windowType: 'minute',
  durationAmount: 6,
  durationType: 'hours',
  startHourFirst: 0,
  startHourSecond: 0,
  startMinuteFirst: 0,
  startMinuteSecond: 0,
  timezone: dateHelper().localZone,
  startDay: dateHelper().day + 1,
  startMonth: dateHelper().month,
  startYear: dateHelper().year,
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
  const startModalFlow = () => {
    containerModal.style.display = 'flex'
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

  //Grabbing Modal onload
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
              type="number"
              className="HeroParameterFeedNumberInputLarge"
              name="fundAmount"
              value={parameterForm.fundAmount}
              onChange={handleParameterChange}
            />{' '}
            TRB to fund your feed, this autopay will tip your reporter (
            <input
              type="number"
              min={0}
              max={9}
              className="HeroParameterFeedNumberInputSmall"
              name="tipAmountNumber"
              value={parameterForm.tipAmountNumber}
              onChange={handleParameterChange}
            />
            .
            <input
              type="number"
              min={0}
              max={99}
              className="HeroParameterFeedNumberInputLarge"
              name="tipAmountDecimal"
              value={parameterForm.tipAmountDecimal}
              onChange={handleParameterChange}
            />
            ) TRB, as a reward, for data reported within a{' '}
            <input
              type="number"
              className="HeroParameterFeedNumberInputLarge"
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
              type="number"
              className="HeroParameterFeedNumberInputLarge"
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
            <input
              type="number"
              min={0}
              max={2}
              className="HeroParameterFeedNumberInputSmall"
              name="startHourFirst"
              value={parameterForm.startHourFirst}
              onChange={handleParameterChange}
            />
            <input
              type="number"
              min={0}
              max={9}
              className="HeroParameterFeedNumberInputSmall"
              name="startHourSecond"
              value={parameterForm.startHourSecond}
              onChange={handleParameterChange}
            />
            :
            <input
              type="number"
              min={0}
              max={5}
              className="HeroParameterFeedNumberInputSmall"
              name="startMinuteFirst"
              value={parameterForm.startMinuteFirst}
              onChange={handleParameterChange}
            />
            <input
              type="number"
              min={0}
              max={9}
              className="HeroParameterFeedNumberInputSmall"
              name="startMinuteSecond"
              value={parameterForm.startMinuteSecond}
              onChange={handleParameterChange}
            />
            ,
            <select
              type="text"
              className="HeroParameterDropdownInput"
              name="timezone"
              value={parameterForm.timezone}
              onChange={handleParameterChange}
            >
              {timezones.map((tz) => (
                <option value={tz.zone}>{tz.zone}</option>
              ))}
            </select>{' '}
            on{' '}
            <input
              type="number"
              min={1}
              max={31}
              className="HeroParameterFeedNumberInputMedium"
              name="startDay"
              value={parameterForm.startDay}
              onChange={handleParameterChange}
            />
            <input
              type="number"
              min={1}
              max={12}
              className="HeroParameterFeedNumberInputMedium"
              name="startMonth"
              value={parameterForm.startMonth}
              onChange={handleParameterChange}
            />
            <select
              type="text"
              className="HeroParameterDropdownInput"
              name="startYear"
              value={parameterForm.startYear}
              onChange={handleParameterChange}
            >
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
            (DD/MM/YYYY).
          </p>
        </div>
        <div
          className={
            fundFeedDisabled ? 'HeroFundFeed disabled' : 'HeroFundFeed'
          }
          onClick={() => startModalFlow()}
        >
          <p>fund your feed</p>
        </div>
      </div>
      <ContainerModal modal={containerModal} />
    </>
  )
}

export default Hero
