import React from 'react'
import { connect } from 'react-redux'

import { Image, Temperature, Description, Time, DayDate } from '../common'

const CurrentWeatherСomponent = ({ city, country, image, description, temp, isLoading }) => {
debugger
   
        return (
            isLoading ? 
            <div class='sk-circle-bounce'>
    <div class='sk-child sk-circle-1'></div>
    <div class='sk-child sk-circle-2'></div>
    <div class='sk-child sk-circle-3'></div>
    <div class='sk-child sk-circle-4'></div>
    <div class='sk-child sk-circle-5'></div>
    <div class='sk-child sk-circle-6'></div>
    <div class='sk-child sk-circle-7'></div>
    <div class='sk-child sk-circle-8'></div>
    <div class='sk-child sk-circle-9'></div>
    <div class='sk-child sk-circle-10'></div>
    <div class='sk-child sk-circle-11'></div>
    <div class='sk-child sk-circle-12'></div>
  </div> : 
            <div className="current-weather">
                <h2>{`Weather in ${city}, ${country}`}</h2>
                <h3><Image image={image} /> <Temperature temp={temp} /></h3>
                <p><Description description={description} /></p>
                <p><Time /> <DayDate /></p>
            </div>
        )
    
}

export const CurrentWeather = connect(
    (state) => ({
        isLoading: state.body.isLoading,
        city: state.body.city,
        country: state.body.country,
        image: state.body.image,
        temp: state.body.temperature,
        description: state.body.description
    })
)(CurrentWeatherСomponent) 