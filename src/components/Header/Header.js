import React, { useEffect } from 'react'
import { CityInput, ButtonGetWeather } from './components'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'

import { sendRequestWeatherAction } from './actions'

const HeaderComponent = ({getWeather, inputValue})=>  {

    useEffect(() => {
        getWeather(inputValue)        
}, [])

    return(
        <div className="header">
            <CityInput />
            <ButtonGetWeather />
        </div>
    )
}

export const Header = connect(
    (state) => ({
        inputValue:state.header.inputValue
    }),
    (dispatch) => bindActionCreators ({
        getWeather: sendRequestWeatherAction
    }, dispatch)
)(HeaderComponent)

