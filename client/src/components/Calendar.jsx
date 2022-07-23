import { useEffect, useState } from "react";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    RefreshIcon,
} from "@heroicons/react/solid";
import { classNames } from "../utils/classnames";
import { eventClass } from "../utils/eventclass";
import { isWeekend } from "../utils/isweekend";
import { NewRequestButton } from "./NewRequestButton";

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

    const resetToToday = () => {
        const now = new Date()
        const nowMonth = now.getMonth()
        const nowYear = now.getFullYear()
        setYear(nowYear)
        setMonth(nowMonth)
    }

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
                            <NewRequestButton modalHandler={modalHandler} />
                            <div className="flex justify-center align-center rounded-lg mr-2 border ">
                                <button className="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer text-white hover:bg-gray-200 p-3 items-center focus:outline-none">
                                    <RefreshIcon className="h-5 w-5 inline-flex leading-none text-gray-500" />
                                </button>
                            </div>
                            <div className="border rounded-lg flex flex-row">
                                {/* Previous Month Button */}
                                <button
                                    type="button"
                                    onClick={() => previousMonth()}
                                    className={
                                        "leading-none rounded-l-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-3 items-center focus:outline-none"
                                    }
                                >
                                    <ArrowLeftIcon className="h-5 w-5 text-gray-500 inline-flex leading-none" />
                                </button>
                                <div className="border-l inline-flex h-11" />
                                <button
                                    type="button"
                                    onClick={() => resetToToday()}
                                    className={
                                        "leading-none transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center focus:outline-none"
                                    }
                                >
                                    <span className="h-5 w-auto text-gray-500 inline-flex leading-none">
                                        Today
                                    </span>
                                </button>
                                <div className="border-r inline-flex h-11" />
                                {/* Next Month Button */}
                                <button
                                    type="button"
                                    onClick={() => nextMonth()}
                                    className={
                                        "leading-none rounded-r-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-3 items-center focus:outline-none"
                                    }
                                >
                                    <ArrowRightIcon className="h-5 w-5 text-gray-500 inline-flex leading-none" />
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
                                <div key={day} className="px-2 py-2 w-[14.28%] z-50">
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
                                    className={classNames(
                                            isWeekend(year, month, date)
                                            ? "bg-zinc-200"
                                            : "z-1000",
                                            isToday(date)
                                            ? "border-zinc-800 border-2"
                                            : "",
                                        "px-4 pt-2 border relative h-32 w-[14.28%]"
                                    )}
                                >
                                    <div className={"inline-flex w-6 h-6 items-center cursor-default justify-center text-center leading-none rounded-full transition ease-in-out duration-100"}>
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
                                                new Date(e.event_epoch).getDay() === 0 || new Date(e.event_epoch).getDay() === 6 ? "" 
                                                :
                                                <div
                                                    key={`${e.user_name}-${e.event_epoch + (Math.random() * 1000)}`}
                                                    className={classNames(
                                                        eventClass(e),
                                                        e.firstHalfDay ===
                                                            true
                                                            ? "w-1/2"
                                                            : "",
                                                        e.lastDayHalf ===
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
