const daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const isValidForBounds = (val, min, max) => min <= val && val <= max
const isValidHour = val => isValidForBounds(val, 0, 23)
const isValidMinute = val => isValidForBounds(val, 0, 59)
const isValidSecond = val => isValidForBounds(val, 0, 59)

export const isLeapYear = y => y % 4 === 0 && y % 100 !== 0 || y % 400 === 0

export const isValidDate = (d, m, y) => d >= 1 && d <= 31 && m >= 0 && m <= 11 && d <= (m === 1 && isLeapYear(y) ? 29 : daysOfMonths[m])

export const isValidTime = (h, m, s) => isValidHour(h) && isValidMinute(m) && isValidSecond(s)

export const getTotalYears = (startDate, endDate) => (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)

export const LocalTime = function (h, m, s, ms) {
    this.date = new Date()
    this.date.setHours(h)
    this.date.setMinutes(m)
    this.date.setSeconds(s)
    this.date.setMilliseconds(ms)
    this.getHour = () => this.date.getHours()
    this.getMinute = () => this.date.getMinutes()
    this.getSeconds = () => this.date.getSeconds()
    this.getMilliseconds = () => this.date.getMilliseconds()

    //...
}


export const LocalDate = function (d, m, y) {
    //...
}

export const LocalDateTime = (d, mon, y, h, m, s, ms) => {
    //...
}

