import { UserRequests } from "./UserRequests";
import { RequestModal } from "./RequestModel";

export const MyRequests = ({ modal, modalHandler, events, user, deleteHandler, setEvents, expandedEvents }) => {
    return (
        <main>
            {modal && <RequestModal modalHandler={modalHandler} setEvents={setEvents} events={events} user={user} expandedEvents={expandedEvents} />}
            <UserRequests
                modalHandler={modalHandler}
                events={events}
                user={user}
                deleteHandler={deleteHandler}
            />
        </main>
    );
};
