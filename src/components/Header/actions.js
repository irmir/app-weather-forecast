const getListWeatherAction = (list) => ({
    type: 'GET_WEATHER',
    payload: list,
})

const getErrorAction = () => ({
    type: 'GET_ERROR'
})

export const sendRequestWeatherAction = (nameCity) => {
debugger
   
    return async (dispatch) => {
        try {
            debugger
            const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${nameCity}&appid=ef6c7e6116541c9f4f64c39e85be342c`);
            const list = await response.json();

            console.log (list);
    
            dispatch (getListWeatherAction(list))
        } catch (error) {
            dispatch(getErrorAction());
        }
    }
}

export const getInputValue = (event) => ({
    type: 'GET_INPUT_VALUE',
    payload: event.target.value
})

export const getSelectedWeather = (event) => ({
    type: 'GET_SELECTED_WEATHER'
})

export const getAverageMinTemp = (index) => ({
    type: 'GET_AVERAGE_MIN_TEMP',
    payload: index
})

// export const startDecreaseCounter = (time) => ({
//     type: 'DECREASE_COUNTER',
//     payload: time
// })

export const getNextForecast = (left, offset) => ({
    type: 'GET_NEXT_FORECAST',
    payload: {left: left, offset: offset}
})

export const getCorrectShift = (shift) => ({
    type: 'GET_CORRECT_SHIFT',
    payload: shift
})

export const returnToStart = () => ({
    type: 'RETURN_TO_START'
})

export const increaseTimyByHour = (time, increment) => ({
    type: 'INCREASE_TIME_BY_HOUR',
    payload: {time, increment}
})

export const selectDayForForecast = (date, list, id) => ({
    type: 'SELECT_DAY_FOR_FORECAST',
    payload: {date, list, id}
})

export const returnForecastToday = (date, list, id) => ({
    type: 'RETURN_FORECAST_TODAY',
    payload: {date, list, id}
})

