import React, { useContext } from 'react'
//Router
import { Link } from 'react-router-dom'
//Context
import { GraphContext } from '../../contexts/Graph'

function SetupFeedModal() {
  //Context
  const data = useContext(GraphContext)
  console.log('Inside SetupFeed', data)

  return (
    <div>
      <h1>SetupFeedModal</h1>
      <div>
        <Link to="/approve">Approve Token</Link>
      </div>
    </div>
  )
}

export default SetupFeedModal
