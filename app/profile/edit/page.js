"use client";

import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const { name, bio, setProfile } = useGameStore();

  const [form, setForm] = useState({ name, bio });

  const save = () => {
    setProfile(form);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0c29] text-white">
      <div className="bg-black/40 p-6 rounded-xl">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="block mb-3"
        />

        <textarea
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          placeholder="Bio"
          className="block mb-3"
        />

        <button onClick={save} className="bg-purple-500 px-4 py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
}