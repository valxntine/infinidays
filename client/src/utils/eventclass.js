export const eventClass = (e) => {
    if (e.pending) {
        return `border-${e.event_theme}-400 text-${e.event_theme}-800 bg-white`;
    }
    switch (e.event_theme) {
        case "blue":
            return "border-blue-400 text-blue-800 bg-blue-300";
        case "red":
            return "border-red-400 text-red-800 bg-red-300";
        case "yellow":
            return "border-yellow-400 text-yellow-800 bg-yellow-300";
        case "green":
            return "border-green-400 text-green-800 bg-green-300";
        case "orange":
            return "border-orange-400 text-orange-800 bg-orange-300";
        default:
            return "border-purple-400 text-purple-800 bg-purple-300";
    }
};
