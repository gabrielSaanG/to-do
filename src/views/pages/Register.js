
import React, {useEffect, useRef, useState, useContext} from "react";
import AuthContext from "../../context/AuthProvider";

import register from "../../services/RegisterServices";

const LOGIN_URL = '/api/auth/';


const Login = () => {

    const { setAuth } = useContext(AuthContext)
    const [error, setError] = useState("")
    const [email, setEmail] = useState()
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState()
    const [success, setSuccess] = useState(false);

    const userRef = useRef(null);

    useEffect(() => {
        userRef.current.focus();
    }, []);


    const redirect = () => {
        window.location.href = "/login";
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (password === confirmPassword) {
                const response = await register(email, username, password);

                // if (response.response.status === 401 || response.response.status === 500) {
                //     setError("Usuário ou senha inválidos");
                // }
            }
            if (password !== confirmPassword) {
                setError("Senha incorreta");
            }


            // setSuccess(true);
        } catch (e) {

        }



    }

    return(
        <>
            {success ? (
                <section>
                    <h1>
                        Voce esta logado
                    </h1>
                </section>
            ) : (<div className="flex flex-col justify-center p-20 w-1/2">
                    <div className="mb-4">
                        <p className="text-3xl text-emerald-700">Vamos criar uma conta para você</p>
                        <p className="text-xl text-gray-800">Preencha seus dados</p>
                    </div>

                    <div className="max-w-1/2">
                        <form onSubmit={handleSubmit}>
                            <div className="flex-col w-full max-w-sm min-w-[200px]">
                                <div className="pb-3">
                                    <label>
                                        E-mail
                                    </label>
                                </div>
                                <div className="relative mb-4">
                                    <input type="text" id="username" required className="peer w-full bg-transparent placeholder:text-gray-700 bg-stone-100
                            text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition-duration-300
                              ease focus:outline-none focus:border-slate-300 shadow-sm focus:shadow" ref={userRef}
                                           onChange={(e) => setEmail(e.target.value)}/>

                                </div>
                                <div className="flex-col w-full max-w-sm min-w-[200px]">
                                    <div className="pb-3">
                                        <label>
                                            Usuário
                                        </label>
                                    </div>
                                    <div className="relative mb-4">
                                        <input type="text" id="username" required className="peer w-full bg-transparent placeholder:text-gray-700 bg-stone-100
                                text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition-duration-300
                                  ease focus:outline-none focus:border-slate-300 shadow-sm focus:shadow" ref={userRef}
                                               onChange={(e) => setUsername(e.target.value)}/>

                                    </div>
                                </div>
                                <div className="flex-col w-full max-w-sm min-w-[200px]">
                                    <div className="pb-3">
                                        <label>
                                            Senha
                                        </label>
                                    </div>
                                    <div className="relative mb-4">
                                        <input type="password" id="password" required className="peer w-full bg-transparent placeholder:text-gray-700 bg-stone-100
                                text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition-duration-300
                                  ease focus:outline-none focus:border-slate-300 shadow-sm focus:shadow" ref={userRef}
                                               onChange={(e) => setPassword(e.target.value)}/>

                                    </div>
                                </div>
                                <div className="flex-col w-full max-w-sm min-w-[200px]">
                                    <div className="pb-3">
                                        <label>
                                            Confirmar Senha
                                        </label>
                                    </div>
                                    <div className="relative mb-4">
                                        <input type="password" id="passwordConfirm" required className="peer w-full bg-transparent placeholder:text-gray-700 bg-stone-100
                                text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition-duration-300
                                  ease focus:outline-none focus:border-slate-300 shadow-sm focus:shadow" ref={userRef}
                                        onChange = {(e) =>  setConfirmPassword(e.target.value) }
                                        />

                                    </div>
                                    {error && (
                                        <div className="flex ">
                                            <span className="text-red-400 ">{error}</span>
                                        </div>
                                    )
                                    }
                                </div>
                                <div className="flex flex-row items-center">
                                    <button
                                        className="p-3 mr-5 bg-emerald-700 rounded-xl w-1/4 text-white shadow hover:bg-emerald-800 mt-3">
                                        Registrar
                                    </button>

                                    <p className="">Já tem uma conta? <a
                                        className="text-emerald-700 hover:text-emerald-800 cursor-pointer" onClick={redirect}>Logar</a>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
};

export default Login;
