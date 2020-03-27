import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { listCityReducer } from './components'
import { listWeatherReducer } from './components'
// import { currentDate } from './components/Header/components/Date/reducers'


const reducers = combineReducers({
    header: listCityReducer,
    currentWeather: listWeatherReducer,
    // currDate: currentDate,
})

export const store = createStore(reducers, applyMiddleware(thunk))
