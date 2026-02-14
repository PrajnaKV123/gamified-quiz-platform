"use client";

import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ EMAIL + PASSWORD SIGNUP
  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("🎉 Account created successfully!");
      router.push("/dashboard"); // ✅ redirect
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE SIGNUP (REDIRECT METHOD)
  const handleGoogleSignup = async () => {
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
          alert("🎉 Account created with Google!");
          router.push("/dashboard"); // ✅ redirect
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // ✅ EMPTY ARRAY — FIXED ERROR

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="w-[390px] bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl text-white shadow-2xl">

        <h1 className="text-3xl font-extrabold text-center mb-2">
           Create Account
        </h1>

        <p className="text-center text-sm text-gray-300 mb-6">
          Train your brain. Let AI guide the way.
        </p>

        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none"
        />

        {/* PASSWORD INPUT */}
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/20 focus:outline-none"
        />

        {/* EMAIL SIGNUP BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-3 mb-4 rounded-lg font-semibold text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.03] transition"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* GOOGLE SIGNUP BUTTON */}
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-white text-black font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
        >
          <Image src="/images/google.png" alt="google" width={20} height={20} />
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
