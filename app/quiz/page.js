"use client";

import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function QuizCategoryPage() {
  const router = useRouter();

  const categories = [
    {
      id: "cs",
      title: "Computer Science",
      emoji: "🧠💻",
      desc: "DSA, OS, DBMS, OOPS",
      color: "from-purple-500 to-pink-500",
      tag: "Popular",
    },
    {
      id: "gk",
      title: "General Knowledge",
      emoji: "🌍📰",
      desc: "World, India, Current Affairs",
      color: "from-blue-500 to-cyan-500",
      tag: "Easy",
    },
    {
      id: "english",
      title: "English Grammar",
      emoji: "✍️📘",
      desc: "Tenses, Articles, Errors",
      color: "from-green-500 to-emerald-500",
      tag: "Skill",
    },
    {
      id: "aptitude",
      title: "Aptitude & Logic",
      emoji: "🧩➗",
      desc: "Reasoning & Quant",
      color: "from-orange-500 to-red-500",
      tag: "Tricky",
    },
    {
      id: "science",
      title: "Science Basics",
      emoji: "🧪🔬",
      desc: "Physics, Chem, Bio",
      color: "from-teal-500 to-lime-500",
      tag: "New",
    },
    {
      id: "rapid",
      title: "Rapid Fire",
      emoji: "⚡🔥",
      desc: "Fast & Fun mixed quiz",
      color: "from-yellow-400 to-orange-500",
      tag: "Game Mode",
    },
  ];

  const handleSelect = (categoryId) => {
    localStorage.setItem("quiz-category", categoryId);
    router.push("/quiz/play");
  };

  return (
    
    
    
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6 text-white">
     <Header/>

      <h1 className="text-4xl font-extrabold text-center mb-2">
        
        🎮 Choose Your Challenge
      </h1>

      <p className="text-center text-gray-300 mb-10">
        Select a category and enter the quiz arena
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`
              relative cursor-pointer rounded-2xl p-6 shadow-2xl
              bg-gradient-to-r ${cat.color}
              hover:scale-[1.05] transition
            `}
          >
            {/* TAG */}
            <span className="absolute top-3 right-3 text-xs bg-black/40 px-3 py-1 rounded-full">
              {cat.tag}
            </span>

            {/* EMOJI */}
            <div className="text-5xl mb-4">{cat.emoji}</div>

            {/* TEXT */}
            <h2 className="text-2xl font-bold mb-2">
              {cat.title}
            </h2>

            <p className="text-sm opacity-90 mb-6">
              {cat.desc}
            </p>

            <button className="bg-black/40 px-5 py-2 rounded-lg text-sm font-semibold">
              Start Quiz →
            </button>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
