import React from "react";
import { EvervaultCard, Icon } from "../ui/evervault-card-i";

export function EvervaultCardIsti() {
  return (
    <div className="border border-black/[0.2] dark:border-black/[0.2] flex flex-col items-start max-w-sm m-2 p-4 relative h-[30rem] mobile:transform mobile:scale-90">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-black text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-black text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-black text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-black text-black" />

      <EvervaultCard text="isti.png" />

      <h2 className="dark:text-black text-black mt-4 text-sm font-light">
        Hover over this card to reveal an awesome effect.
      </h2>
      <p className="text-sm border font-light dark:border-black/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-black px-2 py-0.5">
        Watch me hover
      </p>
    </div>
  );
}