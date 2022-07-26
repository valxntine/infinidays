import { getDatesInRange } from "./getrangeofdates";
const team = [
    {
    id: 9,
    created_at: "2022-07-25T10:36:41.987Z",
    name: "Ron Kulbin",
    joined_team_at: "2021-11-15T09:00:00.000Z",
    event_theme: "red",
    team_id: 1,
    career_level: "CL6",
    admin: false
},
{
    id: 8,
    created_at: "2022-07-25T10:36:41.987Z",
    name: "Ria Kinsley",
    joined_team_at: "2021-12-03T08:00:00.000Z",
    event_theme: "blue",
    team_id: 1,
    career_level: "CL8",
    admin: false
},
{
    id: 4,
    created_at: "2022-07-25T10:36:41.987Z",
    name: "Shaw Malcom",
    joined_team_at: "2021-12-03T09:00:00.000Z",
    event_theme: "green",
    team_id: 1,
    career_level: "CL10",
    admin: false
},
{
    id: 7,
    created_at: "2022-07-25T10:36:41.987Z",
    name: "Phoebe Gash",
    joined_team_at: "2022-03-14T08:00:00.000Z",
    event_theme: "yellow",
    team_id: 1,
    career_level: "CL8",
    admin: false
},
{
    id: 2,
    created_at: "2022-07-25T10:36:41.987Z",
    name: "Valentine Bott",
    joined_team_at: "2022-04-04T08:00:00.000Z",
    event_theme: "orange",
    team_id: 1,
    career_level: "CL9",
    admin: false
}
]

test("when a list of events with just one event in it is passed, which has the same start and end date, an array with a single object is returned representing one day", () => {
    const events = [
        {   
            employee_name: "Valentine Bott",
            start_date: new Date(2022, 6, 1).toISOString(),
            end_date: new Date(2022, 6, 1).toISOString(),
        },
    ];

    const expected = {
        employee_name: "Valentine Bott",
        request_id: undefined,
        event_theme: "orange",
        end_date: new Date(2022, 6, 1).toISOString(),
        start_date: new Date(2022, 6, 1).toISOString(),
        event_epoch: new Date(2022, 6, 1).getTime(),
    };
    const actual = getDatesInRange(events, team);
    expect(actual).toEqual(
        expect.arrayContaining([expect.objectContaining(expected)])
    );
});

test("when a list of events with just one event in it is passed, which has a start and end date 1 day apart, an array with two objects is returned, each representing a single day", () => {
    const events = [
        {
            employee_name: "Valentine Bott",
            start_date: new Date(2022, 6, 1).toISOString(),
            end_date: new Date(2022, 6, 2).toISOString(),
        },
    ];

    const expected = [
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 6, 2).toISOString(),
            start_date: new Date(2022, 6, 1).toISOString(),
            event_epoch: new Date(2022, 6, 1).getTime(),
        },
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 6, 2).toISOString(),
            start_date: new Date(2022, 6, 1).toISOString(),
            event_epoch: new Date(2022, 6, 1).getTime() + 86400000,
        },
    ];
    const actual = getDatesInRange(events, team);
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
            employee_name: "Valentine Bott",
            start_date: new Date(2022, 6, 1).toISOString(),
            end_date: new Date(2022, 6, 3).toISOString(),
        },
    ];

    const expected = [
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 6, 3).toISOString(),
            start_date: new Date(2022, 6, 1).toISOString(),
            event_epoch: new Date(2022, 6, 1).getTime(),
        },
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 6, 3).toISOString(),
            start_date: new Date(2022, 6, 1).toISOString(),
            event_epoch: new Date(2022, 6, 1).getTime() + 86400000,
        },
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 6, 3).toISOString(),
            start_date: new Date(2022, 6, 1).toISOString(),
            event_epoch: new Date(2022, 6, 1).getTime() + 86400000 + 86400000,
        },
    ];

    const actual = getDatesInRange(events, team);
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
            employee_name: "Valentine Bott",
            start_date: new Date(2022, 6, 1).toISOString(),
            end_date: new Date(2022, 6, 2).toISOString(),
        },
        {
            employee_name: "Valentine Bott",
            start_date: new Date(2022, 3, 1).toISOString(),
            end_date: new Date(2022, 3, 6).toISOString(),
        },
    ];

    const expected = [
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 6, 2).toISOString(),
            start_date: new Date(2022, 6, 1).toISOString(),
            event_epoch: new Date(2022, 6, 1).getTime(),
        },
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 6, 2).toISOString(),
            start_date: new Date(2022, 6, 1).toISOString(),
            event_epoch: new Date(2022, 6, 1).getTime() + 86400000,
        },
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 3, 6).toISOString(),
            start_date: new Date(2022, 3, 1).toISOString(),
            event_epoch: new Date(2022, 3, 1).getTime(),
        },
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 3, 6).toISOString(),
            start_date: new Date(2022, 3, 1).toISOString(),
            event_epoch: new Date(2022, 3, 1).getTime() + 86400000,
        },
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 3, 6).toISOString(),
            start_date: new Date(2022, 3, 1).toISOString(),
            event_epoch: new Date(2022, 3, 1).getTime() + 86400000 + 86400000,
        },
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 3, 6).toISOString(),
            start_date: new Date(2022, 3, 1).toISOString(),
            event_epoch: new Date(2022, 3, 1).getTime() + 86400000 + 86400000 + 86400000,
        },
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 3, 6).toISOString(),
            start_date: new Date(2022, 3, 1).toISOString(),
            event_epoch:
                new Date(2022, 3, 1).getTime() +
                86400000 +
                86400000 +
                86400000 +
                86400000,
        },
        {
            employee_name: "Valentine Bott",
            request_id: undefined,
            event_theme: "orange",
            end_date: new Date(2022, 3, 6).toISOString(),
            start_date: new Date(2022, 3, 1).toISOString(),
            event_epoch:
                new Date(2022, 3, 1).getTime() +
                86400000 +
                86400000 +
                86400000 +
                86400000 +
                86400000,
        },
    ];

    const actual = getDatesInRange(events, team);
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
