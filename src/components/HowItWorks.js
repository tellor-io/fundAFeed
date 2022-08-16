import React from 'react'
import '../styles/HowItWorks.css'

export default function HowItWorks() {
  return (
    <div className="wrapper">
      <h1 className="title">How It Works</h1>
      <p className='mainText' >
      The Tellor system allows users to request specific pieces of data, and reporters can then submit those values. 
      Every piece of data that is requested, reported, and retrieved within the Tellor system is associated with a Query Type, Query Data, 
      and a specific identifier, known as the Query ID. 
      </p>
      <p className="HeroMainText">
          Already have your{' '}
          <a
            href="https://querybuilder.tellor.io/spotprice"
            target="_blank"
            rel="noopener noreferrer"
          >
            SpotPrice Query ID
          </a>
          ? To fund your feed, select your SpotPrice asset and currency, connect
          your wallet to Polygon or Mumbai chains, and then set your funding
          parameters.
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
