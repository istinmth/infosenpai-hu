import Image from "next/image";
import { EvervaultCardTeachers } from "@/components/elements/EvervaultTeacherDesc";
import { EvervaultCardTeachersAbel } from "@/components/elements/EvervaultTeacherDescAbel";
import { BentoGridSubjects } from "@/components/elements/main-bento-section";

export default function Home() {
  return (
    <main>
      <BentoGridSubjects />
      <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">Valami h2 cím</h2>
      <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
        Leírás hozzá meg esetleges bemutatkozás vagy nemtom.
      </p>
      <div className="flex flex-row justify-center">
        <EvervaultCardTeachers />
        <EvervaultCardTeachersAbel />
      </div>
    </main>
  );
}
