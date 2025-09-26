import Image from "next/image";

const Banner = () => {
    return (
        <div className='mx-auto max-w-7xl my-10 sm:py-10 px-6 lg:px-'>
            <div className='grid grid-cols-1 lg:grid-cols-2 my-16'>

                {/* COLUMN-1 */}

                <div className="mx-auto sm:mx-0">
                    <div className='py-3 text-center lg:text-start'>
                        <button className='text-blue bg-lightblue hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-black'>Cupones</button>
                    </div>
                    <div className="py-3 text-center lg:text-start">
                        <h1 className='text-2xl lg:text-70xl font-bold text-darkpurple'>
                            ¡Bienvenido a nuestra exclusiva comunidad de <br />
                            líderes y emprendedores apasionados! <br />
                            Un espacio vibrante y dinámico <br />
                            que reúne a cofundadores, emprendedores, <br />
                            empresarios y viajeros visionarios.
                        </h1>
                    </div>
                    {
                        /**
                         <div className='my-7 text-center lg:text-start'>
                        <button className='text-sm md:text-xl font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue'>
                            Comenzar
                        </button>
                    </div>
                         */
                    }
                </div>

                {/* COLUMN-2 */}
                
                <div className='mx-auto lg:-m-24 text-center lg:pt-20 lg:block'>
                    <Image src="/images/banner/banner_empresarios.png" alt="Empresarios" width={800} height={642} />   
                </div>

            </div>
        </div>
    )
}

export default Banner;
