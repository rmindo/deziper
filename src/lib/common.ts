
import {
  DateInterface,
  DateTimeInterface,
}
from '@src/interface/common'


/**
 * Get converted date
 * @param date 
 * @returns {DateInterface}
 */
export function getDate(date: {updated: string, published: string}): DateInterface {

  const updated: DateTimeInterface = datetime(date.updated)
  const published: DateTimeInterface = datetime(date.published)
  
  return {
    updated,
    published,
    isUpdated() {
      return updated.date.getTime() > published.date.getTime()
    },
  }
}


/**
 * Convert datetime
 * @param ts 
 */
export function datetime(ts: string | number): DateTimeInterface {
  if(typeof ts == 'number') {
    ts = ts.toString()
  }
  var today: Date = new Date()
  var date: Date = new Date(ts)

  var week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  /**
   * Time with 12 hours format
   */
  var toTime = (format = true) => {
    var h = date.getHours()
    var m: any = date.getMinutes()

    h = h % 12;
    h = h ? h : 12
    m = m < 10 ? '0'+m : m

    let f = ''
    if(format) {
      f = ` ${date.getHours() >= 12 ? 'PM' : 'AM'}`
    }
    return `${h}:${m}${f}`
  }

  var _date = [
    months[date.getMonth()],
    `${date.getDate()},`,
    date.getFullYear()
  ]
  var getDateAndDay = () => {
    return `${week[date.getDay()]} ${_date.join(' ')}`
  }


  return {
    date,
    today,
    getDateAndDay,
    getDate: () => _date.join(' '),
    getFullDate: () => `${getDateAndDay()} at ${toTime()}`,
  }
}