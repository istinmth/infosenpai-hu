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
                                Minden 10-12.-es gimnazistának, aki közép vagy emelt szintű érettségire készül informatikából, illetve minden más diáknak, aki szeretne megtanulni alapszinten programozni, a Microsoft 365 termékeit kezelni, adatbázisokkal dolgozni és weblapot szerkeszteni. Természetesen egyetemistákat is szívesen látunk, akik nem informatikai pályát választottak, viszont szeretnének egy kicsit belekóstolni.
                            </p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-3xl font-bold tracking-tight text-amber-500 sm:text-4xl">Kiknek nem ajánljuk?</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-900 text-justify">
                                A kurzus alapvető informatikai tudásra épít (legfeljebb annyira, amennyit általános-, illetve középiskolában megtanítanak), ezért 10. évfolyam alatt nem ajánljuk a részvételt, egyrészt, mert nem biztos, hogy rendelkezel a kellő programismerettel, másrészt messze van még az érettségi, inkább gyere el jövőre / néhány év múlva!
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