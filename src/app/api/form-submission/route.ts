// app/api/form-submission/route.ts

import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion, MongoServerError } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export async function POST(request: Request) {
    try {
        console.log('Attempting to connect to MongoDB...');
        await client.connect();
        console.log('Connected to MongoDB.');

        const database = client.db("registrationData");
        const collection = database.collection("registrations");

        const body = await request.json();
        const { lastName, firstName, email, tier, price } = body;

        if (!lastName || !firstName || !email || !tier || !price) {
            return NextResponse.json({ message: 'Missing required fields', receivedData: body }, { status: 400 });
        }

        const result = await collection.insertOne({
            lastName,
            firstName,
            email,
            tier,
            price,
            registrationDate: new Date()
        });

        console.log('Registration stored successfully', result);
        return NextResponse.json({ message: "Registration stored successfully", id: result.insertedId }, { status: 200 });
    } catch (error: unknown) {
        console.error('Error processing registration:', error);
        let errorMessage = 'An unknown error occurred';
        let errorDetails = {};

        if (error instanceof MongoServerError) {
            errorMessage = `MongoDB Error: ${error.message}`;
            errorDetails = {
                code: error.code,
                codeName: error.codeName,
                errorLabels: error.errorLabels,
            };
        } else if (error instanceof Error) {
            errorMessage = error.message;
            errorDetails = { name: error.name, stack: error.stack };
        }

        console.error('Detailed error:', errorMessage, errorDetails);
        return NextResponse.json({
            message: "Failed to process registration",
            error: errorMessage,
            details: errorDetails
        }, { status: 500 });
    } finally {
        await client.close();
        console.log('MongoDB connection closed.');
    }
}