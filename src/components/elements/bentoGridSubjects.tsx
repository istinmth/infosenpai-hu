import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { PiMicrosoftWordLogoBold } from "react-icons/pi";
import { PiFileSqlBold } from "react-icons/pi";
import { PiMicrosoftPowerpointLogoBold } from "react-icons/pi";
import { PiMicrosoftExcelLogoBold } from "react-icons/pi";
import { SiGimp } from "react-icons/si";

export function BentoGridSubjects() {
    return (
        <div className="m-4">
            <BentoGrid className="max-w-4xl mx-auto">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </div>
    );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Szövegszerkesztés?",
    description: "Ide majd valami fasza szöveg",
    header: <Skeleton />,
    icon: <PiMicrosoftWordLogoBold className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Adatbáziskezelés?",
    description: "Ide majd valami fasza szöveg",
    header: <Skeleton />,
    icon: <PiFileSqlBold className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Képszerkesztés?",
    description: "Ide majd valami fasza szöveg",
    header: <Skeleton />,
    icon: <SiGimp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Prezentációkészítés",
    description:
      "Ide majd valami fasza szöveg",
    header: <Skeleton />,
    icon: <PiMicrosoftWordLogoBold className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Prezentációkészítés?",
    description: "Ide majd valami fasza szöveg",
    header: <Skeleton />,
    icon: <PiMicrosoftWordLogoBold className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <PiMicrosoftWordLogoBold className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: <PiMicrosoftWordLogoBold className="h-4 w-4 text-neutral-500" />,
  },
];