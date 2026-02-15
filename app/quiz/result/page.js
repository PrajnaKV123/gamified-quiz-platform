"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";

export default function QuizResultPage() {
  const router = useRouter();
  const { correctAnswers, totalQuestions, completeQuiz } = useGameStore();

  const isPerfect = correctAnswers === totalQuestions;

  useEffect(() => {
    completeQuiz(); // ✅ update daily streak

    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [completeQuiz, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
      
      {/* EMOJI BLAST BACKGROUND */}
      {isPerfect && (
        <div className="absolute inset-0 flex flex-wrap justify-center items-center text-4xl animate-pulse opacity-20 pointer-events-none">
          {"🎉🔥💥✨🎊".repeat(20)}
        </div>
      )}

      {/* RESULT CARD */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 text-center shadow-2xl w-[360px]">

        <div
          className={`text-6xl mb-4 ${
            isPerfect ? "animate-bounce" : ""
          }`}
        >
          {isPerfect ? "💥🔥🎉" : "👏🙂"}
        </div>

        <h1 className="text-3xl font-extrabold mb-2">
          {isPerfect ? "PERFECT SCORE!" : "QUIZ COMPLETED"}
        </h1>

        <p className="text-xl mb-4">
          You scored{" "}
          <span className="text-yellow-400 font-bold">
            {correctAnswers} / {totalQuestions}
          </span>
        </p>

        <p className="text-sm text-gray-300">
          Redirecting to dashboard...
        </p>
      </div>
    </div>
  );
}
