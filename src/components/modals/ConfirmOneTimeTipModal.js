import React, { useContext, useEffect, useState } from 'react'
//Context
import { UserContext } from '../../contexts/User'
//Utils

function ConfirmOneTimeTipModal({ parameterForm, closeModal, txnHash, pair }) {
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
    } else if (user.currentUser.network === 'filecoin mainnet') {
        setOneTimeTipTxnURL(
          `https://filfox.info/en/address/${txnHash}`
        )
      } else if (user.currentUser.network === 'calibration') {
        setOneTimeTipTxnURL(
          `https://calibration.filfox.info/en/address/${txnHash}`
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
      <h4 className="VerifyModalSubtitle">Your funding amount:</h4>
      <div className="VerifyFundParameter">
        <p>{`${parameterForm.fundAmount} TRB`}</p>
      </div>
      <h4 className="VerifyModalSubtitle">Pair funded:</h4>
      <div className="VerifyFundParameter">
        <p>{pair}</p>
      </div>
    </div>
  )
}

export default ConfirmOneTimeTipModal
