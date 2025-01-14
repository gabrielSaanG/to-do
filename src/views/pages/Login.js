
import React, {useState} from "react";

const Login = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return <div className="flex flex-col justify-center p-20 w-1/2">
        <div className="">
            <p className="text-3xl">Bem-vindo de volta!</p>
            <p className="text-xl">Acesse sua conta</p>
        </div>

        <div className="max-w-1/2">
            <form onSubmit={handleSubmit}>
                <div className="flex-col w-full max-w-sm min-w-[200px]">
                    <div className="pb-3">
                        <label>
                            Usuário
                        </label>
                    </div>
                    <div className="relative">
                        <input type="text" id="username" required className="peer w-full bg-transparent placeholder:text-slate-400
                        text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition-duration-300
                          ease focus:outline-none focus:border-slate-300 shadow-sm focus:shadow" placeholder="Escreva Aqui..." onChange={(e) => setUsername(e.target.value)}/>

                    </div>
                    <div className="flex-col w-full max-w-sm min-w-[200px]">
                        <div className="pb-3">
                            <label>
                                Senha
                            </label>
                        </div>
                        <div className="relative">
                            <input type="password" id="password" required className="peer w-full bg-transparent placeholder:text-slate-400
                            text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition-duration-300
                              ease focus:outline-none focus:border-slate-300 shadow-sm focus:shadow" placeholder="Escreva Aqui..." onChange={(e) => setPassword(e.target.value)}/>

                        </div>
                    </div>
                    <div className="flex flex-row items-center" >
                        <button className="p-3 mr-5 bg-blue-500 rounded-xl w-1/4 text-white shadow hover:bg-blue-700 mt-3">
                            Login
                        </button>

                        <p className="">Não tem uma conta? <a className="text-blue-500 hover:text-blue-700 cursor-pointer">registrar-se</a></p>
                    </div>
                    </div>
            </form>
        </div>
    </div>
};

export default Login;
