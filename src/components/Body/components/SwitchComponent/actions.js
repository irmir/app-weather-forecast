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