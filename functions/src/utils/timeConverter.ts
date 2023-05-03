export function amharicTime (time:any) {
    let convertedTime = time
    const [value, season] = time.split(' ');
    let [hour, minute] = value.split(':')

    if ( season == 'AM') {
      if ( hour > 6 && hour < 12 )
        convertedTime = `ከጠዋቱ ${parseInt(hour) - 6}`
      else {
        convertedTime = `በ ${parseInt(hour) + 6}`
      }
    }
    else {
      if ( hour <= 6 )
        convertedTime = `ከቀኑ ${parseInt(hour) + 6}`
      else if ( hour === '12' )
        convertedTime = `ከቀኑ ${parseInt(hour) - 6}`
      else {
        convertedTime = `በ ${parseInt(hour) - 6}`
      }
    }
    return `${convertedTime}:${minute}`
  }