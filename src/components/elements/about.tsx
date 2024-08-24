import { XCircleIcon, ComputerDesktopIcon, ServerIcon, CpuChipIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

export function AboutSection() {
  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-violet-600">Miért minket válassz?</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nemrég mi is a cipődben voltunk.</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                Pár éve mi is pont ott voltunk, ahol most te. Elérkezett az érettségi éve és azzal kellett szembesülnünk, hogy bizony az iskolánkban nincs informatikatanár, illetve, ha van is, ő nem tud minket megfelelően felkészíteni.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
              src="/data.png"
              alt="Data visualization"
              width={912} // This is equivalent to 57rem at 16px base font size
              height={608} // Assuming a 3:2 aspect ratio, adjust if different
              className="max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
              priority
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                A szomorú igazság az, hogy akinek van informatikus végzettsége, az szinte bárhol többet tud keresni,
                mintha tanárnak menne.
                Persze meg lehet tanulni egyénileg is mindent, ahogy mi tettük, de nagyon sokat segített volna, ha
                valaki, aki ért hozzá, megtanította volna nekünk.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <CpuChipIcon className="mt-1 h-5 w-5 flex-none text-violet-600" aria-hidden="true"/>
                  <span>
                    <strong className="font-semibold text-gray-900">Éppen ezért</strong> elhatároztuk, hogy ha nincs aki oktatna informatikát, majd mi megtesszük. Így jött létre ez a weboldal, a tanterv és a házi feladatok is. (Igen lesz házi is, de ne izgulj, érdekes feladatok lesznek)
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <XCircleIcon className="mt-1 h-5 w-5 flex-none text-violet-600" aria-hidden="true"/>
                  <span>
                    <strong className="font-semibold text-gray-900">Úgy gondoljuk,</strong> hogy nagyon sokat segít, ha valaki olyantól tanul az ember, aki maga is végig járta az utat (elkövetve pár hibát, amit meg tud osztani, hogy te ne járj úgy mint ő…) és motiválni tud a tanulásban.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ComputerDesktopIcon className="mt-1 h-5 w-5 flex-none text-violet-600" aria-hidden="true"/>
                  <span>
                    <strong className="font-semibold text-gray-900">A jövőben</strong> egyre csak nagyobb és nagyobb szükség lesz az informatikai tudás valamilyen formájára. Minél előbb kezded el tanulni, annál egyszerűbb lesz később az életed.
                  </span>
                </li>
              </ul>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Hidd el, tudunk neked újat
                mutatni!</h2>
              <p className="mt-8">
                Ha úgy érzed, hogy már mindent tudsz, amit tudni lehet, akkor is érdemes eljönnöd! Amikor beültünk az
                első egyetemi óráinkra, hamar kiderült, hogy amit eddig gondoltunk hogy tudunk, az a valóságban csak egy
                icipici szelete a tortának. Találunk neked is kihívást bármelyik témakörben, ne aggódj.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Akkor se aggódj, ha nincs sok
                gyakorlatod a dologban!</h2>
              <p className="mt-8">
                Magyarországon az informatikaórák száma legjobb esetben is nagyon kevés, és a különböző képességű diákok
                keveredése itt talán még nagyobb hátrány, mint
                sok másik tantárgy esetében. Fakultációra természetesen tanárhiány miatt nem volt lehetőség a mi
                iskolánkban, így magunktól,
                online talált videókból, 10 éves feladatok megoldásaiból szedtük össze a felvételi pontjainkat. Ha úgy
                érzed, kicsit üres kézzel futsz neki a felkészülésnek, egyet se félj!
              </p>
              <p className="text-base font-semibold text-violet-600 mt-6">Úgy állítottuk össze a tananyagot, hogy kellően lefedje az érettségi és az ECDL vizsga tananyagát, de
                túl is mutasson rajta, és megfelelő alapot adjon azoknak, akik esetleg ilyen irányban szeretnének
                továbbtanulni.</p>
              <p className="mt-3">

              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}