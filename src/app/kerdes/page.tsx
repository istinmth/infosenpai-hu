"use client"
import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Papa from 'papaparse';
import { motion, AnimatePresence } from 'framer-motion';

const CSV_FILE_PATH = '/iskolak.csv';

// Function to normalize text for search
const normalizeText = (text: string): string => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export default function SchoolSelector() {
    const [schools, setSchools] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSchool, setSelectedSchool] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        fetch(CSV_FILE_PATH)
            .then(response => response.text())
            .then(csvString => {
                Papa.parse<string[]>(csvString, {
                    complete: (results) => {
                        setSchools(results.data.flat().filter((school): school is string => Boolean(school)));
                    },
                    header: false,
                    skipEmptyLines: true
                });
            });

        // Check if user has already submitted
        const submittedBefore = localStorage.getItem('schoolSubmitted');
        if (submittedBefore === 'true') {
            setHasSubmitted(true);
        }
    }, []);

    const filteredSchools = schools.filter(school =>
        normalizeText(school).includes(normalizeText(searchTerm))
    );

    const handleSubmit = async () => {
        if (!selectedSchool || hasSubmitted) return;

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/log-school', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ school: selectedSchool }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.alreadySubmitted) {
                setSubmitStatus('error');
                setHasSubmitted(true);
            } else {
                setSubmitStatus('success');
                setHasSubmitted(true);
                localStorage.setItem('schoolSubmitted', 'true');
            }
        } catch (error) {
            console.error('Error submitting school:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getButtonText = () => {
        if (isSubmitting) return <LoadingDots />;
        if (submitStatus === 'success') return 'Sikeres beküldés!';
        if (submitStatus === 'error') return 'Hiba történt';
        if (hasSubmitted) return 'Már beküldted';
        return 'Beküldés';
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl mx-auto bg-whitesmoke rounded-lg p-6 overflow-hidden">
                <AnimatePresence mode="wait">
                    {!hasSubmitted ? (
                        <motion.div
                            key="form"
                            initial={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold text-amber-500 mb-4">Melyik budapesti gimnáziumba jártál?</h2>
                            <input
                                type="text"
                                placeholder="Keress az iskolák között..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 bg-gray-100 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm mb-3"
                            />
                            <ScrollArea className="h-[300px] w-full rounded-md border border-gray-500 p-4 mb-4">
                                <RadioGroup value={selectedSchool} onValueChange={setSelectedSchool}>
                                    {filteredSchools.map((school) => (
                                        <div key={school} className="flex items-center space-x-2 mb-2">
                                            <RadioGroupItem value={school} id={school} />
                                            <Label htmlFor={school} className="text-sm">{school}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </ScrollArea>
                            {selectedSchool && (
                                <p className="mt-4 text-sm text-amber-500">
                                    Kiválasztott iskola: <span className="font-semibold">{selectedSchool}</span>
                                </p>
                            )}
                            <Button
                                onClick={handleSubmit}
                                className={`mt-4 w-full text-white ${
                                    submitStatus === 'success' ? 'bg-green-600 hover:bg-green-700' :
                                        submitStatus === 'error' ? 'bg-red-600 hover:bg-red-700' :
                                            'bg-violet-600 hover:bg-violet-700'
                                }`}
                                disabled={!selectedSchool || isSubmitting || hasSubmitted}
                            >
                                {getButtonText()}
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="thank-you"
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <h2 className="text-3xl font-bold text-amber-500 mb-4">Köszönjük a válaszodat!</h2>
                            <p className="text-md text-gray-700">Nagyban megkönnyítetted a munkánkat.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const LoadingDots = () => (
    <div className="flex space-x-1 justify-center items-center">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
);