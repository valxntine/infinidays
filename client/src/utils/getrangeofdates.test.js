import { getDatesInRange } from "./getrangeofdates";

test("when a list of events with just one event in it is passed, which has the same start and end date, an array with a single object is returned representing one day", () => {
    const events = [
        {
            event_start_date: Date.UTC(2022, 6, 1),
            event_end_date: Date.UTC(2022, 6, 1),
        },
    ];

    const expected = {
        event_end_date: Date.UTC(2022, 6, 1),
        event_start_date: Date.UTC(2022, 6, 1),
        event_epoch: Date.UTC(2022, 6, 1),
    };
    const actual = getDatesInRange(events);
    expect(actual).toEqual(
        expect.arrayContaining([expect.objectContaining(expected)])
    );
});

test("when a list of events with just one event in it is passed, which has a start and end date 1 day apart, an array with two objects is returned, each representing a single day", () => {
    const events = [
        {
            event_start_date: Date.UTC(2022, 6, 1),
            event_end_date: Date.UTC(2022, 6, 2),
        },
    ];

    const expected = [
        {
            event_end_date: Date.UTC(2022, 6, 2),
            event_start_date: Date.UTC(2022, 6, 1),
            event_epoch: Date.UTC(2022, 6, 1),
        },
        {
            event_end_date: Date.UTC(2022, 6, 2),
            event_start_date: Date.UTC(2022, 6, 1),
            event_epoch: Date.UTC(2022, 6, 1) + 86400000,
        },
    ];
    const actual = getDatesInRange(events);
    expect(actual.length).toBe(2);
    expect(actual).toEqual(
        expect.arrayContaining([
            expect.objectContaining(expected[0]),
            expect.objectContaining(expected[1]),
        ])
    );
});

test("when a list of events with just one event in it is passed, which has a start and end date 2 days apart, an array with three objects is returned, each representing a single day", () => {
    const events = [
        {
            event_start_date: Date.UTC(2022, 6, 1),
            event_end_date: Date.UTC(2022, 6, 3),
        },
    ];

    const expected = [
        {
            event_end_date: Date.UTC(2022, 6, 3),
            event_start_date: Date.UTC(2022, 6, 1),
            event_epoch: Date.UTC(2022, 6, 1),
        },
        {
            event_end_date: Date.UTC(2022, 6, 3),
            event_start_date: Date.UTC(2022, 6, 1),
            event_epoch: Date.UTC(2022, 6, 1) + 86400000,
        },
        {
            event_end_date: Date.UTC(2022, 6, 3),
            event_start_date: Date.UTC(2022, 6, 1),
            event_epoch: Date.UTC(2022, 6, 1) + 86400000 + 86400000,
        },
    ];

    const actual = getDatesInRange(events);
    expect(actual.length).toBe(3);
    expect(actual).toEqual(
        expect.arrayContaining([
            expect.objectContaining(expected[0]),
            expect.objectContaining(expected[1]),
            expect.objectContaining(expected[2]),
        ])
    );
});

test("when a list of events with two events in it is passed, the first having a start and end date 1 day apart and the second having a start and end date 5 days apart, an array of events of length 8 should be returned, one event for each day", () => {
    const events = [
        {
            event_start_date: Date.UTC(2022, 6, 1),
            event_end_date: Date.UTC(2022, 6, 2),
        },
        {
            event_start_date: Date.UTC(2022, 3, 1),
            event_end_date: Date.UTC(2022, 3, 6),
        },
    ];

    const expected = [
        {
            event_end_date: Date.UTC(2022, 6, 2),
            event_start_date: Date.UTC(2022, 6, 1),
            event_epoch: Date.UTC(2022, 6, 1),
        },
        {
            event_end_date: Date.UTC(2022, 6, 2),
            event_start_date: Date.UTC(2022, 6, 1),
            event_epoch: Date.UTC(2022, 6, 1) + 86400000,
        },
        {
            event_end_date: Date.UTC(2022, 3, 6),
            event_start_date: Date.UTC(2022, 3, 1),
            event_epoch: Date.UTC(2022, 3, 1),
        },
        {
            event_end_date: Date.UTC(2022, 3, 6),
            event_start_date: Date.UTC(2022, 3, 1),
            event_epoch: Date.UTC(2022, 3, 1) + 86400000,
        },
        {
            event_end_date: Date.UTC(2022, 3, 6),
            event_start_date: Date.UTC(2022, 3, 1),
            event_epoch: Date.UTC(2022, 3, 1) + 86400000 + 86400000,
        },
        {
            event_end_date: Date.UTC(2022, 3, 6),
            event_start_date: Date.UTC(2022, 3, 1),
            event_epoch: Date.UTC(2022, 3, 1) + 86400000 + 86400000 + 86400000,
        },
        {
            event_end_date: Date.UTC(2022, 3, 6),
            event_start_date: Date.UTC(2022, 3, 1),
            event_epoch:
                Date.UTC(2022, 3, 1) +
                86400000 +
                86400000 +
                86400000 +
                86400000,
        },
        {
            event_end_date: Date.UTC(2022, 3, 6),
            event_start_date: Date.UTC(2022, 3, 1),
            event_epoch:
                Date.UTC(2022, 3, 1) +
                86400000 +
                86400000 +
                86400000 +
                86400000 +
                86400000,
        },
    ];

    const actual = getDatesInRange(events);
    expect(actual.length).toBe(8);
    expect(actual).toEqual(
        expect.arrayContaining([
            expect.objectContaining(expected[0]),
            expect.objectContaining(expected[1]),
            expect.objectContaining(expected[2]),
            expect.objectContaining(expected[3]),
            expect.objectContaining(expected[4]),
            expect.objectContaining(expected[5]),
            expect.objectContaining(expected[6]),
            expect.objectContaining(expected[7]),
        ])
    );
});
