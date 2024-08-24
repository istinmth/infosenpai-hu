"use client"
import React from "react";
import { FlipWords } from "../ui/flip-words";
import Button from "@/components/elements/Button";

export function FlipWordsDemo() {
    const words = ["infóérettségi,", "ECDL-vizsga,", "egyetem,", ""];

    const handleNezzukClick = () => {
        const temakorokSection = document.getElementById('témakörök');
        if (temakorokSection) {
            temakorokSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="h-[40rem] flex justify-center items-center px-4">
            <div className="text-center">
                <p className="text-5xl font-normal text-neutral-600 dark:text-neutral-400">
                    <span className="font-medium text-amber-500">
                        Ez az oldal olyan egyszerű,
                        <br/>
                        mint neked lesz az
                    </span>
                    <br/>
                    <FlipWords
                        words={words}
                        className="inline-block font-medium text-black dark:text-black"
                    />
                    <br/>
                    <span className="font-medium text-violet-600">
                        ha eljössz az óráinkra
                    </span>
                </p>
                <div className="py-5 flex items-center justify-center">
                    <Button
                        className="px-4 py-2 rounded-md"
                        onClick={handleNezzukClick}
                    >
                        Nézzük!
                    </Button>
                </div>
            </div>
        </div>
    );
}