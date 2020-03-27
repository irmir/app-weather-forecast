import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getNextForecast, getCorrectShift, returnToStart } from '../../../Header/actions'

const Switch = ({ getNext, getShift, getStart, left, width, offset, isEnd }) => {
    debugger

    const onClick = useCallback((left, width, offset, isEnd) => () => {
        if (isEnd) {
            getStart()
        } else {
            const rest = width - 600 - (offset + 600)
            debugger
            if (rest >= 0) {
                getNext(left, offset);
            } else {
                getShift(width)
            }
        }
    }, [])

    if (width) {
        return <button onClick={onClick(left, width, offset, isEnd)}>&lang; &emsp; &rang;</button>
    } else return null
}

export const SwitchComponent = connect(
    (state) => ({
        left: state.currentWeather.left,
        width: state.currentWeather.width,
        offset: state.currentWeather.offset,
        isEnd: state.currentWeather.isEnd
    }),
    (dispatch) => bindActionCreators({
        getNext: getNextForecast,
        getShift: getCorrectShift,
        getStart: returnToStart
    }, dispatch)
)(Switch)

