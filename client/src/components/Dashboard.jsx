import { Calendar } from "./Calendar";
import { useState } from "react";
import { classNames } from "../utils/classnames";
import { eventClass } from "../utils/eventclass";
import { RequestModal } from "./RequestModel";

export const Dashboard = ({ events, modal, modalHandler, team }) => {
    return (
        <>
            {modal && <RequestModal modalHandler={modalHandler} />}
            <header className="bg-white shadow">
                <div className="flex justify-around max-w-7xl mx-auto py-2 px-2 sm:px-4 lg:px-6">
                    {team.map((e) => (
                        <span>
                            <span
                                className={classNames(
                                    eventClass(e.color),
                                    "mx-1 px-1.5 rounded-lg border text-xs leading-tight"
                                )}
                            >
                                {" "}
                            </span>
                            {e.user_name}
                        </span>
                    ))}
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 sm:px-0">
                        <Calendar events={events} modalHandler={modalHandler} />
                    </div>
                </div>
            </main>
        </>
    );
};
