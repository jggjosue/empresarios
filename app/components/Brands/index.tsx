"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import { app, getAnalytics, logEvent } from '../../../firebase';
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

const MultipleItems = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
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

    const results = !search ? products: products.filter((data) => data.title.toLowerCase().includes(search.toLocaleLowerCase()))

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
        if(dataCode.dateAdded.length > 0) {
            openModal()
            onSaveLogEvent('brand', value.title)
        }
    };

    const onSaveLogEvent = (params:any, value:any) => {
        logEvent(analytics!, params, {name: value});
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <>
            {loading ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">Cargando cupones...</p>
                </div>
            ) : results.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">No se encontraron cupones.</p>
                </div>
            ) : (
                <div className="bg-lightgrey py-8" id="blog-section">
                    <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 '>

                        <div className='blog-section-data grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                            {results.map((item: any, i: any) => (
                                <div key={i} style={{cursor:'pointer'}} className='bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group' onClick={() => {onClickDataCode(item)}}>
                                    <div className='blog-section-data center'>
                                        <Image
                                            src={`https://ui.awin.com/images/upload/merchant/profile/` + `${item?.advertiser?.id}` + '.png'}
                                            alt={item.description}
                                            width={100}
                                            height={85} />
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MultipleItems;
