import React from 'react'
import { Image, Temperature } from '../../../common'
import { DayDate } from '../../../common'

export const WeekdayForecast = ({image, description, date, dayTemp, nightTemp}) => {

    debugger
    return (
        <>
           <p><DayDate date={date} /></p>
            <Image image={image} description={description} />
            <p><Temperature temp={dayTemp} className="day-temp"/><Temperature temp={nightTemp} className="night-temp"/></p>
        </>
    )
    
}