import React, { useEffect } from 'react'
import { CityInput, ButtonGetWeather, Location } from './components'
import { bindActionCreators } from 'redux'
import { connect} from 'react-redux'

import { sendRequestWeatherByCoordinates } from './actions'

const HeaderComponent = ({getWeather})=>  {

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
        function(position){
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            getWeather(latitude, longitude )
        })
}, [])

    return (
        <div className="header">
            <CityInput />
            <ButtonGetWeather />
            <Location />
        </div>
    )
}

export const Header = connect(
    null,
    (dispatch) => bindActionCreators ({
        getWeather: sendRequestWeatherByCoordinates
    }, dispatch)
)(HeaderComponent)

