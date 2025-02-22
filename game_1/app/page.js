"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to Start Life</h1>
      <button
        onClick={() => router.push("/create-character")}
        className="p-3 bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Start New Life
      </button>
    </div>
  );
}
