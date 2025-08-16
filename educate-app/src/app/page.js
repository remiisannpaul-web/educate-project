"use client";

import { InteractiveButton } from "@/components/buttons/HomePageButtons";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex">
      {/* Left Section - Blue Background */}
      <div className="flex-1 bg-gradient-to-b from-blue-900 to-black flex flex-col px-12 py-8">
        <div className="max-w-md flex flex-col justify-start h-full">
          {/* Logo */}
          <h1 className="text-4xl font-bold text-white mb-8">EDUCATE</h1>
          
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
        {/* Navigation Bar */}
        <div className="p-6">
          <nav className="bg-blue-600 rounded-lg px-6 py-3 inline-block">
            <div className="flex items-center justify-start w-full">
              {/* Logo */}
              <h1 className="text-2xl font-bold text-white mr-8">Educate</h1>

              {/* Navigation Links */}
              <ul className="flex items-center space-x-6 text-white">
                <li>
                  <InteractiveButton
                    onClick={() => router.push("/")}
                  >
                    Home
                  </InteractiveButton>
                </li>
                <li className="text-gray-300">|</li>
                <li>
                  <InteractiveButton
                    onClick={() => router.push("/programs")}
                  >
                    Programs
                  </InteractiveButton>
                </li>
                <li className="text-gray-300">|</li>
                <li>
                  <InteractiveButton
                    onClick={() => router.push("/student-login")}
                  >
                    Student login
                  </InteractiveButton>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Image Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-white text-2xl font-medium">image</div>
        </div>
      </div>
    </div>
  );
}
