import React, { createContext, useState } from 'react'

export const ErrorContext = createContext()

function Error({ children }) {
  //Component State
  const [error, setError] = useState(null)

  const ErrorObj = {
    error: error,
    setError: setError,
  }

  return (
    <ErrorContext.Provider value={ErrorObj}>{children}</ErrorContext.Provider>
  )
}

export default Error
