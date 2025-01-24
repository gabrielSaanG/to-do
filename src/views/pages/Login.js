
import React, {useEffect, useRef, useState, useContext} from "react";
import AuthContext from "../../context/AuthProvider";
import login from "../../services/LoginServices";


const LOGIN_URL = '/api/auth/';


const Login = () => {

    const { setAuth } = useContext(AuthContext)
    const [error, setError] = useState("")
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true)


    const userRef = useRef(null);

    useEffect(() => {
        userRef.current.focus();
        setIsLoading(false)
    }, []);


    const redirect = () => {
        window.location.href = '/register';
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const e = await login(username, password);

            if (e.response.status === 401 || e.response.status === 500){
                setError("Usuário ou senha inválidos");
            }
            // setSuccess(true);
        } catch (e) {
            console.log("teste: ", e.response.status);
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
            ) : (<div className="flex flex-col justify-center p-20 w-1/2 h-dvh">
            <div className="mb-4">
                <p className={`text-4xl text-emerald-700 transition-opacity duration-1000 ${isLoading ? `opacity-0` : `opacity-100`}`}>Bem-vindo de volta!</p>
                <p className={`text-xl text-gray-800 transition-opacity duration-1000 ${isLoading ? `opacity-0` : `opacity-100`}`}>Acesse sua conta</p>
            </div>

            <div className="max-w-1/2">
                <form onSubmit={handleSubmit}>
                    <div className="flex-col w-full max-w-sm min-w-[200px]">
                        <div className="pb-3">
                            <label>
                                Usuário
                            </label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" id="username" required className="peer w-full placeholder:text-gray-700 bg-stone-100
                            text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition-duration-300
                              ease focus:outline-none focus:border-slate-300 shadow-sm focus:shadow" ref={userRef} placeholder="Escreva Aqui..." onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="flex-col w-full max-w-sm min-w-[200px]">
                            <div className="pb-3">
                                <label>
                                    Senha
                                </label>
                            </div>
                            <div className="relative mb-4">
                                <input type="password" id="password" required className="peer w-full placeholder:text-gray-700 bg-stone-100
                                text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition-duration-300
                                  ease focus:outline-none focus:border-slate-300 shadow-sm focus:shadow" ref={userRef} placeholder="Escreva Aqui..." onChange={(e) => setPassword(e.target.value)}/>
                                {error && (
                                    <div className="flex ">
                                        <span className="text-red-400 ">{error}</span>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                        <div className="flex flex-row items-center" >
                            <button className="p-3 mr-5 bg-emerald-600 rounded-xl w-1/4 text-white  hover:bg-emerald-700 shadow-sm hover:shadow mt-3
                            hover:-translate-y-0.5 hover:shadow hover:scale-110 transition-all">
                                Login
                            </button>

                            <p className="">Não tem uma conta? <a className="text-emerald-600 hover:text-emerald-700 cursor-pointer" onClick={redirect}>registrar-se</a></p>
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
