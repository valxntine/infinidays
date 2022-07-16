import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { MyRequests } from "./components/MyRequests";
import { getDatesInRange } from "./utils/getrangeofdates";
import { set } from "react-hook-form";

export default function Example() {
    const [modal, setModal] = useState(false);
    const [teamMembers, setTeamMembers] = useState([
        {
            user_name: "Phoebe Gash",
            event_theme: "red",
        },
        {
            user_name: "Valentine Bott",
            event_theme: "purple",
        },
        {
            user_name: "Ron Kulbin",
            event_theme: "blue",
        },
        {
            user_name: "Shaw Malcom",
            event_theme: "green",
        },
        {
            user_name: "Ria Kinsley",
            event_theme: "yellow",
        },
    ]);
    const [user, setUser] = useState({
        name: "Valentine Bott",
        project: "Dojo",
        color: "purple",
    });
    const [events, setEvents] = useState([
        {
            id: 1,
            event_start_date: Date.UTC(2022, 6, 4),
            event_end_date: Date.UTC(2022, 6, 4),
            user_name: "Phoebe Gash",
            event_theme: "red",
            pending: true,
            morningHalfDay: true,
            afternoonHalfDay: null,
        },

        {
            id: 2,
            event_start_date: Date.UTC(2022, 6, 4),
            event_end_date: Date.UTC(2022, 6, 4),
            user_name: "Valentine Bott",
            event_theme: "purple",
            pending: false,
            morningHalfDay: null,
            afternoonHalfDay: null,
        },
        {
            id: 3,
            event_start_date: Date.UTC(2022, 8, 12),
            event_end_date: Date.UTC(2022, 8, 12),
            user_name: "Valentine Bott",
            event_theme: "purple",
            pending: false,
            morningHalfDay: null,
            afternoonHalfDay: null,
        },
        {
            id: 4,
            event_start_date: Date.UTC(2022, 11, 18),
            event_end_date: Date.UTC(2022, 11, 22),
            user_name: "Valentine Bott",
            event_theme: "purple",
            pending: true,
            morningHalfDay: null,
            afternoonHalfDay: null,
        },
        {
            id: 5,
            event_start_date: Date.UTC(2022, 3, 4),
            event_end_date: Date.UTC(2022, 3, 4),
            user_name: "Valentine Bott",
            event_theme: "purple",
            pending: false,
            morningHalfDay: null,
            afternoonHalfDay: null,
        },
        {
            id: 6,
            event_start_date: Date.UTC(2022, 6, 4),
            event_end_date: Date.UTC(2022, 6, 4),
            user_name: "Ron Kulbin",
            event_theme: "blue",
            pending: true,
            morningHalfDay: null,
            afternoonHalfDay: true,
        },
        {
            id: 7,
            event_start_date: Date.UTC(2022, 6, 25),
            event_end_date: Date.UTC(2022, 6, 25),
            user_name: "Shaw Malcom",
            event_theme: "green",
            pending: false,
            morningHalfDay: null,
            afternoonHalfDay: null,
        },
        {
            id: 8,
            event_start_date: Date.UTC(2022, 6, 31),
            event_end_date: Date.UTC(2022, 6, 31),
            user_name: "Ria Kinsley",
            event_theme: "yellow",
            pending: false,
            morningHalfDay: null,
            afternoonHalfDay: true,
        },
    ]);

    const updateEvents = (event) => {
        const currEvents = [...events]
        setEvents([...currEvents, event])
    }

    const deleteEvent = (id) => {
        let currEvents = [...events]
        const newEvents = currEvents.filter((e) => e.id !== id)
        setEvents(newEvents)
    }

    const [expandedEvents, setExpandedEvents] = useState(getDatesInRange(events));

    useEffect(() => {
        console.log(events)
        setExpandedEvents(getDatesInRange(events))
        console.log(expandedEvents)
    }, [events])

    const setModalState = () => {
        setModal(!modal);
    };
    return (
        <>
            <div className="min-h-screen">
                <Router>
                    <Navbar user={user} />
                    <Routes>
                        <Route
                            path="/requests"
                            element={
                                <MyRequests
                                    modalHandler={setModalState}
                                    modal={modal}
                                    user={user}
                                    events={events}
                                    deleteHandler={deleteEvent}
                                    setEvents={updateEvents}
                                />
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <Dashboard
                                    expandedEvents={expandedEvents}
                                    events={events}
                                    modalHandler={setModalState}
                                    modal={modal}
                                    team={teamMembers}
                                    user={user}
                                    setEvents={updateEvents}
                                />
                            }
                        />
                    </Routes>
                </Router>
            </div>
        </>
    );
}
