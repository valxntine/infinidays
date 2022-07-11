import {
    ArrowLeftIcon,
    ArrowRightIcon,
    PlusIcon,
    RefreshIcon,
} from "@heroicons/react/solid";

export const UserRequests = ({ modalHandler, events, user }) => {
    return (
        <>
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
                                    <div className="border rounded-lg px-1 pt-1 mr-2">
                                        <button
                                            className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none"
                                            onClick={modalHandler}
                                        >
                                            <PlusIcon className="h-5 w-5 text-gray-500 inline-flex leading-none" />
                                            <p className="ml-1 text-md text-gray-600 font-normal">
                                                New Request
                                            </p>
                                        </button>
                                    </div>
                                    <div className="border rounded-lg px-1 pt-1 mr-2">
                                        <button className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none">
                                            <RefreshIcon className="h-5 w-5 text-gray-500 inline-flex leading-none" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-between px-6 py-4">
                                <div className="flex flex-col self-center border-b-2 w-10/12" />
                                {events
                                    .filter((e) => {
                                        return e.user_name === user.name;
                                    })
                                    .map((e) => {
                                        return (
                                            <div>
                                                {new Date(
                                                    e.event_start_date
                                                ).toDateString()}{" "}
                                                ->{" "}
                                                {new Date(
                                                    e.event_end_date
                                                ).toDateString()}
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
