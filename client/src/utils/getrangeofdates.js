export const getDatesInRange = (events, team) => {
    const expandedData = [];
    console.log(team)
    console.log(events)

    for (let event of events) {
        let date = new Date(event.start_date).getTime();
        let endDate = new Date(event.end_date).getTime()
        while (date <= endDate) {
            expandedData.push({
                request_id: event.id,
                event_epoch: date,
                ...event,
                event_theme: team.find(m => m.name === event.employee_name).event_theme.toLowerCase(),
            });
            date = date + 86400000;
        }
    }
    console.log(expandedData);
    return expandedData;
};
