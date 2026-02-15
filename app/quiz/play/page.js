"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";
import Header from "@/components/header";
import Footer from "@/components/footer";


const TOTAL_QUESTIONS = 5;

export default function QuizPlayPage() {
  const router = useRouter();

  // 🔥 Zustand store
  const { xp, recordAnswer, completeQuiz, failQuiz } = useGameStore();

  // QUESTION DATA
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");

  // GAME STATE
  const [currentQ, setCurrentQ] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(15);
  const [loading, setLoading] = useState(true);

  // Prevent double recording
  const [answered, setAnswered] = useState(false);

  // LOAD QUESTION
  const loadQuestion = async () => {
    const category = localStorage.getItem("quiz-category");
    if (!category) {
      router.push("/quiz");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });

      const data = await res.json();

      setQuestion(data.question || "Sample Question");
      setOptions(Array.isArray(data.options) ? data.options : []);
      setCorrectAnswer(data.correctAnswer || "");
      setExplanation(data.explanation || "");
    } catch {
      setQuestion("What does CPU stand for?");
      setOptions([
        "Central Processing Unit",
        "Computer Personal Unit",
        "Central Program Utility",
        "Control Processing User",
      ]);
      setCorrectAnswer("Central Processing Unit");
      setExplanation(
        "CPU stands for Central Processing Unit. It executes instructions."
      );
    } finally {
      setLoading(false);
      setSelected(null);
      setShowExplanation(false);
      setTimeLeft(15);
      setAnswered(false);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  // TIMER
  useEffect(() => {
    if (loading || showExplanation || answered) return;

    if (timeLeft === 0) {
      setAnswered(true);
      setLives((l) => l - 1);
      recordAnswer(false); // 🔥 record wrong
      setShowExplanation(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, showExplanation, answered]);

  // HANDLE ANSWER
  const handleAnswer = (opt) => {
    if (selected || answered) return;

    setAnswered(true);
    setSelected(opt);
    setShowExplanation(true);

    if (opt === correctAnswer) {
      recordAnswer(true); // 🔥 +10 XP globally
    } else {
      setLives((l) => l - 1);
      recordAnswer(false);
    }
  };

  // NEXT STEP
  const nextStep = () => {
    if (currentQ >= TOTAL_QUESTIONS || lives <= 0) {

      if (lives > 0) {
        completeQuiz(); // 🔥 increase streak
      } else {
        failQuiz(); // 🔥 reset streak
      }
router.push("/quiz/result");

    } else {
      setCurrentQ((q) => q + 1);
      loadQuestion();
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0c29] text-white">
        🤖 AI is preparing your next challenge...
      </div>
    );
  }

  return (
    <div>
      <Header/>
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">

      {/* HUD */}
      <div className="flex justify-between mb-6 text-lg">
        <div>❤️ {lives}</div>
        <div>⚡ XP: {xp}</div> {/* 🔥 now from Zustand */}
        <div>⏱️ {timeLeft}s</div>
      </div>

      <p className="text-center text-sm text-gray-300 mb-4">
        Question {currentQ} / {TOTAL_QUESTIONS}
      </p>

      {/* QUESTION CARD */}
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">

        <h2 className="text-xl font-bold mb-6">
          🧠 {question}
        </h2>

        <div className="space-y-4">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className={`
                w-full px-4 py-3 rounded-xl text-left transition
                ${
                  selected
                    ? opt === correctAnswer
                      ? "bg-green-500"
                      : opt === selected
                      ? "bg-red-500"
                      : "bg-black/40"
                    : "bg-black/40 hover:bg-black/60"
                }
              `}
            >
              {opt}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-black/40 rounded-xl">
            <p className="font-semibold mb-2">🤖 AI Explanation</p>
            <p className="text-sm text-gray-300">{explanation}</p>

            <button
              onClick={nextStep}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"
            >
              {currentQ >= TOTAL_QUESTIONS || lives <= 0
                ? "Finish Quiz"
                : "Next Question →"}
            </button>
          </div>
          
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
}