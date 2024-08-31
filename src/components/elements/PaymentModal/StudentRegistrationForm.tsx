import React, { useState } from 'react';
import Link from 'next/link';
import { LoadingDots } from './LoadingDots';

interface RegistrationFormProps {
    onSubmit: (formData: FormData) => Promise<void>;
}

interface FormData {
    lastName: string;
    firstName: string;
    email: string;
}

export const StudentRegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        lastName: '',
        firstName: '',
        email: ''
    });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isEmailRegistered, setIsEmailRegistered] = useState(false);
    const [isEmailChanged, setIsEmailChanged] = useState(false);
    const [honeypot, setHoneypot] = useState('');

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        setErrorMessage(null);

        if (honeypot) {
            console.log('Bot submission detected');
            setSubmissionStatus('error');
            setErrorMessage('Huncut kis robot vagy! 🤖');
            return;
        }

        try {
            await onSubmit(formData);
            setSubmissionStatus('success');
        } catch (error: any) {
            setSubmissionStatus('error');
            setErrorMessage(error.message || 'Hiba történt a regisztráció során. Kérjük, próbáld újra később.');
            if (error.status === 409) {
                setIsEmailRegistered(true);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Vezetéknév</label>
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
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Keresztnév</label>
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail cím</label>
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
            {errorMessage && !(isEmailRegistered && !isEmailChanged) && (
                <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
            )}
            <p className="text-xs text-center text-gray-500">
                A regisztrációval elfogadod az{' '}
                <Link href="/compliance" className="text-violet-600 hover:underline">
                    adatkezelési tájékoztatónkat
                </Link>
                .
            </p>
        </form>
    );
};