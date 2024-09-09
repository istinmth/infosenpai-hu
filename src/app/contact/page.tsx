"use client"
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import Link from 'next/link';

const ContactsPage: React.FC = () => {
    return (
        <div className="bg-background min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl flex flex-col items-start">
                <Link href="/" className="text-violet-600 hover:text-violet-800 transition-colors mb-4">
                    ← Vissza a főoldalra
                </Link>
                <Card className="w-full shadow-none border-none">
                    <CardContent className="space-y-8 p-0">
                        <h1 className="text-4xl font-bold mb-8">Kapcsolat</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">Cím</h2>
                                    <p className="text-muted-foreground flex items-center">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        1093 Budapest, Fővám tér 8. (C épület)
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">Email</h2>
                                    <p className="text-muted-foreground flex items-center">
                                        <Mail className="h-4 w-4 mr-2" />
                                        info@infosenpai.hu
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">Telefon</h2>
                                    <p className="text-muted-foreground flex items-center">
                                        <Phone className="h-4 w-4 mr-2" />
                                        +36 30 462 4931
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">Előadások időpontja</h2>
                                    <p className="text-muted-foreground flex items-center">
                                        <Clock className="h-4 w-4 mr-2" />
                                        Szombatonként 09:00 - 13:00
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-2">Térképen</h2>
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.957398788972!2d19.057869215944736!3d47.48480831337224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc50fe02e987%3A0x37cc812f715298d3!2sCorvinus%20University%20Building%20C!5e0!3m2!1sen!2shu!4v1631234567890!5m2!1sen!2shu"
                                        width="100%"
                                        height="250"
                                        style={{border:0}}
                                        allowFullScreen={false}
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ContactsPage;