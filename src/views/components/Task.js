import React, {useEffect, useState} from 'react'
import {FaTrash} from "react-icons/fa6";
import {FaEdit, FaCheck} from "react-icons/fa";
import {deleteTasks} from "../../services/TaskServices";
import {editTaskServices} from "../../services/TaskServices";

export function Task ({task, isCompleted, trashCan, editIcon, completeIcon}) {

    const [isComponentVisible, setIsComponentVisible] = useState(false)

    useEffect(() => {
        setIsComponentVisible(true)
    }, []);

    const taskDelete = async (task, event) => {
        event.preventDefault()
        try{
            const e = await deleteTasks(task)
            trashCan(task)
        } catch (e){
            console.log(e)
        }
    }

    const editTask = async(task, event) => {
        event.preventDefault()
        try{
            editIcon(task)
        } catch(e){
            console.log(e)
        }
    }

    const completeTask = async (task, event) => {
        event.preventDefault()
        console.log(task)
        try{
            task.completed = "COMPLETED"
            const e = await editTaskServices(task)
            completeIcon(task)
        } catch (e){
            console.log("couldnt complete task", e)
        }
    }

    return (
            <div className={`max-w-80 ${!isCompleted ? `bg-emerald-600` : `bg-neutral-100`} p-6 rounded-2xl shadow m-4`}>
                <div className={`text-2xl ${!isCompleted ? `text-neutral-100` : `text-emerald-800`} mb-4 overflow-auto max-h-40`}>
                    <h1>
                        {task.title}
                    </h1>
                </div>
                <div className="max-h-64 overflow-auto">
                    <p className={` ${!isCompleted ? ` text-neutral-100` : ` text-gray-800`} text-justify scroll-auto` }>
                        {task.description}
                    </p>
                </div>
                <div className="flex justify-start mt-4">
                        <FaEdit className="text-2xl mr-10 text-sky-700 mt-3 cursor-pointer
                        hover:text-sky-800 hover:-translate-y-1 hover:shadow-sm hover:scale-110 transition-all" onClick={(e) => {
                            editTask(task, e)
                        }}/>

                        <FaTrash className="text-2xl text-rose-700 mt-3 mr-10 cursor-pointer hover:text-rose-800 hover:-translate-y-1 hover:shadow-sm hover:scale-110 transition-all" onClick={(e)=> {
                            taskDelete(task, e)
                        }}/>

                    {task.completed === "INCOMPLETE" ?
                        <>
                            <FaCheck className={`text-2xl mr-10 ${!isCompleted ? `text-neutral-100` : `text-emerald-600`} text-emerald-700 mt-3 cursor-pointer ${!isCompleted ? `hover:text-neutral-200` : `hover:text-emerald-800`} hover:-translate-y-1 hover:shadow-sm hover:scale-110 transition-all`}
                                     onClick={(e) => {
                                         completeTask(task, e)
                                     }}/>
                        </> : null
                    }

                </div>
            </div>
    )

}






