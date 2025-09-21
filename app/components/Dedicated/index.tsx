import Image from "next/image";

const Dedicated = () => {
    return (
        <div className="relative">

            <Image src="/images/dedicated/spiral.svg" height={272} width={686} alt="spiral-design" className="absolute left-0 hidden lg:block -z-10" />

            <div className='mx-auto max-w-7xl px-4 my-40 sm:py-20 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-2 my-13'>

                    {/* COLUMN-1 */}
                    <div>
                        <Image src="/images/digital/card.png" alt="man-icon" width={516} height={530} className="mx-auto md:mx-0" />
                    </div>
                    
                    {/* COLUMN-2 */}
                    <div className="relative">
                        <Image src="images/dedicated/comma.svg" alt="comma-image" width={200} height={106} className="absolute comma-pos hidden lg:block" />
                        <h4 className="text-4xl lg:text-60xl pt-4 font-bold sm:leading-tight mt-5 text-center lg:text-start">Esta comunidad es más que un privilegio; es la clave para desbloquear un sinfín de oportunidades que te llevarán a nuevos niveles de éxito empresarial.</h4>
                        <p className="font-medium text-lightblack text-2xl mt-5 text-center lg:text-start">La comunidad te brinda acceso a eventos exclusivos, productos, beneficios y promociones para fundadores, emprendedores, ejecutivos de negocios y viajeros. Nuestra comunidad te brinda el acceso privilegiado que necesitas para llevar tu empresa al siguiente nivel.</p>
                        <p className="text-2xl font-semibold mt-12 lg:ml-32 preline text-center lg:text-start"> Josue | Founder & CEO</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Dedicated;
