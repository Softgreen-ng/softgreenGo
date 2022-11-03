const MONDAY = 1
const TUESDAY = 2
const WEDNESDAY = 3
const THURSDAY = 4
// const FRIDAY = 5
const SATURDAY = 6
const SUNDAY = 7

const getNextDay = (day) => {
    return new Date().setDate(new Date().getDate() + ((7 - new Date().getDay()) % 7 + day) % 7);
}


export const getNextDate = () => {
    let day = new Date().getDay()
    // console.log("day", day)
    let date

    if ([SUNDAY, MONDAY, TUESDAY].includes(day)) {
        date = getNextDay(TUESDAY)
    }
    else if([WEDNESDAY, THURSDAY].includes(day)){
        date = getNextDay(THURSDAY)
    }
    else {
        date = getNextDay(SATURDAY)
    }
    let nextDate = {
        start: date,
        end: date
    }
    return nextDate
}
