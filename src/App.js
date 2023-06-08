import React from 'react'
import { useRoutes } from 'react-router'
import { HashRouter } from 'react-router-dom'
import routes from './router'
const App = () => {
  return (
    <HashRouter>
      {useRoutes(routes)}
    </HashRouter>
  )
}

export default App