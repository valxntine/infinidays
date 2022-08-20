import { isWeekend } from "./isweekend";

export const calculateLeave = (careerLevel, currentEvents, userName) => {
    let output = {};
    const now = new Date();
    const accrualPerPeriod =
        parseInt(careerLevel.split("L")[1]) > 7 ? 7.8 : 9.3;

    // Figure out how many periods are left in the year
    const periods = periodsRemaining();
    const totalHours = Math.ceil(24 * accrualPerPeriod);

    // TODO: do we want current balance? if not, (most likely)
    // TODO: check when the user joined. Calculate the number of periods
    // TODO: between them joining and the end of the holiday year. This might mean refactoring the other function
    // TODO: then do the number of periods left in the year * accrualPerPeriod - amount of time already taken (current events)
    // TODO: / 7.5 to get the amount of days remaining. I think that's everything?

    const endOfYear = new Date(now.getFullYear(), 8, 1)
    let days = 0;

    for (let event of currentEvents) {
        const eventDate = new Date(event.event_epoch);
        if (
            isWeekend(
                eventDate.getFullYear(),
                eventDate.getMonth(),
                eventDate.getDate()
            ) ||
            !event.annual_leave ||
            eventDate >= endOfYear 
        ) {
            continue;
        }
        if (event.employee_name === userName) {
            if (event.first_day_half || event.last_day_half) {
                days += 0.5;
                console.log("adding half day for: ", event);
            } else {
                days++;
            }
        }
    }

    output["daysTaken"] = days;

    let userHours = days * 7.5;
    const remainingdays = Math.floor((totalHours - userHours) / 7.5);

    output["remainingDays"] = remainingdays;

    return output;
};

// if 8-current month is greater than 0, do whats above
// if 8-current is less than or equal to 0
//      do december (11) - current + 9 * 2
//      (11-10 + 9)* 2

const periodsRemaining = () => {
    let endDate;

    const currDate = new Date();

    if (currDate.getMonth() >= 8) {
        endDate = new Date(currDate.getFullYear() + 1, 8, 7);
    } else {
        endDate = new Date(currDate.getFullYear(), 8, 7);
    }

    const monthDiff = monthDifference(currDate, endDate);

    let periodsRemaining;
    // Figure out how many periods are left in the year
    const day = currDate.getDate();
    if (day < 8) {
        periodsRemaining = monthDiff * 2 + 1;
    } else if (day >= 8 && day < 23) {
        periodsRemaining = monthDiff * 2;
    } else if (day > 23) {
        periodsRemaining = monthDiff * 2 - 1;
    }
    return periodsRemaining;
};

const monthDifference = (startDate, endDate) => {
    return (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
    );
};
