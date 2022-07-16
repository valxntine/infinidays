export const ConfirmDeleteModal = ({
    modalHandler,
    deleteHandler,
    selectedEvent,
}) => {
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
                        <div className="flex flex-col bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:flex-col sm:items-start">
                                <div>
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900 mb-4"
                                        id="modal-title"
                                    >
                                        Are you sure?
                                    </h3>
                                    <p>
                                        Please confirm you'd like to cancel your
                                        leave for:
                                    </p>
                                    <p>
                                        {new Date(
                                            selectedEvent.event_start_date
                                        ).toDateString()}{" "}
                                        to{" "}
                                        {new Date(
                                            selectedEvent.event_end_date
                                        ).toDateString()}
                                    </p>
                                </div>
                                <div className="w-full bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            modalHandler();
                                            deleteHandler(selectedEvent.id);
                                        }}
                                    >
                                        Confirm
                                    </button>

                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-zinc-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={modalHandler}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
