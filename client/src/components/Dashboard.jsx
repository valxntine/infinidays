import Calendar from "./Calendar";
import { useState } from "react";
import { classNames } from "../utils/classnames";
import { eventClass } from "../utils/eventclass";

export const Dashboard = () => {
  const [events, setEvents] = useState([
    {
      event_date: new Date(2022, 6, 4),
      user_name: "Phoebe Gash",
      event_theme: "red",
    },

    {
      event_date: new Date(2022, 6, 4),
      user_name: "Valentine Bott",
      event_theme: "orange",
    },

    {
      event_date: new Date(2022, 6, 4),
      user_name: "Ron Kulbin",
      event_theme: "blue",
    },

    {
      event_date: new Date(2022, 6, 25),
      user_name: "Shaw Malcom",
      event_theme: "green",
    },
    {
      event_date: new Date(2022, 6, 31),
      user_name: "Ria Kinsley",
      event_theme: "yellow",
    },
  ]);
  return (
    <>
      <header className="bg-white shadow">
        <div className="flex justify-around max-w-7xl mx-auto py-2 px-2 sm:px-4 lg:px-6">
          {events.map((e) => (
            <span>
              <span
                className={classNames(
                  eventClass(e.event_theme),
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
            <Calendar events={events} />
          </div>
        </div>
      </main>
    </>
  );
};
