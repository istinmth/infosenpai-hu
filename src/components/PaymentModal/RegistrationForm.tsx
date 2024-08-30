import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface RegistrationFormProps {
    onSubmit: (data: { firstName: string; lastName: string; email: string }) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        email: ''
    });
    const [honeypot, setHoneypot] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'honeypot') {
            setHoneypot(value);
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        if (honeypot) {
            console.log('Bot submission detected');
            setErrorMessage('Huncut kis robot vagy! 🤖');
            setIsSubmitting(false);
            return;
        }

        try {
            // Here you would typically make an API call to check if the email is already registered
            // For now, we'll just simulate this with a timeout
            await new Promise(resolve => setTimeout(resolve, 1000));

            onSubmit(formData);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Hiba történt a regisztráció során. Kérjük, próbáld újra később.');
        } finally {
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
            <h2 className="text-lg md:text-2xl font-bold text-violet-600 text-center">
                Regisztráció a próbaalkalomra
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Vezetéknév
                        </label>
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
                    <div className="flex-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            Keresztnév
                        </label>
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail cím
                    </label>
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
                <div style={{ display: 'none' }}>
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
                <button
                    type="submit"
                    className={`w-full text-white rounded-md py-2 font-medium transition-colors duration-200 shadow-md hover:shadow-lg flex items-center justify-center text-sm ${
                        isSubmitting
                            ? 'bg-violet-300 cursor-not-allowed'
                            : 'bg-violet-600 hover:bg-violet-700'
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Regisztráció folyamatban...' : 'Regisztrálok'}
                </button>
            </form>
            {errorMessage && (
                <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
            )}
            <p className="text-xs text-center text-gray-500">
                A regisztrációval elfogadod az{' '}
                <Link href="/compliance" className="text-violet-600 hover:underline">
                    adatkezelési tájékoztatónkat
                </Link>
                .
            </p>
        </motion.div>
    );
};

export default RegistrationForm;