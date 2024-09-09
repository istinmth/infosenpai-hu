"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

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
        console.log('Form submitted:', formData);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-gray-900">Írj nekünk!</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Név</label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-white border-gray-300 text-gray-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail cím</label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="bg-white border-gray-300 text-gray-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Üzenet</label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="bg-white border-gray-300 text-gray-900"
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                                    Küldés
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-gray-900">Elérhetőségeink</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-gray-700">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-5 w-5 text-gray-500" />
                                <p>1093 Budapest, Fővám tér 8.</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-gray-500" />
                                <p>info@infosenpai.hu</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-5 w-5 text-gray-500" />
                                <p>+36 30 462 4931</p>
                            </div>
                            <div className="pt-4">
                                <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-900">
                                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                    Az előadások időpontja
                                </h3>
                                <p>Szombatonként 09:00 - 13:00</p>
                            </div>
                            <div className="pt-4">
                                <h3 className="text-lg font-semibold mb-2 text-gray-900">Térképen</h3>
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;