import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { WeekdayForecast } from './components/'
import { selectDayForForecast, returnForecastToday } from './actions'

const WeeklyWeatherComponent = ({ weeklyForecast, selectedDay, selectDay, selectDayToday }) => {
    debugger

    const onClick = useCallback((date, id, index) => () => {
        debugger
        if (index === 0) {
            selectDayToday(id)
        } else {
            selectDay(date, id)
        }
    }, [])
    debugger
    return (
        <ul className="weekly-weather">
            {
                weeklyForecast &&
                weeklyForecast.map((item, index) => (
                    <li style={{ backgroundColor: selectedDay === item.dt ? "#ddd" : "white" }}
                        className="day" onClick={onClick(item.dt_txt, item.dt, index)} key={index} >
                        <WeekdayForecast
                            dayTemp={item.dayTemp}
                            nightTemp={item.nightTemp }
                            image={item.weather[0].icon}
                            date={item.date}
                            description={item.weather[0].description} />
                    </li>
                ))
            }
        </ul>
    )
}

export const WeeklyWeather = connect(
    (state) => ({
        selectedDay: state.body.selectedDay,
        weeklyForecast: state.body.weeklyForecast
    }),
    (dispatch) => bindActionCreators({
        selectDay: selectDayForForecast,
        selectDayToday: returnForecastToday
    }, dispatch)
)(WeeklyWeatherComponent)