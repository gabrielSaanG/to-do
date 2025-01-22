import React, {useEffect, useState} from 'react'
import {Task} from "../components/Task";
import {TaskCreation} from "../components/TaskCreation/TaskCreation";
import { FaCirclePlus } from "react-icons/fa6";
import {getAllTasks} from "../../services/TaskServices";

export function Main(){


    const [isFetched, setIsFetched] = useState(true)
    const [task, setTask] = useState([])
    const [isVisible, setIsVisible] = useState(false)


    function creationTask(taskDataProvider) {

        const task = {
            "id": taskDataProvider.id,
            "title": taskDataProvider.title,
            "description": taskDataProvider.description
        }
        console.log(task)
        setTask((prevTasks) => [...prevTasks, task])

    }



    useEffect(() => {
        async function fetchData() {
            const response = await getAllTasks()
            if (response === undefined) return null;
            if (JSON.stringify(response.data) !== JSON.stringify(task)) {
                setTask(response.data)
            }
        }
        setIsFetched(false)
        fetchData()
    }, [task]);

    return <div>
        <div className="h-20 w-20">
            <button onClick={() => {
                setIsVisible(!isVisible)
            }}><FaCirclePlus className="text-6xl text-emerald-700 hover:text-emerald-800 cursor-pointer p-2"/></button>
        </div>
        {isVisible ? <TaskCreation isVisible={isVisible} setIsVisible={setIsVisible} createtask={creationTask}/> : null}
        <div className="grid grid-rows-3 grid-flow-col justify-left">
            {task.map(item => {
                return(
                <div className="w-80 break-words">
                    <Task name={item.title} description={item.description} id={item.id}/>
                </div>
            )})}
        </div>
    </div>
}


export default Main;