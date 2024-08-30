import React, { useState } from 'react';
import { AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';

interface BillingFormProps {
    onSubmit: (billingDetails: any) => void;
}

const BillingForm: React.FC<BillingFormProps> = ({ onSubmit }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage('Stripe nem töltött be megfelelően. Kérjük, frissítsd az oldalt és próbáld újra.');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        const addressElement = elements.getElement('address');

        if (addressElement) {
            const { complete, value } = await addressElement.getValue();

            if (complete) {
                onSubmit(value);
            } else {
                setErrorMessage('Kérjük, töltsd ki az összes kötelező mezőt.');
                setIsSubmitting(false);
            }
        } else {
            setErrorMessage('Hiba történt a számlázási adatok betöltésekor. Kérjük, próbáld újra.');
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 w-full max-w-md mx-auto"
        >
            <h2 className="text-lg md:text-2xl font-bold text-violet-600 text-center">Számlázási adatok</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <AddressElement
                    options={{
                        mode: 'billing',
                        defaultValues: {
                            address: {
                                country: 'HU',
                            },
                        },
                        validation: {
                            phone: {
                                required: 'auto',
                            },
                        },
                    }}
                />
                <button
                    type="submit"
                    className={`w-full text-white rounded-md py-2 font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center text-sm ${
                        isSubmitting
                            ? 'bg-violet-300 cursor-not-allowed'
                            : 'bg-violet-600 hover:bg-violet-700'
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Feldolgozás...' : 'Tovább a fizetéshez'}
                </button>
            </form>
            {errorMessage && (
                <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
            )}
        </motion.div>
    );
};

export default BillingForm;