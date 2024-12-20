import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import PaymentModal from "@/components/elements/PaymentModal/PaymentModal";

const includedFeatures = [
  '3 órás alkalmak szombatonként',
  'A végén próbaérettségi',
  'Átfogó tananyag',
  'Jó hangulat',
];

export function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
      <div className="bg-whitesmoke py-2">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Gyere el, próbáld ki, az első alkalom <span className={"text-amber-500"}>ingyenes. </span>Nincs veszítenivalód!</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ha pedig megtetszik, és végig
              velünk tanulsz, akkor az érettségi is olyan lesz, mint egy laza óra nálunk.
            </p>
          </div>
          <div className="mx-auto mt-6 max-w-2xl rounded-3xl ring-1 ring-gray-300 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Ár és tudnivalók</h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Az ár tartalmazza a 3 órás oktatást, a kiadott feladatok javítását.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-violet-600">Mire számíthatsz?</h4>
                <div className="h-px flex-auto bg-gray-500"/>
              </div>
              <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
              >
                {includedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-violet-600" aria-hidden="true"/>
                      {feature}
                    </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div
                  className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">A próbaalkalom ingyenes, utána alkalmanként</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">7500</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">Ft</span>
                  </p>
                  <button
                      onClick={() => setIsModalOpen(true)}
                      className="mt-10 block w-full rounded-md bg-violet-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                  >
                    Jelentkezem
                  </button>
                  <p className="mt-6 text-xs leading-5 text-gray-600">
                    Jelenleg csak az október 5-i próbaalkalomra lehet jelentkezni. <br/> <span
                      className="text-violet-600">A teljes kurzus a próbaalkalmon kívül 20 alkalomból áll.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
  );
}