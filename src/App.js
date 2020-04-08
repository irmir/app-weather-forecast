import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

import { Header } from './components'
import { Body } from './components'

function App() {
  return (
    <Provider store={store}>
        <Header />
        <Body />
    </Provider>
  )
}

export default App;
