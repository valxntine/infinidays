import { Disclosure } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../static/logo.svg";
import { NavLink } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Requests", href: "requests" },
  { name: "My Profile", href: "profile" },
];

export const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-zinc-800">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-8 w-8" src={logo} alt="Infinidays Logo" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({isActive}) => 
                          [
                            "px-3 py-2 rounded-md text-sm font-medium",
                            isActive ? "bg-orange-600 text-white" : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                          ].filter(Boolean)
                          .join(" ")
                        }
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => {
                            console.log(item)
                            item.current = true
                            console.log(item)
                        }
                    }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center justify-between space-x-3">
                  <button
                    type="button"
                    className="bg-zinc-800 p-1 rounded-full text-zinc-400 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="text-sm font-medium leading-none text-zinc-400">
                    Sign Out
                  </div>

                  {/* Profile dropdown */}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-zinc-800 inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-orange-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-orange-600 text-zinc-800"
                      : "text-zinc-300 hover:bg-zinc-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-zinc-700">
              <div className="flex items-center px-5">
                <div className="ml-3">
                  <div className="text-sm font-medium leading-none text-zinc-400">
                    Sign Out
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto bg-zinc-800 flex-shrink-0 p-1 rounded-full text-zinc-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
