export const getDatesInRange = (events, team) => {
    const expandedData = [];
    console.log(team)

    for (let event of events) {
        let date = event.event_start_date;
        while (date <= event.event_end_date) {
            expandedData.push({
                id: Math.random() * 10,
                event_epoch: date,
                ...event,
                event_theme: team.find(m => m.name === event.user_name).event_theme.toLowerCase(),
            });
            date = date + 86400000;
        }
    }
    console.log(expandedData);
    return expandedData;
};
