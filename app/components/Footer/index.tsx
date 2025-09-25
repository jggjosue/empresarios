import Image from "next/image";
import Link from "next/link";

// MIDDLE LINKS DATA
interface ProductType {
    id: number;
    section: string;
    link: string[];
}

const products: ProductType[] = [
    {
        id: 1,
        section: "Menu",
        link: [
            'Inicio', 'Marcas', 'Favoritos'
        ],
    }
]

const footer = () => {
    return (
        <div className="bg-black -mt-40" id="first-section">

            {/* All Rights Reserved */}

            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <div className="pt-5 pb-5 px-4 sm:px-6 lg:px-4 border-solid border-t border-footer">
                    <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 xl:gap-x-8">
                        <div>
                            <h3 className='text-center md:text-start text-offwhite text-lg'>
                                800 Third Avenue FRNT A #1558 <br />
                                New York, NY 10022 <br />
                                United States <br />
                                <Link href="https://www.magzin.us" target="_blank"> Magzin</Link> @2025 Todos los Derechos Reservados. </h3>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <Link href="https://www.magzin.us/privacy">
                                <h3 className="text-offwhite pr-6">Política de Privacidad</h3>
                            </Link>
                            <Link href="https://www.magzin.us/terms">
                                <h3 className="text-offwhite pl-6 border-solid border-l border-footer">Términos & condiciones</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default footer;
