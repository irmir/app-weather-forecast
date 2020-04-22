export const sendRequestWeatherAction = (nameCity) => {
   
    return async (dispatch) => {
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${nameCity}&appid=ef6c7e6116541c9f4f64c39e85be342c`);
            console.log (response)
            const list = await response.json();
    
            dispatch (getListWeatherAction(list))
        } catch (error) {
            dispatch(getErrorAction());
        }
    }
}

const getListWeatherAction = (list) => ({
    type: 'GET_WEATHER',
    payload: list,
})

const getErrorAction = () => ({
    type: 'GET_ERROR'
})
   
export const sendRequestWeatherByCoordinates = (lat, lon) => {
    
            return async(dispatch) => {
                try {
                    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ef6c7e6116541c9f4f64c39e85be342c`)
                    const date = await response.json();

                    dispatch(getListWeatherAction(date))
                } catch {
                    dispatch(getErrorAction())
                }
            }   
}

export const getInputValue = (event) => ({
    type: 'GET_INPUT_VALUE',
    payload: event.target.value
})




