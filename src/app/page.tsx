"use client"

import Head from 'next/head'
import { FlipWordsDemo } from "@/components/elements/header";
import { AboutSection } from "@/components/elements/about";
import { BoxesGrid } from "@/components/ui/boxes-grid";
import { Pricing } from "@/components/elements/pricing";
import { Navbar } from "@/components/ui/navlinks"
import { BentoGrid } from "@/components/ui/bento-grid";
import AbelIntro from "@/components/elements/abelntro";
import { useState } from 'react';
import PaymentModal from "@/components/elements/paymentModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialModalScreen, setInitialModalScreen] = useState<'main' | 'registration'>('main');

  const handleRegisterClick = () => {
    setInitialModalScreen('registration');
    setIsModalOpen(true);
  };

  return (
      <div>
        <Head> <title>Alma</title> </Head>
        <main>
          <Navbar/>
          <BoxesGrid/>
          <section id="főcím">
            <FlipWordsDemo onRegisterClick={handleRegisterClick}/>
          </section>
          <section id="témakörök">
            <p className="text-neutral-500 text-xl md:text-3xl max-w-xl mx-auto mb-10 text-center">
            <span className="font-bold text-violet-600">
              Olvasd el
            </span>{" "}
              mi mindenről tanulhatsz nálunk!
            </p>
            <BentoGrid/>
          </section>
          <section id="rólunk">
            <div className="flex flex-col items-center md:flex-row md:justify-center">
              <AbelIntro/>
            </div>
          </section>
          <section id="miért mi?">
            <AboutSection/>
          </section>
          <section id="jelentkezz!">
            <Pricing/>
          </section>
            <section id="signup">
            </section>
          <PaymentModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              initialScreen={initialModalScreen}
          />
        </main>
      </div>
  );
}