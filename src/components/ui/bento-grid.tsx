import { cn } from "@/utils/cn";
import React from "react";
import {
  IconDatabase,
  IconCloud,
  IconFileSpreadsheet,
  IconCurrencyDollar,
  IconFileText,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
} from "@tabler/icons-react";

export function BentoGrid() {
  const features = [
    {
      title: "Adatbázis-kezelés",
      description:
          "Egyetemen sokaknak ez az egyik legnehezebb tantárgy, mert nem értették meg sosem az alapokat. Az adatbáziskezelés ugyanis nem Microsoft Access-ben táblák kötögetéséről szól. Megtanulsz SQL nyelven lekérdezéseket írni és beszélünk más, nem relációs adatbázisokról is.",
      icon: <IconDatabase />,
    },
    {
      title: "Táblázatkezelés",
      description:
          "Az egyik legérdekesebb rész, ahol segítünk neked, hogy az átlagos excel-felhasználótól eltérően te több, mint 5-10%-át használd a funkcióknak. Meg persze elmondunk mindent, amit tudni kell a függvényekről, diagramokról, pivot-táblákról és makrókról.   ",
      icon: <IconFileSpreadsheet />,
    },
    {
      title: "Szövegszerkesztés",
      description:
          "Tudtad, hogy a CAPS LOCK használata nem eredményez nagybetűs betűstílust és ezért pontlevonás jár? Az ilyen és hasonló baklövések elkerüléséhez csupa hasznos tanáccsal és extra mennyiségű tabulátorral készültünk nektek!",
      icon: <IconFileText />,
    },
    {
      title: "100% Uptime guarantee",
      description: "We just cannot be taken down by anyone.",
      icon: <IconCloud />,
    },
    {
      title: "Multi-tenant Architecture",
      description: "You can simply share passwords instead of buying new seats",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Customer Support",
      description:
          "We are available a 100% of the time. Atleast our AI Agents are.",
      icon: <IconHelp />,
    },
    {
      title: "Money back guarantee",
      description:
          "If you donot like EveryAI, we will convince you to like us.",
      icon: <IconCloud />,
    },
    {
      title: "And everything else",
      description: "I just ran out of copy ideas. Accept my sincere apologies",
      icon: <IconHeart />,
    },
  ];
  return (
      <div className="flex justify-center w-full py-10 px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative z-10 max-w-5xl w-full">
          {features.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
  );
}

const Feature = ({
                   title,
                   description,
                   icon,
                   index,
                 }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
      <div
          className={cn(
              "flex flex-col py-6 px-4 lg:py-8 lg:px-6 relative group/feature bg-whitesmoke dark:bg-neutral-900 rounded-lg transition-all duration-200"
          )}
      >
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none rounded-lg" />
        <div className="mb-2 lg:mb-3 relative z-10 text-neutral-600 dark:text-neutral-400">
          {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 lg:w-8 lg:h-8' })}
        </div>
        <div className="text-lg lg:text-xl font-bold mb-1 lg:mb-2 relative z-10">
          <div className="absolute left-0 inset-y-0 h-6 lg:h-8 group-hover/feature:h-8 lg:group-hover/feature:h-10 w-1 -ml-4 lg:-ml-6 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-violet-500 transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
        </div>
        <p className="text-sm lg:text-lg text-neutral-600 dark:text-neutral-300 relative z-10">
          {description}
        </p>
      </div>
  );
};