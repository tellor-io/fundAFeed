import React, { useContext } from 'react'
//Router
import { Link } from 'react-router-dom'
//Context
import { GraphContext } from '../../contexts/Graph'

function ApproveTokenModal() {
  //Context
  const data = useContext(GraphContext)
  console.log('Inside ApproveToken', data)

  return (
    <div>
      <h1>ApproveTokenModal</h1>
      <div>
        <Link to="/fundfeed">Fund Feed</Link>
      </div>
    </div>
  )
}

export default ApproveTokenModal
