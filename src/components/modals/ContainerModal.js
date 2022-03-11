import React, { useContext } from 'react'
import '../../styles/modals/ContainerModal.css'
import { ReactComponent as Close } from '../../assets/close_icon.svg'
//Router
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
//Utils
import { appQuery } from '../../utils/queries'
//The Graph
import { useQuery } from '@apollo/client'
//Context
import { UserContext } from '../../contexts/User'
//Components
import SetupFeedModal from './SetupFeedModal'
import ApproveTokenModal from './ApproveTokenModal'
import FundFeedModal from './FundFeedModal'

function ContainerModal({ modal }) {
  const closeModal = () => {
    modal.style.display = 'none'
  }
  // const user = useContext(UserContext)
  // console.log(user.currentUser && user.currentUser.network)

  // const { loading, error, data } = useQuery(appQuery, {
  //   fetchPolicy: 'network-only',
  //   pollInterval: 5000,
  // })

  // console.log('GRAPH DATA', data)
  // console.log('GRAPH Error', error)
  // console.log('GRAPH Loading', loading)
  return (
    <div className="ContainerModal">
      <div className="ContainerModalContent">
        <div className="ContainerModalCloseContainer">
          <Close onClick={closeModal} className="close" />
        </div>
        <Router>
          <Routes>
            <Route exact path="/" element={<SetupFeedModal />} />
            <Route path="/approve" element={<ApproveTokenModal />} />
            <Route path="/fundfeed" element={<FundFeedModal />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default ContainerModal
