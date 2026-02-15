"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!auth.currentUser);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsub();
  }, []);

  const goProfile = () => {
    router.push(isLoggedIn ? "/profile" : "/signup");
    setMenuOpen(false);
  };

  const goDashboard = () => {
    router.push(isLoggedIn ? "/dashboard" : "/signup");
    setMenuOpen(false);
  };

  return (
    <header
      className={`w-full z-50 transition-all ${
        isSticky
          ? "fixed top-0 bg-[#120024]/95 backdrop-blur-md shadow-lg"
          : "relative bg-transparent"
      }`}
    >
      <div className="px-6 flex items-center justify-between w-full h-20">

        
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r 
          from-purple-400 via-pink-400 to-cyan-400 
          bg-clip-text text-transparent">
            ThinkRush
          </span>
        </div>

        
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-300">
          <Link href="/" className="hover:text-purple-400 transition">
            HOME
          </Link>

          <button onClick={goProfile} className="hover:text-purple-400 transition">
            PROFILE
          </button>

          <button
            onClick={goDashboard}
            className="px-5 py-2 rounded-lg 
            bg-gradient-to-r from-purple-600 to-pink-600 
            text-white hover:opacity-90 transition"
          >
            DASHBOARD
          </button>
        </nav>

        
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-purple-400"
        >
          ☰
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-[#120024] border-t border-purple-800">
          <nav className="flex flex-col items-start px-6 py-4 space-y-4 text-gray-300">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="w-full text-lg hover:text-purple-400"
            >
              HOME
            </Link>

            <button
              onClick={goProfile}
              className="w-full text-left text-lg hover:text-purple-400"
            >
              PROFILE
            </button>

            <button
              onClick={goDashboard}
              className="w-full text-center px-4 py-2 rounded-lg 
              bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            >
              DASHBOARD
            </button>

          </nav>
        </div>
      )}
    </header>
  );
}