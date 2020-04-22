const defaultState = {
    inputValue: '',
}

export const cityReducer = (state = defaultState, action) => {
    switch(action.type) {

        case 'GET_INPUT_VALUE': {
            
            return {
                inputValue: action.payload
            }
        }

        case 'GET_WEATHER': {
            return {
                inputValue: ''

            }
        }

        default: {
            return state
        }
    }
}

