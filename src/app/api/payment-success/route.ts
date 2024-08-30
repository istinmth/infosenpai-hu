import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';
import Stripe from 'stripe';
import crypto from 'crypto';

const uri = process.env.MONGODB_URI;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

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
        await client.connect();
        const database = client.db("registrationData");
        const collection = database.collection("registrations");

        const body = await request.json();
        const { paymentIntentId, email } = body;

        if (!paymentIntentId || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify the payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
            return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
        }

        // Generate a unique code
        const uniqueCode = crypto.randomBytes(4).toString('hex').toUpperCase();

        // Update the user's record in the database
        const result = await collection.updateOne(
            { email: email },
            {
                $set: {
                    paymentStatus: 'completed',
                    uniqueCode: uniqueCode,
                    paymentIntentId: paymentIntentId
                }
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: "Payment confirmed successfully",
            uniqueCode: uniqueCode
        }, { status: 200 });

    } catch (error) {
        console.error('Error processing payment confirmation:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    } finally {
        await client.close();
    }
}