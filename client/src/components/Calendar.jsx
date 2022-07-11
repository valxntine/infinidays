import { useEffect, useState } from "react";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    PlusIcon,
    RefreshIcon,
} from "@heroicons/react/solid";
import { classNames } from "../utils/classnames";
import { eventClass } from "../utils/eventclass";
import { getDatesInRange } from "../utils/getrangeofdates";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Calendar = ({ events, modalHandler }) => {
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [numOfDays, setNumOfDays] = useState([]);
    const [emptyDays, setEmptyDays] = useState([]);

    const isToday = (date) => {
        const today = new Date();
        const d = new Date(year, month, date);

        return today.toDateString() === d.toDateString();
    };

    const calculateAndSetNumberOfDays = () => {
        let i;
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        // find where to start calendar day of week
        let dayOfWeek = new Date(year, month).getDay();
        let emptyDaysArray = [];
        for (i = 1; i <= dayOfWeek; i++) {
            emptyDaysArray.push(i);
        }

        let daysArray = [];
        for (i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        setEmptyDays(emptyDaysArray);
        setNumOfDays(daysArray);
    };

    useEffect(() => {
        calculateAndSetNumberOfDays();
        console.log(month, year);
    }, [month]);

    const nextMonth = () => {
        if (month === 11) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
        calculateAndSetNumberOfDays();
    };

    const previousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
        calculateAndSetNumberOfDays();
    };

    return (
        <>
            <div className="container mx-auto py-4 px-6">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <div>
                            <span className="text-lg font-bold text-gray-800">
                                {monthNames[month]}
                            </span>
                            <span className="ml-1 text-lg text-gray-600 font-normal">
                                {year}
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
                            <div className="border rounded-lg px-1 pt-1">
                                {/* Previous Month Button */}
                                <button
                                    type="button"
                                    onClick={() => previousMonth()}
                                    className={
                                        "leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none"
                                    }
                                >
                                    <ArrowLeftIcon className="h-6 w-6 text-gray-500 inline-flex leading-none" />
                                </button>
                                <div className="border-r inline-flex h-6" />
                                {/* Next Month Button */}
                                <button
                                    type="button"
                                    onClick={() => nextMonth()}
                                    className={
                                        "leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none"
                                    }
                                >
                                    <ArrowRightIcon className="h-6 w-6 text-gray-500 inline-flex leading-none" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="-mx-1 -mb-1">
                        <div
                            className="flex flex-wrap -mb-8"
                            style={{ marginBottom: "-30px" }}
                        >
                            {days.map((day) => (
                                <div key={day} className="px-2 py-2 w-[14.28%]">
                                    <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                                        {day}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-wrap">
                            {emptyDays.map((emptyDay) => (
                                <div
                                    key={emptyDay}
                                    className="text-center border-r border-b px-4 pt-2 h-32 w-[14.28%]"
                                />
                            ))}
                            {numOfDays.map((date, index) => (
                                <div
                                    key={index}
                                    className="px-4 pt-2 border-r border-b relative h-32 w-[14.28%]"
                                >
                                    <div
                                        className={classNames(
                                            isToday(date)
                                                ? "bg-orange-600 text-white"
                                                : "text-gray-700",
                                            "inline-flex w-6 h-6 items-center cursor-default justify-center text-center leading-none rounded-full transition ease-in-out duration-100"
                                        )}
                                    >
                                        {date}
                                    </div>
                                    <span className="float-right text-xs opacity-30">
                                        {
                                            events.filter(
                                                (e) =>
                                                    new Date(
                                                        e.event_epoch
                                                    ).toDateString() ===
                                                    new Date(
                                                        year,
                                                        month,
                                                        date
                                                    ).toDateString()
                                            ).length
                                        }
                                    </span>

                                    <div className="overflow-y-auto mt-1 h-20 flex-col ">
                                        {events
                                            .filter(
                                                (e) =>
                                                    new Date(
                                                        e.event_epoch
                                                    ).toDateString() ===
                                                    new Date(
                                                        year,
                                                        month,
                                                        date
                                                    ).toDateString()
                                            )
                                            .map((e) => (
                                                <div
                                                    key={e.user_name}
                                                    className={classNames(
                                                        eventClass(
                                                            e.event_theme
                                                        ),
                                                        e.pending
                                                            ? "opacity-30"
                                                            : "",
                                                        e.morningHalfDay ===
                                                            true
                                                            ? "w-1/2"
                                                            : "",
                                                        e.afternoonHalfDay ===
                                                            true
                                                            ? "w-1/2 ml-auto"
                                                            : "",
                                                        "px-1 py-1 rounded-lg overflow-hidden border"
                                                    )}
                                                >
                                                    <p className="text-[0.75em] leading-[0.5em] text-center">
                                                        {e.pending && "pending"}
                                                    </p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
