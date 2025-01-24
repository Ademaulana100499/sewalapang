import React from "react";
import Link from "next/link";
import useNavbar from "@/hooks/useNavbar";
import Image from "next/image";
export const Navbar = () => {
  const { data, loading, token } = useNavbar();
  return (
    <div className="font-contrail">
      <div className="flex justify-between bg-red-500">
        <Link href="/">Navbar</Link>
        <Link href="/explore">Explore</Link>

        {loading ? (
          <p>Loading...</p>
        ) : token ? (
          <Link href="/profile">
            {data?.name} <br />
            <p className="text-sm">{data?.role}</p>
          </Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Image src={"/logo.png"} width={70} height={50} alt="logo" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Explore</a>
            </li>
            <li>
              <a>Explore</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Login</a>
        </div>
      </div>
    </div>
  );
};
