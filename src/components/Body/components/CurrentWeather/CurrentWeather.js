import React from 'react'
import { connect } from 'react-redux'

import { Image, Temperature, Description, Time, DayDate } from '../common'

const CurrentWeatherСomponent = ({ city, country, image, description, temp }) => {

    if (city) {
        return (
            <div className="current-weather">
                <h2>{`Weather in ${city}, ${country}`}</h2>
                <h3><Image image={image} /> <Temperature temp={temp} /></h3>
                <p><Description description={description} /></p>
                <p><Time />  <DayDate /></p>
            </div>
        )
    } else return null
}

export const CurrentWeather = connect(
    (state) => ({
        city: state.currentWeather.city,
        country: state.currentWeather.country,
        image: state.currentWeather.image,
        temp: state.currentWeather.temperature,
        description: state.currentWeather.description
    })
)(CurrentWeatherСomponent) 