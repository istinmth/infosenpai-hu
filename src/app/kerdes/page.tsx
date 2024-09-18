"use client"
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Papa from 'papaparse';
import { motion, AnimatePresence } from 'framer-motion';

const CSV_FILE_PATH = '/iskolak.csv';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error' | 'alreadySubmitted';

export default function SchoolSelector() {
    const [schools, setSchools] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSchool, setSelectedSchool] = useState('');
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

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
            setSubmitStatus('alreadySubmitted');
        }
    }, []);

    const filteredSchools = schools.filter(school =>
        school.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async () => {
        if (!selectedSchool || submitStatus === 'alreadySubmitted') return;

        setSubmitStatus('submitting');

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
                setSubmitStatus('alreadySubmitted');
            } else {
                setSubmitStatus('success');
                localStorage.setItem('schoolSubmitted', 'true');
            }
        } catch (error) {
            console.error('Error submitting school:', error);
            setSubmitStatus('error');
        }
    };

    const getButtonText = () => {
        switch (submitStatus) {
            case 'submitting': return <LoadingDots />;
            case 'success': return 'Sikeres beküldés!';
            case 'error': return 'Hiba történt';
            case 'alreadySubmitted': return 'Már beküldted';
            default: return 'Beküldés';
        }
    };

    const renderContent = () => {
        switch (submitStatus) {
            case "idle":
                break;
            case "submitting":
                break;
            case "error":
                break;
            case 'alreadySubmitted':
                return (
                    <motion.div
                        key="already-submitted"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-2xl font-bold text-amber-500 mb-4">Már korábban válaszoltál</h2>
                        <p className="text-lg text-gray-700">Köszönjük, de már rögzítettük a válaszodat korábban.</p>
                        <p className="text-md text-gray-600 mt-2">Ha úgy gondolod, hogy ez tévedés, kérjük, vedd fel velünk a kapcsolatot.</p>
                    </motion.div>
                );
            case 'success':
                return (
                    <motion.div
                        key="thank-you"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h2 className="text-2xl font-bold text-violet-600 mb-4">Köszönjük a választ!</h2>
                        <p className="text-lg text-gray-700">Az adataid sikeresen rögzítettük.</p>
                    </motion.div>
                );
            default:
                return (
                    <motion.div
                        key="form"
                        initial={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold text-violet-600 mb-4">Melyik budapesti gimnáziumba jártál?</h2>
                        <Input
                            type="text"
                            placeholder="Keress az iskolák között..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mb-4"
                        />
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4 mb-4">
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
                            disabled={!selectedSchool || submitStatus === 'submitting' || submitStatus === 'alreadySubmitted'}
                        >
                            {getButtonText()}
                        </Button>
                    </motion.div>
                );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl mx-auto bg-whitesmoke rounded-lg p-6 overflow-hidden">
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>
        </div>
    );
}

const LoadingDots = () => (
    <div className="flex space-x-1 justify-center items-center">
        <div className="w-2 h-2 bg-whitesmoke rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-whitesmoke rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-whitesmoke rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
);