import { PlusIcon } from "@heroicons/react/solid";

export const NewRequestButton = ({ modalHandler }) => {
    return (
        <div className="flex justify-center align-center rounded-lg mr-2 bg-orange-600">
            <button
                className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer text-white hover:bg-orange-700 p-3 items-center focus:outline-none"
                onClick={modalHandler}
            >
                <PlusIcon className="h-5 w-5 inline-flex leading-none" />
                <p className="ml-1 text-md font-normal">New Request</p>
            </button>
        </div>
    );
};
