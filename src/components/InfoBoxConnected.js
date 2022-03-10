import React, { useContext } from 'react'
import '../styles/InfoBoxConnected.css'
//Contexts
import { UserContext } from '../contexts/User'

function InfoBoxConnected() {
  const user = useContext(UserContext)

  return (
    <>
      {user && (
        <div className="InfoBoxConnected">
          <p>{user.currentUser.address}</p>
          <p>{`Connected to ${
            user.currentUser.network.charAt(0).toUpperCase() +
            user.currentUser.network.slice(1)
          }`}</p>
          <p>{`Wallet Balance: ${user.currentUser.balances.trb} TRB`}</p>
        </div>
      )}
    </>
  )
}

export default InfoBoxConnected
