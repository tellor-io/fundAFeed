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
//Contexts
import { UserContext } from '../../contexts/User'
import Graph from '../../contexts/Graph'
//The Graph
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

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
  console.log(parameterForm)
  //Component State
  const [apolloClient, setApolloClient] = useState(clientMumbai)
  //Contexts
  const user = useContext(UserContext)

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

  return (
    <div className="ContainerModal">
      <div className="ContainerModalContent">
        <div className="ContainerModalCloseContainer">
          <Close onClick={closeModal} className="close" />
        </div>
        <div className="ContainerModalContentContainer">
          <ApolloProvider client={apolloClient}>
            <Graph>
              <Router>
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<SetupFeedModal parameterForm={parameterForm} />}
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
        </div>
      </div>
    </div>
  )
}

export default ContainerModal
