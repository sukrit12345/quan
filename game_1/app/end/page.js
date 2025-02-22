"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function EndPage() {
  const params = useSearchParams();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Game Over</h1>
        <p className="text-lg">{params.get("name")} lived until {params.get("age")} years old.</p>

        {/* Show death reason */}
        <p className="mt-4 text-red-400 italic">Cause of death: {params.get("reason")}</p>

        <button onClick={() => router.push("/create-character")} className="mt-6 p-2 bg-blue-500 rounded hover:bg-blue-600">
          Play Again
        </button>
      </div>
    </div>
  );
}
