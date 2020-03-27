import React from 'react'

export const Temperature = ({temp, className}) => {

    return (
        <span className={className}>
            {temp}&deg;C
        </span>
    )
}
