"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Registration {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    tier: string;
    registrationDate: string;
    paymentStatus: string;
}

const RegistrationDashboard: React.FC = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchRegistrations = async () => {
        setError(null);
        try {
            const response = await fetch('/api/registrations');
            if (!response.ok) {
                throw new Error('Failed to fetch registrations');
            }
            const data: Registration[] = await response.json();
            setRegistrations(data);
        } catch (err) {
            setError('Error fetching registrations. Please try again.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, []);

    return (
        <div className="p-8 min-h-screen bg-whitesmoke">
            <Card className="mb-8 opacity-80">
                <CardHeader>
                    <CardTitle>Registration Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4 mb-4">
                        <Input
                            placeholder="Search by name or email"
                            value=""
                            disabled
                            className="max-w-sm bg-gray-100 cursor-not-allowed"
                        />
                        <Select disabled>
                            <SelectTrigger className="w-[180px] bg-gray-100 cursor-not-allowed">
                                <SelectValue placeholder="Filter by Tier" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Tiers</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select disabled>
                            <SelectTrigger className="w-[180px] bg-gray-100 cursor-not-allowed">
                                <SelectValue placeholder="Filter by Payment" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Statuses</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button disabled className="bg-gray-300 cursor-not-allowed">
                            Refresh Data
                        </Button>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Tier</TableHead>
                                <TableHead>Registration Date</TableHead>
                                <TableHead>Payment Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registrations.map((registration) => (
                                <TableRow key={registration._id}>
                                    <TableCell>{`${registration.firstName} ${registration.lastName}`}</TableCell>
                                    <TableCell>{registration.email}</TableCell>
                                    <TableCell>{registration.tier}</TableCell>
                                    <TableCell>{new Date(registration.registrationDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{registration.paymentStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegistrationDashboard;