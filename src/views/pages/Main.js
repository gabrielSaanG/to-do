import React, {useEffect, useState} from 'react'
import {Task} from "../components/Task";
import {TaskCreation} from "../components/TaskCreation/TaskCreation";
import { FaCirclePlus } from "react-icons/fa6";
import {getAllTasks} from "../../services/TaskServices";
import {TaskEditing} from "../components/TaskEditing/TaskEditing";

export function Main(){


    const [isFetched, setIsFetched] = useState(true)
    const [task, setTask] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [visibilityEditingScreen, setVisibilityEditingScreen] = useState(false)
    const [taskToBeEdited, setTaskToBeEdited] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const response = await getAllTasks()
            if (response === undefined) return null;
            if (JSON.stringify(response.data) !== JSON.stringify(task)) {
                setTask(response.data)
            }
        }
        setIsLoading(false)
        setIsFetched(false)
        fetchData()
    }, [task]);


    function creationTask(taskDataProvider) {
        const task = {
            "id": taskDataProvider.id,
            "title": taskDataProvider.title,
            "description": taskDataProvider.description
        }
        console.log(task)
        setTask((prevTasks) => [...prevTasks, task])
        setIsSubmitting(!isSubmitting)
    }

    function trashCan(taskDataProvider){
        const taskToDelete = {
            "id": taskDataProvider.id,
            "title": taskDataProvider.title,
            "description": taskDataProvider.description,
            "token": taskDataProvider.token
        }
        setTask(task.filter(task => task === taskToDelete))
    }

    function editIcon(taskDataProvider){
        const task = {
            "id": taskDataProvider.id,
            "title": taskDataProvider.title,
            "description": taskDataProvider.description,
            "token": taskDataProvider.token
        }
        setVisibilityEditingScreen(!visibilityEditingScreen)
        setTaskToBeEdited(task)

    }

    function updateTask(taskDataProvider){
        const taskToBeUpdated = {
            "id": taskDataProvider.id,
            "title": taskDataProvider.title,
            "description": taskDataProvider.description,
            "token": taskDataProvider.token
        }

        const index = task.findIndex(obj => obj.token === taskToBeUpdated.token);
        setTask(task.map((m, k) => {
            if (k !== index) return m
            else return {...m, title: taskToBeUpdated.title, description: taskToBeUpdated.description}
        }))
    }



    return <div className={`transition-opacity duration-700 ${isLoading ? `opacity-0` : `opacity-100`}`}>
        <div className="h-20 w-20">
            <button onClick={() => {
                setIsVisible(!isVisible)
            }}><FaCirclePlus className="text-6xl text-emerald-700 hover:text-emerald-800 cursor-pointer p-2"/></button>
        </div>
        {visibilityEditingScreen ? <TaskEditing isVisible={visibilityEditingScreen} setIsVisible={setVisibilityEditingScreen} taskToBeEdited={taskToBeEdited} updateTask={updateTask}/> : null}
        {isVisible ? <TaskCreation isVisible={isVisible} setIsVisible={setIsVisible} createtask={creationTask} taskToBeEdited={taskToBeEdited}/> : null}
        <div className="flex max-w-screen-xl  scroll-auto justify-left">
            {task.map(item => {
                return(
                <div className={`w-80 h-fit break-words min-w-80 transition-opacity duration-1000`}>
                    <Task name={item.title} description={item.description} id={item.id} token={item.token}
                          trashCan={trashCan} editIcon={editIcon}/>
                </div>
            )})}
        </div>
    </div>
}


export default Main;