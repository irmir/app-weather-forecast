const defaultState = {
    list: '',
    isError: false,
    image: null,
    temperature: '',
    description: '',
    city: '',
    country: '',
    currentTime: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    }),
    listSlasedByDay: [],
    count: 3,
    listCurrentDate: '',
    listCurrentTime: '',
    classHourlyWeather: 0,
    width: 0,
    left: 0,
    offset: 0,
    isEnd: false,
    selectedDay: '',
    time: null,
    fullSelectedDay: '',
    hourlyForecast: '',
    weeklyForecast: ''
}

export const listWeatherReducer = (state = defaultState, action) => {

    const now = new Date()
    const width_item = 100

    switch (action.type) {

        case 'GET_WEATHER': {

            const list = action.payload.list

            // daily hourly weather data calculation
            const dateToday = now.getDate();
            const listSlasedByDay = [];

            const indexToday = list.findIndex(item =>
                (
                    new Date(item.dt_txt).getDate() !== dateToday
                ))

            const size = 8;

            for (let i = 0; i < list.length; i++) {
                if (i < indexToday) {
                    listSlasedByDay.push(list.slice(i, indexToday))
                    i = indexToday
                }
                listSlasedByDay.push(list.slice(i, i + size));
                i = i + size - 1;
            }

            const currentHour = now.getHours()
            const listHour = new Date(listSlasedByDay[0][0].dt_txt).getHours()
            const count = 3 - (currentHour - listHour);

            const listCurrentTime = listSlasedByDay[0][0]
            const listCurrentDate = listSlasedByDay[0].slice(1, listSlasedByDay[0].length)

            const fullCurrentTime = []
            for (let i = 0; i < count; i++) {
                fullCurrentTime.push({ ...listCurrentTime })
            }

            const fullCurrentDate = []
            listCurrentDate.forEach(item => {
                for (let i = 0; i < 3; i++) {
                    fullCurrentDate.push({ ...item })
                }
            })

            const hourlyForecast = fullCurrentTime.concat(fullCurrentDate)

            hourlyForecast.map((item, index) => {
                if (index + currentHour < 10) {
                    item.time24 = `0${index + currentHour}:00`
                } else {
                    item.time24 = `${index + currentHour}:00`
                }
            })

            const width = hourlyForecast.length * width_item

            // weekly weather data calculation
            const firstDayForecast = listSlasedByDay[0]

            let nightTempFirstDayForecast = undefined
            let dayTempFirstDayForecast = undefined

            if (firstDayForecast.length === 8) {
                nightTempFirstDayForecast = (firstDayForecast[0].main.temp + firstDayForecast[1].main.temp) / 2
                let sumDayTemp = 0
                let j = 0
                for (let i = 2; i < firstDayForecast.length - 1; i++) {
                    sumDayTemp = sumDayTemp + firstDayForecast[i].main.temp
                    j++
                }
                dayTempFirstDayForecast = sumDayTemp / j;
            }
            if (firstDayForecast.length === 7) {
                nightTempFirstDayForecast = firstDayForecast[1].main.temp

                let sumDayTemp = 0
                let j = 0
                for (let i = 1; i < firstDayForecast.length - 1; i++) {
                    sumDayTemp = sumDayTemp + firstDayForecast[i].main.temp
                    j++
                }
                dayTempFirstDayForecast = sumDayTemp / j;
            } if (firstDayForecast.length === 1) {
                nightTempFirstDayForecast = firstDayForecast[0].main.temp
            }
            else {
                let sumDayTemp = 0
                let j = 0
                for (let i = 0; i < firstDayForecast.length - 1; i++) {
                    sumDayTemp = sumDayTemp + firstDayForecast[i].main.temp
                    j = j + 1
                }
                dayTempFirstDayForecast = sumDayTemp / j
            }

            const firstWeekday = firstDayForecast[0]
            if (dayTempFirstDayForecast) {
                firstWeekday.dayTemp = Math.round(dayTempFirstDayForecast - 273)
            } else {
                firstWeekday.dayTemp = dayTempFirstDayForecast
            }
            if (nightTempFirstDayForecast) {
                firstWeekday.nightTemp = Math.round(nightTempFirstDayForecast - 273)
            } else {
                firstWeekday.nightTemp = nightTempFirstDayForecast
            }

            firstWeekday.date = new Date(firstWeekday.dt_txt).toLocaleString('en', {
                weekday: 'short',
                day: "numeric",
                month: 'short',
            })

            const weeklyForecast = []
            weeklyForecast.push(firstWeekday)

            for (let i = 1; i < listSlasedByDay.length - 1; i++) {
                const dayTemp = (listSlasedByDay[i][2].main.temp + listSlasedByDay[i][3].main.temp + listSlasedByDay[i][4].main.temp +
                    listSlasedByDay[i][5].main.temp + listSlasedByDay[i][6].main.temp) / 5
                const nightTemp = (listSlasedByDay[i - 1][listSlasedByDay[0].length - 1].main.temp + listSlasedByDay[i][0].main.temp + listSlasedByDay[i][1].main.temp) / 3

                listSlasedByDay[i][0].dayTemp = Math.round(dayTemp - 273)
                listSlasedByDay[i][0].nightTemp = Math.round(nightTemp - 273)
                listSlasedByDay[i][0].date = new Date(listSlasedByDay[i][0].dt_txt).toLocaleString('en', {
                    weekday: 'short',
                    day: "numeric",
                    month: 'short',
                })

                weeklyForecast.push(listSlasedByDay[i][0])
            }

            return {
                ...state,
                list,
                image: list[0].weather[0].icon,
                temperature: Math.round(list[0].main.temp - 273),
                description: list[0]['weather'][0].description,
                city: action.payload.city.name,
                country: action.payload.city.country,
                listSlasedByDay,
                width,
                weeklyForecast,
                hourlyForecast
            }
        }

        case 'GET_ERROR': {
            // alert("Error! Check how you writed name city")
            return {
                ...state,
            }
        }

        case 'GET_NEXT_FORECAST': {
            const widthBody = 600
            debugger
            return {
                ...state,
                left: action.payload.left - widthBody,
                offset: action.payload.offset + widthBody
            }
        }

        case 'GET_CORRECT_SHIFT': {
            debugger
            const widthBody = 600
            return {
                ...state,
                left: -(action.payload - widthBody),
                isEnd: true
            }
        }

        case 'RETURN_TO_START': {
            return {
                ...state,
                left: 0,
                isEnd: false,
                offset: 0
            }
        }


        case 'SELECT_DAY_FOR_FORECAST': {
            debugger
            const date = action.payload.date.slice(0, 11)
            const { listSlasedByDay } = state

            const selectDay = listSlasedByDay.find(item => {
                return item[0].dt_txt.slice(0, 11) === date
            })

            let fullSelectedDay = []

            selectDay.forEach(item => {
                for (let i = 0; i < 3; i++) {
                    fullSelectedDay.push({ ...item })
                }
            })

            for (let i = 0; i < fullSelectedDay.length; i++) {
                if (i < 10) {
                    fullSelectedDay[i].time24 = `0${i}:00`
                } else {
                    fullSelectedDay[i].time24 = `${i}:00`
                }
            }

            return {
                ...state,
                width: fullSelectedDay.length * width_item,
                left: 0,
                selectedDay: action.payload.id,
                fullSelectedDay,
            }
        }

        case 'RETURN_FORECAST_TODAY': {

            const { hourlyForecast } = state

            return {
                ...state,
                fullSelectedDay: '',
                hourlyForecast,
                width: hourlyForecast.length * width_item,
                left: 0,
                selectedDay: action.payload,
            }
        }

        default: {
            return state
        }
    }
}