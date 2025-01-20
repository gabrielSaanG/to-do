import React from 'react'
import { FaTrash, FaCirclePlus } from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";

const Task = () => {
    return (
        <div className="max-w-80 bg-neutral-100 p-6 rounded-2xl shadow m-4 ">
            <div className="text-2xl text-emerald-800 mb-4">
                <h1>
                    Titulo da Tarefa
                </h1>
            </div>
            <div>
                <p className="text-gray-800 text-justify" >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium alias aliquid architecto atque cum delectus,
                    dolores impedit nihil non quae, qui ratione recusandae sed totam vero voluptatem. Debitis, doloremque!
                </p>
            </div>
            <div className="flex justify-start mt-4">
                    <FaEdit className="text-2xl mr-10 text-emerald-700 mt-3 cursor-pointer hover:text-emerald-800"/>
                    <FaTrash className="text-2xl text-emerald-700 mt-3 cursor-pointer hover:text-emerald-800"/>

            </div>
        </div>
    )
}

export default Task;