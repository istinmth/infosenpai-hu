import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(request: NextRequest) {
    console.log('Received POST request');

    if (!uri) {
        console.error('MongoDB URI is not defined');
        return NextResponse.json({ message: 'MongoDB URI is not defined' }, { status: 500 });
    }

    try {
        const { school } = await request.json();
        console.log('Received school:', school);

        if (!school) {
            return NextResponse.json({ message: 'School is required' }, { status: 400 });
        }

        let ipAddress = request.headers.get('x-forwarded-for') || request.ip;

        const client = new MongoClient(uri);

        try {
            await client.connect();
            const database = client.db('registrationData');
            const collection = database.collection('highSchools');

            // Check if this IP has already submitted
            const existingSubmission = await collection.findOne({ ipAddress });
            if (existingSubmission) {
                return NextResponse.json({ message: 'Already submitted', alreadySubmitted: true }, { status: 200 });
            }

            await collection.insertOne({
                school,
                ipAddress,
                timestamp: new Date()
            });

            console.log('School logged successfully');
            return NextResponse.json({ message: 'School logged successfully' }, { status: 200 });
        } finally {
            await client.close();
        }
    } catch (error) {
        console.error('Error logging school:', error);
        return NextResponse.json({ message: 'Error logging school' }, { status: 500 });
    }
}