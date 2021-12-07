import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import logo from './logo.png'

import Launches from './components/Launches'
import Launch from './components/Launch'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='container'>
          <img
            src={logo}
            alt='SpaceX'
            style={{ width: 300, display: 'block', margin: 'auto' }}
          />
          <Routes>
            <Route path='/' element={<Launches />} />
            <Route path='/launch/:flight_number' element={<Launch />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
