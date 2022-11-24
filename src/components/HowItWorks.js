import React from 'react'
import '../styles/HowItWorks.css'

export default function HowItWorks() {
  return (
    <div className="wrapper">
      <h1 className="subtitle2l"> *Active Networks:<br></br> <span className="subtitle2w">Ethereum Mainnet, Polygon Mainnet, Mumbai Testnet</span></h1>
      <h1 className="title">How It Works</h1>
      <p className='mainText' >
        Tellor's 'Fund-a-Feed' site makes requesting and funding a specific price feed an easy process for its users who have already implemented Tellor into their code using the corresponding{' '}
          <a 
            href="https://querybuilder.tellor.io/spotprice"
            target="_blank"
            rel="noopener noreferrer"
          >
            SpotPrice Query ID
          </a>. 
          <br></br>
          <br></br>
          <div className="subtitle2">Before requesting a feed: </div> 
          Make sure the price you are requesting has already been specified 
          <a
            href="https://github.com/tellor-io/telliot-feeds/tree/main/src/telliot_feeds/feeds"
            target="_blank"
            rel="noopener noreferrer"
            > here
          </a>
          .
           <br></br>(if not, submit a github issue 
          <a 
            href="https://github.com/tellor-io/dataSpecs/issues/24"
            target="_blank"
            rel="noopener noreferrer"
            > using this as an example
          </a>
          .)
          <br></br>

        <p>
          <br></br>
          <div className="subtitle2">To fund your feed:</div> <li>Connect your wallet to Polygon or Mumbai chains</li> 
          <li>Select your SpotPrice asset and currency</li>
          <li>Set your funding parameters</li>
          <li>Verify, Approve, & Fund your feed</li>

          <br></br>
          <p className='mainText' >Still have questions? Join our{' '}
            <a 
              href="https://discord.gg/tellor"
              target="_blank"
              rel="noopener noreferrer"
            >
            Discord!
            </a>
          </p>
        </p>
      </p>
     
        <div className='infoContainer'>
          <a className='infoLink' target="_blank" rel="noreferrer" href="https://tellor.io/docs/">
            <button className='infoButtons'>Docs</button>
          </a>
          <a className='infoLink' target="_blank" rel="noreferrer" href="https://discord.com/invite/kaMenz4ZVw">
            <button className='infoButtons'>Discord</button>
          </a>
        </div>
    </div>
  )
}
