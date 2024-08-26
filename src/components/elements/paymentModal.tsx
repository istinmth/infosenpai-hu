import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ArrowLeftIcon } from 'lucide-react';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ScreenType = 'main' | 'registration' | 'payment';

const ProgressIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentStep === 1 ? 'bg-violet-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep === 2 ? 'bg-violet-600' : 'bg-gray-300'}`} />
        </div>
    );
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
    const [expandedTier, setExpandedTier] = useState<number | null>(null);
    const [currentScreen, setCurrentScreen] = useState<ScreenType>('main');
    const [selectedTier, setSelectedTier] = useState<number | null>(null);

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
                'Átfogó tananyag',
                'Gyakorlati feladatok',
                'Személyre szabott visszajelzés'
            ]
        },
        {
            title: '10 Alkalom',
            price: '60 000 Ft',
            description: 'Teljes érettségi felkészítő csomag',
            features: [
                '10 x 3 órás alkalom',
                'Teljes érettségi anyag lefedése',
                'Próbaérettségi',
                'Egyéni konzultációk',
            ]
        }
    ];

    const handleTierClick = (index: number) => {
        setExpandedTier(expandedTier === index ? null : index);
    };

    const handleOptionSelect = (index: number) => {
        setSelectedTier(index);
        if (index === 0) {
            setCurrentScreen('registration');
        } else {
            setCurrentScreen('payment');
        }
    };

    const handleBack = () => {
        setCurrentScreen('main');
        setSelectedTier(null);
    };

    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const slideVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: '-100%', opacity: 0 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
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
                                {currentScreen !== 'main' ? (
                                    <button onClick={handleBack} className="text-gray-500 hover:text-gray-700 flex items-center">
                                        <ArrowLeftIcon size={24} className="mr-2" />
                                    </button>
                                ) : (
                                    <div className="w-[72px]"></div>
                                )}
                                <ProgressIndicator currentStep={currentScreen === 'main' ? 1 : 2} />
                                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                    <XIcon size={24} />
                                </button>
                            </div>

                            <div className="relative overflow-hidden" style={{ minHeight: '400px' }}>
                                <AnimatePresence mode="wait">
                                    {currentScreen === 'main' && (
                                        <motion.div
                                            key="main"
                                            variants={fadeVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.2 }}
                                            className="space-y-6"
                                        >
                                            <h2 className="text-xl md:text-2xl font-bold">Mennyi órára szeretnél jönni?</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                                {pricingTiers.map((tier, index) => (
                                                    <motion.div
                                                        key={tier.title}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className={`bg-white border rounded-lg shadow-sm p-4 md:p-6 flex flex-col ${
                                                            index === 1 ? 'md:scale-105 md:shadow-md' : ''
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
                                                                onClick={() => handleOptionSelect(index)}
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
                                        </motion.div>
                                    )}

                                    {currentScreen === 'registration' && (
                                        <motion.div
                                            key="registration"
                                            variants={slideVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 flex flex-col w-full h-full"
                                        >
                                            <div className="flex-grow flex flex-col items-center justify-center">
                                                <div className="space-y-6 w-full max-w-md">
                                                    <h2 className="text-xl md:text-2xl font-bold text-violet-600">Regisztráció a próbaalkalomra</h2>
                                                    <div className="flex space-x-4">
                                                        <div className="flex-1">
                                                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Vezetéknév</label>
                                                            <input
                                                                type="text"
                                                                id="lastName"
                                                                name="lastName"
                                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                                                placeholder="Kovács"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Keresztnév</label>
                                                            <input
                                                                type="text"
                                                                id="firstName"
                                                                name="firstName"
                                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                                                placeholder="János"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail cím</label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                                            placeholder="pelda@email.com"
                                                        />
                                                    </div>
                                                    <button className="w-full bg-violet-600 text-white rounded-md py-3 font-medium hover:bg-violet-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                                                        Regisztráció
                                                    </button>
                                                    <p className="text-xs text-center text-gray-500">
                                                        A regisztrációval elfogadod az adatkezelési tájékoztatónkat.
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentScreen === 'payment' && (
                                        <motion.div
                                            key="payment"
                                            variants={slideVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 flex flex-col w-full h-full"
                                        >
                                            <div className="flex-grow flex flex-col items-center justify-center">
                                                <h2 className="text-xl md:text-2xl font-bold mb-6 self-start">Fizetés</h2>
                                                <div className="space-y-4 w-full max-w-md">
                                                    <p className="text-lg font-semibold">Fizetési összeg: {pricingTiers[selectedTier!].price}</p>
                                                    <div className="bg-gray-100 p-4 rounded-md">
                                                        <p className="text-center text-gray-600">Itt lesz majd a Stripe Embed.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {currentScreen === 'main' && (
                                <div className="mt-4 md:mt-8 text-center text-xs md:text-sm text-violet-600">
                                    Természetesen ha több alkalmat vásárolsz, akkor is ingyen van az első!
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;