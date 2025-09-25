"use client";
import Link from 'next/link';
import React from 'react';
import { FaHome, FaTag, FaSave, FaUser } from 'react-icons/fa';

const BottomNavbar = () => {
    // @ts-ignore
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 lg:hidden">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <Link href="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <FaHome className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600" aria-hidden="true" />
                    <span className="text-sm text-gray-500 group-hover:text-blue-600">INICIO</span>
                </Link>
                <Link href="/marcas" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <FaTag className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600" aria-hidden="true" />
                    <span className="text-sm text-gray-500 group-hover:text-blue-600">MARCAS</span>
                </Link>
                <Link href="/saved-coupons" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <FaSave className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600" aria-hidden="true" />
                    <span className="text-sm text-gray-500 group-hover:text-blue-600">FAVORITOS</span>
                </Link>
                <Link href="/perfil" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <FaUser className="w-6 h-6 mb-1 text-gray-500 group-hover:text-blue-600" aria-hidden="true" />
                    <span className="text-sm text-gray-500 group-hover:text-blue-600">PERFIL</span>
                </Link>
            </div>
        </div>
    );
}

export default BottomNavbar;
