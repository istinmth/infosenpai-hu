import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';

interface PaymentFormProps {
    amount?: number; // Make amount optional
    onSuccess: (paymentIntentId: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setErrorMessage('Stripe nem töltött be megfelelően. Kérjük, frissítsd az oldalt és próbáld újra.');
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setErrorMessage(submitError.message || 'Hiba történt a fizetési adatok elküldése során.');
            setIsProcessing(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-confirmation`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'Ismeretlen hiba történt a fizetés során');
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess(paymentIntent.id);
        } else {
            setErrorMessage('Váratlan hiba történt a fizetés során. Kérjük, próbáld újra.');
        }
        setIsProcessing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 w-full max-w-md mx-auto"
        >
            <h2 className="text-lg md:text-2xl font-bold text-violet-600 text-center">Fizetés</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <PaymentElement
                    options={{
                        layout: 'tabs',
                        wallets: {
                            applePay: 'auto',
                            googlePay: 'auto'
                        }
                    }}
                />
                <button
                    type="submit"
                    disabled={isProcessing || !stripe}
                    className={`w-full text-white rounded-md py-2 font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center text-sm ${
                        isProcessing || !stripe
                            ? 'bg-violet-300 cursor-not-allowed'
                            : 'bg-violet-600 hover:bg-violet-700'
                    }`}
                >
                    {isProcessing ? 'Feldolgozás...' : amount ? `Fizetek ${amount} Ft-ot` : 'Fizetés'}
                </button>
            </form>
            {errorMessage && (
                <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
            )}
        </motion.div>
    );
};

export default PaymentForm;