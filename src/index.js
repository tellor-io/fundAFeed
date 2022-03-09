import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import User from './contexts/User'
import AppData from './contexts/AppData'

ReactDOM.render(
  <User>
    <AppData>
      <App />
    </AppData>
  </User>,
  document.getElementById('root')
)
