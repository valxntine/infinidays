import { calculateLeave } from "../utils/calculateleave";
import { NewRequestButton } from "./NewRequestButton";
import { RefreshIcon, TrashIcon } from "@heroicons/react/solid";
import { classNames } from "../utils/classnames";
import { CareerLevels } from "../utils/careerlevels";
import { isWeekend } from "../utils/isweekend";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "../utils/randomavatar";
import { useEffect, useState, useContext } from "react";
import { RequestContext, UserContext } from "../App";
import { getDatesInRange } from "../utils/getrangeofdates";

export const Profile = ({ team, teamMembers }) => {
    const { data: user } = useContext(UserContext);
    const { data: requests } = useContext(RequestContext)
    const [avatar, setAvatar] = useState(null);


    useEffect(() => {
        setAvatar(
            <Avatar
                className="w-40 h-40 mb-10"
                avatarStyle="Circle"
                {...generateRandomAvatarOptions()}
            />
        );
    }, []);
    if (user && requests) {
        const events = getDatesInRange(requests, teamMembers, user)
    const output = calculateLeave(user.career_level, events, user.name);
        console.log(user)
        console.log(events)
        return (
            <>
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 sm:px-0">
                        <div className="container mx-auto py-4 px-6">
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="flex items-center justify-center px-8 pt-8">
                                    <div className="flex flex-col items-center">
                                        <span className="text-5xl font-bold text-zinc-800 mb-2">
                                            {user.name}
                                        </span>
                                        <span className="text-3xl font-bold text-zinc-600">
                                            {user.career_level}
                                            {" - "}
                                            {CareerLevels[user.career_level]}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col px-6 pb-6 items-center">
                                    {avatar}
                                    <div className="flex flex-col w-3/5 justify-between pb-5">
                                        <p className="text-2xl font-bold text-zinc-600 border-b">
                                            Current Project:
                                        </p>
                                        <p className="text-xl font-bold">
                                            {team}
                                        </p>
                                    </div>
                                    <div className="flex flex-col w-3/5 justify-between pb-5">
                                        <p className="text-2xl font-bold text-zinc-600 border-b">
                                            Days of Annual Leave booked:{" "}
                                        </p>
                                        <p className="text-xl font-bold">
                                            {output.daysTaken}
                                        </p>
                                    </div>
                                    <div className="flex flex-col w-3/5 justify-between pb-5">
                                        <p className="text-2xl font-bold text-zinc-600 border-b">
                                            Days of Annual Leave remaining:{" "}
                                        </p>
                                        <p className="text-xl font-bold">
                                            {output.remainingDays}
                                        </p>
                                    </div>
                                    {/* <div className="self-center mb-3 border-b-2 w-10/12" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};
