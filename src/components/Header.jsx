import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CoderContext } from "../context/CoderProvider";
import {
  coder0,
  coder1,
  coder2,
  coder3,
  coder4,
  coder5,
  coder6,
} from "../assets/avatars";

import { fetchAvatar } from "../pages/AgentResponse/agentResponse";
import { DarkModeContext } from "../context/DarkModeProvider";

const allAvatars = { coder0, coder1, coder2, coder3, coder4, coder5, coder6 };

const navigation = [
  { name: "Home", href: "/", current: false },
  {
    name: "Code Workspace",
    current: false,
    children: [
      { name: "Generate", href: "/generate" },
      { name: "My Codes", href: "/allcodes" },
    ],
  },
  {
    name: "Interview Workspace",
    current: false,
    children: [
      { name: "Mock Interview", href: "/interview-prep" },
      { name: "My Interviews", href: "/interview-prep/myInterviews" },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { coder, logout } = useContext(CoderContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(coder0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAvatar();
        setAvatar(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Disclosure
      as="nav"
      className="
        z-50 sticky top-0 relative
        bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100
        dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
        after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 
        after:h-px after:bg-black/10 dark:after:bg-white/10
        transition-colors duration-400
      "
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton
              className="group relative inline-flex items-center justify-center rounded-md p-2 
              text-gray-700 hover:bg-gray-200 hover:text-gray-900 
              dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white
              focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
            >
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center h-16 w-16 overflow-hidden">
              <img
                src="/logo.png"
                alt="logo"
                className="h-full w-auto -rotate-12 cursor-pointer object-cover"
                onClick={() => navigate("/", { replace: true })}
              />
            </div>

            <div className="flex flex-1 items-center justify-center sm:justify-center">
              <div className="hidden sm:flex sm:items-center">
                <div className="flex space-x-4">
                  {navigation.map((item) =>
                    item.children ? (
                      <Menu as="div" className="relative" key={item.name}>
                        <MenuButton
                          className={classNames(
                            "flex items-center gap-1 text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium transition-colors"
                          )}
                        >
                          {item.name}
                          <svg
                            className="w-4 h-4 transition-transform duration-200 group-data-open:rotate-180"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </MenuButton>
                        <MenuItems
                          transition
                          className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md 
              bg-gray-100 dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10 
              transition data-closed:scale-95 data-closed:opacity-0"
                        >
                          {item.children.map((child) => (
                            <MenuItem key={child.name}>
                              <Link
                                to={child.href}
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                              >
                                {child.name}
                              </Link>
                            </MenuItem>
                          ))}
                        </MenuItems>
                      </Menu>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                            : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors"
                        )}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="relative rounded-full p-2 transition-colors duration-300 
              text-gray-700 hover:text-yellow-500 dark:text-gray-300 dark:hover:text-indigo-400
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            {darkMode ? (
              <MoonIcon className="h-6 w-6 animate-pulse text-indigo-400 hover:scale-110 transition" />
            ) : (
              <SunIcon className="h-6 w-6 animate-pulse text-yellow-500 hover:scale-110 transition" />
            )}
          </button>
          {coder && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  <img
                    alt=""
                    src={allAvatars[avatar]}
                    className="size-8 rounded-full bg-gray-300 dark:bg-gray-800 outline -outline-offset-1 outline-white/10"
                  />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md 
                    bg-gray-100 dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 dark:ring-white/10 
                    transition data-closed:scale-95 data-closed:opacity-0"
                >
                  <MenuItem>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                    >
                      Your profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="/allcodes"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                    >
                      My Codes
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="/interview-prep/myInterviews"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                    >
                      My Interviews
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name}>
                <DisclosureButton className="flex items-center justify-between w-full rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white">
                  {item.name}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </DisclosureButton>
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => (
                    <DisclosureButton
                      key={child.name}
                      as="a"
                      href={child.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      {child.name}
                    </DisclosureButton>
                  ))}
                </div>
              </div>
            ) : (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                    : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors"
                )}
              >
                {item.name}
              </DisclosureButton>
            )
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
