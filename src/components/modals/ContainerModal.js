import React, { useContext, useEffect, useState } from 'react'
import '../../styles/modals/ContainerModal.css'
import { ReactComponent as Close } from '../../assets/close_icon.svg'
//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//Components
import SetupFeedModal from './SetupFeedModal'
import ApproveTokenModal from './ApproveTokenModal'
import FundFeedModal from './FundFeedModal'
import ConfirmedModal from './ConfirmedModal'
import ErrorModal from './ErrorModal'
//Contexts
import { UserContext } from '../../contexts/User'
import Graph from '../../contexts/Graph'
import { ErrorContext } from '../../contexts/Error'
//The Graph
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
//Utils
import {
  tellorAddressPolygon,
  tellorAddressMumbai,
  autopayAddressPolygon,
  autopayAddressMumbai,
} from '../../utils/helpers'
import Loader from '../Loader'

//The Graph
const clientPolygon = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/joshuasamaniego/autopay-matic',
  cache: new InMemoryCache(),
})
const clientMumbai = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/joshuasamaniego/autopay-mumbai',
  cache: new InMemoryCache(),
})

function ContainerModal({ modal, parameterForm }) {
  //Component State
  const [apolloClient, setApolloClient] = useState(clientMumbai)
  const [tellorAddress, setTellorAddress] = useState(null)
  const [autopayAddress, setAutopayAddress] = useState(null)
  const [loading, setLoading] = useState(false)
  //Contexts
  const user = useContext(UserContext)
  const error = useContext(ErrorContext)

  //Helpers
  const closeModal = () => {
    modal.style.display = 'none'
  }

  //useEffect to set ApolloClient
  useEffect(() => {
    if (!user || !user.currentUser) return
    switch (user.currentUser.network) {
      case 'matic':
        setApolloClient(clientPolygon)
        return
      case 'mumbai':
        setApolloClient(clientMumbai)
        return
      default:
        setApolloClient(clientMumbai)
        return
    }
  }, [user])

  //useEffect for setting tellorAddress
  useEffect(() => {
    if (!user || !user.currentUser) return
    if (user.currentUser.chainId === 80001) {
      setTellorAddress(tellorAddressMumbai)
      setAutopayAddress(autopayAddressMumbai)
    } else if (user.currentUser.chainId === 137) {
      setTellorAddress(tellorAddressPolygon)
      setAutopayAddress(autopayAddressPolygon)
    } else {
      setTellorAddress(null)
      setAutopayAddress(null)
    }

    return () => {
      setTellorAddress(null)
      setAutopayAddress(null)
    }
  }, [user])
  //useEffect for setting error message
  //for wrong network
  useEffect(() => {
    if (!tellorAddress) {
      error.setError(
        'Please switch your network to Polygon Matic Mainnet or Polygon Mumbai Testnet to set up a data feed. Thank you!'
      )
    } else if (tellorAddress) {
      error.setError(null)
    }

    return () => {
      error.setError(null)
    }
  }, [tellorAddress]) //eslint-disable-line

  return (
    <div className="ContainerModal">
      <div className="ContainerModalContent">
        <div className="ContainerModalCloseContainer">
          <Close onClick={closeModal} className="close" />
        </div>
        <div className="ContainerModalContentContainer">
          {error.error ? (
            <ErrorModal />
          ) : (
            <ApolloProvider client={apolloClient}>
              <Graph>
                <Router>
                  <Routes>
                    <Route
                      exact
                      path="/"
                      element={
                        <SetupFeedModal
                          parameterForm={parameterForm}
                          tellorAddress={tellorAddress}
                          autopayAddress={autopayAddress}
                          loading={loading}
                          setLoading={setLoading}
                        />
                      }
                    />
                    <Route
                      path="/approve"
                      element={
                        <ApproveTokenModal parameterForm={parameterForm} />
                      }
                    />
                    <Route
                      path="/fundfeed"
                      element={<FundFeedModal parameterForm={parameterForm} />}
                    />
                    <Route
                      path="/confirmed"
                      element={<ConfirmedModal parameterForm={parameterForm} />}
                    />
                  </Routes>
                </Router>
              </Graph>
            </ApolloProvider>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContainerModal
