import { UserRequests } from "./UserRequests";
import { RequestModal } from "./RequestModel";

export const MyRequests = ({ modal, modalHandler, events, user }) => {
    return (
        <main>
            {modal && <RequestModal modalHandler={modalHandler} />}
            <UserRequests
                modalHandler={modalHandler}
                events={events}
                user={user}
            />
        </main>
    );
};
