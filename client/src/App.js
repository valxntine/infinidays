import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { MyRequests } from "./components/MyRequests";
import { Profile } from "./components/Profile";
import { getDatesInRange } from "./utils/getrangeofdates";

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
        careerLevel: "CL9",
    });
    const [events, setEvents] = useState([
        {
            id: 1,
            event_start_date: Date.UTC(2022, 6, 4),
            event_end_date: Date.UTC(2022, 6, 4),
            user_name: "Phoebe Gash",
            event_theme: "red",
            pending: true,
            firstHalfDay: true,
            lastDayHalf: null,
        },

        {
            id: 2,
            event_start_date: Date.UTC(2022, 6, 4),
            event_end_date: Date.UTC(2022, 6, 4),
            user_name: "Valentine Bott",
            event_theme: "purple",
            pending: false,
            firstHalfDay: null,
            lastDayHalf: null,
        },
        {
            id: 3,
            event_start_date: Date.UTC(2022, 8, 12),
            event_end_date: Date.UTC(2022, 8, 12),
            user_name: "Valentine Bott",
            event_theme: "purple",
            pending: false,
            firstHalfDay: null,
            lastDayHalf: null,
        },
        {
            id: 4,
            event_start_date: Date.UTC(2022, 11, 18),
            event_end_date: Date.UTC(2022, 11, 22),
            user_name: "Valentine Bott",
            event_theme: "purple",
            pending: true,
            firstHalfDay: null,
            lastDayHalf: null,
        },
        {
            id: 5,
            event_start_date: Date.UTC(2022, 3, 4),
            event_end_date: Date.UTC(2022, 3, 4),
            user_name: "Valentine Bott",
            event_theme: "purple",
            pending: false,
            firstHalfDay: null,
            lastDayHalf: null,
        },
        {
            id: 6,
            event_start_date: Date.UTC(2022, 6, 4),
            event_end_date: Date.UTC(2022, 6, 4),
            user_name: "Ron Kulbin",
            event_theme: "blue",
            pending: true,
            firstHalfDay: null,
            lastDayHalf: true,
        },
        {
            id: 7,
            event_start_date: Date.UTC(2022, 6, 25),
            event_end_date: Date.UTC(2022, 6, 25),
            user_name: "Shaw Malcom",
            event_theme: "green",
            pending: false,
            firstHalfDay: null,
            lastDayHalf: null,
        },
        {
            id: 8,
            event_start_date: Date.UTC(2022, 6, 31),
            event_end_date: Date.UTC(2022, 6, 31),
            user_name: "Ria Kinsley",
            event_theme: "yellow",
            pending: false,
            firstHalfDay: null,
            lastDayHalf: true,
        },
    ]);
    
    const addEvent = (event) => {
        setEvents(curr => [...curr, event])
    }

    const deleteEvent = (id) => {
        let currEvents = [...events]
        const newEvents = currEvents.filter((e) => e.id !== id)
        setEvents(newEvents)
    }

    const [expandedEvents, setExpandedEvents] = useState([]);

    useEffect(() => {
        setExpandedEvents(curr => [...getDatesInRange(events)])
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
                            path="/profile"
                            element={
                                <Profile user={user} events={expandedEvents} />
                            }
                        />
                        <Route
                            path="/requests"
                            element={
                                <MyRequests
                                    modalHandler={setModalState}
                                    modal={modal}
                                    user={user}
                                    events={events}
                                    deleteHandler={deleteEvent}
                                    setExpandedEvents={setExpandedEvents}
                                    expandedEvents={expandedEvents}
                                    addEventHandler={addEvent}
                                />
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <Dashboard
                                    expandedEvents={expandedEvents}
                                    modalHandler={setModalState}
                                    modal={modal}
                                    team={teamMembers}
                                    user={user}
                                    setExpandedEvents={setExpandedEvents}
                                    addEventHandler={addEvent}
                                />
                            }
                        />
                    </Routes>
                </Router>
            </div>
        </>
    );
}
