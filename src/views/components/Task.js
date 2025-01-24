import React, {useEffect, useState} from 'react'
import {FaTrash} from "react-icons/fa6";
import {FaEdit, FaCheck} from "react-icons/fa";
import {deleteTasks, getTask} from "../../services/TaskServices";


export function Task ({id, name, description, token, trashCan, editIcon}) {

    const [isComponentVisible, setIsComponentVisible] = useState(false)

    useEffect(() => {
        setIsComponentVisible(true)
    }, []);

    const taskDelete = async (id, name, description, token, event) => {
        event.preventDefault()
        const taskObject = {
            id: id,
            title: name,
            description: description,
            token: token
        }

        try{
            const e = await deleteTasks(taskObject)
            trashCan(taskObject)
        } catch (e){
            console.log(e)
        }
    }

    const editTask = async(id,name,description,token,event) => {
        event.preventDefault()
        const taskObject = {
            id: id,
            title: name,
            description: description,
            token: token
        }

        try{
            editIcon(taskObject)
        } catch(e){
            console.log(e)
        }
    }
    //
    // const completeTask = async (event) => {
    //     event.preventDefault()
    //     try{
    //         confirmIcon(taskObject)
    //     }
    // }

    return (
            <div className="max-w-80 bg-neutral-100 p-6 rounded-2xl shadow m-4">
                <div className="text-2xl text-emerald-800 mb-4">
                    <h1>
                        {name}
                    </h1>
                </div>
                <div className="max-h-64 overflow-auto">
                    <p className="text-gray-800 text-justify scroll-auto" >
                        {description}
                    </p>
                </div>
                <div className="flex justify-start mt-4">
                        <FaEdit className="text-2xl mr-10 text-sky-700 mt-3 cursor-pointer
                        hover:text-sky-800 hover:-translate-y-1 hover:shadow-sm hover:scale-110 transition-all" onClick={(e) => {
                            editTask(id, name, description, token, e)
                        }}/>

                        <FaTrash className="text-2xl text-rose-700 mt-3 mr-10 cursor-pointer hover:text-rose-800 hover:-translate-y-1 hover:shadow-sm hover:scale-110 transition-all" onClick={(e)=> {
                            taskDelete(id, name, description, token, e)
                        }}/>

                        <FaCheck className="text-2xl mr-10 text-emerald-700 mt-3 cursor-pointer
                            hover:text-emerald-800 hover:-translate-y-1 hover:shadow-sm hover:scale-110 transition-all" onClick={(e) => {
                            // completeTask(e)
                        }}/>

                </div>
            </div>
    )
}






