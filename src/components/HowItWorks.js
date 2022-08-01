import React from 'react'
import '../styles/HowItWorks.css'

export default function HowItWorks() {
  return (
    <div className="wrapper">
      <h1 className="title">How It Works</h1>
      <p className='mainText'>
      The Tellor system allows users to request specific pieces of data, and reporters can then submit those values. 
      Every piece of data that is requested, reported, and retrieved within the Tellor system is associated with a Query Type, Query Data, 
      and a specific identifier, known as the Query ID. 
      </p>
    </div>
  )
}
