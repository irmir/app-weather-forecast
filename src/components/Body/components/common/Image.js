import React from 'react'

export const Image = ({image, description}) => {

    if (image) {
        return <img src={`https://openweathermap.org/img/wn/${image}@2x.png`} alt={description}/>
        
    } else return null
}
