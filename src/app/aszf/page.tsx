import React from 'react';

const ASZFComponent = () => {
    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">

            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-justify">
                <h1 className="text-2xl font-extrabold text-black sm:text-3xl mb-8 text-left">ÁLTALÁNOS
                    SZERZŐDÉSI FELTÉTELEK</h1>
                <section>
                    <h2 className="text-2xl font-bold text-black mt-8 mb-4">1. BEVEZETÉS</h2>
                    <p className={"text-gray-500"}>
                        Jelen Általános Szerződési Feltételek (továbbiakban: ÁSZF) Németh István Ákos egyéni vállalkozó
                        (továbbiakban: Szolgáltató) által az infosenpai.hu címen elérhető weboldalon (továbbiakban:
                        Weboldal) keresztül nyújtott szolgáltatásokra vonatkoznak.
                    </p>
                    <p className={"text-gray-500"}>
                        E megállapodás kötelező érvényű Önre nézve (továbbiakban: Felhasználó), amennyiben a Weboldalon
                        regisztrál, vagy nem regisztrál, de az oldalt használja. Amennyiben nem ért egyet a
                        felhasználási feltételekkel, vagy nem tudja elfogadni azokat, úgy ne kattintson a regisztrálás
                        gombra és ne használja az oldalt.
                    </p>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. SZOLGÁLTATÓ ADATAI</h2>
                    <ul className="list-disc pl-5 space-y-1 text-gray-500">
                        <li>Név: Németh István Ákos egyéni vállalkozó</li>
                        <li>Székhely: 1134 Budapest, Dunyov István utca 12. 8.em. 24</li>
                        <li>Adószám: 46345774-1-41</li>
                        <li>Nyilvántartási szám: 58387504</li>
                        <li>E-mail: info[kukac]infosenpai.hu</li>
                    </ul>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. FOGALMAK</h2>
                    <p className={"text-gray-500"}>3.1. Felhasználó: az a természetes személy, aki a Weboldalon regisztrál vagy a Weboldalt
                        használja.</p>
                    <p className={"text-gray-500"}>3.2. Szolgáltatás: a Szolgáltató által nyújtott, személyes tanításon alapuló kurzusok, melyek a
                        Weboldalon előre kifizethetők 1, 4, vagy 20 alkalmas csomagokban.</p>
                    <p className={"text-gray-500"}>3.3. Weboldal: az infosenpai.hu címen elérhető internetes oldal.</p>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. AZ ÁSZF HATÁLYA</h2>
                    <p className={"text-gray-500"}>4.1. Jelen ÁSZF a Weboldalon történő közzététel napjától hatályos és visszavonásig érvényes.</p>
                    <p className={"text-gray-500"}>4.2. A Szolgáltató jogosult egyoldalúan módosítani az ÁSZF-et. A módosításokat a Szolgáltató azok
                        hatályba lépése előtt 15 (tizenöt) nappal a Weboldalon közzéteszi.</p>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. A SZOLGÁLTATÁS LEÍRÁSA</h2>
                    <p className={"text-gray-500"}>5.1. A Szolgáltató személyes tanításon alapuló kurzusokat kínál, melyek a Weboldalon előre
                        kifizethetők 1, 4, vagy 20 alkalmas csomagokban. A kurzusok legalább 10 nappal előre közölt
                        helyszínen és időpontban tartandók meg.</p>
                    <p className={"text-gray-500"}>5.2. A kurzusok részletes leírása, időtartama és ára a Weboldalon található meg.</p>
                    <p className={"text-gray-500"}>5.3. A Szolgáltató fenntartja a jogot, hogy a kurzusok tartalmát, időpontját vagy árát előzetes
                        értesítés nélkül megváltoztassa.</p>
                    <p className={"text-gray-500"}>5.4 A Felhasználó a kurzus megvásárlása után egy ú.n. egyedi azonosítót kap, melyet bemutatva
                        igazolja a fizetés tényét.</p>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. SZERZŐDÉSKÖTÉS</h2>
                    <p className={"text-gray-500"}>6.1. A szerződés a Weboldal használatával vagy a kurzusra való jelentkezéssel jön létre a
                        Felhasználó és a Szolgáltató között.</p>
                    <p className={"text-gray-500"}>6.2. A Felhasználó a megrendelés elküldésével kijelenti, hogy megismerte és elfogadja jelen
                        ÁSZF-et.</p>
                    <p className={"text-gray-500"}>6.3. A szerződés elektronikus úton megkötött szerződésnek minősül, amelyre az elektronikus
                        kereskedelmi szolgáltatások, valamint az információs társadalommal összefüggő szolgáltatások
                        egyes kérdéseiről szóló 2001. évi CVIII. törvény rendelkezései irányadóak.</p>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. FIZETÉSI FELTÉTELEK</h2>
                    <p className={"text-gray-500"}>7.1. A kurzusok díját előre, a Weboldalon keresztül kell kifizetni.</p>
                    <p className={"text-gray-500"}>7.2. Az árak forintban értendők és tartalmazzák az általános forgalmi adót (ÁFA).</p>
                    <p className={"text-gray-500"}>7.3. A fizetés a Stripe rendszeren keresztül történhet bankkártyával, Apple Pay-jel vagy Google
                        Pay-jel. Lehetőség van személyesen, kártyával történő fizetésre is.</p>
                    <p className={"text-gray-500"}>7.4. A számla kiállítása elektronikus formában történik a Szamlazz.hu rendszeren keresztül,
                        melyet a Szolgáltató a Felhasználó által megadott e-mail címre küld el.</p>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. ELÁLLÁSI JOG</h2>
                    <p className={"text-gray-500"}>8.1. A Felhasználót a fogyasztó és a vállalkozás közötti szerződések részletes szabályairól szóló
                        45/2014. (II. 26.) Korm. rendelet alapján 14 napos elállási jog illeti meg, kivéve, ha már részt
                        vett egy tanítási alkalmon.</p>
                    <p className={"text-gray-500"}>8.2. Amennyiben a Felhasználó már részt vett egy tanítási alkalmon, az elállási jogát elveszíti,
                        és a befizetett díjat nem kaphatja vissza.</p>
                    <p className={"text-gray-500"}>8.3. Az elállási jogot a Felhasználó a szerződés megkötésének napjától számított 14 napon belül
                        gyakorolhatja, amennyiben még nem vett részt tanítási alkalmon.</p>
                    <p className={"text-gray-500"}>8.4. Az elállási jog gyakorlása esetén a Szolgáltató haladéktalanul, de legkésőbb az elállásról
                        való tudomásszerzésétől számított 14 napon belül visszatéríti a Felhasználó által teljesített
                        valamennyi ellenszolgáltatást.</p>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. FELELŐSSÉG KORLÁTOZÁSA</h2>
                    <p className={"text-gray-500"}>9.1. A Szolgáltató nem vállal felelősséget a kurzus során átadott információk felhasználásából
                        eredő következményekért.</p>
                    <p className={"text-gray-500"}>9.2. A Szolgáltató törekszik a lehető legpontosabb információ átadására, de nem garantálja, hogy
                        a kurzus tartalma minden esetben megfelel az oktatási intézmények által használt anyagoknak.</p>
                    <p className={"text-gray-500"}>9.3. A Weboldal használatából eredő károkért a Szolgáltató felelősséget nem vállal.</p>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. SZERZŐI JOGOK</h2>
                    <p className={"text-gray-500"}>10.1. A weboldalon található tartalmak, valamint az élő oktatás során bemutatott anyagok, diák és
                        egyéb oktatási segédletek mind szerzői jogi védelem alatt állnak. A szerzői jog jogosultja a
                        Szolgáltató.</p>
                    <br/>
                    <p className={"text-gray-500"}>10.2. Az infosenpai.hu oldalt azért hoztuk létre, hogy segítsünk Önnek a tanulásban. Úgy
                        gondoljuk, hogy a szolgáltatásunkért cserébe elkért összegek figyelembe veszik a diákok anyagi
                        helyzetét, és egy kiemelkedően magas minőségű szolgáltatást nyújtunk. Szeretnénk továbbra is
                        segíteni Önnek a felkészülés során, és Ön is segítsen nekünk, hogy ne kerülhessenek fel
                        különböző letöltő oldalakra és egyéb fájlmegosztó oldalakra az infosenpai.hu oktatóanyagai,
                        illetve az élő oktatás során bemutatott anyagok. Amellett ugyanis, hogy ez bűncselekmény,
                        rendkívül méltánytalan is velünk szemben.</p><br/>
                    <p className={"text-gray-500"}>10.3. A weboldal minden tartalma, az élő oktatás során bemutatott anyagok, így a vizuális
                        interfészek, grafika, design, számítógépes kód (beleértve a forráskódot vagy tárgyi kód),
                        szoftverek, szolgáltatások, tartalom, oktatási anyagok, diák és bármilyen egyéb tartalom
                        (továbbiakban Tartalom) mind szerzői jogi védelem alatt állnak.</p><br/>
                    <p className={"text-gray-500"}>10.4. A weboldal teljes egésze, a weboldalon található oktatási tartalmak, valamint az élő
                        oktatás során bemutatott anyagok szerzői jogi jogosultja Németh István Ákos egyéni vállalkozó
                        (Szolgáltató). A Weboldalon található tartalmak, illetve az élő oktatás során bemutatott anyagok
                        részének, vagy egészének másolása, azoknak akár analóg, akár digitális úton történő tárolása,
                        rögzítése, újra előállítása, letöltése, szerkesztése vagy bármilyen más módon történő
                        felhasználása minden esetben csak a Szolgáltató előzetes, írásos engedélyével történhet. A
                        Weboldal és az élő oktatás bármilyen tartalmának bármilyen formában megvalósuló, akár
                        kereskedelmi, akár más céllal történő felhasználása kizárólag a Szolgáltató előzetes, írásbeli
                        engedélyével lehetséges.</p><br/>
                    <p className={"text-gray-500"}>10.5. Ha ezen előírásokat, mint felhasználó nem tartja be, akkor amellett, hogy nem jogosult
                        többé a weboldal használatára és az élő oktatáson való részvételre, az ezek megszegéséből eredő
                        minden kárért kizárólagos felelősséggel tartozik, így különösen, de nem kizárólagosan
                        törölhetjük a felhasználóink közül, illetve a polgári jog általános szabályai szerint
                        sérelemdíjat is követelhetünk, valamint minden egyéb intézkedést megtehetünk a szerzői jogok
                        védelmében. Az élő oktatás során bemutatott anyagokat – a Szolgáltató előzetes, írásos engedélye
                        nélkül – harmadik fél számára nem teheti közzé, nem továbbíthatja, nem hozhatja nyilvánosságra
                        és nem használhatja oktatási célra, valamint nem értékesítheti. A Weboldal és az élő oktatás
                        bármilyen tartalmának bármilyen formában megvalósuló, akár kereskedelmi, akár más céllal történő
                        megosztása, nyilvánosság felé közvetítése, jogtalan használata, fájlmegosztó oldalakra való
                        feltöltése vagy bármilyen más módon történő megosztása tilos.</p><br/>
                    <p className={"text-gray-500"}>10.6. A szerzői jogi törvény értelmében a Szolgáltató követelheti a jogsértés megtörténtének
                        bírósági megállapítását; követelheti a jogsértés vagy az azzal közvetlenül fenyegető
                        cselekmények abbahagyását és a jogsértő eltiltását a további jogsértéstől. Ezen kívül azt is
                        követelheti, hogy a jogsértő szolgáltasson adatot a jogsértéssel érintett dolgok vagy
                        szolgáltatások előállításában, forgalmazásában, illetve teljesítésében résztvevőkről, a jogsértő
                        felhasználásra kialakított üzleti kapcsolatokról. Követelheti a jogsértéssel elért gazdagodás
                        visszatérítését; követelheti a sérelmes helyzet megszüntetését, a jogsértést megelőző állapot
                        helyreállítását, továbbá a kizárólag vagy elsősorban a jogsértéshez használt eszközök és
                        anyagok, valamint a jogsértéssel előállott dolgok lefoglalását, meghatározott személynek történő
                        átadását, kereskedelmi forgalomból való visszahívását, onnan való végleges kivonását, illetve
                        megsemmisítését.</p><br/>
                    <p className={"text-gray-500"}>10.7. A szerzői jog megsértése esetén a Szolgáltató a polgári jogi felelősség szabályai szerint
                        kártérítést is követelhet. A törvényben szabályozott személyhez fűződő joga megsértése esetén a
                        Szolgáltató a polgári jog általános szabályai szerint sérelemdíjat is követelhet. Jogtalan
                        felhasználás esetén a jogsértő 10 000 forint / nap / mű, de minimum 150 000 Forint összegű
                        kötbér megfizetésére köteles. A Szolgáltató a kötbért meghaladó kárát is érvényesítheti
                        (beleértve az elmaradt jogdíjkövetelését).</p><br/>
                    <p className={"text-gray-500"}>10.8. Az előzőeken túlmenően a Szolgáltató fenntartja a jogot arra, hogy jogai és gazdasági
                        érdekei védelme érdekében a weboldalon található minden tartalom bármely formában megvalósuló,
                        és a Szolgáltató előzetes, írásbeli engedélye nélkül történő felhasználása esetén napi 10 000
                        forinttól 100 000 forintig terjedő jogdíjat állapítson meg és követeljen a jogsértővel szemben.
                        Jogsértő a jogsértő magatartás tanúsításával – vagyis a weboldalon található tartalmak engedély
                        nélküli felhasználásával - magára nézve kötelezően alkalmazandó módon elfogadja ezen jogdíj
                        megfizetését.</p>
                </section>
                <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. ADATVÉDELEM</h2>
                    <p className={"text-gray-500"}>11.1. A Szolgáltató a Felhasználó személyes adatait az Adatvédelmi Szabályzatban foglaltak
                        szerint kezeli.</p>
                    <p className={"text-gray-500"}>11.2. Az Adatvédelmi Szabályzat elérhető a Weboldalon.</p>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. PANASZKEZELÉS</h2>
                    <p className={"text-gray-500"}>12.1. A Felhasználó panaszait a Szolgáltató elérhetőségein jelezheti.</p>
                    <p className={"text-gray-500"}>12.2. A Szolgáltató minden panaszt kivizsgál, és törekszik azokat 30 napon belül
                        megválaszolni.</p>
                    <p className={"text-gray-500"}>12.3. Amennyiben a Felhasználó nem elégedett a panaszkezelés eredményével, jogosult a lakóhelye
                        vagy tartózkodási helye szerint illetékes békéltető testülethez fordulni.</p>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. FELHASZNÁLÓK SZÁMÁRA TILTOTT
                        TEVÉKENYSÉGEK</h2>
                    <p className={"text-gray-500"}>Ha regisztrál a infosenpai.hu weboldalon, vagy használja azt, akkor felhasználóként elfogadja,
                        hogy többek között, de nem kizárólagosan az alábbi tevékenységek tilosak az oldal használata
                        során. A felsorolás tehát csak példákat tartalmaz, az oldalon bármilyen jogellenes magatartás
                        tilos.</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-500">
                        <li>Tilos a weboldal kereskedelmi vagy oktatási célra történő felhasználása. Az oldal és a
                            kapcsolódó szolgáltatások kizárólagos célja a személyes használat. Bármilyen ettől eltérő
                            felhasználáshoz az üzemeltető írásos engedélye szükséges.
                        </li>
                        <li>Tilos bármilyen módon használatba (így például bérbe vagy kölcsönbe adni) a Felhasználó
                            egyéni azonosító kódját.
                        </li>
                        <li>Tilos eltávolítani, megkerülni, vagy más módon zavarni az oldal biztonságával kapcsolatos
                            funkciókat, valamint tilos megzavarni, megkerülni azokat a funkciókat, amelyek
                            megakadályozzák vagy korlátozzák az oldal jogosulatlan vagy nem szabályos használatát.
                        </li>
                        <li>Tilos visszafejteni, feltörni, vagy más módon támadást intézni a weboldal és az oldal
                            forráskódja ellen.
                        </li>
                        <li>Tilos szándékosan zavarni, akadályozni, veszélyeztetni a weboldal működését</li>
                        <li>Tilos a károkozás akár szándékos, akár gondatlan formában.</li>
                    </ul>
                </section> <br/>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. ZÁRÓ RENDELKEZÉSEK</h2>
                    <p className={"text-gray-500"}>13.1. Jelen ÁSZF-ben nem szabályozott kérdésekben a Polgári Törvénykönyvről szóló 2013. évi V.
                        törvény, az elektronikus kereskedelmi szolgáltatások, valamint az információs társadalommal
                        összefüggő szolgáltatások egyes kérdéseiről szóló 2001. évi CVIII. törvény, valamint a fogyasztó
                        és a vállalkozás közötti szerződések részletes szabályairól szóló 45/2014. (II. 26.) Korm.
                        rendelet rendelkezései az irányadók.</p>
                    <p className={"text-gray-500"}>13.2. A Szolgáltató és a Felhasználó közötti jogvitákat elsődlegesen békés úton, egyeztetés útján
                        kívánják megoldani. Amennyiben ez nem vezet eredményre, a Felek a magyar bíróságok
                        illetékességét kötik ki.</p>
                </section> <br/>

                <footer className="mt-8 pt-4 border-t border-gray-200 text-gray-500">
                    <p className={"text-gray-500"}>Hatályos: 2024.09.01</p>
                    <p className={"text-gray-500"}>Németh István Ákos egyéni vállalkozó</p>
                </footer>
            </div>
        </div>
    );
};

export default ASZFComponent;