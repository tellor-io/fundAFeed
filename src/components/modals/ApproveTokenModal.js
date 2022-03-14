import React, { useContext } from 'react'
import '../../styles/modals/ContainerModal.css'
//Router
import { Link } from 'react-router-dom'
//Context
import { GraphContext } from '../../contexts/Graph'

function ApproveTokenModal({ parameterForm }) {
  //Context
  const data = useContext(GraphContext)
  console.log('Inside ApproveToken', data)

  return (
    <div className="VerifyModalContainer">
      <h1 className="VerifyModalTitle">Confirmation</h1>
      <p className="VerifyModalMessage">
        Confirming the funding of your feed will take three (3) separate
        transactions.
      </p>
      <h4 className="VerifyModalSubtitle">Your data feed parameters:</h4>
      <div className="VerifyParametersApprove">
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
        <p className="ApproveMessage">
          <span className="bolded">
            Now approve your autopay contract to use TRB for tipping.
          </span>
        </p>
      </div>
      <Link to="/fundfeed" className="VerifyModalButton">
        approve
      </Link>
    </div>
  )
}

export default ApproveTokenModal
