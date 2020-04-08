import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { cityReducer } from './components'
import { listWeatherReducer } from './components'

const reducers = combineReducers({
    header: cityReducer,
    body: listWeatherReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))
