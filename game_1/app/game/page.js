"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import events from "../lib/events";
import StatusPanel from "../components/StatusPanel";
import CharacterPreview from "../components/CharacterPreview";

export default function GamePage() {
    const params = useSearchParams();
    const router = useRouter();
    const gender = params.get("sex") || "male";
    const [ageIndex, setAgeIndex] = useState(0);
    const [status, setStatus] = useState({
        happiness: 50,
        relationship: 50,
        health: 100,
        money: 1000,
        knowledge: 10,
        lucky: 50,
    });
    const [deathReason, setDeathReason] = useState("");
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedChoices, setSelectedChoices] = useState([]);

    const currentAge = events[ageIndex]?.age || 100;
    const eventChoices = events[ageIndex]?.choices[gender] || [];


    const character = {
        name: params.get("name") || "Unknown",
        sex: params.get("sex") || "male",
        skinTone: decodeURIComponent(params.get("skinTone") || "#FFD1DC"),
        shirtColor: decodeURIComponent(params.get("shirtColor") || "#DDA0DD"),
        glasses: params.get("glasses") === "true",
      };
      

    // Run only when ageIndex changes to prevent reshuffling
    useEffect(() => {
        const shuffledChoices = [...eventChoices].sort(() => Math.random() - 0.5);
        setSelectedChoices(shuffledChoices.slice(0, 2));
    }, [ageIndex]);

    const handleChoice = (effects, choiceText) => {
        const newStatus = { ...status };

        Object.keys(effects).forEach((key) => {
            newStatus[key] = (newStatus[key] || 0) + effects[key];
        });

        setStatus(newStatus);

        if (newStatus.health <= 0) {
            setDeathReason(`Died from bad health after choosing "${choiceText}".`);
            router.push(`/end?name=${params.get("name")}&age=${currentAge}&reason=${encodeURIComponent(deathReason)}`);
            return;
        }

        if (newStatus.money < -5000) {
            setDeathReason("Died in poverty with massive debt.");
            router.push(`/end?name=${params.get("name")}&age=${currentAge}&reason=${encodeURIComponent(deathReason)}`);
            return;
        }

        if (newStatus.lucky <= 0) {
            setDeathReason("Died due to extreme bad luck.");
            router.push(`/end?name=${params.get("name")}&age=${currentAge}&reason=${encodeURIComponent(deathReason)}`);
            return;
        }

        if (ageIndex >= events.length - 1) {
            setDeathReason("Died of old age.");
            router.push(`/end?name=${params.get("name")}&age=${currentAge}&reason=${encodeURIComponent(deathReason)}`);
            return;
        }

        setAgeIndex(ageIndex + 1); // Move to the next age
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg text-center"
            >
                {/* Title */}
                <h1 className="text-3xl font-bold mb-4">{params.get("name")}'s Life</h1>
                <p className="text-lg mb-2 font-semibold text-yellow-300">Age: {currentAge}</p>
                <p className="text-md mb-6">{events[ageIndex]?.question}</p>

                {/* Character Preview */}
                <CharacterPreview character={character} />


                {/* Choices */}
                <div className="flex flex-col gap-4">
                    {selectedChoices.map((choice, index) => (
                        <motion.button
                            key={index}
                            onClick={() => handleChoice(choice.effects, choice.text)}
                            whileTap={{ scale: 0.9 }}
                            className="w-full p-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition duration-300"
                        >
                            {choice.text}
                        </motion.button>
                    ))}
                </div>

                {/* Status Button */}
                <button
                    onClick={() => setIsStatusOpen(true)}
                    className="mt-6 p-3 w-full bg-gray-700 hover:bg-gray-600 rounded-md shadow-md"
                >
                    📊 Show Status
                </button>
            </motion.div>

            {/* Status Panel (Popup) */}
            <StatusPanel isOpen={isStatusOpen} onClose={() => setIsStatusOpen(false)} status={status} />
        </div>
    );
}