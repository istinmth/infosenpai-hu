import Head from 'next/head'
import { FlipWordsDemo } from "@/components/elements/header";
import { EvervaultCardIsti } from "@/components/elements/evervaultIsti";
import { EvervaultCardAbel } from "@/components/elements/evervaultAbel";
import { AboutSection } from "@/components/elements/about";
import { BoxesGrid } from "@/components/ui/boxes-grid";
import { Pricing } from "@/components/elements/pricing";
import { Navbar } from "@/components/ui/navlinks"
import { BentoGrid } from "@/components/ui/bento-grid";
import {SignupFormDemo} from "@/components/elements/signup";
import AbelIntro from "@/components/elements/abelntro";

export default function Home() {
  return (
      <div>
        <Head> <title>Alma</title> </Head>
        <main>
          <Navbar/>
          <BoxesGrid/>
          <section id="product">
            <FlipWordsDemo/>
          </section>
          <section id="services">
            <p className="text-neutral-500 text-xl md:text-3xl max-w-xl mx-auto mb-10 text-center">
            <span className="font-bold text-violet-500">
              Olvasd el
            </span>{" "}
              mi mindenről tanulhatsz nálunk!
            </p>
            <BentoGrid/>
          </section>
          <section id="playground">
            <div className="flex flex-col items-center md:flex-row md:justify-center">
              <AbelIntro/>
            </div>
          </section>
          <section id="content">
            <AboutSection/>
          </section>
          <section id="random">
            <Pricing/>
          </section>
            <section id="signup">
                <SignupFormDemo/>
            </section>
        </main>
      </div>
  );
}