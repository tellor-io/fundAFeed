import React, { useContext } from 'react'
//Router
import { useNavigate } from 'react-router-dom'
//Context
import { SpotPriceContext } from '../../contexts/SpotPrice'
import { UserContext } from '../../contexts/User'
import { ErrorContext } from '../../contexts/Error'
//Utils
import autopayABI from '../../utils/autopayABI.json'
import {gas} from '../../utils/estimateGas'
//Components
import Loader from '../Loader'

function OneTimeTipModal({
  parameterForm,
  tellorAddy,
  autopayAddy,
  loading,
  setLoading,
  setOneTimeTipTxnHash,
  setThisFeedId,
  setQueryId
}) {
  //Context
  const user = useContext(UserContext)
  const spotPriceData = useContext(SpotPriceContext)
  const error = useContext(ErrorContext)
  //React-Router-Dom
  const navigate = useNavigate()

  //Handlers
  const handleOneTimeTip = async(parameterForm) => {
    let  autopay, amount

    amount = user.currentUser.web3.utils.toWei(
      `${parameterForm.fundAmount}`
    )

    try {
      autopay = new user.currentUser.web3.eth.Contract(autopayABI, autopayAddy)
      setLoading(true)
      autopay.methods
        .tip(
          spotPriceData.queryId,
          amount,
          spotPriceData.queryData,
        )
        .send({ from: user.currentUser.address, ...(await gas()) })
        .then((res) => {
          setOneTimeTipTxnHash(res.transactionHash)
          setLoading(false)
          navigate('/ConfirmOneTimeTip')
        })
        .catch((err) => {
          error.setError(err.message)
          setLoading(false)
        })
    } catch (err) {
      console.log(err)
      error.setError(err.message)
    }
  }

  return (
    <div className="VerifyModalContainer">
      <h1 className="VerifyModalTitle">Confirmation</h1>
      <p className="VerifyModalMessage">
        Confirming your one time tip.
      </p>
      <h4 className="VerifyModalSubtitle">Verify your parameters:</h4>
      <div className="VerifyParameters">
        <p>
          Tip Amount:{' '}
          <span className="bolded">{`${parameterForm.fundAmount} TRB`}</span>
        </p>
      </div>
      <div
        className="VerifyModalButton"
        onClick={() => handleOneTimeTip(parameterForm)}
      >
        Tip
      </div>
      <Loader loading={loading} />
    </div>
  )
}

export default OneTimeTipModal
