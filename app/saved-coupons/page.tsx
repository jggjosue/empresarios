"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCouponStore } from '../store/couponStore';
import { FaTrash } from 'react-icons/fa';

const ITEMS_PER_PAGE = 20;

const SavedCouponsPage = () => {
    const { savedCoupons, removeCoupon } = useCouponStore();
    const [isClient, setIsClient] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(savedCoupons.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCoupons = savedCoupons.slice(startIndex, endIndex);

    const goToNextPage = () => {
        setCurrentPage((page) => Math.min(page + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage((page) => Math.max(page - 1, 1));
    };

    if (!isClient) {
        return null; // Or a loading spinner
    }

    return (
        <div className="bg-lightgrey py-8 min-h-screen">
            <div className='mx-auto max-w-7xl px-4 sm:py-4 lg:px-8'>
                <div className="text-center mb-12">
                    <h3 className="text-4xl sm:text-65xl font-bold text-black leading-snug">
                        Mis Cupones Guardados
                    </h3>
                    <p className="mt-4 text-lg text-gray-600">
                        Aquí encontrarás todos los cupones que has guardado para más tarde.
                    </p>
                    <Link href="/" className='inline-block mt-6 text-blue-600 hover:underline'>
                        &larr; Volver a las ofertas
                    </Link>
                </div>

                {savedCoupons.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No tienes cupones guardados todavía.</p>
                    </div>
                ) : (
                    <div className="pb-24">
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                            {currentCoupons.map((coupon) => (
                                <div key={coupon.promotionId} className='relative bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group'>
                                    <div className='blog-section-data center text-center'>
                                        <Image
                                            src={coupon.image || `https://ui.awin.com/images/upload/merchant/profile/${coupon.advertiser.id}.png`}
                                            alt={coupon.description}
                                            width={100}
                                            height={85}
                                            className="mx-auto" />
                                    </div>
                                    <br />
                                    <hr style={{ color: "lightgrey" }} />
                                    <br />
                                    <h5 className='text-xl font-semibold text-black mb-5 h-16 overflow-hidden'>{coupon.title}</h5>
                                    <Link href={coupon.urlTracking} target="_blank">
                                        <button type="button" className='bg-navyblue w-full hover:text-white text-white border border-purple font-medium py-2 px-4 rounded-full'>
                                            IR A LA TIENDA
                                        </button>
                                    </Link>
                                    <div className="absolute top-4 right-4 cursor-pointer" onClick={() => removeCoupon(coupon.promotionId)}>
                                        <FaTrash className="w-6 h-6 text-red-500" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-4 mt-10">
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Anterior
                                </button>
                                <span className="text-sm text-gray-700">
                                    Página {currentPage} de {totalPages}
                                </span>
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedCouponsPage;
