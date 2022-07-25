export const eventClass = (e) => {
    console.log(e.event_theme.toLowerCase())
    return `border-${e.event_theme}-400 text-${e.event_theme}-800 ${e.pending ? "bg-white" : `bg-${e.event_theme.toLowerCase()}-300`}`;
};
