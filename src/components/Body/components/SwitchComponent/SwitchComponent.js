import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getNextForecast, getCorrectShift, returnToStart } from './actions'

const Switch = ({ getNext, getShift, getStart, left, width, offset, isEnd }) => {

    const onClick = useCallback((left, width, offset, isEnd) => () => {
        if (isEnd) {
            getStart()
        } else {
            const rest = width - 600 - (offset + 600)
            if (rest >= 0) {
                getNext(left, offset);
            } else {
                getShift(width)
            }
        }
    }, [])

    if (width) {
        return <button onClick={onClick(left, width, offset, isEnd)} disabled={width > 600 ? false: true }>&lang; &emsp; &rang;</button>
    } else return null
}

export const SwitchComponent = connect(
    (state) => ({
        left: state.body.left,
        width: state.body.width,
        offset: state.body.offset,
        isEnd: state.body.isEnd
    }),
    (dispatch) => bindActionCreators({
        getNext: getNextForecast,
        getShift: getCorrectShift,
        getStart: returnToStart
    }, dispatch)
)(Switch)

