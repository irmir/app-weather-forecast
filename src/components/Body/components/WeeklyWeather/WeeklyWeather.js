import React from 'react'
import { connect } from 'react-redux'
import { WeekdayForecast } from './components/'
import { bindActionCreators } from 'redux'

import { getAverageMinTemp } from '../../../Header/actions'

const WeeklyWeatherComponent = ({ listSlasedByDayStartMorning, indexTimeNow, firstDay, nightTemp, dayTemp }) => {
debugger
    if (listSlasedByDayStartMorning) {
        listSlasedByDayStartMorning.splice(0, 1)
    }
    return (
        <ul className="weekly-weather">
            {
                firstDay &&
                <li><WeekdayForecast
                    dayTemp={Math.round(dayTemp - 273)}
                    nightTemp={Math.round(nightTemp - 273)}
                    image={firstDay[0].weather[0].icon}
                    date={new Date(firstDay[0].dt_txt).toLocaleString('en', {
                        weekday: 'short',
                        day: "numeric",
                        month: 'short',
                    })}
                    description={firstDay[0].weather[0].description} />
                </li>
            }
            {
                listSlasedByDayStartMorning.map((item, index) => (
                    <li key={index} ><WeekdayForecast
                        dayTemp={Math.round((item[0].main.temp + item[1].main.temp + item[2].main.temp + item[3].main.temp + item[4].main.temp + item[5].main.temp) / 6 - 273)}
                        nightTemp={Math.round((item[6].main.temp + item[7].main.temp) / 2 - 273)}
                        image={item[indexTimeNow].weather[0].icon}
                        date={new Date(item[indexTimeNow].dt_txt).toLocaleString('en', {
                            weekday: 'short',
                            day: "numeric",
                            month: 'short',
                        })}
                        description={item[indexTimeNow].weather[0].description}/>
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
        firstDay: state.currentWeather.firstDay,
        nightTemp: state.currentWeather.nightTemp,
        dayTemp: state.currentWeather.dayTemp,  
    }),
    (dispatch) => bindActionCreators({
        getMinTemp: getAverageMinTemp,
    }, dispatch)
)(WeeklyWeatherComponent)