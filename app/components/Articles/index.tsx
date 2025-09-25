"use client"
import { Dialog, Transition } from '@headlessui/react';
import copy from 'copy-to-clipboard';
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { app, getAnalytics, logEvent } from '../../../firebase';
import { DataAll } from '../../data/DataAll';
import { DataAR } from '../../data/DataAR';
import { DataAT } from '../../data/DataAT';
import { DataBE } from '../../data/DataBE';
import { DataBG } from '../../data/DataBG';
import { DataBR } from '../../data/DataBR';
import { DataCA } from '../../data/DataCA';
import { DataCH } from '../../data/DataCH';
import { DataCL } from '../../data/DataCL';
import { DataCO } from '../../data/DataCO';
import { DataCZ } from '../../data/DataCZ';
import { DataDE } from '../../data/DataDE';
import { DataDK } from '../../data/DataDK';
import { DataES } from '../../data/DataES';
import { DataFI } from '../../data/DataFI';
import { DataFR } from '../../data/DataFR';
import { DataGB } from '../../data/DataGB';
import { DataGR } from '../../data/DataGR';
import { DataHR } from '../../data/DataHR';
import { DataHU } from '../../data/DataHU';
import { DataIE } from '../../data/DataIE';
import { DataIT } from '../../data/DataIT';
import { DataLT } from '../../data/DataLT';
import { DataLV } from '../../data/DataLV';
import { DataMX } from '../../data/DataMX';
import { DataNL } from '../../data/DataNL';
import { DataNO } from '../../data/DataNO';
import { DataPE } from '../../data/DataPE';
import { DataPL } from '../../data/DataPL';
import { DataPT } from '../../data/DataPT';
import { DataRO } from '../../data/DataRO';
import { DataSE } from '../../data/DataSE';
import { DataSI } from '../../data/DataSI';
import { DataSK } from '../../data/DataSK';
import { DataUA } from '../../data/DataUA';
import { DataUS } from '../../data/DataUS';
import { FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa'; // Import icons
import { useCouponStore, Coupon } from '../../store/couponStore';
import Pagination from '../Pagination'; // Import the Pagination component

const ITEMS_PER_PAGE = 20;
const BASE_URL = "https://api.awin.com/publisher";
const asin = 'B07ZQS94VJ';
const publisherId = '1533377';
const token = '4d355160-2634-49e3-9892-d803a96c133a';
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

const advertiserIds = [
        1478, 2495, 16062, 12428, 13470, 18822, 24958, 37532, 42927, 32475, 27634, 22235, 23202, 24408, 21407, 28349, 30171, 31335, 31499, 31471, 53679, 67066, 32633, 37054, 51935, 40342, 40512, 47069, 62441, 17207, 32471, 32461, 54347, 61929, 64852, 64216, 65968, 67702, 32211, 20039, 58169, 24757, 21206, 15184, 13054, 7138, 18823, 19765, 20134, 22267, 22343, 31077, 24996, 25243, 25686, 26997, 29703, 23548, 49545, 51379, 51381, 52015, 52405, 53957, 55351, 31740, 32531, 33073, 37352, 45779, 34901, 37052, 37048, 39732, 39736, 60481, 61325, 65356, 65758, 65986, 68578, 69478, 70208,55613, 72139, 53273, 22362, 27399, 26577, 24802, 12301, 15245, 15292, 15596, 31101, 31313, 32219, 32585, 34679, 34579, 26521, 28621, 28831, 20130, 19770, 21465, 18808, 20801, 23037, 23249, 36900, 37520, 50397, 53159, 70500, 70420, 58479, 71375, 6825, 64248, 70058, 62463, 15380, 16673, 2694, 28849, 27568, 29483, 29613, 29999, 22293, 23696, 44387, 38896, 39814, 22427, 23275, 24005, 24111, 25940, 27143, 27283, 27636, 30513, 30995, 47151, 50221, 51377, 4282, 6804, 53171, 44635, 26560, 22751, 59925, 60347, 66760, 69222, 69384, 12430, 35435, 46483, 46377, 48973, 50991, 33127, 37952, 39294, 42800, 57461, 161, 29569, 29727, 28629, 38660, 32565, 50533, 1552, 24374, 15371, 18715, 10573, 12426, 23294, 31413, 69996, 24273, 49561, 53891, 61043, 62187, 69560, 44733, 53271, 36302, 27227, 19198
];

const MultipleItems = () => {
    const [products, setProducts] = useState(DataAll); //[Response]);
    const [country, setCountry] = useState([]);
    const [search, setSearch] = useState('');
    const [copyCode, setCopyCode] = useState('COPIAR CÓDIGO');
    const [dataCode, setDataCode] = useState({
        title: '',
        promotionId: '',
        description: '',
        dateAdded: '',
        endDate: '',
        terms: '',
        type: '',
        urlTracking:'',
        image: '',
        voucher: {
            code: ''
        },
    });
    let [isOpen, setIsOpen] = useState(false)
    const { addCoupon, removeCoupon, isLiked } = useCouponStore();
    const [currentPage, setCurrentPage] = useState(1);

    const parameters = {
        filters: {
          advertiserIds: advertiserIds,
          exclusiveOnly: false,
          membership: 'joined',
          regionCodes: ['MX', 'US', 'CA', 'GB', 'ES', 'AR', 'CH', 'CO', 'PE'],
          status: 'active',
          type: 'all'
        },
        pagination: {
          page: 1
        }
    }

    const requestOptions = {

        method: 'POST',
        headers: {
            'mode': 'no-cors',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://api.awin.com',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(parameters)
    };

    const getPromotions = async () => {
		fetch(`${BASE_URL}/${publisherId}/promotions`, requestOptions)
            .then((response) => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Error en la solicitud POST");
                }
            }).then((responseData) => {
                setProducts(responseData);
                console.log('response = ', responseData);
            }).catch((error) => {
                console.error(error);
            });
	};

    //getPromotions();

    const handleChange = (e:any) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    }

    const results = !search ? products: products.filter((data) => data.title.toLowerCase().includes(search.toLocaleLowerCase()))

    // Pagination logic
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

    const onClickDataCode = (value:any) => {
        setDataCode({
            title: value.title,
            promotionId: value.promotionId,
            description: value.description,
            dateAdded: value.dateAdded,
            endDate: value.endDate,
            terms: value.terms,
            type: value.type,
            urlTracking:value.urlTracking,
            image: `https://ui.awin.com/images/upload/merchant/profile/` + `${value?.advertiser?.id}` + '.png',
            voucher: value.voucher
        })
        openModal()
        onSaveLogEvent('brand', value.title)
    };

    const handleLikeClick = (event: React.MouseEvent, item: any) => {
        event.stopPropagation(); // Prevent modal from opening
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
        setCurrentPage(1); // Reset to first page on country change
        onSaveLogEvent('country_name', value)

        switch (value) {
            case 'AR': setProducts(DataAR); break;
            case 'BR': setProducts(DataBR); break;
            case 'CA': setProducts(DataCA); break;
            case 'CL': setProducts(DataCL); break;
            case 'CO': setProducts(DataCO); break;
            case 'ES': setProducts(DataES); break;
            case 'GB': setProducts(DataGB); break;
            case 'MX': setProducts(DataMX); break;
            case 'PE': setProducts(DataPE); break;
            case 'US': setProducts(DataUS); break;
            case 'AT': setProducts(DataAT); break;
            case 'BE': setProducts(DataBE); break;
            case 'BG': setProducts(DataBG); break;
            case 'HR': setProducts(DataHR); break;
            case 'CZ': setProducts(DataCZ); break;
            case 'DK': setProducts(DataDK); break;
            case 'FI': setProducts(DataFI); break;
            case 'FR': setProducts(DataFR); break;
            case 'DE': setProducts(DataDE); break;
            case 'GR': setProducts(DataGR); break;
            case 'HU': setProducts(DataHU); break;
            case 'IE': setProducts(DataIE); break;
            case 'IT': setProducts(DataIT); break;
            case 'LV': setProducts(DataLV); break;
            case 'LT': setProducts(DataLT); break;
            case 'NL': setProducts(DataNL); break;
            case 'NO': setProducts(DataNO); break;
            case 'PL': setProducts(DataPL); break;
            case 'PT': setProducts(DataPT); break;
            case 'RO': setProducts(DataRO); break;
            case 'SK': setProducts(DataSK); break;
            case 'SI': setProducts(DataSI); break;
            case 'SE': setProducts(DataSE); break;
            case 'CH': setProducts(DataCH); break;
            case 'UA': setProducts(DataUA); break;
        }
    };

    const onSaveLogEvent = (params:any, value:any) => {
        logEvent(analytics!, params, {name: value});
    }

    const onClickCopy = () => {
        copy(dataCode.voucher.code);
        setCopyCode('¡CÓDIGO COPIADO!')
        onSaveLogEvent('brand_code', dataCode.voucher.code)
    };

    const goStore = () => {
        onSaveLogEvent('go_store', dataCode.title)
    }

    const closeModal = () => {
        setIsOpen(false)
        copy('');
        setCopyCode('COPIAR CÓDIGO')
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <>
            <div className="bg-lightgrey py-8" id="blog-section">
                <div className='mx-auto max-w-7xl px-4 sm:py-4 lg:px-8 '>

                        {/** ¿Te encuentras viajando ó vas a tener un viaje? */}
                        <div className="text-center">
                            <h3 className="text-4xl sm:text-65xl font-bold text-black leading-snug mb-5 text-center">
                            ¡Encuentrá tus <span className="text-blue">ofertas </span> ó haz tus <span className="text-blue">compras online</span>!
                                <br />Selecciona el <span className="text-yellow">país</span> dónde deseas encontrar <span className="text-blue">tus descuentos. </span>
                            </h3>

                            <select
                                value={country}
                                onChange={e => onChangeOption(e.target.value)}
                                className='text-sm md:text-xl font-semibold hover:shadow-xl bg-navyblue text-white border border-purple py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-navyblue'>
                                <option value="" selected>Todos los países</option>
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

                    <div className='blog-section-data grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                        {currentCoupons.map((item: any, i: any) => {
                            const liked = isLiked(item.promotionId);
                            return (
                                <div key={i} style={{cursor:'pointer'}} className='relative bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group' onClick={() => {onClickDataCode(item)}}>
                                    <div className='blog-section-data center'>
                                        <Image
                                            src={`https://ui.awin.com/images/upload/merchant/profile/` + `${item?.advertiser?.id}` + '.png'}
                                            alt={item.description}
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

                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <button
                                        type="button"
                                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                        onClick={closeModal}
                                    >
                                        <FaTimes className="w-6 h-6" />
                                    </button>
                                    <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <Image
                                                src={dataCode.image}
                                                alt={dataCode.description}
                                                width={100}
                                                height={85} /> 
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
                                                {(dataCode.type==='voucher')?<Link href={dataCode.urlTracking} className='isDisabled'>
                                                <button type="button" className='w-full text-navyblue border border-purple font-medium py-2 px-4 rounded-full'>
                                                    {dataCode.voucher.code}
                                                </button>
                                            </Link>:'NO REQUIERE CÓDIGO DE DESCUENTO'}
                                            </h5>
                                            <h5 className='text-xl font-semibold text-center text-grey mb-5'>
                                                {(dataCode.type==='voucher')?<button 
                                                    type="button" 
                                                    className='bg-navyblue w-full hover:text-white text-white border border-purple font-medium py-2 px-4 rounded-full' onClick={() => {onClickCopy()}}>
                                                    {copyCode}
                                                </button>:''}
                                            </h5>
                                        </div>

                                        <hr style={{ color: "lightgrey" }} />

                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <p className="mb-8 lg:mb-16 mt-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-8">
                                                {dataCode.terms}
                                            </p>
                                        </div>

                                        {
                                            /**
                                            <div className="flex flex-shrink-0 items-center justify-center">
                                            <h3 className='text-xs font-medium  pb-2 opacity-50'><b>Inicio:</b> {dataCode.dateAdded}</h3>
                                        </div>

                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <h3 className='text-xs font-medium  pb-2 opacity-50'><b>Fin:</b> {dataCode.endDate}</h3>
                                        </div>
                                             */
                                        }

                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <Link href={dataCode.urlTracking} target="_blank">
                                                <button type="button" className='bg-lightgrey w-full hover:text-navyblue text-navyblue border border-purple font-medium py-2 px-4 rounded-full' onClick={() => {goStore()}}>
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
