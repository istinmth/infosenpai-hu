"use client"

import Head from 'next/head'
import { FlipWordsDemo } from "@/components/elements/header";
import { AboutSection } from "@/components/elements/about";
import { BoxesGrid } from "@/components/ui/boxes-grid";
import { Pricing } from "@/components/elements/pricing";
import { Navbar } from "@/components/ui/navlinks"
import { BentoGrid } from "@/components/ui/bento-grid";
import AbelIntro from "@/components/elements/abelntro";
import PaymentModal from "@/components/PaymentModal/PaymentModal";
import { usePaymentModal } from "@/app/contexts/PaymentModalContext";

export default function Home() {
  const { isModalOpen, closeModal } = usePaymentModal();

  return (
      <div>
        <Head>
          <title>InfoSenpai - Informatikaérettségi-felkészítő</title>
        </Head>
        <main>
          <Navbar />
          <BoxesGrid />
          <section id="főcím">
            <FlipWordsDemo />
          </section>
          <section id="témakörök">
            <p className="text-neutral-500 text-xl md:text-3xl max-w-xl mx-auto mb-10 text-center">
            <span className="font-bold text-violet-600">
              Olvasd el,
            </span>{" "}
              mi mindenről tanulhatsz nálunk!
            </p>
            <BentoGrid />
          </section>
          <section id="rólunk">
            <div className="flex flex-col items-center md:flex-row md:justify-center">
              <AbelIntro />
            </div>
          </section>
          <section id="miért mi?">
            <AboutSection />
          </section>
          <section id="jelentkezz!">
            <Pricing />
          </section>
          <PaymentModal
              isOpen={isModalOpen}
              onClose={closeModal}
          />
        </main>
      </div>
  );
}