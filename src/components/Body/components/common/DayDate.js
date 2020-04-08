import React from 'react'

export const DayDate = ({date}) => {

    const currentDate = new Date().toLocaleString('en', {
        weekday: 'short',
        day: "numeric",
        month: 'short',
    });

    if (date === currentDate) {
        return <>Today</>
    } else {
        if (date) {
            return <>{date}</>
        } else {
            return <>{currentDate}</>
        }
    }    
}