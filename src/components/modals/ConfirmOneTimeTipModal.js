import React, { useContext, useEffect, useState } from 'react'
//Router
import { useLocation } from 'react-router-dom'
//Context
import { UserContext } from '../../contexts/User'
//Utils

function ConfirmOneTimeTipModal({ parameterForm, closeModal, txnHash }) {
  //Component
  const [oneTimeTipTxnURL, setOneTimeTipTxnURL] = useState(null)
  //Context
  const user = useContext(UserContext)
  //Router
 
  useEffect(() => {
    if (!user || !user.currentUser) return
    if (user.currentUser.network === 'matic') {
      setOneTimeTipTxnURL(`https://polygonscan.com/tx/${txnHash}`)
    } else if (user.currentUser.network === 'mumbai') {
      setOneTimeTipTxnURL(
        `https://mumbai.polygonscan.com/tx/${txnHash}`
      )
    }
  }, [user])

  return (
    <div className="VerifyModalContainer">
      <h1 className="VerifyModalTitle">Confirmed!</h1>
      <p className="VerifyModalMessage">
        Your tip has been sent.
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
      <h4 className="VerifyModalSubtitle">Your funding amount:</h4>
      <div className="VerifyFundParameter">
        <p>{`${parameterForm.fundAmount} TRB`}</p>
      </div>
      <a
        className="VerifiedButton"
        href={oneTimeTipTxnURL && oneTimeTipTxnURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Verified: View on Scan Explorer
      </a>
    </div>
  )
}

export default ConfirmOneTimeTipModal
