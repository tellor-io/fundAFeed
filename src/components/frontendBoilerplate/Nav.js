import React, { useContext } from 'react'
//Assets
import { ReactComponent as Tellor } from '../../assets/tellor_white.svg'
//Components
import WalletConnect from './WalletConnect'
//Styles
import '../../styles/frontendBoilerplate/Nav.css'
//Contexts
import { UserContext } from '../../contexts/User'

function Nav() {
  const user = useContext(UserContext)
  return (
    <div className="Nav">
      <a
        href="https://tellor.io/"
        alt="https://tellor.io/"
        rel="noopener noreferrer"
      >
        <Tellor className="TellorLogo" />
      </a>
      {user && user.currentUser ? <WalletConnect nav={true} /> : null}
    </div>
  )
}

export default Nav
