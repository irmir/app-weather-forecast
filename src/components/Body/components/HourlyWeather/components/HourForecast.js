import React from 'react'

import { Time } from '../../common'
import { Image } from '../../common'
import { Temperature } from '../../common'
import { connect } from 'react-redux'

const HourForecastComponent = ({ currentTime, image, temp }) => {
    // debugger

    return (
        <>
            <Time time={currentTime} />
            <Image image={image} />
            <p><Temperature temp={temp} /></p>
        </>
    )
}

export const HourForecast = connect(
    (state) => ({
        currentTime: state.currentWeather.currentTime,
    })
)(HourForecastComponent) 