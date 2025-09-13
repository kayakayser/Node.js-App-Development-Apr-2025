import {randomInt} from "../random/random.js";

const daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const monthsTR = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
const monthsEN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nove", "Dec"]
const daysOfWeekTR = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
const daysOfWeekEN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const isValidForBounds = (val, min, max) => min <= val && val <= max
const isValidHour = val => isValidForBounds(val, 0, 23)
const isValidMinute = val => isValidForBounds(val, 0, 59)
const isValidSecond = val => isValidForBounds(val, 0, 59)
const getDays = (m, y) => m === 1 && isLeapYear(y) ? 29 : daysOfMonths[m]
const getDaySuffix = d => {
    let suffix = "th"

    switch (d) {
        case 1:
        case 21:
        case 31:
            suffix = "st";
            break;
        case 2:
        case 22:
            suffix = "nd";
            break;
        case 3:
        case 23:
            suffix = "rd";
            break;
    }

    return suffix
}

export const isLeapYear = y => y % 4 === 0 && y % 100 !== 0 || y % 400 === 0

export const isValidDate = (d, m, y) => d >= 1 && d <= 31 && m >= 0 && m <= 11 && d <= getDays(m, y)

export const isValidTime = (h, m, s) => isValidHour(h) && isValidMinute(m) && isValidSecond(s)

export const getTotalYears = (startDate, endDate) => (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365)

export const randomDate = (min, max) => {
    const year = (max === undefined) ? (min === undefined) ? (new Date().getFullYear()) : (min): (randomInt(min, max + 1))
    const month = randomInt(0, 12)
    const day = randomInt(1, getDays(month, year) + 1)

    return new Date(year, month, day)
}

export const dateToStringTR = d => `${d.getDate()} ${monthsTR[d.getMonth()]} ${d.getFullYear()} ${daysOfWeekTR[d.getDay()]}`

export const dateToStringEN = d => `${monthsEN[d.getMonth()]} ${d.getDate()}${getDaySuffix(d.getDate())} ${d.getFullYear()} ${daysOfWeekEN[d.getDay()]}`

Date.prototype.toStringTR = function () {
    return dateToStringTR(this)
}

Date.prototype.toStringEN = function () {
    return dateToStringEN(this)
}

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

