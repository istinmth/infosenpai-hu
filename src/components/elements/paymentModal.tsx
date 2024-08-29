import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialScreen?: ScreenType;
}

type ScreenType = 'main' | 'registration' | 'billing' | 'payment' | 'thankyou';
type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

interface BillingDetails {
    name: string;
    email: string;
    address: {
        line1: string;
        city: string;
        postal_code: string;
        country: string;
    };
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const ProgressIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentStep === 1 ? 'bg-violet-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep === 2 ? 'bg-violet-600' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${currentStep === 3 ? 'bg-violet-600' : 'bg-gray-300'}`} />
        </div>
    );
};

const LoadingDots = () => (
    <div className="flex space-x-1">
        <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
    </div>
);

const StripePaymentForm: React.FC<{ amount: number, onSuccess: () => void }> = ({ amount, onSuccess }) => {
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

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message || 'Ismeretlen hiba történt');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess();
        } else if (paymentIntent && paymentIntent.status === 'requires_action') {
            if (paymentIntent.client_secret) {
                const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.client_secret);
                if (confirmError) {
                    setErrorMessage(`3DS hitelesítési hiba: ${confirmError.message}`);
                } else {
                    onSuccess();
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
            <PaymentElement />
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

const BillingForm: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <AddressElement
                options={{
                    mode: 'billing',
                    defaultValues: {
                        address: {
                            country: 'HU',
                        },
                    },
                }}
            />
            <button
                type="submit"
                className="w-full bg-violet-600 text-white rounded-md py-2 font-medium transition-colors duration-200 hover:bg-violet-700"
            >
                Tovább a fizetéshez
            </button>
        </form>
    );
};

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, initialScreen = 'main' }) => {
    const [expandedTier, setExpandedTier] = useState<number | null>(null);
    const [currentScreen, setCurrentScreen] = useState<ScreenType>(initialScreen);
    const [selectedTier, setSelectedTier] = useState<number>(0);
    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [honeypot, setHoneypot] = useState('');
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: ''
    });
    const [isEmailRegistered, setIsEmailRegistered] = useState(false);
    const [isEmailChanged, setIsEmailChanged] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);

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

    useEffect(() => {
        if (isOpen) {
            setCurrentScreen(initialScreen);
            setSelectedTier(0);
        }
    }, [isOpen, initialScreen]);

    useEffect(() => {
        if (currentScreen === 'billing' && selectedTier > 0) {
            fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: parseInt(pricingTiers[selectedTier].price) }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [currentScreen, selectedTier]);

    const handleTierClick = (index: number) => {
        setExpandedTier(expandedTier === index ? null : index);
    };

    const handleOptionSelect = (index: number) => {
        setSelectedTier(index);
        if (index === 0) {
            setCurrentScreen('registration');
        } else {
            setCurrentScreen('billing');
        }
    };

    const handleBack = () => {
        if (currentScreen === 'payment') {
            setCurrentScreen('billing');
        } else if (currentScreen === 'billing') {
            setCurrentScreen('main');
        } else {
            setCurrentScreen('main');
        }
        setSubmissionStatus('idle');
        setErrorMessage(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'email') {
            setIsEmailChanged(true);
            setIsEmailRegistered(false);
            setSubmissionStatus('idle');
            setErrorMessage(null);
        }
        if (name === 'honeypot') {
            setHoneypot(value);
            return;
        }
    };

    const handlePaymentSuccess = () => {
        setCurrentScreen('thankyou');
    };

    const handleBillingDetailsSubmit = (details: BillingDetails) => {
        setBillingDetails(details);
        setCurrentScreen('payment');
    };

    const handleRegistrationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        setErrorMessage(null);
        setIsEmailRegistered(false);
        setIsEmailChanged(false);
        try {
            const response = await fetch('/api/form-submission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    tier: pricingTiers[selectedTier].title,
                    price: pricingTiers[selectedTier].price
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setSubmissionStatus('error');
                setErrorMessage(data.error || 'Váratlan hiba történt. Kérjük, próbáld újra később.');
                if (response.status === 409) {
                    setIsEmailRegistered(true);
                }
                return;
            }
            if (honeypot) {
                console.log('Bot submission detected');
                setSubmissionStatus('error');
                setErrorMessage('Huncut kis robot vagy! 🤖');
                return;
            }

            console.log('Form submitted successfully:', data);
            setSubmissionStatus('success');
            setTimeout(() => {
                setCurrentScreen('thankyou');
            }, 1000);
        } catch (error: unknown) {
            console.error('Error submitting form:', error);
            setSubmissionStatus('error');
            setErrorMessage('Hiba történt a kapcsolat során. Kérjük, ellenőrizd az internetkapcsolatod és próbáld újra.');
        }
    };
    const handleBillingSubmit = () => {
        setCurrentScreen('payment');
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
                        className="bg-white rounded-lg shadow-xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col"
                    >
                        <div className="p-4 md:p-6 flex-grow overflow-y-auto">
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <div className="w-[72px]">
                                    {currentScreen !== 'main' && (
                                        <button onClick={handleBack}
                                                className="text-gray-500 hover:text-gray-700 flex items-center">
                                            <ArrowLeftIcon size={24}/>
                                        </button>
                                    )}
                                </div>
                                <div className="flex-grow flex justify-center">
                                    <ProgressIndicator currentStep={
                                        currentScreen === 'main' ? 1 :
                                            currentScreen === 'registration' || currentScreen === 'billing' ? 2 : 3
                                    }/>
                                </div>
                                <div className="w-[72px] flex justify-end">
                                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                        <XIcon size={24}/>
                                    </button>
                                </div>
                            </div>

                            <div className="relative" style={{minHeight: '400px'}}>
                                <AnimatePresence mode="wait">
                                    {currentScreen === 'main' && (
                                        <motion.div
                                            key="main"
                                            variants={fadeVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{duration: 0.2}}
                                            className="space-y-6"
                                        >
                                            <h2 className="text-xl md:text-2xl font-bold">Mennyi órára szeretnél
                                                jönni?</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                                {pricingTiers.map((tier, index) => (
                                                    <motion.div
                                                        key={tier.title}
                                                        initial={{opacity: 0, y: 20}}
                                                        animate={{opacity: 1, y: 0}}
                                                        transition={{delay: index * 0.1}}
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
                                                                    initial={{opacity: 0, height: 0}}
                                                                    animate={{opacity: 1, height: 'auto'}}
                                                                    exit={{opacity: 0, height: 0}}
                                                                    transition={{duration: 0.3}}
                                                                >
                                                                    <ul className="space-y-1 md:space-y-3 mb-4">
                                                                        {tier.features.map((feature, featureIndex) => (
                                                                            <li key={featureIndex}
                                                                                className="flex items-center">
                                                                                <CheckIcon
                                                                                    className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-1 md:mr-2 flex-shrink-0"/>
                                                                                <span
                                                                                    className="text-xs md:text-sm">{feature}</span>
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
                                                                        Kevesebb <ChevronUpIcon className="ml-1"
                                                                                                size={16}/>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        Több <ChevronDownIcon className="ml-1"
                                                                                              size={16}/>
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
                                            transition={{duration: 0.3}}
                                            className="absolute inset-0 flex flex-col w-full h-full"
                                        >
                                            <div className="flex flex-col items-center justify-center mt-20">
                                                <div className="space-y-6 w-full max-w-md">
                                                    <h2 className="text-lg md:text-2xl font-bold text-violet-600">Regisztráció
                                                        a próbaalkalomra</h2>
                                                    <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                                                        <div className="flex space-x-4">
                                                            <div className="flex-1">
                                                                <label htmlFor="lastName"
                                                                       className="block text-sm font-medium text-gray-700 mb-1">Vezetéknév</label>
                                                                <input
                                                                    type="text"
                                                                    id="lastName"
                                                                    name="lastName"
                                                                    value={formData.lastName}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                                                                    placeholder="Kovács"
                                                                    required
                                                                />
                                                            </div>
                                                            <div style={{display: 'none'}}>
                                                                <label htmlFor="honeypot">Leave this field empty</label>
                                                                <input
                                                                    type="text"
                                                                    id="honeypot"
                                                                    name="honeypot"
                                                                    value={honeypot}
                                                                    onChange={handleInputChange}
                                                                    tabIndex={-1}
                                                                    autoComplete="off"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <label htmlFor="firstName"
                                                                       className="block text-sm font-medium text-gray-700 mb-1">Keresztnév</label>
                                                                <input
                                                                    type="text"
                                                                    id="firstName"
                                                                    name="firstName"
                                                                    value={formData.firstName}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                                                                    placeholder="János"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email"
                                                                   className="block text-sm font-medium text-gray-700 mb-1">E-mail
                                                                cím</label>
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                                                                placeholder="pelda@email.com"
                                                                required
                                                            />
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className={`w-full text-white rounded-md py-2 font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center text-sm ${
                                                                submissionStatus === 'submitting' || (isEmailRegistered && !isEmailChanged)
                                                                    ? 'bg-violet-300 cursor-not-allowed'
                                                                    : isEmailRegistered
                                                                        ? 'bg-orange-500 hover:bg-orange-600'
                                                                        : 'bg-violet-600 hover:bg-violet-700'
                                                            }`}
                                                            disabled={submissionStatus === 'submitting' || (isEmailRegistered && !isEmailChanged)}
                                                        >
                                                            {submissionStatus === 'submitting' ? (
                                                                <div className="flex items-center">
                                                                    <span className="mr-2">Regisztráció hitelesítése</span>
                                                                    <LoadingDots />
                                                                </div>
                                                            ) : isEmailRegistered && !isEmailChanged ? (
                                                                'Ezzel az e-mailcímmel már regisztráltak.'
                                                            ) : submissionStatus === 'success' ? (
                                                                'Sikeres regisztráció!'
                                                            ) : submissionStatus === 'error' ? (
                                                                'Hiba történt. Próbáld újra.'
                                                            ) : (
                                                                'Regisztrálok'
                                                            )}
                                                        </button>
                                                    </form>
                                                    {errorMessage && !(isEmailRegistered && !isEmailChanged) && (
                                                        <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
                                                    )}
                                                    <p className="text-xs text-center text-gray-500">
                                                        A regisztrációval elfogadod az{' '}
                                                        <Link href="/compliance"
                                                              className="text-violet-600 hover:underline">
                                                            adatkezelési tájékoztatónkat
                                                        </Link>
                                                        .
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentScreen === 'billing' && clientSecret && (
                                        <motion.div
                                            key="billing"
                                            variants={slideVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{duration: 0.3}}
                                            className="absolute inset-0 flex flex-col w-full h-full"
                                        >
                                            <div className="flex flex-col items-center justify-center mt-20">
                                                <div className="space-y-6 w-full max-w-md">
                                                    <h2 className="text-lg md:text-2xl font-bold text-violet-600">Számlázási adatok</h2>
                                                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                                                        <BillingForm onSubmit={handleBillingSubmit} />
                                                    </Elements>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentScreen === 'payment' && clientSecret && (
                                        <motion.div
                                            key="payment"
                                            variants={slideVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{duration: 0.3}}
                                            className="absolute inset-0 flex flex-col w-full h-full"
                                        >
                                            <div className="flex-grow flex flex-col items-center justify-center mt-20">
                                                <div className="space-y-4 w-full max-w-md">
                                                    <p className="text-lg font-semibold">Fizetési összeg: {pricingTiers[selectedTier].price} Ft</p>
                                                    <Elements
                                                        stripe={stripePromise}
                                                        options={{
                                                            clientSecret,
                                                            locale: 'hu' as const,
                                                            appearance: {
                                                                theme: 'stripe',
                                                            },
                                                        }}
                                                    >
                                                        <StripePaymentForm
                                                            amount={parseInt(pricingTiers[selectedTier].price)}
                                                            onSuccess={handlePaymentSuccess}
                                                        />
                                                    </Elements>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                    {currentScreen === 'thankyou' && (
                                        <motion.div
                                            key="thankyou"
                                            variants={fadeVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{duration: 0.3}}
                                            className="absolute inset-0 flex flex-col items-center justify-center"
                                        >
                                            <div className="text-center space-y-4">
                                                <h2 className="text-xl md:text-3xl font-bold text-violet-600">Köszönjük
                                                    a regisztrációt!</h2>
                                                <p className="text-sm md:text-lg text-gray-600">Hamarosan küldünk egy
                                                    visszaigazoló e-mailt a megadott címre. <br/>Ha nem érkezik meg,
                                                    csekkold a spam mappádat is!</p>
                                                <button
                                                    onClick={onClose}
                                                    className="mt-6 px-6 py-2 bg-violet-600 text-white rounded-md font-medium hover:bg-violet-700 transition-colors duration-200 text-sm"
                                                >
                                                    Bezárás
                                                </button>
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