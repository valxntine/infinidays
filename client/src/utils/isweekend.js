export const isWeekend = (year, month, date) => {
    const d = new Date(year, month, date);
    return d.getDay() === 0 || d.getDay() === 6;
};
