import React from 'react';
import { useStripe, useElements, AddressElement } from '@stripe/react-stripe-js';

interface BillingFormProps {
    onSubmit: () => void;
}

export const BillingForm: React.FC<BillingFormProps> = ({ onSubmit }) => {
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