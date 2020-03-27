import React, { useCallback } from 'react'
import { connect } from 'react-redux'

export const TimeComponent = ({ time, currentTime, increaseTime, increment }) => {
    debugger

    const increase = useCallback((time) => {
        debugger
        time.setHours(time.getHours() + 1)

        return `${time.toLocaleTimeString([], {
            hour: '2-digit',
        })}:00`
    },[]) 

    if (time) {
        return <>{increase(time)}</>
    } else {
        return <>{currentTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })}</>
    }
}

export const Time = connect(
    (state) => ({
        currentTime: state.currentWeather.currentTime,
    })
)(TimeComponent)