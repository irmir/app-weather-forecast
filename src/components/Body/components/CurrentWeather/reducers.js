import { act } from "react-dom/test-utils"

const defaultState = {
    list: '',
    firstListElement: '',
    isError: false,
    image: null,
    temperature: '',
    description: '',
    city: '',
    country: '',
    currentTime: new Date(),
    weekdays: [],
    minTemp: '',
    listSlasedByDay: [],
    count: 3,
    i: '',
    listCurrentDate: '',
    listCurrentTime: '',
    left: 0,
    classHourlyWeather: 0,
    width: 0,
    offset: 0,
    isEnd: false,
    listSlasedByDayStartMorning: [],
    indexTimeNow: '',
    nightTemp: '',
    dayTemp: '',
    firstDayForecast: '',
    otherDaysForecast: '',
    backgroundColor: "white",
    selectedDay: ''
    // time: new Date(),
    // increment: 0
}

export const listWeatherReducer = (state = defaultState, action) => {
    switch (action.type) {

        case 'GET_WEATHER': {
            debugger

            const list = action.payload.list

            const indexNextMorning = list.findIndex(item => (
                item.dt_txt.includes("06:00:00")
            ))

            const listSlasedByDayStartMorning = []
            const size = 8;

            for (let i = 0; i < list.length; i++) {
                if (i < indexNextMorning) {
                    listSlasedByDayStartMorning.push(list.slice(i, indexNextMorning))
                    i = indexNextMorning
                }
                listSlasedByDayStartMorning.push(list.slice(i, i + size));
                i = i + size - 1;
            }

            const timeNow = listSlasedByDayStartMorning[0][0].dt_txt.slice(-8)
            const indexTimeNow = listSlasedByDayStartMorning[1].findIndex(item => (
                item.dt_txt.includes(timeNow)
            ))

            if (listSlasedByDayStartMorning.length === 6) {
                listSlasedByDayStartMorning.splice(- 1, 1)
            }

            const firstDayForecast = listSlasedByDayStartMorning[0]
            const otherDaysForecast = listSlasedByDayStartMorning.slice(1, listSlasedByDayStartMorning.length )
            const indexStartNight = firstDayForecast.findIndex(item => (
                item.dt_txt.includes('00:00:00')
            ))
            let sumDayTemp = 0
            let countDayTemp = 0
            for (let i = 0; i < indexStartNight; i++) {
                sumDayTemp = sumDayTemp + firstDayForecast[i].main.temp
                countDayTemp++
            }
            const dayTemp = sumDayTemp / countDayTemp

            let sumNightTemp = 0
            let countNightTemp = 0
            for (let i = indexStartNight; i < firstDayForecast.length; i++) {
                sumNightTemp = sumNightTemp + firstDayForecast[i].main.temp
                countNightTemp++
            }
            const nightTemp = sumNightTemp / countNightTemp

            const today = new Date().getDate();
            const listSlasedByDay = [];
  
            const index = list.findIndex(item =>
                (
                    new Date(item.dt_txt).getDate() !== today
                ))

            for (let i = 0; i < list.length; i++) {
                if (i < index) {
                    listSlasedByDay.push(list.slice(i, index))
                    i = index
                }
                listSlasedByDay.push(list.slice(i, i + size));
                i = i + size - 1;
            }

            console.log(listSlasedByDay)

            const forecastOnWeek = [...listSlasedByDay]

            // const weekDays = [];
            // for (let i = 0; i < action.payload.list.length; i++) {
            //     if (i % 8 === 0) {
            //         weekDays.push(action.payload.list[i])
            //     }
            // }

            const currHour = new Date().getHours()
            const listHour = new Date(listSlasedByDay[0][0].dt_txt).getHours()
            const count = 3 - (currHour - listHour);

            const width = (listSlasedByDay[0].length - 1) * 100 * 3 + count * 100

            const listCurrentTime = listSlasedByDay[0][0]
            const listCurrentDate = listSlasedByDay[0].slice(1, listSlasedByDay[0].length)

            debugger

            return {
                ...state,
                list: list,
                image: list[0].weather[0].icon,
                temperature: Math.round(list[0].main.temp - 273),
                description: list[0]['weather'][0].description,
                city: action.payload.city.name,
                country: action.payload.city.country,
                // weekdays: weekDays,
                listSlasedByDay: forecastOnWeek,
                count: count,

                listCurrentDate,
                listCurrentTime,
                width: width,
                // listSlasedByDayStartMorning,
                indexTimeNow,
                firstDayForecast,
                otherDaysForecast,
                nightTemp,
                dayTemp
            }
        }

        case 'GET_ERROR': {
            // alert("Error! Check how you writed name city")
            return {
                ...state,
            }
        }

        case 'DECREASE_COUNTER': {
            debugger
            action.payload.setHours(action.payload.getHours() + 1)
            return {
                ...state,
                time: action.payload
            }
        }

        case 'GET_AVERAGE_MIN_TEMP': {

            const listSlasedByDay = JSON.parse(localStorage.getItem('listSlasedByDay'))

            const sum = listSlasedByDay[action.payload].reduce((sum, item) => sum + item.main.temp_min, 0)
            const temp_min = Math.round(sum / listSlasedByDay[action.payload].length - 273)

            return {
                ...state,
                minTemp: temp_min
            }
        }

        case 'GET_NEXT_FORECAST': {

            debugger
            return {
                ...state,
                left: action.payload.left - 600,
                offset: action.payload.offset + 600
            }
        }

        case 'GET_CORRECT_SHIFT': {
            debugger
            return {
                ...state,
                left: -(action.payload - 600),
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

        case 'INCREASE_TIME_BY_HOUR': {
            debugger
            const time = action.payload.time
            const increment = action.payload.increment
            time.setHours(time.getHours() + increment)

            return {
                ...state,
                time: time,
                // time: `${time.toLocaleTimeString([], {
                //     hour: '2-digit',
                // })}:00`,
                increment: increment + 1
            }
        }

        case 'SELECT_DAY_FOR_FORECAST': {
            debugger
            const date = action.payload.date.slice(0,11)
            const list = action.payload.list

            const selectDay = list.find(item => {
                return item[0].dt_txt.slice(0,11) ===  date
            }) 
            
            return {
                ...state,
                listCurrentTime: selectDay[0],
                listCurrentDate: selectDay.slice(1, selectDay.length),
                count: 3,
                width: 8 * 3 * 100,
                left: 0,
                backgroundColor: "white",
                selectedDay: action.payload.id
            }
        }

        case 'RETURN_FORECAST_TODAY': {
            debugger
            const date = action.payload.date.slice(0,11)
            const list = action.payload.list

            const currHour = new Date().getHours()
            const listHour = new Date(list[0][0].dt_txt).getHours()
            const count = 3 - (currHour - listHour);

            const width = (list[0].length - 1) * 100 * 3 + count * 100

            const selectDay = list.find(item => {
                return item[0].dt_txt.slice(0,11) ===  date
            }) 
            
            return {
                ...state,
                listCurrentTime: selectDay[0],
                listCurrentDate: selectDay.slice(1, selectDay.length),
                count,
                width,
                left: 0,
                selectedDay: action.payload.id
            }
        }

        default: {
            return state
        }
    }
}