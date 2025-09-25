"use client"
import { Dialog, Transition } from '@headlessui/react';
import copy from 'copy-to-clipboard';
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import { app, getAnalytics, logEvent } from '../../../firebase';
import { FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa'; // Import icons
import { useCouponStore, Coupon } from '../../store/couponStore';
import Pagination from '../Pagination'; // Import the Pagination component

const ITEMS_PER_PAGE = 21;
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

const MultipleItems = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [country, setCountry] = useState('');
    const [search, setSearch] = useState('');
    const [copyCode, setCopyCode] = useState('COPIAR CÓDIGO');
    const [dataCode, setDataCode] = useState<any>({ voucher: {} });
    let [isOpen, setIsOpen] = useState(false);
    const { addCoupon, removeCoupon, isLiked } = useCouponStore();
    const [currentPage, setCurrentPage] = useState(1);

    const getPromotions = async (regionCode = '') => {
        setLoading(true);
        try {
            const response = await fetch('/api/promotions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ regionCode }),
            });

            if (!response.ok) {
                throw new Error("Error al obtener las promociones");
            }

            const responseData = await response.json();
            setProducts(responseData.data || []);
        } catch (error) {
            console.error(error);
            setProducts([]); // Clear products on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPromotions();
    }, []);

    const handleChange = (e: any) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    const results = !search ? products : products.filter((data) => data.title.toLowerCase().includes(search.toLocaleLowerCase()));

    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCoupons = results.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const section = document.getElementById('blog-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const onClickDataCode = (value: any) => {
        setDataCode({
            ...value,
            image: `https://ui.awin.com/images/upload/merchant/profile/${value?.advertiser?.id}.png`,
        });
        openModal();
        if (analytics) logEvent(analytics, 'brand', { name: value.title });
    };

    const handleLikeClick = (event: React.MouseEvent, item: any) => {
        event.stopPropagation();
        const coupon: Coupon = {
            promotionId: item.promotionId,
            title: item.title,
            description: item.description,
            advertiser: item.advertiser,
            voucher: item.voucher,
            urlTracking: item.urlTracking,
            image: `https://ui.awin.com/images/upload/merchant/profile/${item?.advertiser?.id}.png`,
        };

        if (isLiked(coupon.promotionId)) {
            removeCoupon(coupon.promotionId);
        } else {
            addCoupon(coupon);
        }
    };

    const onChangeOption = (value: any) => {
        setCountry(value);
        setCurrentPage(1);
        getPromotions(value);
        if (analytics) logEvent(analytics, 'country_name', { name: value });
    };

    const onSaveLogEvent = (params: any, value: any) => {
        if (analytics) logEvent(analytics, params, { name: value });
    }

    const onClickCopy = () => {
        copy(dataCode.voucher.code);
        setCopyCode('¡CÓDIGO COPIADO!');
        onSaveLogEvent('brand_code', dataCode.voucher.code);
    };

    const goStore = () => {
        onSaveLogEvent('go_store', dataCode.title);
    }

    const closeModal = () => {
        setIsOpen(false);
        setCopyCode('COPIAR CÓDIGO');
    }

    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <>
            <div className="bg-lightgrey py-8" id="blog-section">
                <div className='mx-auto max-w-7xl px-4 sm:py-4 lg:px-8 '>
                    <div className="text-center">
                        <h3 className="text-4xl sm:text-65xl font-bold text-black leading-snug mb-5 text-center">
                            ¡Encuentrá tus <span className="text-blue">ofertas </span> ó haz tus <span className="text-blue">compras online</span>!
                            <br />Selecciona el <span className="text-yellow">país</span> dónde deseas encontrar <span className="text-blue">tus descuentos. </span>
                        </h3>
                        <select
                            value={country}
                            onChange={e => onChangeOption(e.target.value)}
                            className='text-sm md:text-xl font-semibold hover:shadow-xl bg-navyblue text-white border border-purple py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-navyblue'>
                            <option value="">Todos los países</option>
                            <option value="MX">México</option>
                            <option value="US">Estados Unidos de América</option>
                            <option value="CA">Canadá</option>
                            <option value="AR">Argentina</option>
                            <option value="CL">Chile</option>
                            <option value="CO">Colombia</option>
                            <option value="PE">Peru</option>
                            <option value="ES">España</option>
                            <option value="GB">Reino Unido</option>
                            <option value="AT">Austria</option>
                            <option value="BE">Bélgica</option>
                            <option value="BG">Bulgaria</option>
                            <option value="HR">Croacia</option>
                            <option value="CZ">República Checa</option>
                            <option value="DK">Dinamarca</option>
                            <option value="FI">Finlandia</option>
                            <option value="FR">Francia</option>
                            <option value="DE">Alemania</option>
                            <option value="GR">Grecia</option>
                            <option value="HU">Hungría</option>
                            <option value="IE">Irlanda</option>
                            <option value="IT">Italia</option>
                            <option value="LV">Letonia</option>
                            <option value="LT">Lituania</option>
                            <option value="NL">Países Bajos</option>
                            <option value="NO">Noruega</option>
                            <option value="PL">Polonia</option>
                            <option value="PT">Portugal</option>
                            <option value="RO">Rumanía</option>
                            <option value="SK">Eslovaquia</option>
                            <option value="SI">Eslovenia</option>
                            <option value="SE">Suecia</option>
                            <option value="CH">Suiza</option>
                            <option value="UA">Ucrania</option>
                        </select>
                    </div>

                    <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8'>
                        <form action="#" className="space-y-158">
                            <div className="mx-auto max-w-4xl pt-5">
                                <div className="sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-white sm:rounded-full">
                                    <input
                                        value={search}
                                        onChange={handleChange}
                                        className="sm:flex items-center my-3 py-4 sm:pl-6 lg:text-xl text-black sm:rounded-full bg-white pl-31 focus:outline-none bg-emailbg focus:text-black"
                                        placeholder="Ingrese su Búsqueda"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500">Cargando cupones...</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl text-gray-500">No se encontraron cupones.</p>
                        </div>
                    ) : (
                        <>
                            <div className='blog-section-data grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                                {currentCoupons.map((item: any, i: any) => {
                                    const liked = isLiked(item.promotionId);
                                    return (
                                        <div key={i} style={{ cursor: 'pointer' }} className='relative bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group' onClick={() => { onClickDataCode(item) }}>
                                            <div className='blog-section-data center'>
                                                <Image
                                                    src={`https://ui.awin.com/images/upload/merchant/profile/${item?.advertiser?.id}.png`}
                                                    alt={item.description || 'coupon image'}
                                                    width={100}
                                                    height={85} />
                                            </div>
                                            <br />
                                            <hr style={{ color: "lightgrey" }} />
                                            <br />
                                            <h5 className='text-xl font-semibold text-black mb-5'>{item.title}</h5>
                                            <button type="button" className='bg-navyblue w-full hover:text-white text-white border border-purple font-medium py-2 px-4 rounded-full'>
                                                VER CÓDIGO
                                            </button>
                                            <div className="absolute top-4 right-4" onClick={(e) => handleLikeClick(e, item)}>
                                                {liked ? (
                                                    <FaHeart className="w-6 h-6 text-blue-500" />
                                                ) : (
                                                    <FaRegHeart className="w-6 h-6 text-gray-500" />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={closeModal}>
                                        <FaTimes className="w-6 h-6" />
                                    </button>
                                    <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <Image src={dataCode.image} alt={dataCode.description || 'coupon image'} width={100} height={85} />
                                        </div>
                                        <br />
                                        <hr style={{ color: "lightgrey" }} />
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <p className="mb-8 lg:mb-16 mt-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                                                {dataCode.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <h5 className='text-xl font-semibold text-center text-grey mb-5'>
                                                {(dataCode.type === 'voucher') ? <Link href={dataCode.urlTracking} className='isDisabled'>
                                                    <button type="button" className='w-full text-navyblue border border-purple font-medium py-2 px-4 rounded-full'>
                                                        {dataCode.voucher.code}
                                                    </button>
                                                </Link> : 'NO REQUIERE CÓDIGO DE DESCUENTO'}
                                            </h5>
                                            <h5 className='text-xl font-semibold text-center text-grey mb-5'>
                                                {(dataCode.type === 'voucher') ? <button type="button" className='bg-navyblue w-full hover:text-white text-white border border-purple font-medium py-2 px-4 rounded-full' onClick={() => { onClickCopy() }}>
                                                    {copyCode}
                                                </button> : ''}
                                            </h5>
                                        </div>
                                        <hr style={{ color: "lightgrey" }} />
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <p className="mb-8 lg:mb-16 mt-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-8">
                                                {dataCode.terms}
                                            </p>
                                        </div>
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <Link href={dataCode.urlTracking} target="_blank">
                                                <button type="button" className='bg-lightgrey w-full hover:text-navyblue text-navyblue border border-purple font-medium py-2 px-4 rounded-full' onClick={() => { goStore() }}>
                                                    IR A LA TIENDA
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default MultipleItems;
