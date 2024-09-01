"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface InstructorData {
    name: string;
    introduction: string[];
    imageSrc: string;
}

interface InstructorSectionProps extends InstructorData {
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructorSection: React.FC<InstructorSectionProps> = ({ name, introduction, isExpanded, setIsExpanded, imageSrc }) => {
    const toggleExpanded = () => setIsExpanded(!isExpanded);

    const renderIntroduction = () => {
        if (isExpanded) {
            return introduction.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 mb-4 text-justify">
                    {paragraph}
                </p>
            ));
        } else {
            return (
                <p className="text-lg text-gray-700 mb-4 text-justify">
                    {introduction[0]}
                </p>
            );
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
            <div className="w-48 h-48 md:w-64 md:h-64 relative overflow-hidden rounded-full shadow-lg flex-shrink-0">
                <Image
                    src={imageSrc}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>
            <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black">{name}</h3>
                <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : '5.5rem' }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden cursor-pointer"
                    onClick={toggleExpanded}
                >
                    {renderIntroduction()}
                </motion.div>
                <button
                    onClick={toggleExpanded}
                    className="flex items-center gap-2 text-violet-600 hover:text-violet-700 transition-colors duration-200 mt-2"
                >
                    <span>{isExpanded ? 'Kevesebb' : 'Több'}</span>
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown size={20} />
                    </motion.div>
                </button>
            </div>
        </div>
    );
};

export default function InstructorsIntro(): JSX.Element {
    const [isExpandedAbel, setIsExpandedAbel] = useState<boolean>(false);
    const [isExpandedIstvan, setIsExpandedIstvan] = useState<boolean>(false);

    const instructors: InstructorData[] = [
        {
            name: "Ábel",
            introduction: [
                "Németh Ábel Adrián vagyok, harmadéves hallgató a Budapesti Műszaki és Gazdasági Egyetem mérnökinformatika szakán. Már kiskoromban kialakult a szerelgetés és a technika iránti érdeklődésem, melyhez valószínűleg az is hozzájárult, hogy édesapám is informatikus. Így hát nem volt kérdés számomra, hogy milyen irányban szeretnék továbbtanulni.",
                "2021-ben tettem le az előrehozott középszintű informatikaérettségit, majd 2022-ben szintemelő érettségit tettem a tárgyból. Azóta elmélyítettem a tudásom C, C++, C# és JAVA programozási nyelvekben, adatbáziskezelésben, megtanultam, hogyan lehet optimális hálózatokat tervezni és üzemeltetni, valamint sok érdekes mérnöki megoldást ismerhettem meg.",
                "Úgy gondolom, hogy akik kevésbé érdeklődnek a számítógépek iránt, azoknak is nagyon fontos, hogy alapvető tudást szerezzenek, mert az életünkben egyre meghatározóbb szerepet tölt be a számítógép, és aki nem tudja megfelelően használni, piaci hátrányba kerül.",
                "Annak pedig, aki informatikai szakirányba szeretne továbbtanulni, sok érdekes történettel, tippel, tapasztalattal tudok szolgálni. Az egyetemen jelentősen magasabbak az elvárások, mint gimnáziumban, és ha nem elég felkészült az ember, jobban fenyegeti a lemorzsolódás. Segítünk nektek előretekinteni, így már nem lesz annyira új és bonyolult a tananyag."
            ],
            imageSrc: "/AbelProfil.jpg"
        },
        {
            name: "István",
            introduction: [
                "Németh István Ákos vagyok, másodéves hallgató a Corvinus Egyetem gazdaságinformatika szakán. 2022-ben tettem emelt szintű informatikaérettségit, ezután pedig egy évig dolgoztam IT projektvezetőként. Jelenleg az egyetem mellett belső fejlesztésekkel és adatelemzéssel foglalkozom egy járműpiaci adatokkal kereskedő cégnél.",
                "Részletesebben ismerem a C++, C#, Python, JavaScript/TypeScript nyelveket, sokat foglalkoztam adatbázisokkal, webfejlesztéssel és designnal is. Különösen érdekelnek a pénzügyi szektorhoz kapcsolódó informatikai megoldások, a gazdaság és a technológia kapcsolata, emellett kiskorom óta lenyűgöz a repülés és az ehhez, illetve a repülőtereken is megszokott biometrikus azonosító-rendszerekhez kapcsolódó, számomra elképesztő hatékonyságú technológia.",
                "Az informatikaérettségi tematikája a nemzeti alaptantervhez igazodik, a felsőoktatásban való sikeres helytálláshoz azonban többre lesz szükséged, ezért szeretnénk az előbbit meghaladni. Én olyan tippeket és trükköket mutatok neked, hogy az egyetemre már felkészülten érkezzél."
            ],
            imageSrc: "/IstvanProfil.jpg"
        }
    ];

    return (
        <section className="bg-whitesmoke py-16 px-6 sm:px-14 mx-auto">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-amber-500 text-left">Ismerd meg az oktatóinkat</h2>
                <InstructorSection
                    {...instructors[0]}
                    isExpanded={isExpandedAbel}
                    setIsExpanded={setIsExpandedAbel}
                />
                <InstructorSection
                    {...instructors[1]}
                    isExpanded={isExpandedIstvan}
                    setIsExpanded={setIsExpandedIstvan}
                />
            </div>
        </section>
    );
}