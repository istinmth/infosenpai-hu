"use client"
import React from "react";
import { FlipWords } from "../ui/flip-words";
import Button from "@/components/elements/Button";

export function FlipWordsDemo() {
    const words = ["infóérettségi", "ECDL-vizsga", "egyetem", ""];

    return (
        <div className="h-[40rem] flex justify-center items-center px-4">
            <div className="text-center">
                <p className="text-5xl font-normal text-neutral-600 dark:text-neutral-400">
                    <span className="font-medium text-blue-600">
                        Ez az oldal olyan egyszerű,
                        <br/>
                        mint neked lesz az
                    </span>
                    <br/>
                    <FlipWords
                        words={words}
                        className="inline-block font-medium text-black dark:text-white"
                    />
                    <br/>
                    <span className="font-medium text-pink-600">
                        ha eljössz az óráinkra
                    </span>
                </p>
                <div className="py-5 flex items-center justify-center">
                    <Button
                        className="px-4 py-2 rounded-md"
                        onClick={() => console.log('Button clicked!')}
                    >
                        Nézzük!
                    </Button>
                </div>
            </div>
        </div>
    );
}