"use client";
import React from 'react';
import Link from 'next/link';

const ProfilePage = () => {
    return (
        <div className="bg-lightgrey py-8 min-h-screen">
            <div className='mx-auto max-w-7xl px-4 sm:py-4 lg:px-8'>
                <div className="text-center mb-12">
                    <h3 className="text-4xl sm:text-65xl font-bold text-black leading-snug">
                        Mi Perfil
                    </h3>
                    <p className="mt-4 text-lg text-gray-600">
                        Aquí podrás gestionar la información de tu cuenta.
                    </p>
                    <Link href="/" className='inline-block mt-6 text-blue-600 hover:underline'>
                        &larr; Volver a las ofertas
                    </Link>
                </div>

                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">Funcionalidad de perfil próximamente.</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
