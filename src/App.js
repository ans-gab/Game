import React from 'react'
import { useRoutes } from 'react-router'
import routes from './router'
const App = () => {
  return (
    <div>
      {useRoutes(routes)}
    </div>
  )
}

export default App