import React, { useContext } from 'react'
import '../styles/InfoBoxConnected.css'
//Contexts
import { UserContext } from '../contexts/User'

function InfoBoxConnected() {
  const user = useContext(UserContext)
  if (user && user.currentUser && user.currentUser.balances && user.currentUser.balances.trb) {
    console.log(user.currentUser.balances.trb)
  }  return (
    <>
      {user && (
        <div className="InfoBoxConnected">
          <p>{user.currentUser.address}</p>
          <p>{`Connected to ${
            user.currentUser.network.charAt(0).toUpperCase() +
            user.currentUser.network.slice(1)
          }`}</p>
          
          <p>
  {user.currentUser.balances && user.currentUser.balances.trb
    ? `Wallet Balance: ${user.currentUser.balances.trb} TRB`
    : `You hold 0 TRB`}
          </p>
          
        </div>
      )}
    </>
  )
}

export default InfoBoxConnected
