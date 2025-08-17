"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Blue Background */}
      <div className="flex-1 bg-gradient-to-b from-blue-900 to-black flex flex-col px-12 py-8">
        <div className="max-w-md flex flex-col justify-start h-full">
          {/* Logo */}
         
          
          <div className="mt-40">
            {/* Main Headline */}
            <h2 className="text-5xl font-bold text-white leading-tight mb-6">
              We&apos;re{" "}
              <span className="bg-blue-400 px-2">Changing</span>{" "}
              The Education System Forever.
            </h2>

            {/* Description */}
            <p className="text-lg text-white mb-8">
              Practical education that gives you all the tools you need to thrive in the digital age.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              SEE ALL PROGRAMS
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Black Background */}
      <div className="flex-1 bg-black flex flex-col">
      
      </div>
    </div>
  );
}
