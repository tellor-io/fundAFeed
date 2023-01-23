import React, { useState, useContext, useEffect } from 'react'
//Styles
import '../styles/Hero.css'
//Context
import { AppDataContext } from '../contexts/AppData'
import { UserContext } from '../contexts/User'
import SpotPrice from '../contexts/SpotPrice'
import Error from '../contexts/Error'
//Components
import WalletConnect from './frontendBoilerplate/WalletConnect'
import LinearIndeterminate from './LinearIndeterminate'
import InfoBoxConnected from './InfoBoxConnected'
import ContainerModal from './modals/ContainerModal'
//Utils
import { dateHelper } from '../utils/time'

const initialDropdownValues = {
  asset: '',
  currency: '',
}

const initialParameterValues = {
  fundAmount: 100,
  rewardIncreasePerSecond: 0.1,
  tipAmountNumber: 0,
  tipAmountDecimal: 2,
  windowAmount: 10,
  windowType: 'minute',
  durationAmount: 30,
  durationType: 'minutes',
  startHourFirst: 0,
  startHourSecond: 0,
  startMinuteFirst: 0,
  startMinuteSecond: 0,
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
  const [fundType, setFundType] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(true)
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

  const validateParameterChange = (event) => {
    console.log(event)
    if (parameterForm.durationType === 'minutes') {
      if (event.target.value >= 5 ){
        setParameterForm({
          ...parameterForm,
          [event.target.name]: event.target.value,
        })
      }
      else {
        alert('value has to be greater than 5')
      }
    }
    else {
      setParameterForm({
        ...parameterForm,
        [event.target.name]: event.target.value,
      })
    }
  }

  const validateParameterChangeTrb = (event) => {
    console.log(event)
    if (event.target.value >= 0.1 ){
       setParameterForm({
        ...parameterForm,
        [event.target.name]: event.target.value,
        })
      }
      else {
        alert('value has to be greater than 0.1')
      }
    }

  const startModalFlow = () => {
    containerModal.style.display = 'flex'
  }

  console.log('here', dropdownForm)

  //Helpers
  //useEffect to make sure feed parameters are
  //valid entries before being able to submit.
  useEffect(() => {
    if (!userData.currentUser) return
    if (userData.currentUser && !infoBoxDisabled && correctNetwork) {
      setFundFeedDisabled(false)
    } else {
      setFundFeedDisabled(true)
    }
  }, [userData.currentUser, infoBoxDisabled, correctNetwork])
  //useEffect to make sure user is on the correct
  //chain to be able to set up a feed
  useEffect(() => {
    if (!userData.currentUser) return
    if (!userData.currentUser.balances) {
      setCorrectNetwork(false)
      setFundFeedDisabled(true)
    } else {
      setCorrectNetwork(true)
    }
  }, [userData.currentUser])
  //useEffect to make sure SpotPrice
  //asset and currency are valid entries
  //before connecting wallet to page.
  useEffect(() => {
    if (!data.assets || !data.currencies) return
    if (
      data.assets.includes(dropdownForm.asset && dropdownForm.currency) &&
      data.currencies.includes(dropdownForm.asset && dropdownForm.currency) &&
      dropdownForm.asset !== ''
    ) {
      setInfoBoxDisabled(false)
    } else {
      setInfoBoxDisabled(true)
    }
  }, [dropdownForm, data.assets, data.currencies])

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
      <div className="HeroInnerContainer" >
      <h1 className="HeroHeader">Fund a Price Feed</h1>
      <div
          className={'HeroInfoBox'}
        >
        {userData.currentUser ? (
         <InfoBoxConnected /> 
        ) : (
          <WalletConnect nav={false}   />
        )}       
      </div>
       

        {data.assets ? (
          <div className="HeroDropdowns">
            <label htmlFor="asset">Set Asset:</label>
            <input
              //list="assetDropdown"
              type="text"
              name="asset"
              id="assetInput"
              className="dropdown"
              value={dropdownForm.asset}
              onChange={handleDropdownChange}
              placeholder="eth"
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
              //list="currencyDropdown"
              type="text"
              name="currency"
              id="assetInput"
              className="dropdown"
              value={dropdownForm.currency}
              onChange={handleDropdownChange}
              placeholder="usd"
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
                <p style={{marginTop: '1em', marginBottom: '1em'}}>
          Select frequency of funding:</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '50%',
            paddingTop: '1em',
            paddingBottom: '2em',
          }}
        >
          <div 
            className='HeroFundFeed'
            style={{
              color: fundType === 'oneTime' ? '#20f092' : '#20f09250',
              border: fundType === 'oneTime' ? '2px solid #20f092' : '2px solid #20f09250',
            }}
            onClick={() => setFundType('oneTime')}
          >One time</div>
          <div 
            className='HeroFundFeed'
            style={{
              color: fundType === 'recurring' ? '#20f092' : '#20f09250',
              border: fundType === 'recurring' ? '2px solid #20f092' : '2px solid #20f09250',
            }}
            onClick={() => setFundType('recurring')}
          >Recurring</div>
        </div>
        {
          fundType === 'recurring' ? 
          <>
          <div
            className={
              userData.currentUser && !infoBoxDisabled && correctNetwork
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
              TRB to fund your feed,
              <hr />
              this feed will reward reporters  (
          
              <input
                type="number"
                min={0.1}
                max={99}
                className="HeroParameterFeedNumberInputLarge"
                name="tipAmountDecimal"
                value={parameterForm.tipAmountDecimal}
                onChange={validateParameterChangeTrb}
              />)
              TRB, every{' '}
              <input
                type="number" required
                className="HeroParameterFeedNumberInputLarge"
                name="durationAmount" 
                min={parameterForm.durationType === 'minutes' ? 5 : undefined }                
                value={parameterForm.durationAmount}
                onChange={validateParameterChange} 
              />

              <select
                type="text"
                className="HeroParameterDropdownInput"
                name="durationType"
                value={parameterForm.durationType}
                onChange={handleParameterChange}
                selected="minutes"
              >
                <option value="minutes">minutes</option>
                <option value="hours">hours</option>
                <option value="days">days</option>
              </select>{' '}
              <hr />
             
              for data reported within a{' '}
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
              </select>{' '} window, (should be less than or equal to previous field)
              <hr />
               
              beginning at (24-hr clock) {' '}
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
              />{' '}
               my local time, on the date (DD/MM/YYYY) <br></br><input
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
              </select>
              .
              <hr />
              {' '}
              
              <hr />
              Rewards will increase by (
              <input
                style={{
                  width: '3vw'
                }}
                type="number"
                min={0}
                max={9}
                className="HeroParameterFeedNumberInputSmall"
                name="rewardIncreasePerSecond"
                value={parameterForm.rewardIncreasePerSecond}
                onChange={handleParameterChange}
              /> TRB / per second) 
              until a value is mined.
              <hr />
            </p>
          </div>
          <div
            className={
              fundFeedDisabled ? 'HeroFundFeed disabled' : 'HeroFundFeed'
            }
            onClick={() => startModalFlow()}
          >
            <p>verify and fund</p>
          </div>
          </>
          :
          fundType === 'oneTime' ?
          <>
            <h3
              style={{
                paddingBottom: '1em',
                marginTop: '1em',
              }}
            >Amount of TRB to fund your feed</h3>

            <br />
            <input
              type="number"
              className="HeroParameterFeedNumberInputLarge"
              name="fundAmount"
              value={parameterForm.fundAmount}
              onChange={handleParameterChange}
            />{' '}
            <div
              className={
                fundFeedDisabled ? 'HeroFundFeed disabled' : 'HeroFundFeed'
              }
              style={{
                marginTop: '2em',
              }}
              onClick={() => startModalFlow()}
            >
              <p>verify and fund</p>
            </div>
          </>
          :
          <p style={{marginTop: '3em'}}>
          </p>
        }

      </div>
      <SpotPrice form={dropdownForm} infoBoxDisabled={infoBoxDisabled}>
        <Error>
          <ContainerModal
            modal={containerModal}
            parameterForm={parameterForm}
            transactionType={fundType}
            pair={`${dropdownForm.asset} / ${dropdownForm.currency}`}
          />
        </Error>
      </SpotPrice>
    </>
  )
}

export default Hero