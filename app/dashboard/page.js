"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "../../store/useGameStore";

export default function DashboardPage() {
  const router = useRouter();

  const {
    name,
    level,
    xp,
    streak,
    totalQuestions,
    correctAnswers,
  } = useGameStore();

  const xpToNextLevel = 50 - (xp % 50);
  const accuracy =
    totalQuestions === 0
      ? 0
      : Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">

      {/* HEADER */}
      <h1 className="text-3xl font-extrabold mb-6">
        👋 Welcome, {name}
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
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
              style={{ width: `${(xp % 50) * 2}%` }}
            />
          </div>
          <p className="text-sm mt-2 text-gray-300">
            {xpToNextLevel} XP to next level
          </p>
        </div>

        {/* SKILLS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3">🧠 Skills</h2>

          <p className="text-sm mb-1">Logic</p>
          <div className="w-full bg-black/40 h-2 rounded-full mb-2">
            <div className="bg-purple-500 h-2 w-[70%] rounded-full" />
          </div>

          <p className="text-sm mb-1">Speed</p>
          <div className="w-full bg-black/40 h-2 rounded-full">
            <div className="bg-pink-500 h-2 w-[50%] rounded-full" />
          </div>
        </div>

        {/* AI INSIGHT */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">🤖 AI Insight</h2>
          <p className="text-sm text-gray-300">
            You’re strong in logic.  
            Try timed quizzes to boost speed ⚡
          </p>
        </div>
      </div>

      {/* GRID 3 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">

        {/* START QUIZ */}
        <div className="md:col-span-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-extrabold mb-2">
            🚀 Ready to play?
          </h2>
          <p className="mb-4">
            Answer questions and level up your brain!
          </p>
          <button
            onClick={() => router.push("/quiz")}
            className="bg-black/40 hover:bg-black/60 px-6 py-3 rounded-lg font-semibold transition"
          >
            Enter the Arena
          </button>
        </div>

        {/* DAILY CHALLENGE */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2">📅 Today’s Challenge</h2>
          <p className="text-sm text-gray-300 mb-3">
            Complete <b>5 questions</b> without skipping
          </p>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-sm">
            Start Challenge
          </button>
        </div>

        {/* LEADERBOARD */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3">🏆 Leaderboard</h2>
          <ol className="text-sm space-y-2">
            <li>🥇 Alex — 320 XP</li>
            <li>🥈 You — {xp} XP</li>
            <li>🥉 Sam — 120 XP</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
