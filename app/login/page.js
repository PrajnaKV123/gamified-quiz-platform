"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ EMAIL + PASSWORD LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      alert("🚀 Welcome back!");
      router.push("/dashboard"); // ✅ REDIRECT
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN (REDIRECT METHOD)
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  // ✅ HANDLE GOOGLE REDIRECT RESULT (FIXED)
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          alert("🔥 Logged in with Google!");
          router.push("/dashboard"); // ✅ REDIRECT
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // ✅ EMPTY ARRAY (IMPORTANT)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none"
        />

        {/* EMAIL LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 mb-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.03] transition"
        >
          {loading ? "Entering..." : "Enter the Arena"}
        </button>

        {/* GOOGLE LOGIN BUTTON */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-white text-black font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
        >
          <Image src="/images/google.png" alt="google" width={20} height={20} />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-300 mt-6">
          New player?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}
