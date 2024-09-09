"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const ContactsPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-whitesmoke min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center text-gray-900 mb-12"
                >
                    Kapcsolat
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-semibold mb-4 text-violet-600">Írj nekünk!</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Név</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">E-mail cím</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="message">Üzenet</Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-violet-500"
                                    rows={4}
                                ></textarea>
                            </div>
                            <Button type="submit" className="w-full">
                                Küldés
                            </Button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white p-6 rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-semibold mb-4 text-violet-600">Elérhetőségeink</h2>
                        <div className="space-y-4">
                            <p><strong>Cím:</strong> 1093 Budapest, Fővám tér 8.</p>
                            <p><strong>E-mail:</strong> info@infoerettsegi.hu</p>
                            <p><strong>Telefon:</strong> +36 30 123 4567</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2 text-amber-500">Nyitvatartás</h3>
                            <p>Hétfő - Péntek: 9:00 - 17:00</p>
                            <p>Szombat - Vasárnap: Zárva</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2 text-amber-500">Térképen</h3>
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2696.1074290305187!2d19.05760661560677!3d47.48676797917648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc40545e77cb%3A0x77bbe968fe7c8a2a!2sBudapesti%20Corvinus%20Egyetem!5e0!3m2!1shu!2shu!4v1628610936325!5m2!1shu!2shu"
                                    width="100%"
                                    height="300"
                                    style={{border:0}}
                                    allowFullScreen={true}
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;