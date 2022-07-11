import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { MyRequests } from "./components/MyRequests";
import { getDatesInRange } from "./utils/getrangeofdates";

export default function Example() {
    const [modal, setModal] = useState(false);
    const [teamMembers, setTeamMembers] = useState([
        {
            user_name: "Phoebe Gash",
            color: "red",
        },
        {
            user_name: "Valentine Bott",
            color: "orange",
        },
        {
            user_name: "Ron Kulbin",
            color: "blue",
        },
        {
            user_name: "Shaw Malcom",
            color: "green",
        },
        {
            user_name: "Ria Kinsley",
            color: "yellow",
        },
    ]);
    const [user, setUser] = useState({
        name: "Valentine Bott",
        project: "Dojo",
        color: "orange",
    });
    const [events, setEvents] = useState([
        {
            event_start_date: new Date(2022, 6, 4).getTime(),
            event_end_date: new Date(2022, 6, 4).getTime(),
            user_name: "Phoebe Gash",
            event_theme: "red",
            pending: true,
            morningHalfDay: true,
            afternoonHalfDay: null,
        },

        {
            event_start_date: new Date(2022, 6, 4).getTime(),
            event_end_date: new Date(2022, 6, 4).getTime(),
            user_name: "Valentine Bott",
            event_theme: "orange",
            pending: false,
            morningHalfDay: null,
            afternoonHalfDay: null,
        },
        {
            event_start_date: new Date(2022, 8, 12).getTime(),
            event_end_date: new Date(2022, 8, 12).getTime(),
            user_name: "Valentine Bott",
            event_theme: "orange",
            pending: false,
            morningHalfDay: null,
            afternoonHalfDay: null,
        },
        {
            event_start_date: new Date(2022, 11, 18).getTime(),
            event_end_date: new Date(2022, 11, 19).getTime(),
            user_name: "Valentine Bott",
            event_theme: "orange",
            pending: true,
            morningHalfDay: null,
            afternoonHalfDay: null,
        },
        {
            event_start_date: new Date(2022, 3, 4).getTime(),
            event_end_date: new Date(2022, 3, 4).getTime(),
            user_name: "Valentine Bott",
            event_theme: "orange",
            pending: false,
            morningHalfDay: null,
            afternoonHalfDay: null,
        },
        {
            event_start_date: new Date(2022, 6, 4).getTime(),
            event_end_date: new Date(2022, 6, 4).getTime(),
            user_name: "Ron Kulbin",
            event_theme: "blue",
            pending: true,
            morningHalfDay: null,
            afternoonHalfDay: true,
        },

        {
            event_start_date: new Date(2022, 6, 25).getTime(),
            event_end_date: new Date(2022, 6, 25).getTime(),
            user_name: "Shaw Malcom",
            event_theme: "green",
            pending: false,
            morningHalfDay: null,
            afternoonHalfDay: null,
        },
        {
            event_start_date: new Date(2022, 6, 31).getTime(),
            event_end_date: new Date(2022, 6, 31).getTime(),
            user_name: "Ria Kinsley",
            event_theme: "yellow",
            pending: false,
            morningHalfDay: null,
            afternoonHalfDay: true,
        },
    ]);

    const expandedEvents = getDatesInRange(events);

    const setModalState = () => {
        setModal(!modal);
    };
    return (
        <>
            <div className="min-h-screen">
                <Router>
                    <Navbar user={user} />

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Routes>
                        {/* <Route path="/about"> */}
                        <Route
                            path="requests"
                            element={
                                <MyRequests
                                    modalHandler={setModalState}
                                    modal={modal}
                                    user={user}
                                    events={events}
                                />
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <Dashboard
                                    events={expandedEvents}
                                    modalHandler={setModalState}
                                    modal={modal}
                                    team={teamMembers}
                                />
                            }
                        />
                    </Routes>
                </Router>
            </div>
        </>
    );
}
