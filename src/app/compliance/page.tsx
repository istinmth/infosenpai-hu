import React from 'react';

const CompliancePage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Adatkezelési Tájékoztató</h1>
            <p className="mb-4">
                Az InfoSenpai tiszteletben tartja az Ön személyes adatait. Ez az adatkezelési tájékoztató
                leírja, hogyan gyűjtjük, használjuk és védjük az Ön információit.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Milyen adatokat gyűjtünk?</h2>
            <p className="mb-4">
                Gyűjtjük az Ön által megadott nevet és e-mail címet, amikor regisztrál a szolgáltatásainkra.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Hogyan használjuk az adatokat?</h2>
            <p className="mb-4">
                Az adatokat arra használjuk, hogy:
                <ul className="list-disc list-inside ml-4">
                    <li>Kapcsolatba lépjünk Önnel a szolgáltatásainkkal kapcsolatban</li>
                    <li>Személyre szabjuk és javítsuk szolgáltatásainkat</li>
                </ul>
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Az Ön jogai</h2>
            <p className="mb-4">
                Önnek joga van kérni a személyes adataihoz való hozzáférést, azok helyesbítését vagy törlését.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Kapcsolat</h2>
            <p className="mb-4">
                Ha bármilyen kérdése van az adatkezelési gyakorlatunkkal kapcsolatban, kérjük, lépjen kapcsolatba velünk
                a privacy@infosenpai.hu e-mail címen.
            </p>
        </div>
    );
};

export default CompliancePage;