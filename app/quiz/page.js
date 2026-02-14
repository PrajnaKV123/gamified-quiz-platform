"use client";

import { useRouter } from "next/navigation";
import { useGameStore } from "../../store/useGameStore";

export default function QuizPage() {
  const router = useRouter();
  const { submitAnswer } = useGameStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] to-[#302b63] text-white">
      <div className="bg-white/10 p-8 rounded-2xl w-[400px]">

        <h2 className="text-xl font-bold mb-4">
          What is 2 + 2?
        </h2>

        <button
          onClick={() => {
            submitAnswer(true);
            router.push("/result");
          }}
          className="w-full mb-3 py-2 bg-green-500 rounded-lg"
        >
          4
        </button>

        <button
          onClick={() => {
            submitAnswer(false);
            router.push("/result");
          }}
          className="w-full py-2 bg-red-500 rounded-lg"
        >
          5
        </button>
      </div>
    </div>
  );
}
