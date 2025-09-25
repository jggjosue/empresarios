"use client"
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { app } from '../../../firebase';
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";

const Contactusform = () => {
    let [isFormOpen, setIsFormOpen] = useState(false);
    let [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    const [inputValues, setInputValues] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: ''
    });

    const db = getDatabase(app);

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({ ...prevState, [name]: value }));
    };

    const validate = () => {
        let tempErrors = { name: '', email: '' };
        let isValid = true;

        if (!inputValues.name) {
            isValid = false;
            tempErrors.name = 'El nombre es obligatorio.';
        }

        if (!inputValues.email) {
            isValid = false;
            tempErrors.email = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(inputValues.email)) {
            isValid = false;
            tempErrors.email = 'El formato del correo electrónico no es válido.';
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (validate()) {
            try {
                const registrationsRef = ref(db, 'registrations');
                await push(registrationsRef, {
                    name: inputValues.name,
                    email: inputValues.email,
                    message: inputValues.message,
                    createdAt: serverTimestamp()
                });
                console.log("Formulario enviado y guardado en Firebase");
                closeFormModal();
                openConfirmationModal();
            } catch (error) {
                console.error("Error al guardar en Firebase:", error);
                alert("Hubo un error al enviar tu comentario. Por favor, inténtalo de nuevo.");
            }
        }
    };

    const closeFormModal = () => {
        setIsFormOpen(false);
        // Reset fields and errors after modal closes
        setTimeout(() => {
            setInputValues({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '' });
        }, 300);
    };

    const openFormModal = () => {
        setIsFormOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmationOpen(false);
    };

    const openConfirmationModal = () => {
        setIsConfirmationOpen(true);
    };

    return (
        <>
            <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0">
                <div className='hidden lg:block'>
                    <button 
                        type="button" 
                        className='justify-end text-xl font-semibold bg-transparent py-4 px-6 lg:px-12 navbutton rounded-full hover:bg-navyblue hover:text-white' 
                        onClick={openFormModal}>
                        Registrarse Aquí
                    </button>
                </div>
            </div>

            {/* Form Modal */}
            <Transition appear show={isFormOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeFormModal}>
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
                                    <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <Link href="/" className='text-2xl sm:text-4xl font-semibold text-black'>
                                                Empresarios
                                            </Link>
                                        </div>
                                        <p className="mb-8 lg:mb-16 mt-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">¿Quieres enviarnos un comentario?</p>
                                        <form action="#" className="space-y-6" onSubmit={handleSubmit}>
                                            <div>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    value={inputValues.name}
                                                    onChange={handleChange}
                                                    type="text"
                                                    className="relative block w-full appearance-none rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Nombre..."
                                                />
                                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo Electrónico</label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    value={inputValues.email}
                                                    onChange={handleChange}
                                                    type="email"
                                                    className="relative block w-full appearance-none rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="founder@magzin.com.mx"
                                                />
                                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Comentario</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={inputValues.message}
                                                    onChange={handleChange}
                                                    className="relative block w-full appearance-none rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Escribir un comentario..."></textarea>
                                            </div>
                                            <button type="submit"
                                                className="py-3 px-5 text-sm font-medium w-full text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                                    Enviar
                                            </button>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Confirmation Modal */}
            <Transition appear show={isConfirmationOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeConfirmationModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-2xl font-medium leading-6 text-gray-900">
                                        ¡Enviado con éxito!
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500">
                                            Gracias por tu comentario. Nos pondremos en contacto contigo pronto.
                                        </p>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeConfirmationModal}
                                        >
                                            Cerrar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Contactusform;
