import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { sendRequestWeatherByCoordinates } from '../../actions'

const LocationComponent = ({getWeather}) => {

    const getLocation = useCallback(() => () => {
    
        navigator.geolocation.getCurrentPosition(
        function(position){
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            getWeather(latitude, longitude )
        })
    }, [])

    return (
        <button onClick={getLocation()} className="location">Current location</button>
    )
}

export const Location = connect(
    null,
    (dispatch) => bindActionCreators({
        getWeather: sendRequestWeatherByCoordinates
    }, dispatch)
)(LocationComponent)