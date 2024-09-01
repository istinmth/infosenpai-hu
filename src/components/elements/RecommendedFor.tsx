import { MdRecommend } from "react-icons/md";

export default function RecommendedFor() {
    return (
        <section className="relative isolate overflow-hidden bg-whitesmoke py-24 sm:py-32">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="space-y-12">
                        <div className="text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-amber-500 sm:text-4xl">Kinek ajánljuk?</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-900">
                                Leginkább minden 10-12.-es gimnazistának, aki közép vagy emelt érettségire készül informatikából, illetve minden más diáknak, aki szeretne megtanulni alap szinten programozni és a Microsoft 365 termékeit kezelni. Természetesen egyetemistákat is szívesen látunk, akik nem az informatikai pályát választották, de szeretnének kicsit belekóstolni.
                            </p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-3xl font-bold tracking-tight text-amber-500 sm:text-4xl">Kiknek nem ajánljuk?</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-900 text-justify">
                                A kurzus valamennyire épít alap informatikai tudásra (maximum annyira amennyit az iskolákban megtanítanak), ezért 10.-es évfolyam alatt nem ajánljuk a részvételt, egyrészt, mert nem biztos, hogy megvan a kellő program ismeret, másrészt, messze van még az érettségi, inkább gyertek el jövőre / pár év múlva.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <MdRecommend className="text-6xl text-indigo-600" />
                    </div>
                </div>
            </div>
        </section>
    )
}