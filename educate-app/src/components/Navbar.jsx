"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex flex-row fixed w-19/20 m-12 justify-between items-center rounded-2xl">
        <h1 className="text-white font-bold text-3xl tracking-wider">EDUCATE</h1>
        <div className="bg-blue-600 rounded-2xl shadow-lg">
            <ul className="flex flex-row gap-1 p-2">
                <button 
                    className="px-3 py-3 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105" 
                    type="button"
                    onClick={() => {router.push('/')}}
                >
                    Home
                </button>
                <button 
                    className="px-3 py-3 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105" 
                    type="button"
                    onClick={() => {router.push('programs')}}
                >
                    Programs
                </button>
                <button 
                    className="px-3 py-3 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105" 
                    type="button"
                    onClick={() => {router.push('login')}}
                >
                    Students Login
                </button>
            </ul>
        </div>
    </nav>
  );
}
