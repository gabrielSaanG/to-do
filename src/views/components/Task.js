import React from 'react'
import { FaTrash} from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";
import {deleteTasks} from "../../services/TaskServices";

const taskDelete = async (props, event) => {
    event.preventDefault()
    try{
        const e = await deleteTasks(props.id)
        console.log(e)
    } catch (e){
        console.log(e)
    }
}

export function Task (props) {
    return (
        <div className="max-w-80 bg-neutral-100 p-6 rounded-2xl shadow m-4 ">
            <div className="text-2xl text-emerald-800 mb-4">
                <h1>
                    {props.name}
                </h1>
            </div>
            <div>
                <p className="text-gray-800 text-justify" >
                    {props.description}
                </p>
            </div>
            <div className="flex justify-start mt-4">
                    <FaEdit className="text-2xl mr-10 text-emerald-700 mt-3 cursor-pointer hover:text-emerald-800"/>
                    <FaTrash className="text-2xl text-emerald-700 mt-3 cursor-pointer hover:text-emerald-800" onClick={(e)=> {
                        taskDelete(props, e)
                    }}/>

            </div>
        </div>
    )
}






