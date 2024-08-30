import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface MainScreenProps {
    onTierSelect: (index: number) => void;
}

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
        price: '26500',
        description: 'Ideális egy témakörhöz',
        features: [
            '4 x 3 órás alkalom',
            'A tananyag egy témaköre',
            'Gyakorlati feladatok, házik',
            'Személyre szabott visszajelzés'
        ]
    },
    {
        title: '20 Alkalom',
        price: '125000',
        description: 'Teljes érettségi felkészítő csomag',
        features: [
            '20 x 3 órás alkalom',
            'Teljes érettségi anyag lefedése',
            'Próbaérettségi',
            'Egyéni konzultációk',
        ]
    }
];

const MainScreen: React.FC<MainScreenProps> = ({ onTierSelect }) => {
    const [expandedTier, setExpandedTier] = useState<number | null>(null);

    const handleTierClick = (index: number) => {
        setExpandedTier(expandedTier === index ? null : index);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-center">Mennyi órára szeretnél jönni?</h2>
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
                            <p className="text-lg md:text-2xl font-bold mt-1 md:mt-2 text-violet-500">
                                {index === 0 ? tier.price : `${tier.price} Ft`}
                            </p>
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
                                                <CheckIcon className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-1 md:mr-2 flex-shrink-0"/>
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
                                onClick={() => onTierSelect(index)}
                            >
                                {index === 0 ? 'Regisztrálok' : 'Megveszem'}
                            </button>

                            <button
                                className="mt-2 w-full text-gray-500 flex items-center justify-center md:hidden"
                                onClick={() => handleTierClick(index)}
                            >
                                {expandedTier === index ? (
                                    <>
                                        Kevesebb <ChevronUpIcon className="ml-1" size={16}/>
                                    </>
                                ) : (
                                    <>
                                        Több <ChevronDownIcon className="ml-1" size={16}/>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="text-center text-xs md:text-sm text-violet-600">
                Természetesen ha több alkalmat vásárolsz, akkor is ingyen van az első!
            </div>
        </div>
    );
};

export default MainScreen;