import React, { useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getInputValue } from '../../actions'
import { sendRequestWeatherAction } from '../../actions'

const CityInputComponent = ({ onChange, inputValue, onKey }) => {

    const onKeyDown = useCallback((inputValue) => (event) => {

        if (event.keyCode === 13) {
            return onKey(inputValue);
        }
    },[inputValue])

    return (
        <input onChange={onChange} onKeyDown={onKeyDown(inputValue)} value={inputValue} type="text" autoComplete="on" placeholder="City name" />
    )
}

export const CityInput = connect(
    (state) => ({
        inputValue: state.header.inputValue
    }),
    (dispatch) => bindActionCreators({
        onChange: getInputValue,
        onKey: sendRequestWeatherAction
    }, dispatch)
)(CityInputComponent)

