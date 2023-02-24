import React from 'react'
import '../styles/HowItWorks.css'

export default function HowItWorks() {
  return (
    <div className="wrapper">
      <h1 className="subtitle2l"> *Active Networks:<br></br> <span className="subtitle2w">Ethereum Main/Goerli, Polygon Main/Mumbai, Gnosis Main/Chiado, Optimisim Main/Goerli, Arbitrum One/Goerli </span></h1>
      <h1 className="title">How It Works</h1>
      <p className='mainText' >
       Fund any price-feed to get reported to the Tellor oracle by filling out the fields on the right-hand side of the page. Once completed, reporters will race to pick up the rewards and report the price data as specified.
          <br></br>
          <br></br>
          <div className="subtitle2">Before requesting a feed: </div> 
          -Confirm the price you are requesting is currently supported 
          <a
            href="https://github.com/tellor-io/telliot-feeds/tree/main/src/telliot_feeds/feeds"
            target="_blank"
            rel="noopener noreferrer"
            > here
          </a>
          .
           <br></br>(if not, please 
          <a 
            href="https://github.com/tellor-io/dataSpecs/issues/new?assignees=&labels=&template=new_query_type.yaml&title=%5BNew+Data+Request+Form%5D%3A+"
            target="_blank"
            rel="noopener noreferrer"
            > fill this out
          </a>
          .)
          <br></br>
          -Users of the requested data will want to integrate Tellor into their code using the corresponding{' '}
          <a 
            href="https://docs.tellor.io/tellor/getting-data/creating-a-query"
            target="_blank"
            rel="noopener noreferrer"
          >
            SpotPrice Query ID
          </a>. 
        <p>
          <br></br>
          <div className="subtitle2">To fund your price-feed:</div> <li>Connect wallet to the appropriate network</li> 
          <li>Input desired asset & currency</li>
          <li>Set funding parameters</li>
          <li>Confirm -> Approve -> Fund your feed</li>

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
