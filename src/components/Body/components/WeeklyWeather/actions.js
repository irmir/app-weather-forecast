export const selectDayForForecast = (date, id) => ({
    type: 'SELECT_DAY_FOR_FORECAST',
    payload: {date, id}
})

export const returnForecastToday = (id) => ({
    type: 'RETURN_FORECAST_TODAY',
    payload: id
})