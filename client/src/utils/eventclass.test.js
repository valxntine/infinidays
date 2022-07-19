import { eventClass } from "./eventclass";

test('when the event is pending and event_theme is red, classes for a border with the event_theme, text with the color of the event_theme and a white background are returned', () => {
    const event = {
        pending: true,
        event_theme: "red"
    }
    expect(eventClass(event)).toBe("border-red-400 text-red-800 bg-white")
})

test('when the event theme is red and is not pending, classes with border, text and background with red colour are returned', () => {
    const event = {
        pending: false,
        event_theme: "red"
    }
    expect(eventClass(event)).toBe("border-red-400 text-red-800 bg-red-300")
})

test('when the event theme is blue and is not pending, classes with border, text and background with blue colour are returned', () => {
    const event = {
        pending: false,
        event_theme: "blue"
    }
    expect(eventClass(event)).toBe("border-blue-400 text-blue-800 bg-blue-300")
})

test('when the event theme is yellow and is not pending, classes with border, text and background with yellow colour are returned', () => {
    const event = {
        pending: false,
        event_theme: "yellow"
    }
    expect(eventClass(event)).toBe("border-yellow-400 text-yellow-800 bg-yellow-300")
})

test('when the event theme is green and is not pending, classes with border, text and background with green colour are returned', () => {
    const event = {
        pending: false,
        event_theme: "green"
    }
    expect(eventClass(event)).toBe("border-green-400 text-green-800 bg-green-300")
})

test('when the event theme is orange and is not pending, classes with border, text and background with orange colour are returned', () => {
    const event = {
        pending: false,
        event_theme: "orange"
    }
    expect(eventClass(event)).toBe("border-orange-400 text-orange-800 bg-orange-300")
})

test('when the event theme is a colour other than blue, red, yellow, green or orange, purple is used as the event_theme, and is not pending, classes with border, text and background with purple colour are returned', () => {
    const event = {
        pending: false,
        event_theme: "cyan"
    }
    expect(eventClass(event)).toBe("border-purple-400 text-purple-800 bg-purple-300")
})
