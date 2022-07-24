export const datesOverlap = (newEvents, currentEvents, userName) => {
    for (let i of newEvents) {
        for (let j of currentEvents) {
            if (i.event_epoch === j.event_epoch && j.user_name === userName) {
                return true;
            }
        }
    }
    return false;
};
