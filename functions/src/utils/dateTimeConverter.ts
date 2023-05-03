import { EthDateTime } from "ethiopian-calendar-date-converter"
import { amharicTime } from "./timeConverter"

export function dateTimeConverter (data:any) {
    let { date, time } = data
    let [ month, day, year ] = date.split('/')

    if ( parseInt(month) <= 9 )
        month = `0${month}`
    if ( parseInt(day) <= 9 )
        day = `0${day}`

    const convertedTime = amharicTime(time)
    time = time + '.' + convertedTime
    const ethDateTime = EthDateTime.fromEuropeanDate(new Date(`${year}-${month}-${day}`))
    date = date+`.${ethDateTime.date}/${ethDateTime.month}/${ethDateTime.year}`

    return { time, date }
}

export function messageTemplate (data:any) {
    const { time, date } = dateTimeConverter(data)
    const [gregorianDate, amharicDate] = date.split('.')
    const [gregorianTime, amharicTime] = time.split('.')

    return {  
            message:`Dear Customer, Your schedule at our clinic will be on ${gregorianDate} at ${gregorianTime}.\nPlease arrive on time.\n\nውድ ደንበኛችን የህክምና የቀጠሮ ቀንዎ ${amharicDate} ${amharicTime} ሰዓት መሆኑን እያሳወቅን በሰዓቱ እንዲገኙልን እንጠይቃለን።`
           }
}

export function run () {
    const data = {time:'01:00 PM', date:'5/2/2023', phone:'910935221'}
    const { time, date } = data
    const { message } = messageTemplate({time, date})
    console.log(message)
}

run()