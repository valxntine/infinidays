export const getDatesInRange = (events) => {
    const expandedData = [];

    for (let event of events) {
        let date = event.event_start_date;
        while (date <= event.event_end_date) {
            expandedData.push({
                id: Math.random() * 10,
                event_epoch: date,
                ...event,
            });
            date = date + 86400000;
        }
    }
    console.log(expandedData);
    return expandedData;
};
