import React, { useCallback } from 'react'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import { sendRequestWeatherAction } from '../../actions'

const ButtonGetWeatherComponent = ({getWeather, city }) => {

    const onClick = useCallback((city) => () => {
        getWeather(city);
    }, [city])

    return <button onClick={onClick(city)} className="search">Search</button>
}

export const ButtonGetWeather = connect(
    (state) => ({
        city: state.header.inputValue
    }),
    (dispatch) => bindActionCreators({
        getWeather: sendRequestWeatherAction
    }, dispatch)
)(ButtonGetWeatherComponent)

