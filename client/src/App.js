import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { MyRequests } from "./components/MyRequests";
import { Profile } from "./components/Profile";
import { getDatesInRange } from "./utils/getrangeofdates";
import { useQuery } from "react-query";
import { getUserDetails } from "./db/getUserDetails";
import { getTeam } from "./db/getTeam";
import { getUserTeam } from "./db/getUserTeam";
import { EventThemes } from "./utils/colors";
    
export const UserContext = createContext()

export default function Example() {
    const userData = useQuery("user", () => getUserDetails(loggedInUser.name))

    if (userData.isError) {
        console.error(userData.error)
    }

    if (userData.isLoading) {
        console.log("Loading user data...")
    }
   
    if (!userData.data) {
        console.log("Waiting for data...")
    }

    const userTeamId = userData.data?.team_id

    const teamData = useQuery(["team", userTeamId], () => getTeam(userTeamId), {
        enabled: !!userTeamId,
        refetchOnWindowFocus: false,
        onSuccess: data => {
            let currentData = [...data]
            const availableColors = [...EventThemes].filter(c => c !== userData.data.event_theme.toLowerCase())
            for(let i in currentData) {
                if (currentData[i].name === userData.data.name) {
                    continue
                }
                currentData[i].event_theme = availableColors[i]
            } 
            setTeamMembers(currentData)
            setExpandedEvents((curr) => [...getDatesInRange(events, currentData)]);
        }
    })

    if (teamData.isError) {
        console.error(teamData.error)
    }

    if (teamData.isLoading) {
        console.log("Loading team data...")
    }

    const userTeam = useQuery(["userTeam", userTeamId], () => getUserTeam(userTeamId), {
        enabled: !!userTeamId,
        refetchOnWindowFocus: false,
        onSuccess: data => {
            setTeamName(data.name)
        }
    })
    
    
    const [teamName, setTeamName] = useState("")
    const [modal, setModal] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({
        name: "Valentine Bott",
        email: "valentine.bott@infinityworks.com"
    })
    const [teamMembers, setTeamMembers] = useState([]);
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
            annualLeave: true,
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
            annualLeave: true,
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
            annualLeave: true,
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
            annualLeave: true,
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
            annualLeave: true,
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
            annualLeave: true,
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
            annualLeave: true,
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
            annualLeave: true,
        },
    ]);

    const addEvent = (event) => {
        setEvents((curr) => [...curr, event]);
    };

    const deleteEvent = (id) => {
        let currEvents = [...events];
        const newEvents = currEvents.filter((e) => e.id !== id);
        setEvents(newEvents);
    };

    const [expandedEvents, setExpandedEvents] = useState([]);

    // useEffect(() => {
    //     setExpandedEvents((curr) => [...getDatesInRange(events, teamData.data)]);
    // }, [events, teamData.data]);

    const setModalState = () => {
        setModal(!modal);
    };
    return (
        <>
            <div className="min-h-screen">
                <Router>
                <UserContext.Provider value={userData}>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/profile"
                            element={
                                <Profile team={teamName} events={expandedEvents} />
                            }
                        />
                        <Route
                            path="/requests"
                            element={
                                <MyRequests
                                    modalHandler={setModalState}
                                    modal={modal}
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
                                    setExpandedEvents={setExpandedEvents}
                                    addEventHandler={addEvent}
                                />
                            }
                        />
                    </Routes>
                </UserContext.Provider>
                </Router>
            </div>
        </>
    );
}
