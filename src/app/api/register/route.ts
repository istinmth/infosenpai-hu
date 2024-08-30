import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';
import Stripe from 'stripe';
import sendConfirmationEmail from "../emailService";

const uri = process.env.MONGODB_URI!;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

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
        const { firstName, lastName, email, price } = body;

        if (!firstName || !lastName || !email || !price) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if email already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        let paymentIntentId = null;
        if (price !== 'Ingyenes') {
            // Create a PaymentIntent with Stripe
            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(price) * 100, // amount in cents
                currency: 'huf',
                payment_method_types: ['card'],
            });
            paymentIntentId = paymentIntent.id;
        }

        // Insert user data into MongoDB
        const result = await collection.insertOne({
            firstName,
            lastName,
            email,
            price,
            paymentStatus: price === 'Ingyenes' ? 'not_applicable' : 'pending',
            paymentIntentId,
            registrationDate: new Date()
        });

        // Send confirmation email
        const emailTemplate = price === 'Ingyenes' ? 'freeRegistration' : 'paidRegistration';
        await sendConfirmationEmail(email, emailTemplate);

        return NextResponse.json({
            message: "Sikeres regisztráció!",
            paymentIntentId: paymentIntentId
        }, { status: 201 });

    } catch (error) {
        console.error('Error processing registration:', error);
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    } finally {
        await client.close();
    }
}