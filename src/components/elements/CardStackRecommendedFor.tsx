"use client";
import { CardStack } from "../ui/card-stack";
import { cn } from "@/utils/cn";
import React from "react";
export function CardStackDemo() {
    return (
        <div className="h-[10rem] flex items-center justify-center w-full">
            <CardStack items={CARDS} />
        </div>
    );
}

export const Highlight = ({
                              children,
                              className,
                          }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span
            className={cn(
                "font-bold bg-amber-500/[0.2] text-amber-500 px-1 py-0.5",
                className
            )}
        >
      {children}
    </span>
    );
};

const CARDS = [
    {
        id: 0,
        name: "A mindentudó",
        designation: "Aki mindent tud",
        content: (
            <p>
                Ajánljuk annak is, aki <Highlight>azt hiszi,</Highlight> mindent tud
            </p>
        ),
    },
    {
        id: 1,
        name: "Uncsi szöveg",
        designation: "Lusta vagyok éjszaka írni",
        content: (
            <p>
                Jaja, <Highlight>ezt</Highlight> is megértjük
            </p>
        ),
    },
    {
        id: 2,
        name: "A félénk",
        designation: "Aki eddig nem mert jelentkezni",
        content: (
            <p>
                Az se féljen tőlünk, aki eddig
                <Highlight>mindenkitől félt</Highlight>, hiszen mi is csak
                <Highlight>emberek</Highlight> vagyunk
            </p>
        ),
    },
];
