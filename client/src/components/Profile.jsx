import { calculateLeave } from "../utils/calculateleave"
import { NewRequestButton } from "./NewRequestButton"
import { RefreshIcon, TrashIcon } from "@heroicons/react/solid"
import { classNames } from "../utils/classnames"
import { CareerLevels } from "../utils/careerlevels"
import { isWeekend } from "../utils/isweekend"

export const Profile = ({ user, events }) => {
    const output = calculateLeave(user.careerLevel, events, user.name)
    return (
        <>
    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <div className="container mx-auto py-4 px-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="flex items-center justify-center px-8 pt-8 pb-4">
                                <div>
                                    <span className="text-2xl font-bold text-gray-800">
                                        {user.name}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col px-6 py-4 items-center">
                                <p>{user.careerLevel}</p>
                                <p>{user.project}</p>
                                <p>{output.daysTaken}</p>
                                <p>{output.remainingDays}</p>
                                {/* <div className="self-center mb-3 border-b-2 w-10/12" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}
