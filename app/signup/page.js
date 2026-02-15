"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/useGameStore";

export default function RegisterPage() {
  const router = useRouter();
  const loadUser = useGameStore((state) => state.loadUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // EMAIL SIGNUP ONLY
  // ===============================
  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Load user into store
      loadUser(res.user);

      // Redirect
      router.push("/profile/edit");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="w-[390px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl text-white">

        <h1 className="text-3xl font-extrabold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-sm text-gray-300 mb-6">
          Train your brain. Let AI guide the way.
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* SIGNUP BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-3 mb-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-purple-400 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}