"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";

export default function LoginPage() {
  const router = useRouter();
  const loadUser = useGameStore((state) => state.loadUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // EMAIL LOGIN ONLY
  // ===============================
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Load user into global store
      loadUser(res.user);

      // Redirect after login
      router.push("/profile/edit");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <div className="w-[390px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl text-white shadow-2xl">

        <h1 className="text-3xl font-extrabold text-center mb-2">
          ThinkRush
        </h1>

        <p className="text-center text-sm text-gray-300 mb-6">
          Train your brain. Let AI guide the way.
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 mb-4 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition"
        >
          {loading ? "Entering..." : "Enter the Arena"}
        </button>

        {/* SIGNUP CTA */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-purple-400 cursor-pointer hover:underline font-semibold"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}