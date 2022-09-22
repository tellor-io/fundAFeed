import React, { useContext, useEffect, useState } from 'react'
//Router
import { useLocation } from 'react-router-dom'
//Context
import { UserContext } from '../../contexts/User'
//Utils
import { dateHelper } from '../../utils/time'

function ConfirmedModal({ parameterForm, closeModal }) {
  //Component
  const [fundFeedTxnURL, setFundFeedTxnURL] = useState(null)
  //Context
  const user = useContext(UserContext)
  //Router
  const { state } = useLocation()
 
  useEffect(() => {
    if (!user || !user.currentUser) return
    if (!state.fundFeedTxnHash) return
    if (user.currentUser.network === 'matic') {
      setFundFeedTxnURL(`https://polygonscan.com/tx/${state.fundFeedTxnHash}`)
    } else if (user.currentUser.network === 'mumbai') {
      setFundFeedTxnURL(
        `https://mumbai.polygonscan.com/tx/${state.fundFeedTxnHash}`
      )
    }
  }, [user, state])

  return (
    <div className="VerifyModalContainer">
      <h1 className="VerifyModalTitle">Confirmed!</h1>
      <p className="VerifyModalMessage">
        Your price feed has been setup and funded.
      </p>
      <a
        href="https://tellor.io/data-feed"
        target="_blank"
        rel="noreferrer noopener"
        className="CheckLivenessModalButton"
        onClick={() => closeModal()}
      >
        check liveness
      </a>
      <h4 className="VerifyModalSubtitle">Your parameters:</h4>
      <div className="VerifyParametersFund">
        <p>
          Tip Amount:{' '}
          <span className="bolded">{`${parameterForm.tipAmountNumber}.${parameterForm.tipAmountDecimal} TRB`}</span>
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
          }, my local time (${dateHelper().localTimezone})`}</span>
        </p>
        <a
          className="VerifiedButton"
          href={state && state.setupFeedTxnUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Verified: View on Scan Explorer
        </a>
      </div>
      <h4 className="VerifyModalSubtitle">Your funding amount:</h4>
      <div className="VerifyFundParameter">
        <p>{`${parameterForm.fundAmount} TRB`}</p>
      </div>
      <a
        className="VerifiedButton"
        href={fundFeedTxnURL && fundFeedTxnURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Verified: View on Scan Explorer
      </a>
    </div>
  )
}

export default ConfirmedModal
