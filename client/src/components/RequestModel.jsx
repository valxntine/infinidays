import { useForm } from "react-hook-form";

export const RequestModal = ({ modalHandler, events, setEvents, user }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (e) => {
        console.log(JSON.stringify(e, null, 2));
        const startDate = e.firstDayDate.split("-");
        const endDate = e.lastDayDate.split("-");
        const currEvents = [...events];
        const newEvent = {
            id: events.at(-1).id + 1,
            event_start_date: Date.UTC(
                startDate[0],
                startDate[1]-1,
                startDate[2]
            ),
            event_end_date: Date.UTC(endDate[0], endDate[1]-1, endDate[2]),
            user_name: user.name,
            event_theme: user.color,
            pending: true,
            morningHalfDay: false,
            afternoonHalfDay: false,
        };
        setEvents(newEvent);
        modalHandler();
    };
    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full md:max-w-xl">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:flex-col sm:items-start">
                                    <div>
                                        <h3
                                            className="text-lg leading-6 font-medium text-gray-900 mb-4"
                                            id="modal-title"
                                        >
                                            New Leave Request
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 grid-rows-3 gap-y-6 w-full">
                                        <div className="w-full">
                                            <label className="">
                                                <span className="text-zinc-500">
                                                    First Day of Leave
                                                </span>
                                                <div className="flex flex-row items-center">
                                                    <input
                                                        {...register(
                                                            "firstDayDate"
                                                        )}
                                                        type="date"
                                                        className="mt-1 block rounded-md bg-zinc-100 border-transparent focus:border-zinc-500 focus:bg-white focus:ring-0 w-1/2"
                                                        required={true}
                                                        min={
                                                            new Date()
                                                                .toISOString()
                                                                .split("T")[0]
                                                        }
                                                    />
                                                    <div className="flex flex-row items-center">
                                                        <span className="mx-4">
                                                            Half day?
                                                        </span>
                                                        <label>
                                                            am
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox ml-1 mr-4 bg-zinc-100 text-orange-600 focus:border-orange-600 focus:ring-0"
                                                                value="am"
                                                                {...register(
                                                                    "first-halfday"
                                                                )}
                                                                id="first-day-am"
                                                                onClick={
                                                                    uncheckAlternateBox
                                                                }
                                                            />
                                                        </label>
                                                        <label>
                                                            pm
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox ml-1 mr-4 bg-zinc-100 text-orange-600 focus:border-orange-600 focus:ring-0"
                                                                value="pm"
                                                                {...register(
                                                                    "first-halfday"
                                                                )}
                                                                id="first-day-pm"
                                                                onClick={
                                                                    uncheckAlternateBox
                                                                }
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        <label>
                                            <span className="text-zinc-500">
                                                Last Day of Leave
                                            </span>
                                            <div className="flex flex-row items-center">
                                                <input
                                                    {...register("lastDayDate")}
                                                    type="date"
                                                    className="mt-1 block rounded-md bg-zinc-100 border-transparent focus:border-zinc-500 focus:bg-white focus:ring-0 w-1/2"
                                                    required={true}
                                                    min={
                                                        new Date()
                                                            .toISOString()
                                                            .split("T")[0]
                                                    }
                                                />
                                                <div className="flex flex-row items-center">
                                                    <span className="mx-4">
                                                        Half day?
                                                    </span>
                                                    <label>
                                                        am
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox ml-1 mr-4 bg-zinc-100 text-orange-600 focus:border-orange-600 focus:ring-0"
                                                            value="am"
                                                            {...register(
                                                                "last-halfday"
                                                            )}
                                                            id="last-day-am"
                                                            onClick={
                                                                uncheckAlternateBox
                                                            }
                                                        />
                                                    </label>
                                                    <label>
                                                        pm
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox ml-1 mr-4 bg-zinc-100 text-orange-600 focus:border-orange-600 focus:ring-0"
                                                            value="pm"
                                                            {...register(
                                                                "last-halfday"
                                                            )}
                                                            id="last-day-pm"
                                                            onClick={
                                                                uncheckAlternateBox
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </label>
                                        <label>
                                            <span className="text-zinc-500">
                                                Is this Annual Leave?
                                            </span>
                                            <div className="flex flex-row items-center">
                                                <div className="flex flex-row items-center">
                                                    <label>
                                                        Yes
                                                        <input
                                                            type="radio"
                                                            className="form-radio ml-1 mr-4 bg-zinc-100 text-orange-600 focus:border-orange-600 focus:ring-0"
                                                            value="true"
                                                            required={true}
                                                            {...register("al")}
                                                        />
                                                    </label>
                                                    <label>
                                                        No
                                                        <input
                                                            type="radio"
                                                            className="form-radio ml-1 mr-4 bg-zinc-100 text-orange-600 focus:border-orange-600 focus:ring-0"
                                                            value="false"
                                                            required={true}
                                                            {...register("al")}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <input
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    value="Create Request"
                                />

                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-zinc-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={modalHandler}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const uncheckAlternateBox = (checkbox) => {
    let checkboxes = document.getElementsByName(checkbox.target.name);
    checkboxes.forEach((box) => {
        if (box.value !== checkbox.target.value) box.checked = false;
    });
};
