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
    const { appointment } = data
    const { time, date } = dateTimeConverter(data)
    const [gregorianDate, amharicDate] = date.split('.')
    const [gregorianTime, amharicTime] = time.split('.')

    if ( appointment === 'before' )
        return { message:`Dear Customer, Your schedule at our clinic will be on ${gregorianDate} at ${gregorianTime}.\r\nPlease arrive on time.\r\nውድ ደንበኛችን የህክምና የቀጠሮ ቀንዎ ${amharicDate} ${amharicTime} ሰዓት መሆኑን እያሳወቅን በሰዓቱ እንዲገኙልን እንጠይቃለን።` 
                }
    else if ( appointment === 'after' ) {
        return { message:`Dear customer, we hope you had a great service at our clinic. Your next schedule will be on ${gregorianDate} at ${gregorianTime}.\r\n[PLEASE ARRIVE ON TIME.]\r\nውድ ደንበኛችን በአገልግሎታችን  እንደተደሰቱ እናምናለን። ቀጣዩ የህክምና የቀጠሮ ቀንዎ ${amharicDate} ${amharicTime} መሆኑን እያሳወቅን በሰዓቱ እንዲገኙልን እንጠይቃለን። ` 
                }
    }

    return { message:null }
}