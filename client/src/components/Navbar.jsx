import { Disclosure } from "@headlessui/react";
import logo from "../static/logo.svg";
import { NavLink } from "react-router-dom";
import { classNames } from "../utils/classnames";
import { useContext } from "react";
import { UserContext } from "../App";

const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Requests", href: "requests" },
    { name: "My Profile", href: "profile" },
];

export const Navbar = () => {
    const { data } = useContext(UserContext);
    if (data) {
        return (
            <Disclosure as="nav" className="bg-zinc-800">
                {({ open }) => (
                    <>
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8"
                                            src={logo}
                                            alt="Infinidays Logo"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}
                                                    className={({ isActive }) =>
                                                        classNames(
                                                            "px-3 py-2 rounded-md text-sm font-medium",
                                                            isActive
                                                                ? "bg-orange-600 text-white"
                                                                : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
                                                        )
                                                    }
                                                    aria-current={
                                                        item.current
                                                            ? "page"
                                                            : undefined
                                                    }
                                                    onClick={() => {
                                                        item.current = true;
                                                    }}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="flex items-center justify-between space-x-3">
                                        <div className="text-sm font-medium leading-none text-zinc-400">
                                            {data.name}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button
                                <Disclosure.Button className="bg-zinc-800 inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-orange-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div> 
                            */}
                            </div>
                        </div>

                        {/* <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={({ isActive }) =>
                                        classNames(
                                            isActive
                                                ? "bg-orange-600 text-zinc-800"
                                                : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                                            "block px-3 py-2 rounded-md text-base font-medium"
                                        )
                                    }
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-zinc-700">
                            <div className="flex items-center px-5">
                                <div className="ml-3">
                                    <div className="text-sm font-medium leading-none text-zinc-400">
                                        Sign Out
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Disclosure.Panel> */}
                    </>
                )}
            </Disclosure>
        );
    }
};
