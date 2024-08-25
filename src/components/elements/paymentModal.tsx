import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
    const [expandedTier, setExpandedTier] = useState<number | null>(null);

    const pricingTiers = [
        {
            title: 'Az első alkalom',
            price: 'Ingyenes',
            description: 'Regisztrálj, és találkozzunk október 5-én a Budapesti Corvinus Egyetemen!',
            features: [
                '3 órás alkalom',
                'Bevezetés az érettségi témakörökbe',
                'Ismerekedés, érdekességek',
                'Kérdések és válaszok'
            ]
        },
        {
            title: '4 Alkalom',
            price: '25 000 Ft',
            description: 'Ideális felkészüléshez',
            features: [
                '4 x 3 órás alkalom',
                'Hajnali',
                'Egykor',
                'Kicsit'
            ]
        },
        {
            title: '10 Alkalom',
            price: '60 000 Ft',
            description: 'Teljes érettségi felkészítő csomag',
            features: [
                '10 x 3 órás alkalom',
                'nehéz',
                'szövegeket',
                'kitalálni',
            ]
        }
    ];

    const handleTierClick = (index: number) => {
        setExpandedTier(expandedTier === index ? null : index);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center p-4 z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-6xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-4 md:p-6">
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <h2 className="text-xl md:text-2xl font-bold">Mennyi órára szeretnél jönni?</h2>
                                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                    <XIcon size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                {pricingTiers.map((tier, index) => (
                                    <motion.div
                                        key={tier.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`bg-white border rounded-lg shadow-sm p-4 md:p-6 flex flex-col ${
                                            index === 1 ? 'md:scale-105 md:shadow-sm' : ''
                                        } ${index === 0 ? 'border-violet-500' : ''}`}
                                    >
                                        <div className="md:text-left mb-2">
                                            <h3 className="text-base md:text-lg font-semibold">{tier.title}</h3>
                                            <p className="text-lg md:text-2xl font-bold mt-1 md:mt-2 text-violet-500">{tier.price}</p>
                                        </div>
                                        <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4 md:text-left">{tier.description}</p>

                                        <AnimatePresence>
                                            {(expandedTier === index || window.innerWidth >= 768) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ul className="space-y-1 md:space-y-3 mb-4">
                                                        {tier.features.map((feature, featureIndex) => (
                                                            <li key={featureIndex} className="flex items-center">
                                                                <CheckIcon className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-1 md:mr-2 flex-shrink-0" />
                                                                <span className="text-xs md:text-sm">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="mt-auto">
                                            <button
                                                className={`w-full rounded-md py-2 text-sm md:text-base font-medium transition-colors duration-200 ${
                                                    index === 0
                                                        ? 'bg-violet-600 text-white hover:bg-violet-500'
                                                        : 'bg-black text-white hover:bg-gray-600'
                                                }`}
                                                onClick={() => {
                                                    if (index === 0) {
                                                        console.log('Open registration form');
                                                    } else {
                                                        console.log('Selected package:', tier.title);
                                                    }
                                                }}
                                            >
                                                {index === 0 ? 'Regisztrálok' : 'Megveszem'}
                                            </button>

                                            <button
                                                className="mt-2 w-full text-gray-500 flex items-center justify-center md:hidden"
                                                onClick={() => handleTierClick(index)}
                                            >
                                                {expandedTier === index ? (
                                                    <>
                                                        Kevesebb <ChevronUpIcon className="ml-1" size={16} />
                                                    </>
                                                ) : (
                                                    <>
                                                        Több <ChevronDownIcon className="ml-1" size={16} />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-4 md:mt-8 text-center text-xs md:text-sm text-violet-600">
                                Természetesen ha több alkalmat vásárolsz, akkor is ingyen van az első!
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;