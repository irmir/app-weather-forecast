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


