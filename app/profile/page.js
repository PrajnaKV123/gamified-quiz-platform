"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useGameStore } from "@/store/useGameStore";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function ProfilePage() {
  const {
    name,
    email,
    bio,
    xp,
    streak,
    totalQuestions,
    correctAnswers,
    setProfile,
  } = useGameStore();

  // 🔥 Auto load email from Firebase
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfile({
          email: user.email,
        });
      }
    });

    return () => unsub();
  }, [setProfile]);

  const level = Math.floor(xp / 50) + 1;

  const accuracy =
    totalQuestions === 0
      ? 0
      : Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-gradient-to-br 
    from-[#0f0c29] via-[#302b63] to-[#24243e] 
    text-white px-4 sm:px-6 py-10">
  
      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl text-purple-300 font-extrabold mb-8">
      Profile
      </h1>

      {/* PROFILE CARD */}
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-xl 
      border border-white/20 rounded-2xl p-6 text-center">

        <div className="w-24 h-24 mx-auto mb-4 rounded-full 
        bg-gradient-to-r from-purple-500 to-pink-500 
        flex items-center justify-center text-3xl font-bold">
          {name ? name.charAt(0).toUpperCase() : "U"}
        </div>

        <h2 className="text-xl font-bold">
          {name || "User"}
        </h2>

        <p className="text-sm text-gray-300 mt-1">
          {email || "No email found"}
        </p>

        <div className="mt-4 text-sm space-y-1 text-gray-300">
          <p>⭐ XP: {xp}</p>
          <p>📊 Level: {level}</p>
          <p>🔥 Streak: {streak} days</p>
          <p>🎯 Accuracy: {accuracy}%</p>
        </div>

        <Link
          href="/profile/edit"
          className="inline-block mt-6 px-5 py-2 
          bg-gradient-to-r from-purple-500 to-pink-500 
          rounded-lg font-semibold hover:opacity-90 transition"
        >
          Edit Profile
        </Link>
      </div>

      {/* ABOUT SECTION BELOW */}
      <div className="max-w-3xl mx-auto mt-10 
      bg-white/10 backdrop-blur-xl 
      border border-white/20 rounded-2xl p-6">

        <h2 className="text-lg font-bold mb-4">
         About
        </h2>

        <p className="text-gray-300">
          {bio || "No bio added yet."}
        </p>
      </div>

      {/* PERFORMANCE SECTION */}
      <div className="max-w-3xl mx-auto mt-10 
      bg-white/10 backdrop-blur-xl 
      border border-white/20 rounded-2xl p-6">

        <h2 className="text-lg font-bold mb-6">
          📈 Performance Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">

          <div className="bg-black/40 rounded-xl p-5">
            <p className="text-2xl font-bold text-purple-400">
              {level}
            </p>
            <p className="text-sm text-gray-300">
              Current Level
            </p>
          </div>

          <div className="bg-black/40 rounded-xl p-5">
            <p className="text-2xl font-bold text-yellow-400">
              {xp}
            </p>
            <p className="text-sm text-gray-300">
              Total XP
            </p>
          </div>

          <div className="bg-black/40 rounded-xl p-5">
            <p className="text-2xl font-bold text-green-400">
              {accuracy}%
            </p>
            <p className="text-sm text-gray-300">
              Accuracy Rate
            </p>
          </div>

        </div>
      </div>
</div>
<Footer/>
</div>
  );
}