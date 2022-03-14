import React, { useContext } from 'react'
//Router
import { Link } from 'react-router-dom'
//Context
import { GraphContext } from '../../contexts/Graph'

function ConfirmedModal({ parameterForm }) {
  //Context
  const data = useContext(GraphContext)
  console.log('Inside ApproveToken', data)
  return (
    <div className="VerifyModalContainer">
      <h1 className="VerifyModalTitle">Confirmed!</h1>
      <p className="VerifyModalMessage">
        Your price feed has been setup and funded.
      </p>
      <Link to="/" className="CheckLivenessModalButton">
        check liveness
      </Link>
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
          <span className="bolded">{`${parameterForm.startDay}/${parameterForm.startMonth}/${parameterForm.startYear} at ${parameterForm.startHourFirst}${parameterForm.startHourSecond}:${parameterForm.startMinuteFirst}${parameterForm.startMinuteSecond} ${parameterForm.timezone}`}</span>
        </p>
        <a className="VerifiedButton" href="/">
          Verified: [Transaction ID]
        </a>
      </div>
      <h4 className="VerifyModalSubtitle">Your funding amount:</h4>
      <div className="VerifyFundParameter">
        <p>{`${parameterForm.fundAmount} TRB`}</p>
      </div>
      <a className="VerifiedButton" href="/">
        Verified: [Transaction ID]
      </a>
    </div>
  )
}

export default ConfirmedModal
