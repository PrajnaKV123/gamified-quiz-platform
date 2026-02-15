"use client";

import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const { name, bio, setProfile } = useGameStore();

  const [form, setForm] = useState({
    name: name || "",
    bio: bio || "",
  });

  const save = () => {
    setProfile(form);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 text-white">

      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold shadow-lg">
            👤
          </div>

          <h1 className="text-2xl font-bold mt-4">
            Edit Profile
          </h1>

          <p className="text-sm text-gray-300">
            Customize your player identity
          </p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm mb-1 text-gray-300">
            Player Name
          </label>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Enter your name"
            className="
              w-full px-4 py-3 rounded-xl
              bg-black/40 border border-white/20
              focus:outline-none focus:border-purple-400
            "
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block text-sm mb-1 text-gray-300">
            Bio
          </label>
          <textarea
            value={form.bio}
            onChange={(e) =>
              setForm({ ...form, bio: e.target.value })
            }
            placeholder="Tell something about yourself..."
            rows={4}
            className="
              w-full px-4 py-3 rounded-xl
              bg-black/40 border border-white/20
              focus:outline-none focus:border-purple-400
              resize-none
            "
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="
              flex-1 py-3 rounded-xl
              border border-white/20
              hover:bg-white/10 transition
            "
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="
              flex-1 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-purple-500 to-pink-500
              hover:scale-[1.03] transition-all
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
