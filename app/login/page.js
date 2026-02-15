"use client";

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGameStore } from "@/store/useGameStore";

export default function LoginPage() {
  const router = useRouter();

  // 🔥 CORRECT FUNCTION
  const loadUser = useGameStore((state) => state.loadUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ===============================
  // EMAIL LOGIN
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

      // 🔥 THIS IS THE FIX
      loadUser(res.user);

      router.push("/profile/edit");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // GOOGLE LOGIN
  // ===============================
  const handleGoogleLogin = async () => {
    setLoading(true);
    await signInWithRedirect(auth, googleProvider);
  };

  // ===============================
  // GOOGLE REDIRECT RESULT
  // ===============================
  useEffect(() => {
    getRedirectResult(auth).then((res) => {
      if (res?.user) {
        loadUser(res.user); // 🔥 FIX HERE TOO
        router.push("/profile/edit");
      }
    });
  }, [loadUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="w-[390px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl text-white shadow-2xl">

        <h1 className="text-3xl font-extrabold text-center mb-2">
          ThinkRush
        </h1>

        <p className="text-center text-sm text-gray-300 mb-6">
          Train your brain. Let AI guide the way.
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 mb-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
        >
          {loading ? "Entering..." : "Enter the Arena"}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg bg-white text-black flex justify-center gap-2"
        >
          <Image src="/images/google.png" width={20} height={20} alt="google" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
