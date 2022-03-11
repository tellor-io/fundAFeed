import React, { useContext } from 'react'
//Router
// import { Link } from 'react-router-dom'
//Context
import { GraphContext } from '../../contexts/Graph'

function FundFeedModal() {
  //Context
  const data = useContext(GraphContext)
  console.log('Inside ApproveToken', data)

  return (
    <div>
      <h1>FundFeedModal</h1>
      <div>
        <h2>END OF FLOW SO FAR.</h2>
        <p>This is where you'd actually make a contract call</p>
      </div>
    </div>
  )
}

export default FundFeedModal
