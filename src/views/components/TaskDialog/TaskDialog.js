import React, {useState} from "react";
import {insertTask} from "../../../services/TaskServices";
import {IoIosCloseCircle} from "react-icons/io";
import {FaCheck} from "react-icons/fa";

export function TaskDialog({isVisible, setIsVisible, frontTaskUpdate, backEndTask, task}) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [isConfirmed, setIsConfirmed] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault();


        const taskData ={
            title: title,
            description: description,
            completed: "INCOMPLETE",
            token: task && task.token
        }

        try{
            const e = await backEndTask(taskData)
            console.log(e)
            setIsConfirmed(!isConfirmed)
            frontTaskUpdate(e.data)
        } catch (e){
            console.log(e)
        }
    }



    return (
        <>
            {!isConfirmed ? (
            <div className={`fixed transform -translate-x-1/2 left-1/2 w-96 shadow-lg flex justify-center items-center rounded-2xl`}>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="bg-neutral-100 shadow-sm p-5 rounded-2xl w-full">
                        <div className="flex w-full justify-end ">
                            <IoIosCloseCircle className="text-3xl text-emerald-700 hover:text-emerald-800 cursor-pointer" onClick={() => {
                                setIsVisible(!isVisible)
                            }}/>
                        </div>

                        <div className="pb-3">
                            <label className="text-emerald-800 text-xl ">
                                Titulo
                            </label>
                        </div>
                        <div className="relative mb-4">
                            <input type="text" id="username" required className="peer w-full placeholder:text-gray-700 bg-neutral-100
                                        text-slate-700 text-sm border-b-2 border-neutral-400 py-2 transition-duration-300 shadow-sm
                                          ease focus:outline-none " onChange={(e) => {setTitle(e.target.value)}}/>
                        </div>

                        <div className="pb-3">
                            <label className="text-emerald-800 text-xl ">
                                Descrição
                            </label>
                        </div>
                        <div className="relative mb-4">
                                <textarea type="paragraph" id="username" required className="peer w-full min-h-40 placeholder:text-gray-700 bg-neutral-100
                                        text-slate-700 text-sm border-b-2 border-neutral-400 py-2 transition-duration-300 shadow-sm
                                          ease focus:outline-none " onChange={(e) => {setDescription(e.target.value)}}/>
                        </div>
                        <button className="flex bg-emerald-700 hover:bg-emerald-800 cursor-pointer w-40 h-10 rounded-2xl items-center justify-start">
                            <FaCheck className="text-neutral-200 h-full mr-3 ml-3"/>
                            <h1 className=" text-neutral-200 mb-1 ml-2">
                                Confirmar
                            </h1>
                        </button>

                    </div>
                </form>
            </div>
            ) : null }
        </>
            )

}