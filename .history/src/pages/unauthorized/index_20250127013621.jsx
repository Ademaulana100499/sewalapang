import React from "react";
import Link from "next/link";
import { LoginModal } from "@/components/LoginModal";
import { FaSadTear } from "react-icons/fa";
import { useState } from "react";

const UnauthorizedPage = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-green-600 p-8 rounded-lg shadow-xl">
        <div className="text-center text-3xl font-semibold text-white mb-6 flex flex-col items-center">
          <FaSadTear className="text-5xl  mb-4" />
          Sepertinya Anda belum login
        </div>
        <div className="space-y-4">
          <p className="text-lg text-white opacity-80">
            Untuk melanjutkan, silakan login terlebih dahulu.
          </p>
          <div className="space-x-4 flex justify-center items-center w-full">
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-6 py-3 w-2/4 bg-green-600 h-14 text-white text-lg rounded-lg shadow-lg hover:bg-green-500 transition duration-200">
              Login
            </button>
            <Link
              href={"/"}
              className="px-6 py-3 w-full bg-black  text-white h-14 text-lg rounded-lg shadow-lg hover:bg-gray-700 transition duration-200">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
        <LoginModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      </div>
    </div>
  );
};

export default UnauthorizedPage;
