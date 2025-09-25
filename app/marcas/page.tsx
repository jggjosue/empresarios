"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DataAll } from '../data/DataAll';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 21;

interface Advertiser {
    id: number;
    name: string;
}

const MarcasPage = () => {
    const [brands, setBrands] = useState<Advertiser[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Create a unique list of advertisers (brands)
        const advertiserMap = new Map<number, Advertiser>();
        DataAll.forEach(coupon => {
            if (coupon.advertiser && !advertiserMap.has(coupon.advertiser.id)) {
                advertiserMap.set(coupon.advertiser.id, coupon.advertiser);
            }
        });
        setBrands(Array.from(advertiserMap.values()));
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(brands.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBrands = brands.slice(startIndex, endIndex);

    return (
        <div className="bg-lightgrey py-8 min-h-screen">
            <div className='mx-auto max-w-7xl px-4 sm:py-4 lg:px-8'>
                <div className="text-center mb-12">
                    <h3 className="text-4xl sm:text-65xl font-bold text-black leading-snug">
                        Nuestras Marcas Asociadas
                    </h3>
                    <p className="mt-4 text-lg text-gray-600">
                        Explora las marcas con las que colaboramos.
                    </p>
                    <Link href="/" className='inline-block mt-6 text-blue-600 hover:underline'>
                        &larr; Volver a las ofertas
                    </Link>
                </div>

                {brands.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">Cargando marcas...</p>
                    </div>
                ) : (
                    <div className="pb-24">
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                            {currentBrands.map((brand) => (
                                <div key={brand.id}
                                     className='relative bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group'>
                                    <div className='blog-section-data center text-center'>
                                        <Image
                                            src={`https://ui.awin.com/images/upload/merchant/profile/${brand.id}.png`}
                                            alt={brand.name}
                                            width={100}
                                            height={85}
                                            className="mx-auto"/>
                                    </div>
                                    <br/>
                                    <hr className="w-full" style={{color: "lightgrey"}}/>
                                    <br/>
                                    <h5 className='text-xl font-semibold text-black text-center h-16'>{brand.name}</h5>
                                </div>
                            ))}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default MarcasPage;
