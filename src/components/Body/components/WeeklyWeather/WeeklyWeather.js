import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { WeekdayForecast } from './components/'
import { bindActionCreators } from 'redux'

import { selectDayForForecast, returnForecastToday } from '../../../Header/actions'

const WeeklyWeatherComponent = ({ selectedDay, listSlasedByDay, otherDaysForecast, indexTimeNow, firstDayForecast, nightTemp, dayTemp, selectDay, selectDayToday, backgroundColor }) => {
    debugger

    const onClick = useCallback((date, list, id) => (event) => {
        debugger
        
        selectDay(date, list, id)
    }, [])
    debugger
    const onClickToday = useCallback((date, list, id) => () => {

        debugger
        selectDayToday(date, list, id)
    })
    debugger
    return (
        <ul className="weekly-weather">
            {
                firstDayForecast &&
                <li style={{backgroundColor: selectedDay === firstDayForecast[0].dt ? "#ddd" : "white"  }}
                className="day" onClick={onClickToday(firstDayForecast[0].dt_txt, listSlasedByDay, firstDayForecast[0].dt)} key="0" >
                    <WeekdayForecast
                    dayTemp={Math.round(dayTemp - 273)}
                    nightTemp={Math.round(nightTemp - 273)}
                    image={firstDayForecast[0].weather[0].icon}
                    date={new Date(firstDayForecast[0].dt_txt).toLocaleString('en', {
                        weekday: 'short',
                        day: "numeric",
                        month: 'short',
                    })}
                    description={firstDayForecast[0].weather[0].description} />
                </li>
            }
            {
                otherDaysForecast &&
                otherDaysForecast.map((item, index) => (
                    <li style={{backgroundColor: selectedDay === item[0].dt ? "#ddd" : "white"  }}
                    className="day" onClick={onClick(item[0].dt_txt, listSlasedByDay, item[0].dt)} key={index + 1}>
                        <WeekdayForecast
                        dayTemp={Math.round((item[0].main.temp + item[1].main.temp + item[2].main.temp + item[3].main.temp + item[4].main.temp + item[5].main.temp) / 6 - 273)}
                        nightTemp={Math.round((item[6].main.temp + item[7].main.temp) / 2 - 273)}
                        image={item[indexTimeNow].weather[0].icon}
                        date={new Date(item[indexTimeNow].dt_txt).toLocaleString('en', {
                            weekday: 'short',
                            day: "numeric",
                            month: 'short',
                        })}
                        description={item[indexTimeNow].weather[0].description} />
                    </li>
                ))
            }
        </ul>
    )
}

export const WeeklyWeather = connect(
    (state) => ({
        weekdays: state.currentWeather.weekdays,
        listSlasedByDay: state.currentWeather.listSlasedByDay,
        listSlasedByDayStartMorning: state.currentWeather.listSlasedByDayStartMorning,
        indexTimeNow: state.currentWeather.indexTimeNow,
        firstDayForecast: state.currentWeather.firstDayForecast,
        otherDaysForecast: state.currentWeather.otherDaysForecast,
        nightTemp: state.currentWeather.nightTemp,
        dayTemp: state.currentWeather.dayTemp,
        backgroundColor: state.currentWeather.backgroundColor,
        selectedDay: state.currentWeather.selectedDay
    }),
    (dispatch) => bindActionCreators({
        selectDay: selectDayForForecast,
        selectDayToday: returnForecastToday
    }, dispatch)
)(WeeklyWeatherComponent)