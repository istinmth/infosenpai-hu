"use client"

import Head from 'next/head'
import { FlipWordsDemo } from "@/components/elements/Header";
import { AboutSection } from "@/components/elements/About";
import { BoxesGrid } from "@/components/ui/boxes-grid";
import { Pricing } from "@/components/elements/Pricing";
import { Navbar } from "@/components/ui/navlinks"
import { BentoGrid } from "@/components/ui/bento-grid";
import AbelIntro from "@/components/elements/Intro";
import { useState } from 'react';
import PaymentModal from "@/components/elements/PaymentModal/PaymentModal";
import RecommendedFor from "@/components/elements/RecommendedFor";
import Footer from "@/components/elements/Footer";

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
                <p className="text-neutral-500 text-2xl md:text-5xl max-w-7xl mx-auto mb-1 text-left pl-6 xl:pl-24 relative after:content-[''] after:absolute after:top-0 after:right-0 after:w-1/2 after:h-px after:bg-gradient-to-r after:from-amber-500 after:to-violet-600">
  <span className="font-bold text-violet-600">
    Olvasd el,
  </span>{" "}
                    <br/>
                    mi mindenről tanulhatsz nálunk!
                </p>
                <BentoGrid/>
            </section>
            <section id="oktatóinkról">
                <div className="flex flex-col items-center md:flex-row md:justify-center">
                    <AbelIntro/>
                </div>
            </section>
            <section id="miért mi?">
                <AboutSection/>
            </section>
            <section id="kinek ajánljuk?">
                <RecommendedFor/>
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
            <Footer/>
        </main>
      </div>
  );
}