import { BentoGridSubjects } from "@/components/elements/bentoGridSubjects";
import { HeroScroll } from "@/components/elements/header";
import { EvervaultCardIsti } from "@/components/elements/evervaultIsti";
import { EvervaultCardAbel } from "@/components/elements/evervaultAbel";

export default function Home() {
  return (
    <main>
      <HeroScroll />
      <BentoGridSubjects />
      <h2 className="text-center text-xl md:text-4xl font-bold text-black dark:text-white">Valami h2 cím</h2>
      <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
        Leírás hozzá meg esetleges bemutatkozás vagy nemtom.
      </p>
      <div className="flex flex-col items-center md:flex-row md:justify-center">
        <EvervaultCardIsti />
        <EvervaultCardAbel />
      </div>
    </main>
  );
}
