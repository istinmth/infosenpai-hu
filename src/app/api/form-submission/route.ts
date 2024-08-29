import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion, MongoServerError } from 'mongodb';
import SendConfirmationEmail from "@/app/api/emailService";

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
            return NextResponse.json({ error: 'Missing required fields', receivedData: body }, { status: 400 });
        }

        // Check if email already exists
        const existingUser = await collection.findOne({ email: email });
        if (existingUser) {
            return NextResponse.json({ error: 'Ez az email cím már regisztrálva van. Kérjük, használj másik email címet vagy lépj kapcsolatba velünk, ha segítségre van szükséged.' }, { status: 409 });
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

        // Send confirmation email
        try {
            const emailResult = await SendConfirmationEmail(firstName, email);
            console.log('Confirmation email sent successfully:', emailResult);
        } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            // We're still returning a success response, but logging the email error
        }

        return NextResponse.json({ message: "Sikeres regisztráció!", id: result.insertedId }, { status: 200 });
    } catch (error: unknown) {
        console.error('Error processing registration:', error);
        let errorMessage = 'Váratlan hiba történt a regisztráció során. Kérjük, próbáld újra később vagy lépj kapcsolatba velünk.';
        let errorDetails = {};

        if (error instanceof MongoServerError) {
            errorMessage = `Adatbázis hiba történt: ${error.message}`;
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
            error: errorMessage,
            details: errorDetails
        }, { status: 500 });
    } finally {
        await client.close();
        console.log('MongoDB connection closed.');
    }
}