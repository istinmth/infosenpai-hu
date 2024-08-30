"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaymentModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const PaymentModalContext = createContext<PaymentModalContextType | undefined>(undefined);

export function PaymentModalProvider({ children }: { children: ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <PaymentModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </PaymentModalContext.Provider>
    );
}

export function usePaymentModal() {
    const context = useContext(PaymentModalContext);
    if (context === undefined) {
        throw new Error('usePaymentModal must be used within a PaymentModalProvider');
    }
    return context;
}