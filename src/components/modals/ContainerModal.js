import React, { useContext, useEffect, useState } from 'react'
import '../../styles/modals/ContainerModal.css'
import { ReactComponent as Close } from '../../assets/close_icon.svg'
//Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//Components
import SetupFeedModal from './SetupFeedModal'
import ApproveTokenModal from './ApproveTokenModal'
import FundFeedModal from './FundFeedModal'
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

function ContainerModal({ modal }) {
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
        <ApolloProvider client={apolloClient}>
          <Graph>
            <Router>
              <Routes>
                <Route exact path="/" element={<SetupFeedModal />} />
                <Route path="/approve" element={<ApproveTokenModal />} />
                <Route path="/fundfeed" element={<FundFeedModal />} />
              </Routes>
            </Router>
          </Graph>
        </ApolloProvider>
      </div>
    </div>
  )
}

export default ContainerModal
