import React from 'react';
import { motion } from 'framer-motion';

interface ThankYouScreenProps {
    uniqueCode: string | null;
    onClose: () => void;
}

const ThankYouScreen: React.FC<ThankYouScreenProps> = ({ uniqueCode, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4"
        >
            <h2 className="text-xl md:text-3xl font-bold text-violet-600">
                {uniqueCode ? 'Köszönjük a vásárlást!' : 'Köszönjük a regisztrációt!'}
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
                Hamarosan küldünk egy visszaigazoló e-mailt a megadott címre. <br/>
                Ha nem érkezik meg, ellenőrizd a spam mappádat is!
            </p>
            {uniqueCode && (
                <div className="bg-gray-100 p-4 rounded-md">
                    <p className="text-sm font-semibold text-gray-700">Egyedi kódod:</p>
                    <p className="text-lg md:text-xl font-bold text-violet-600">{uniqueCode}</p>
                    <p className="text-xs text-gray-500 mt-2">
                        Kérjük, őrizd meg ezt a kódot. Szükséged lesz rá a tanfolyamon való részvételhez.
                    </p>
                </div>
            )}
            <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-violet-600 text-white rounded-md font-medium hover:bg-violet-700 transition-colors duration-200 text-sm"
            >
                Bezárás
            </button>
        </motion.div>
    );
};

export default ThankYouScreen;