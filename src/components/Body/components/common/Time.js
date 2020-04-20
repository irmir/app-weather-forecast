import React from 'react'
import { connect } from 'react-redux'

export const TimeComponent = ({ time, currentTime }) => {

    if (time) {
        return <>{time}</>
    } else {
        return <>{currentTime}</>
    }
}

export const Time = connect(
    (state) => ({
        currentTime: state.body.currentTime,
    })
)(TimeComponent)