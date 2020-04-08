import React from 'react'

import { Time } from '../../common'
import { Image } from '../../common'
import { Temperature } from '../../common'

export const HourForecast = ({ image, temp, time }) => {
    debugger
  
    return (
        <>
            <Time  time={time} />
            <Image image={image} />
            <p><Temperature temp={temp} /></p>
        </>
    )
}