import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripePaymentFormProps {
    amount: number;
    onSuccess: (paymentIntentId: string) => void;
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({ amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

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
            setErrorMessage(error.message || 'Ismeretlen hiba történt');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess(paymentIntent.id);
        } else if (paymentIntent && paymentIntent.status === 'requires_action') {
            if (paymentIntent.client_secret) {
                const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.client_secret);
                if (confirmError) {
                    setErrorMessage(`3DS hitelesítési hiba: ${confirmError.message}`);
                } else {
                    onSuccess(paymentIntent.id);
                }
            } else {
                setErrorMessage('Hiba történt a fizetés során: hiányzó client_secret');
            }
        } else {
            setErrorMessage('Váratlan hiba történt.');
        }
        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
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
                disabled={!stripe || isProcessing}
                className="mt-4 w-full bg-violet-600 text-white rounded-md py-2 font-medium transition-colors duration-200 hover:bg-violet-700 disabled:bg-gray-400"
            >
                {isProcessing ? 'Egy pillanat...' : `Fizetek ${amount} Ft-ot`}
            </button>
            {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
        </form>
    );
};