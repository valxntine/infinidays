import { Calendar } from "./Calendar";
import { classNames } from "../utils/classnames";
import { eventClass } from "../utils/eventclass";
import { RequestModal } from "./RequestModel";
import { useContext } from "react";
import { UserContext } from "../App";

export const Dashboard = ({
    expandedEvents,
    events,
    modal,
    modalHandler,
    team,
    setExpandedEvents,
    addEventHandler,
}) => {
    const { data: user } = useContext(UserContext);
    if (user) {
        return (
            <>
                {modal && (
                    <RequestModal
                        modalHandler={modalHandler}
                        setExpandedEvents={setExpandedEvents}
                        events={events}
                        expandedEvents={expandedEvents}
                        addEventHandler={addEventHandler}
                        team={team}
                    />
                )}
                <header className="bg-white shadow">
                    <div className="flex flex-wrap justify-around max-w-7xl mx-auto py-2 px-2 sm:px-4 lg:px-6">
                        <span key={user.name}>
                            <span
                                className={classNames(
                                    eventClass(user),
                                    "mx-2 px-1.5 rounded-lg border text-xs leading-tight"
                                )}
                            >
                                {" "}
                            </span>
                            {user.name}
                        </span>
                        {team.map((t) =>
                            t.name !== user.name ? (
                                <span key={t.name}>
                                    <span
                                        className={classNames(
                                            eventClass(t),
                                            "mx-2 px-1.5 rounded-lg border text-xs leading-tight"
                                        )}
                                    >
                                        {" "}
                                    </span>
                                    {t.name}
                                </span>
                            ) : (
                                ""
                            )
                        )}
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="px-4 sm:px-0">
                            <Calendar
                                events={expandedEvents}
                                modalHandler={modalHandler}
                            />
                        </div>
                    </div>
                </main>
            </>
        );
    }
};
