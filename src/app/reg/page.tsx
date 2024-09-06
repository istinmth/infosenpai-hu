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
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTier, setFilterTier] = useState('');
    const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRegistrations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams({
                ...(searchTerm && { search: searchTerm }),
                ...(filterTier && { tier: filterTier }),
                ...(filterPaymentStatus && { paymentStatus: filterPaymentStatus }),
            });
            const response = await fetch(`/api/registrations?${queryParams}`);
            if (!response.ok) {
                throw new Error('Failed to fetch registrations');
            }
            const data: Registration[] = await response.json();
            setRegistrations(data);
        } catch (err) {
            setError('Error fetching registrations. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRegistrations();
    }, [searchTerm, filterTier, filterPaymentStatus]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleTierFilter = (value: string) => {
        setFilterTier(value);
    };

    const handlePaymentStatusFilter = (value: string) => {
        setFilterPaymentStatus(value);
    };

    const handleRefresh = () => {
        fetchRegistrations();
    };

    return (
        <div className="p-8 min-h-screen bg-whitesmoke">
            <Card className="bg-black text-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Registration Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <Input
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="flex-grow bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                        />
                        <Select onValueChange={handleTierFilter} value={filterTier}>
                            <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700">
                                <SelectValue placeholder="Filter by Tier" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white">
                                <SelectItem value="">All Tiers</SelectItem>
                                <SelectItem value="Az első alkalom">Az első alkalom</SelectItem>
                                <SelectItem value="4 Alkalom">4 Alkalom</SelectItem>
                                <SelectItem value="20 Alkalom">20 Alkalom</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={handlePaymentStatusFilter} value={filterPaymentStatus}>
                            <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700">
                                <SelectValue placeholder="Filter by Payment" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white">
                                <SelectItem value="">All Statuses</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="N/A">N/A</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={handleRefresh}
                            disabled={isLoading}
                            className="bg-violet-600 hover:bg-violet-700 text-white"
                        >
                            {isLoading ? 'Loading...' : 'Refresh Data'}
                        </Button>
                    </div>
                    {error && <p className="text-amber-500 mb-4">{error}</p>}
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-gray-700">
                                <TableHead className="text-violet-400">Name</TableHead>
                                <TableHead className="text-violet-400">Email</TableHead>
                                <TableHead className="text-violet-400">Tier</TableHead>
                                <TableHead className="text-violet-400">Registration Date</TableHead>
                                <TableHead className="text-violet-400">Payment Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registrations.map((registration) => (
                                <TableRow key={registration._id} className="border-b border-gray-700">
                                    <TableCell className="text-white">{`${registration.firstName} ${registration.lastName}`}</TableCell>
                                    <TableCell className="text-white">{registration.email}</TableCell>
                                    <TableCell className="text-white">{registration.tier}</TableCell>
                                    <TableCell className="text-white">{new Date(registration.registrationDate).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-amber-500">{registration.paymentStatus}</TableCell>
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