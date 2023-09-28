import Image from "next/image";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

import {
  FaBars as Bars3Icon,
  FaCalendar as CalendarIcon,
  FaFileInvoiceDollar as ChartPieIcon,
  FaCopy as DocumentDuplicateIcon,
  FaFolder as FolderIcon,
  FaHome as HomeIcon,
  FaUsers as UsersIcon,
  FaTimes as XMarkIcon,
  FaChevronDown as ChevronDownIcon,
  FaCog as Cog6ToothIcon,
  FaSearch as MagnifyingGlassIcon,
  FaBell as BellIcon,
} from "react-icons/fa";

import { useUser } from "@/models/user/useUser";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({
  content,
}: {
  content: React.ReactNode | React.ReactNode[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { user, setUser } = useUser();
  const router = useRouter(); // <-- Use the useRouter hook

  const currentPath = router.pathname; // Get the current pathname

  const navigation = [
    {
      name: "Overview",
      href: `/overview/${user.address}`,
      icon: HomeIcon,
      current: currentPath.startsWith("/overview/"),
    },
    {
      name: "Stats",
      href: `/stats/${user.address}`,
      icon: UsersIcon,
      current: currentPath.startsWith("/stats/"),
    },
    {
      name: "Extrinsics",
      href: `/extrinsics/${user.address}`,
      icon: FolderIcon,
      current: currentPath.startsWith("/extrinsics/"),
    },
    {
      name: "Rewards",
      href: `/rewards/${user.address}`,
      icon: CalendarIcon,
      current: currentPath.startsWith("/rewards/"),
    },
    {
      name: "Badges",
      href: `/badges/${user.address}`,
      icon: DocumentDuplicateIcon,
      current: currentPath.startsWith("/badges/"),
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchValue) {
      setUser({ address: searchValue, publicKey: null }); // publicKey will be calculated in the UserStateProvider
      router.push(`/overview/${searchValue}`);
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image
                        className="h-8 w-auto"
                        src="/dotly_logo.svg"
                        alt="Dotly"
                        width={20}
                        height={20}
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-indigo-700 text-white"
                                      : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-indigo-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-800 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                className="h-8 w-auto"
                src="/dotly_logo.svg"
                alt="Dotly"
                width={20}
                height={20}
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-2">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-polkadotpurple text-white"
                              : "text-white hover:bg-polkadotpurple hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-white-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                  >
                    <BellIcon
                      className="h-5 w-5 shrink-0 text-indigo-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Report a Problem
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form
                onSubmit={handleSearchSubmit}
                className="relative flex flex-1"
                action="#"
                method="GET"
              >
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search for an account"
                  type="search"
                  name="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="/polkadot-logo.jpg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {user?.address}
                      </span>
                    </span>
                  </Menu.Button>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{content}</div>
          </main>
        </div>
      </div>
    </>
  );
}
