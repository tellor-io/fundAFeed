import React, { useContext, useEffect, useState } from 'react'
import '../../styles/modals/ContainerModal.css'
//Router
import { useNavigate } from 'react-router-dom'
//Context
import { UserContext } from '../../contexts/User'
import { ErrorContext } from '../../contexts/Error'
import { GraphContext } from '../../contexts/Graph'
//Utils
import tellorTokenPolygonABI from '../../utils/tellorTokenPolygonABI.json'
import {gas} from '../../utils/estimateGas'
//Components
import Loader from '../Loader'

function ApproveOneTimeTipTokenModal({
  parameterForm,
  tellorAddy,
  autopayAddy,
  setupFeedTxnHash,
  thisFeedId,
  pair
}) {
  //Component State
  const [feedIds, setFeedIds] = useState(null)
  const [officialDataFeed, setOfficialDataFeed] = useState(false)
  //Context
  const user = useContext(UserContext)
  const error = useContext(ErrorContext)
  const graphData = useContext(GraphContext)
  //Component State
  const [txnURL, setTxnURL] = useState(null)
  //React-Router-Dom
  const navigate = useNavigate()
  // const { state } = useLocation()
  // console.log('State from useLocation', state)

  //useEffect for extracting available
  //feedIds from the graph
  useEffect(() => {
    if (!graphData || !graphData.graphData || !graphData.graphData.data) return
    let feedIdArray = []
    if (graphData.graphData.data.newDataFeedEntities) {
      graphData.graphData.data.newDataFeedEntities.forEach((entity) => {
        feedIdArray.push(entity._feedId)
      })
      setFeedIds(feedIdArray)
    }

    return () => {
      setFeedIds(null)
    }
    //eslint-disable-next-line
  }, [
    //eslint-disable-next-line
    graphData && graphData.graphData && graphData.graphData.data
      ? graphData.graphData.data.newDataFeedEntities
      : graphData,
  ])

  //Comment out for production
  useEffect(() => {
    if (!feedIds) return
    console.log('feedIds', feedIds)
    console.log('thisFeedId', thisFeedId)
    console.log('officialDataFeed', officialDataFeed)
  }, [feedIds, thisFeedId, officialDataFeed])

  useEffect(() => {
    if (!user || !user.currentUser) return
    if (user.currentUser.network === 'matic') {
      setTxnURL(`https://polygonscan.com/tx/${setupFeedTxnHash}`)
    } else if (user.currentUser.network === 'mumbai') {
      setTxnURL(`https://mumbai.polygonscan.com/tx/${setupFeedTxnHash}`)
    }
  }, [user, setupFeedTxnHash])

  //Helpers
  const handleApprove = async() => {
    //let tellorProxyAddy = '0x45cAF1aae42BA5565EC92362896cc8e0d55a2126'
    setOfficialDataFeed(true)
    try {
      const trbToken = new user.currentUser.web3.eth.Contract(
        tellorTokenPolygonABI,
        tellorAddy
      )

      trbToken.methods
        .approve(
          autopayAddy,
          user.currentUser.web3.utils.toWei(parameterForm.fundAmount.toString())
        )
        .send({ from: user.currentUser.address,  ...(await gas()) })
        .then((res) => {
          setOfficialDataFeed(false)
          navigate('/OneTimeTip', {
            state: {
              txnURL: txnURL,
            },
          })
          setOfficialDataFeed(false)
        })
        .catch((err) => {
          setOfficialDataFeed(false)
          console.log(err)
          error.setError(err.message)
          setOfficialDataFeed(false)
        })
    } catch (err) {
      console.log('CATCH ERR::: ', err)
      error.setError(err.message)
    }
  }

  return (
    <div className="VerifyModalContainer">
      <h1 className="VerifyModalTitle">Confirmation</h1>
      <p className="VerifyModalMessage">
        Confirm your Tip:
      </p>
      <h4 className="VerifyModalSubtitle">Your data feed parameters:</h4>
      <div className="VerifyParametersApprove">
        <p>
          Tip Amount:{' '}
          <span className="bolded">{`${parameterForm.fundAmount}`}</span>
          <br style={{marginTop: '1em'}} />
          Pair:{' '}
          <span className="bolded">{pair}</span>
        </p>
        <p className="ApproveMessage">
          <span className="bolded">
            Now approve your autopay data feed to use TRB for tipping.
          </span>
        </p>
      </div>
      <div className="VerifyModalButton" onClick={() => handleApprove()}>
        approve
      </div>
      <Loader loading={officialDataFeed} />
    </div>
  )
}

export default ApproveOneTimeTipTokenModal
