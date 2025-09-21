
const Digital = () => {
    return (

        <div className="mx-2">
            <div className='mx-auto max-w-7xl px-4 my-30 pb-20 lg:pb-30 lg:px-8 bg-digital rounded-3xl bg-blue relative'>
                <div className='grid grid-cols-1 lg:grid-cols-1 my-16'>

                    {/* COLUMN-1 */}

                    <div className="pt-24 lg:pl-24 ">
                        <h2 className="text-5xl sm:text-5xl font-normal text-white mb-5 tracking-widest text-center lg:text-start">QUIÉNES SOMOS</h2>
                        <h5 className="text-2xl sm:text-2xl text-white mb-8 leading-snug text-center lg:text-start">Somos Empresarios, creada para brindar a los fundadores, emprendedores, ejecutivos de negocios y viajeros los extraordinarios beneficios y descuentos que merecen. Empresarios cuenta con miembros en todo el mundo, nuestros miembros disfrutan de actualizaciones exclusivas, precios preferenciales y experiencias con marcas asociadas y seleccionadas.</h5>
                        
                        {
                            /**
                             * <div className="text-center lg:text-start">
                            <button className="text-xl font-semibold text-white bg-btnblue py-4 px-12 hover:bg-hoblue rounded-full">Get started</button>
                        </div>
                             */
                        }
                    </div>

                    {/* COLUMN-2 */}

                    {
                        /**
                         <div>
                        <div className="lg:absolute ">
                            <Image src="/images/digital/card.png" alt="Empresarios" width={1200} height={691} />
                        </div>
                    </div>
                         */
                    }

                </div>
            </div>
        </div>
    )
}

export default Digital;
