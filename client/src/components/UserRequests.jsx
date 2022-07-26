import { RefreshIcon, TrashIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { classNames } from "../utils/classnames";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { NewRequestButton } from "./NewRequestButton";

export const UserRequests = ({ modalHandler, events, user, deleteHandler }) => {
    const [deleteEventModalState, setDeleteEventModalState] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const setModalState = () => {
        setDeleteEventModalState(!deleteEventModalState);
    };

    return (
        <>
            {deleteEventModalState && (
                <ConfirmDeleteModal
                    deleteHandler={deleteHandler}
                    modalHandler={setModalState}
                    selectedEvent={selectedEvent}
                />
            )}
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="container mx-auto py-4 px-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="flex items-center justify-between px-8 pt-8 pb-4">
                                <div>
                                    <span className="text-lg font-bold text-gray-800">
                                        My Requests
                                    </span>
                                </div>
                                <div className="flex end justify-center content-center">
                                    <NewRequestButton
                                        modalHandler={modalHandler}
                                    />
                                    <div className="flex justify-center align-center rounded-lg mr-2 border ">
                                        <button className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer text-white hover:bg-gray-200 p-3 items-center focus:outline-none">
                                            <RefreshIcon className="h-5 w-5 inline-flex leading-none text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col px-6 py-4">
                                {/* <div className="self-center mb-3 border-b-2 w-10/12" /> */}
                                {events
                                    .sort(
                                        (a, b) =>
                                            a.start_date -
                                            b.start_date
                                    )
                                    .filter((e) => {
                                        return e.employee_name === user.name;
                                    })
                                    .map((e) => {
                                        return (
                                            <div
                                                className={classNames(
                                                    e.pending
                                                        ? "border-orange-500"
                                                        : "border-green-500",
                                                    "flex flex-row justify-between border-2 rounded-lg p-2 mb-2"
                                                )}
                                                key={e.id}
                                            >
                                                <div>
                                                    <span>
                                                        {new Date(
                                                            e.start_date
                                                        ).toDateString()}
                                                        {" - "}
                                                        {new Date(
                                                            e.end_date
                                                        ).toDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row items-center">
                                                    <span>
                                                        {e.pending
                                                            ? "PENDING"
                                                            : "APPROVED"}
                                                    </span>
                                                    <div className="flex justify-center align-center rounded-lg ml-2 border ">
                                                        <button
                                                            className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer text-white hover:bg-gray-200 p-1 items-center focus:outline-none"
                                                            onClick={() => {
                                                                setSelectedEvent(
                                                                    e
                                                                );
                                                                setDeleteEventModalState(
                                                                    !deleteEventModalState
                                                                );
                                                            }}
                                                        >
                                                            <TrashIcon className="h-5 w-5 inline-flex leading-none text-gray-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ;
        </>
    );
};
