// File: src/app/api/registrations/route.ts

import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    if (!client.connect()) {
        await client.connect();
    }
    return client.db("registrationData");
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const tier = searchParams.get('tier');
    const paymentStatus = searchParams.get('paymentStatus');

    try {
        const db = await connectToDatabase();
        const collection = db.collection("registrations");

        let query: any = {};

        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        if (tier) {
            query.tier = tier;
        }
        if (paymentStatus) {
            query.paymentStatus = paymentStatus;
        }

        const registrations = await collection.find(query).toArray();

        return NextResponse.json(registrations);
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json({ error: 'Error fetching registrations' }, { status: 500 });
    } finally {
        await client.close();
    }
}