"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "../../store/useGameStore";

export default function ResultPage() {
  const router = useRouter();
  const { correctAnswers, totalQuestions } = useGameStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#302b63] to-[#0f0c29] text-white">
      <div className="bg-white/10 p-8 rounded-2xl text-center">

        <h2 className="text-2xl font-bold mb-4">🎉 Quiz Result</h2>
        <p>
          You answered {correctAnswers} / {totalQuestions} correctly
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
