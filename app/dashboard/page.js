"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function DashboardPage() {
  const router = useRouter();

  const {
    name,
    xp,
    streak,
    totalQuestions,
    correctAnswers,
  } = useGameStore();
const XP_PER_LEVEL = 50;

const level = Math.floor(xp / XP_PER_LEVEL) + 1;

const xpInLevel =
  xp % XP_PER_LEVEL === 0 && xp !== 0
    ? XP_PER_LEVEL
    : xp % XP_PER_LEVEL;

const xpToNextLevel = XP_PER_LEVEL - xpInLevel;

const progressPercent = (xpInLevel / XP_PER_LEVEL) * 100;

  const accuracy =
    totalQuestions === 0
      ? 0
      : Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold mb-6">
        👋 Welcome {name || "User"}
      </h1>

      {/* GRID 1 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* PLAYER STATS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">🎮 Player</h2>
          <p>Level: <b className="text-purple-400">Lv {level}</b></p>
          <p>XP: <b className="text-yellow-400">{xp}</b></p>
          <p>🔥 Streak: <b>{streak} days</b></p>
        </div>

        {/* NEXT GOAL */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">🎯 Next Goal</h2>
          <p className="text-sm text-gray-300">
            Earn <b className="text-yellow-400">{xpToNextLevel} XP</b> to reach
            <b className="text-purple-400"> Level {level + 1}</b>
          </p>
        </div>

        {/* STREAK CARD */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold">🔥 Daily Streak</h2>
          <p className="text-3xl font-extrabold mt-2">{streak}</p>
          <p className="text-sm opacity-90">Keep it going!</p>
        </div>

        {/* ACCURACY */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">🎯 Accuracy</h2>
          <p className="text-3xl font-extrabold text-green-400">
            {accuracy}%
          </p>
          <p className="text-sm text-gray-300">
            Correct answers rate
          </p>
        </div>
      </div>

      {/* GRID 2 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">

        {/* PROGRESS */}
        <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">📊 Progress</h2>
          <div className="w-full bg-black/40 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm mt-2 text-gray-300">
            {xpToNextLevel} XP to next level
          </p>
        </div>

        {/* SKILLS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3">🧠 Skills</h2>

          <p className="text-sm mb-1">Accuracy</p>
          <div className="w-full bg-black/40 h-2 rounded-full mb-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${accuracy}%` }}
            />
          </div>

          <p className="text-sm mb-1">Progress</p>
          <div className="w-full bg-black/40 h-2 rounded-full">
            <div
              className="bg-pink-500 h-2 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* AI INSIGHT */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">🤖 AI Insight</h2>
          <p className="text-sm text-gray-300">
            {accuracy > 70
              ? "You're performing great! Try harder difficulty."
              : "Practice more quizzes to improve your accuracy."}
          </p>
        </div>
      </div>

      {/* GRID 3 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">

        <div className="md:col-span-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-extrabold mb-2">
            🚀 Ready to play?
          </h2>
          <p className="mb-4">
            Answer questions and level up your brain!
          </p>
          <button
            onClick={() => router.push("/quiz/result")}
            className="bg-black/40 hover:bg-black/60 px-6 py-3 rounded-lg font-semibold transition"
          >
            Enter the Arena
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">📅 Today’s Challenge</h2>
          <p className="text-sm text-gray-300 mb-3">
            Complete 5 correct answers
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3">🏆 Leaderboard</h2>
          <ol className="text-sm space-y-2">
            <li>🥇 You — {xp} XP</li>
          </ol>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}