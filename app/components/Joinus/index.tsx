"use client"
import {collection, addDoc} from "firebase/firestore";
import {logEvent} from "firebase/analytics";
import {useState} from 'react';
import {firestore, getAnalytics} from '../../../firebase';
import {Alert} from "@material-ui/lab";

const Join = () => {
    const [inputValues, setInputValues] = useState({input1: '', input2: ''});
    const isDisabled = Object.values(inputValues).some((value) => value === '');

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({ ...prevState, [name]: value }));
    }

    const handleClick = () => {
        addTodo();
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // handle form submission
    };

    const addTodo = async () => {        
        try {
            const docRef = await addDoc(collection(firestore, "preregistration"), {
              email: `${inputValues.input2}`,   
              name: `${inputValues.input1}` 
            });
            setInputValues({input1:'', input2:''});
            alert('¡Registrado Correctamente! Se enviara un correo con los pasos siguientes.');
            logEvent(getAnalytics(), 'pre_registration');
          } catch (e) {
            console.error("Error adding document: ", e);
            logEvent(getAnalytics(), 'error_insert_document');
          }
    }

    return (
        <div className="bg-joinus my-40">
            <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8'>
                <form action="#" className="space-y-16" onSubmit={handleSubmit}>
                    <div className="text-center">
                        <h3 className="text-blue text-lg font-normal tracking-widest">ÚNETE A NOSOTROS</h3>
                        <h2 className="text-4xl sm:text-6xl font-bold my-6 leading-10"> Lleva tu negocio a <br /> el nuevo nivel.</h2>
                        <p className="text-lightblack text-base font-normal">Registrate para recibir más información.</p>
                    </div>

                    <div className="mx-auto max-w-4xl pt-5">
                        <div className="sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-lightgrey sm:rounded-full">
                            <div>
                                <input 
                                    id="name"
                                    name="input1"
                                    value={inputValues.input1}
                                    onChange={handleChange}
                                    type="name" 
                                    required
                                    className="my-4 py-4 sm:pl-6 lg:text-xl text-black sm:rounded-full bg-lightgrey pl-1 focus:outline-none bg-emailbg focus:text-black" 
                                    placeholder="Nombre" 
                                    autoComplete="off" />
                            </div>
                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    name="input2"
                                    value={inputValues.input2}
                                    onChange={handleChange}
                                    required
                                    className="my-4 py-4 sm:pl-6 lg:text-xl text-black sm:border-l border-linegrey bg-lightgrey focus:outline-none bg-emailbg focus:text-black" 
                                    placeholder="Correo Electrónico" 
                                    autoComplete="off" />
                            </div>
                            <div className="sm:mr-3">
                                <button 
                                    type="submit" 
                                    className="my-4 py-4 joinButton w-full sm:w-0 text-xl text-white font-semibold text-center rounded-xl sm:rounded-full bg-blue hover:bg-btnblue"
                                    onClick={handleClick}
                                    disabled={isDisabled}>
                                    ¡ÚNETE!
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {
                    /**
                     <div className="my-2 py-2">
                    <Alert severity="success">
                        ¡Registrado Correctamente! Se enviara un correo con los pasos siguientes.
                    </Alert>
                </div>
                     */
                }

            </div>
            
        </div>
    )
}

export default Join;
