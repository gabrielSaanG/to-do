import React from 'react'
import Task from "../components/Task";
import { FaCirclePlus } from "react-icons/fa6";

function Main(){
    return <div>
        <div className="h-20 w-20">
            <FaCirclePlus className="text-6xl text-emerald-700 hover:text-emerald-800 cursor-pointer p-2"/>
        </div>

        <Task/>
    </div>
}


export default Main;