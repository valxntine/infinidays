import { classNames } from "./classnames";

test('when a single string of class names is passed to the function, that same string is returned', () => {
    expect(classNames("bg-white w-full flex flex-wrap")).toBe("bg-white w-full flex flex-wrap")
})

test('when a two strings of class names are passed to the function, they are joined and a single string containing all class names is returned', () => {
    expect(classNames("bg-white w-full flex flex-wrap", "text-blue-800 flex-col")).toBe("bg-white w-full flex flex-wrap text-blue-800 flex-col")
})

test('when a three strings of class names are passed to the function, they are joined and a single string containing all class names is returned', () => {
    expect(classNames("bg-white w-full flex flex-wrap", "text-blue-800 flex-col", "sm:w-1/3")).toBe("bg-white w-full flex flex-wrap text-blue-800 flex-col sm:w-1/3")
})

test('when no class names are passed to the function, an empty string is returned', () => {
    expect(classNames()).toBe("")
})

test('when a ternary is passed, only the returned class of the ternary is added to the class names return string', () => {
    const isActive = true
    expect(classNames(
        isActive ? "is-active-true" : "is-active-false",
        "bg-white"
    )).toBe("is-active-true bg-white")
})

test('when a ternary is passed, only the returned class of the ternary is added to the class names return string, negative path', () => {
    const isActive = false
    expect(classNames(
        isActive ? "is-active-true" : "is-active-false",
        "bg-white"
    )).toBe("is-active-false bg-white")
})
