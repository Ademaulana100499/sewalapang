// import React from "react";
// import Link from "next/link";
//
// export const Navbar = () => {
//
//   return (
//     <div className="flex justify-between bg-red-500">
//       <Link href="/">Navbar</Link>
//       <Link href="/explore">Explore</Link>

//       {loading ? (
//         <p>Loading...</p>
//       ) : token ? (
//         <Link href="/profile">
//           {data?.name} <br />
//           <p className="text-sm">{data?.role}</p>
//         </Link>
//       ) : (
//         <Link href="/login">Login</Link>
//       )}
//     </div>
//   );
// };

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";
const navigation = [
  { name: "Home", href: "/#", current: true },
  { name: "Explore", href: "/#explore", current: false },
  { name: "Contact", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const { data, loading, token } = useNavbar();
  return (
    <Disclosure
      as="nav"
      className="shadow w-screen fixed top-0 z-50 backdrop-blur-md bg-black/20 transition duration-300">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
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
          <div className="flex flex-1 items-center gap-20 justify-center sm:items-stretch sm:justify-start ">
            <div className="flex shrink-0 items-center text-white font-bold text-2xl">
              <Link href="/#">
                <span>SewaLapang</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex justify-center items-center space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? " text-white"
                        : "text-gray-500 hover:text-white",
                      "rounded px-6 py-2 text-md font-medium"
                    )}>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {loading ? (
              <p>Loading...</p>
            ) : token ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md backdrop-blur-md bg-black/70 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                  <MenuItem>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-white data-focus:bg-gray-100 data-focus:outline-hidden">
                      Your Profile
                    </a>
                  </MenuItem>

                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-white data-focus:bg-gray-100 data-focus:outline-hidden">
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <Link
                href="/login"
                className="text-white  px-4 py-2 hover:bg-black backdrop-blur-md bg-black/50 rounded">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      <div>
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}>
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
};
