const defaultState = {
    inputValue: 'Minsk',
}

export const cityReducer = (state = defaultState, action) => {
    switch(action.type) {

        case 'GET_INPUT_VALUE': {
            
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

