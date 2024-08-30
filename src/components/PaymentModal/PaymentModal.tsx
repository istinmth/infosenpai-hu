import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import MainScreen from './MainScreen';
import RegistrationForm from './RegistrationForm';
import BillingForm from './BillingForm';
import PaymentForm from './PaymentForm';
import ThankYouScreen from './ThankYouScreen';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type ScreenType = 'main' | 'registration' | 'billing' | 'payment' | 'thankyou';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
    const [currentScreen, setCurrentScreen] = useState<ScreenType>('main');
    const [selectedTier, setSelectedTier] = useState<number>(0);
    const [studentData, setStudentData] = useState({ firstName: '', lastName: '', email: '' });
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [uniqueCode, setUniqueCode] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<number>(0);

    useEffect(() => {
        if (isOpen) {
            setCurrentScreen('main');
            setSelectedTier(0);
        }
    }, [isOpen]);

    const handleTierSelect = (tierIndex: number) => {
        setSelectedTier(tierIndex);
        setCurrentScreen('registration');
    };

    const handleRegistrationSubmit = async (data: typeof studentData) => {
        setStudentData(data);
        if (selectedTier === 0) {
            // Free tier
            // TODO: Implement API call for free registration
            setCurrentScreen('thankyou');
        } else {
            // Paid tier
            // TODO: Implement API call to create PaymentIntent
            // setClientSecret(response.clientSecret);
            setCurrentScreen('billing');
        }
    };

    const handleBillingSubmit = () => {
        setCurrentScreen('payment');
    };

    const handlePaymentSuccess = async (paymentIntentId: string) => {
        // TODO: Implement API call to confirm payment and get unique code
        // setUniqueCode(response.uniqueCode);
        setCurrentScreen('thankyou');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
                {currentScreen === 'main' && (
                    <MainScreen onTierSelect={handleTierSelect} />
                )}
                {currentScreen === 'registration' && (
                    <RegistrationForm onSubmit={handleRegistrationSubmit} />
                )}
                {currentScreen === 'billing' && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <BillingForm onSubmit={handleBillingSubmit} />
                    </Elements>
                )}
                {currentScreen === 'payment' && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm
                            amount={selectedPrice}
                            onSuccess={handlePaymentSuccess}
                        />
                    </Elements>
                )}
                {currentScreen === 'thankyou' && (
                    <ThankYouScreen uniqueCode={uniqueCode} onClose={onClose} />
                )}
            </div>
        </div>
    );
};

export default PaymentModal;