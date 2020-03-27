import React from 'react'
import { connect } from 'react-redux'

const DescriptionComponent = ({ description }) => {

    return <>{description}</>
}

export const Description = connect(
    (state) => ({
        description: state.currentWeather.description
    })
)(DescriptionComponent)