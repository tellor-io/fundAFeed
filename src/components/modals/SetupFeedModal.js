import React, { useContext } from 'react'
//Router
import { useNavigate } from 'react-router-dom'
//Context
import { SpotPriceContext, abiCoder } from '../../contexts/SpotPrice'
import { UserContext } from '../../contexts/User'
import { ErrorContext } from '../../contexts/Error'
//Utils
import { dateManipulator, convertToSeconds } from '../../utils/helpers'
import { dateHelper } from '../../utils/time'
import autopayABI from '../../utils/autopayABI.json'
//Components
import Loader from '../Loader'

function SetupFeedModal({
  parameterForm,
  tellorAddy,
  autopayAddy,
  loading,
  setLoading,
  setSetupFeedTxnHash,
  setThisFeedId,
}) {
  //Context
  const user = useContext(UserContext)
  const spotPriceData = useContext(SpotPriceContext)
  const error = useContext(ErrorContext)
  //React-Router-Dom
  const navigate = useNavigate()

  //Handlers
  const handleSetupFeed = (parameterForm) => {
    let reward, startTime, interval, window, autopay, encodedFeed, feedId

    startTime = dateManipulator(parameterForm)
    reward = user.currentUser.web3.utils.toWei(
      `${parameterForm.tipAmountNumber}.${parameterForm.tipAmountDecimal}`
    )
    interval = convertToSeconds(
      parameterForm.durationAmount,
      parameterForm.durationType
    )
    window = convertToSeconds(
      parameterForm.windowAmount,
      parameterForm.windowType
    )
    encodedFeed = abiCoder.encode(
      ['bytes32', 'address', 'uint256', 'uint256', 'uint256', 'uint256','uint256'],
      [
        spotPriceData.queryId.toString(),
        tellorAddy.toString(),
        reward,
        startTime,
        interval,
        window,
        0
      ]
    )
    try {
      autopay = new user.currentUser.web3.eth.Contract(autopayABI, autopayAddy)
      setLoading(true)
      autopay.methods
        .setupDataFeed(
          spotPriceData.queryId,
          reward,
          startTime,
          interval,
          window,
          0,
          spotPriceData.queryData
        )
        .send({ from: user.currentUser.address })
        .then((res) => {
          setSetupFeedTxnHash(res.transactionHash)
          setThisFeedId(res.events.NewDataFeed.returnValues._feedId)
          setLoading(false)
          navigate('/approve')
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
        Confirming the funding of your feed will take three (3) separate
        transactions.
      </p>
      <h4 className="VerifyModalSubtitle">Verify your parameters:</h4>
      <div className="VerifyParameters">
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
      </div>
      <div
        className="VerifyModalButton"
        onClick={() => handleSetupFeed(parameterForm)}
      >
        setup feed
      </div>
      <Loader loading={loading} />
    </div>
  )
}

export default SetupFeedModal
