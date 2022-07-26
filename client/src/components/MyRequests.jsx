import { UserRequests } from "./UserRequests";
import { RequestModal } from "./RequestModel";
import { useContext } from "react";
import { UserContext } from "../App";

export const MyRequests = ({
    modal,
    modalHandler,
    events,
    deleteHandler,
    setEvents,
    expandedEvents,
    addEventHandler,
    setExpandedEvents,
}) => {
    const { data: user } = useContext(UserContext);
    if (user) {
        return (
            <main>
                {modal && (
                    <RequestModal
                        modalHandler={modalHandler}
                        setEvents={setEvents}
                        events={events}
                        user={user}
                        expandedEvents={expandedEvents}
                        addEventHandler={addEventHandler}
                        setExpandedEvents={setExpandedEvents}
                    />
                )}
                <UserRequests
                    modalHandler={modalHandler}
                    events={events}
                    user={user}
                    deleteHandler={deleteHandler}
                />
            </main>
        );
    }
};
