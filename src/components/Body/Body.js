import React from 'react'

import { CurrentWeather } from './components'
import { HourlyWeather } from './components'
import { WeeklyWeather } from './components'
import { SwitchComponent } from './components'
 
export const Body = () => {
    debugger
    
    return (
        <div className="body">
            <CurrentWeather/>
            <HourlyWeather />
            <div className="switch"><SwitchComponent /></div>
            <WeeklyWeather />
        </div>
    )
}