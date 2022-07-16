import { UserRequests } from "./UserRequests";
import { RequestModal } from "./RequestModel";

export const MyRequests = ({ modal, modalHandler, events, user, deleteHandler, setEvents }) => {
    return (
        <main>
            {modal && <RequestModal modalHandler={modalHandler} setEvents={setEvents} events={events} user={user} />}
            <UserRequests
                modalHandler={modalHandler}
                events={events}
                user={user}
                deleteHandler={deleteHandler}
            />
        </main>
    );
};
