import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';
import Stripe from 'stripe';
import sendConfirmationEmail from "@/app/api/emailService";

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
        const { lastName, firstName, email, tier, price } = body;

        if (!lastName || !firstName || !email || !tier || !price) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if email already exists
        const existingUser = await collection.findOne({ email: email });
        if (existingUser) {
            return NextResponse.json({ error: 'Ez az email cím már regisztrálva van.' }, { status: 409 });
        }

        let clientSecret = null;
        if (price !== 'Ingyenes') {
            // Create a PaymentIntent for paid registrations
            const paymentIntent = await stripe.paymentIntents.create({
                amount: parseInt(price) * 100, // Convert to cents
                currency: 'huf',
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            clientSecret = paymentIntent.client_secret;
        }

        const result = await collection.insertOne({
            lastName,
            firstName,
            email,
            tier,
            price,
            registrationDate: new Date(),
            paymentStatus: price === 'Ingyenes' ? 'N/A' : 'pending',
        });

        // Send confirmation email
        const emailTemplate = price === 'Ingyenes' ? 'freeRegistration' : 'paidRegistration';
        await sendConfirmationEmail(firstName, email, emailTemplate);

        return NextResponse.json({
            message: "Sikeres regisztráció!",
            id: result.insertedId,
            clientSecret: clientSecret
        }, { status: 200 });

    } catch (error) {
        console.error('Error processing registration:', error);
        return NextResponse.json({ error: 'Váratlan hiba történt a regisztráció során.' }, { status: 500 });
    } finally {
        await client.close();
    }
}