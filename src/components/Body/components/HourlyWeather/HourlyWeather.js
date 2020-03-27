import React from 'react'
import { connect } from 'react-redux'

import { HourForecast } from './components'

const HourlyWeatherComponent = ({ listCurrentDate, listCurrentTime, count, left, width }) => {
    debugger
    if (listCurrentDate) {

        return (
            <ul className="hourly-weather"
                style={
                    { left: `${left}px`, width: `${width}` }} >
                {
                    [...Array(count)].map((elem, index) => (
                        <li className="hour" key={index} >
                            <HourForecast image={listCurrentTime.weather[0].icon}
                                temp={Math.round(listCurrentTime.main.temp - 273)} />
                        </li>
                    ))
                } {
                    listCurrentDate.map((item, index) => (
                        [...Array(3)].map(elem => (
                            <li className="hour" key={index} >
                                <HourForecast image={item.weather[0].icon}
                                    temp={Math.round(item.main.temp - 273)} />
                            </li>
                        ))
                    ))
                }
            </ul>
        )
    } else return null
}

export const HourlyWeather = connect(
    (state) => ({
        currentTime: state.currentWeather.currentTime,
        count: state.currentWeather.count,
        listCurrentTime: state.currentWeather.listCurrentTime,
        listCurrentDate: state.currentWeather.listCurrentDate,
        left: state.currentWeather.left,
        width: state.currentWeather.width
    })
)(HourlyWeatherComponent)