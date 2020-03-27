const defaultState = {
    inputValue: 'Minsk',
}

export const listCityReducer = (state = defaultState, action) => {
    switch(action.type) {

        case 'GET_INPUT_VALUE': {
debugger
            return {
                ...state,
                inputValue: action.payload
            }
        }

        default: {
            return state
        }


    }
}

