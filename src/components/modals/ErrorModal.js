import React, { useContext } from 'react'
import { ErrorContext } from '../../contexts/Error'

function ErrorModal() {
  //Contexts
  const errorObj = useContext(ErrorContext)

  return (
    <div className="VerifyModalContainer">
      <h1 className="VerifyModalTitle">Error</h1>
      <p className="VerifyModalMessage">
        {errorObj.error ? errorObj.error : null}
      </p>
    </div>
  )
}

export default ErrorModal
