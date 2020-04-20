import React from 'react'

import { Image, Temperature } from '../../../common'
import { DayDate } from '../../../common'

export const WeekdayForecast = ({ image, description, date, dayTemp, nightTemp }) => {

    return (
        <>
            <p><DayDate date={date} /></p>
            <Image image={image} description={description} />
            <p>
                {
                    nightTemp && <Temperature temp={nightTemp} className="night-temp" />
                }
                {
                    dayTemp && <Temperature temp={dayTemp} className="day-temp" />
                }
            </p>
        </>
    )

}