import React from 'react'
import { connect } from 'react-redux'

import { HourForecast } from './components'

const HourlyWeatherComponent = ({ fullSelectedDay, hourlyForecast, left, width }) => {
    debugger

    if (fullSelectedDay) {
        return (
            <ul className="hourly-weather"
                style={
                    { left: `${left}px`, width: `${width}` }} >
                {
                    fullSelectedDay.map((item, index) => (
                        <li className="hour" key={index} >
                            <HourForecast image={item.weather[0].icon}
                                temp={Math.round(item.main.temp - 273)}
                                time={item.time24}
                            />
                        </li>
                    ))
                }
            </ul>
        )
    }

    if (hourlyForecast) {
        return (
            <ul className="hourly-weather"
                style={
                    { left: `${left}px`, width: `${width}` }} >
                {
                    hourlyForecast.map((item, index) => (
                        <li className="hour" key={index} >
                            <HourForecast image={item.weather[0].icon}
                                temp={Math.round(item.main.temp - 273)}
                                time={item.time24}
                            />
                        </li>
                    ))
                }
            </ul>
        )
    } else return null
}

export const HourlyWeather = connect(
    (state) => ({
        left: state.body.left,
        width: state.body.width,
        fullSelectedDay: state.body.fullSelectedDay,
        hourlyForecast: state.body.hourlyForecast
    })
)(HourlyWeatherComponent)