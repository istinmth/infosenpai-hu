import React from "react";
import { FlipWords } from "../ui/flip-words";
import { usePaymentModal } from "@/app/contexts/PaymentModalContext"; // Updated import path

export function FlipWordsDemo() {
    const words = ["infóérettségi,", "egyetem,", "ECDL-vizsga"];
    const { openModal } = usePaymentModal();

    const handleNezzukClick = () => {
        const temakorokSection = document.getElementById('témakörök');
        if (temakorokSection) {
            temakorokSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleJelentkezClick = () => {
        const jelentkezzSection = document.getElementById('jelentkezz!');
        if (jelentkezzSection) {
            jelentkezzSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4">
            <div className="mb-6 sm:mb-6 flex justify-center w-full">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 text-center max-w-full">
                    <span className="">Regisztrálj most az ingyenes</span>{' '}
                    <a href="#" className="font-semibold text-violet-600 whitespace-nowrap" onClick={openModal}>
                        <span className="absolute inset-0" aria-hidden="true"/>
                        próbaalkalomra <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
            <div className="text-center">
                <p className="text-4xl md:text-6xl font-normal text-neutral-600 dark:text-neutral-400">
                    <span className="font-medium text-amber-500">
                        Ez az oldal olyan egyszerű,
                        <br className="hidden sm:inline" />
                        mint neked lesz az
                    </span>
                    <br />
                    <span className="inline-block h-[1.2em] md:h-[1.1em] overflow-hidden">
                        <FlipWords
                            words={words}
                            className="inline-block font-medium text-black dark:text-black"
                        />
                    </span>
                    <br />
                    <span className="font-medium text-violet-600">
                        ha eljössz az óráinkra
                    </span>
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        href="#"
                        className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={openModal}
                    >
                        Jelentkezz
                    </a>
                    <a
                        href="#"
                        className="text-sm font-semibold leading-6 text-gray-700"
                        onClick={handleNezzukClick}
                    >
                        Miről fogsz tanulni? <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
}