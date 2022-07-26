import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { MyRequests } from "./components/MyRequests";
import { Profile } from "./components/Profile";
import { useQuery } from "react-query";
import { getUserDetails } from "./db/getUserDetails";
import { getTeam } from "./db/getTeam";
import { getUserTeam } from "./db/getUserTeam";
import { EventThemes } from "./utils/colors";
import { getTeamRequests } from "./db/getTeamRequests";

export const UserContext = createContext();
export const RequestContext = createContext();
export const TeamContext = createContext();

export default function Example() {
    const userData = useQuery("user", () => getUserDetails(loggedInUser.name));

    if (userData.isError) {
        console.error(userData.error);
    }

    if (userData.isLoading) {
        console.log("Loading user data...");
    }

    if (!userData.data) {
        console.log("Waiting for data...");
    }

    const userTeamId = userData.data?.team_id;

    const teamData = useQuery(["team", userTeamId], () => getTeam(userTeamId), {
        enabled: !!userTeamId,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            let currentData = [...data];
            const availableColors = [...EventThemes].filter(
                (c) => c !== userData.data.event_theme.toLowerCase()
            );
            for (let i in currentData) {
                if (currentData[i].name === userData.data.name) {
                    continue;
                }
                currentData[i].event_theme = availableColors[i];
            }
            setTeamMembers(currentData);
        },
    });

    if (teamData.isError) {
        console.error(teamData.error);
    }

    if (teamData.isLoading) {
        console.log("Loading team data...");
    }

    const teamDataOk = teamData?.data;

    const userTeam = useQuery(
        ["userTeam", userTeamId],
        () => getUserTeam(userTeamId),
        {
            enabled: !!teamDataOk,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                setTeamName(data.name);
            },
        }
    );

    if (userTeam.isError) {
        console.error(teamData.error);
    }

    if (userTeam.isLoading) {
        console.log("Loading user team...");
    }

    const userTeamOk = userTeam?.data;

    const teamRequests = useQuery(
        ["teamRequests", userTeamId],
        () => getTeamRequests(userTeamId),
        {
            enabled: !!userTeamOk,
            onSuccess: data => setEvents(data)
        }
    );

    if (teamRequests.isError) {
        console.error(teamData.error);
    }

    if (teamRequests.isLoading) {
        console.log("Loading user team...");
    }

    const [teamName, setTeamName] = useState("");
    const [modal, setModal] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({
        name: "Valentine Bott",
        email: "valentine.bott@infinityworks.com",
    });
    const [teamMembers, setTeamMembers] = useState([]);
    const [events, setEvents] = useState([]);

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
                        <TeamContext.Provider value={teamData}>
                            <RequestContext.Provider value={teamRequests}>
                                <Navbar />
                                <Routes>
                                    <Route
                                        path="/profile"
                                        element={
                                            <Profile
                                                team={teamName}
                                                teamMembers={teamData.data}
                                            />
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
                                                setExpandedEvents={
                                                    setExpandedEvents
                                                }
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
                                                teamData={teamData}
                                                setExpandedEvents={
                                                    setExpandedEvents
                                                }
                                                addEventHandler={addEvent}
                                            />
                                        }
                                    />
                                </Routes>
                            </RequestContext.Provider>
                        </TeamContext.Provider>
                    </UserContext.Provider>
                </Router>
            </div>
        </>
    );
}
