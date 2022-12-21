import React, { useContext, useEffect, useState } from 'react'
//Router
import { useNavigate, useLocation } from 'react-router-dom'
//Context
import { UserContext } from '../../contexts/User'
import { SpotPriceContext } from '../../contexts/SpotPrice'
import { ErrorContext } from '../../contexts/Error'
//Components
import Loader from '../Loader'
//Utils
import { dateHelper } from '../../utils/time'
import autopayABI from '../../utils/autopayABI.json'

function FundFeedModal({ parameterForm, autopayAddy, thisFeedId, thisQueryId }) {
  //Component State
  const [loading, setLoading] = useState()
  //Context
  const user = useContext(UserContext)
  const spotPriceData = useContext(SpotPriceContext)
  const error = useContext(ErrorContext)
  //Router
  const { state } = useLocation()
  const navigate = useNavigate()

  //Handlers
  const handleFundFeed = () => {
    let autopay
    try {
      autopay = new user.currentUser.web3.eth.Contract(autopayABI, autopayAddy)
      setLoading(true)
      autopay.methods
        .fundFeed(
          thisFeedId,
          thisQueryId,
          user.currentUser.web3.utils.toWei(parameterForm.fundAmount.toString())
        )
        .send({ from: user.currentUser.address })
        .then((res) => {
          setLoading(false)
          navigate('/confirmed', {
            state: {
              fundFeedTxnHash: res.transactionHash,
              setupFeedTxnUrl: state.txnURL,
            },
          })
        })
        .catch((err) => {
          console.log(err)
          error.setError(err.message)
          setLoading(false)
        })
    } catch (err) {
      console.log(err)
      error.setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="VerifyModalContainer">
      <h1 className="VerifyModalTitle">Confirmation</h1>
      <p className="VerifyModalMessage">
        Confirming the funding of your feed will take three (3) separate
        transactions.
      </p>
      <h4 className="VerifyModalSubtitle">Your data feed parameters:</h4>
      <div className="VerifyParametersFund">
        <p>
          Tip Amount:{' '}
          <span className="bolded">{`${parameterForm.tipAmountDecimal} TRB`}</span>
        </p>
        <p>
          Window:{' '}
          <span className="bolded">{`${parameterForm.windowAmount} ${parameterForm.windowType}`}</span>
        </p>
        <p>
          Interval:{' '}
          <span className="bolded">{`${parameterForm.durationAmount} ${parameterForm.durationType}`}</span>
        </p>
        <p>
          Starting:{' '}
          <span className="bolded">{`${parameterForm.startDay}/${
            parameterForm.startMonth
          }/${parameterForm.startYear} at ${parameterForm.startHourFirst}${
            parameterForm.startHourSecond
          }:${parameterForm.startMinuteFirst}${
            parameterForm.startMinuteSecond
          } ${parameterForm.timezone}, my local time (${
            dateHelper().localTimezone
          })`}</span>
        </p>
        <a
          className="VerifiedButton"
          href={state && state.txnURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Verified: View on PolygonScan
        </a>
      </div>
      <h4 className="VerifyModalSubtitle">
        Now verify your funding amount and fund your feed:
      </h4>
      <div className="VerifyFundParameter">
        <p>{`${parameterForm.fundAmount} TRB`}</p>
      </div>
      {
        user.currentUser && user.currentUser.balances.trb && user.currentUser.balances.trb >= parameterForm.fundAmount ?
        <div className="VerifyModalButton" onClick={() => handleFundFeed()}>
          fund feed
        </div>
        :
        <div className="VerifyModalButton" onClick={() => handleFundFeed()}>
          fund feed
        </div>
      }
      
      <Loader loading={loading} />
    </div>
  )
}

export default FundFeedModal
